-- Checks the Create Believers access rules and server-side validation.
-- Run after local_stub.sql and the migration. Any failed check raises an error.
\set ON_ERROR_STOP on
create or replace function pg_temp.ok(cond boolean, label text) returns void language plpgsql as $$
begin
  if cond is not true then raise exception 'FAILED: %', label; end if;
  raise notice 'ok - %', label;
end $$;
create or replace function pg_temp.denied(q text, label text) returns void language plpgsql as $$
begin
  begin
    execute q;
  exception when insufficient_privilege then
    raise notice 'ok - %', label; return;
  end;
  raise exception 'FAILED (was allowed): %', label;
end $$;
grant execute on all functions in schema pg_temp to anon, authenticated;

-- fixtures, created as the database owner
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-00000000000a', 'team@example.test'),
  ('00000000-0000-0000-0000-00000000000b', 'stranger@example.test');
insert into cb_admins (user_id, email) values ('00000000-0000-0000-0000-00000000000a', 'team@example.test');
insert into cb_brands (id, name, slug, state, is_public, category, public_description, occasions, geography_served,
                       internal_notes, campaign_budget, contact_email, founder_story, serving_idea, purchase_links, founder_approved_on)
values
  ('10000000-0000-0000-0000-000000000001', 'Test Live Brand', 'test-live', 'approved', true, 'beverages', 'A public description',
   '{book_club}', '{Virginia}', 'PRIVATE NOTE', 500, 'founder@example.test', 'Story', 'Serve chilled',
   '[{"label":"Shop online","url":"https://example.test/shop","kind":"online","verified_on":"2026-11-01"},
     {"label":"Unverified shop","url":"https://example.test/unverified","kind":"retailer","verified_on":""},
     {"label":"Bad link","url":"javascript:alert(1)","kind":"online","verified_on":"2026-11-01"}]', current_date),
  ('10000000-0000-0000-0000-000000000002', 'Test Draft Brand', 'test-draft', 'draft', false, 'sweet_snacks', 'Draft', '{}', '{}', null, null, null, null, null, '[]', null),
  ('10000000-0000-0000-0000-000000000003', 'Approved But Unpublished', 'test-unpublished', 'approved', false, 'beverages', 'Hidden', '{}', '{}', null, null, null, null, null, '[]', current_date);
do $$ begin
  begin
    insert into cb_brands (name, slug, state, is_public) values ('No founder yes', 'no-founder-yes', 'approved', true);
  exception when check_violation then raise notice 'ok - a brand cannot be made public before the founder approves'; return;
  end;
  raise exception 'FAILED: a brand was made public without founder approval';
end $$;

-- ── a visitor ────────────────────────────────────────────────────────────
set role anon;
select pg_temp.denied('select 1 from cb_hosts', 'visitor cannot read hosts');
select pg_temp.denied('select 1 from cb_gatherings', 'visitor cannot read gatherings');
select pg_temp.denied('select 1 from cb_brands', 'visitor cannot read the brand table');
select pg_temp.denied('select 1 from cb_partnerships', 'visitor cannot read partnerships');
select pg_temp.denied('select 1 from cb_recaps', 'visitor cannot read recaps');
select pg_temp.denied('select 1 from cb_founder_inquiries', 'visitor cannot read founder inquiries');
select pg_temp.denied('select 1 from cb_admins', 'visitor cannot read the admin list');
select pg_temp.denied($$insert into cb_admins (user_id) values ('00000000-0000-0000-0000-00000000000b')$$, 'visitor cannot add an admin');
select pg_temp.denied($$insert into cb_brands (name, slug) values ('x', 'x')$$, 'visitor cannot add a brand');
select pg_temp.denied('select cb_is_admin()', 'visitor cannot call cb_is_admin');
select pg_temp.denied($$select cb__txt('{}'::jsonb, 'a', 3)$$, 'visitor cannot call internal helpers');

select pg_temp.ok((select count(*) from cb_public_brands()) = 1, 'public brands: only approved and published');
select pg_temp.ok((select to_jsonb(b) from cb_public_brands() b)::text !~ 'PRIVATE NOTE|founder@example|500',
                  'public brands: no private fields');

-- invalid submission: every problem reported, nothing stored
select pg_temp.ok(
  (cb_submit_host_application('{"email":"not-an-email","guest_count":"0"}'::jsonb) -> 'errors')
    ?& array['full_name','email','name','type','description','event_date','delivery_by','city','guest_count','audience','shipping_preference','recap_ack','contact_consent'],
  'host application: invalid input is rejected field by field');

create or replace function pg_temp.app(extra jsonb default '{}') returns jsonb language sql as $$
  select jsonb_build_object(
    'full_name','Ada Example','email','Ada@Example.test','name','Autumn book club','type','book_club',
    'description','Reading together','date_status','confirmed',
    'event_date', (current_date + 30)::text, 'event_time','6:30 pm','timezone','America/New_York',
    'delivery_by', (current_date + 25)::text,
    'city','Richmond','region','Virginia','country','United States','postal_code','23220',
    'guest_count','12','audience','Neighbours who read','recap_ack',true,'contact_consent',true,
    'categories', '["beverages","not-a-category"]'::jsonb,
    'shipping_preference','needs_quote','photo_public_offered',true,'photo_reuse_offered',false,'discovery','["host_introduction","qr_link"]'::jsonb,'photos_willing','yes',
    'preferred_brand_id','10000000-0000-0000-0000-000000000002',
    'idempotency_key','20000000-0000-0000-0000-000000000001') || extra;
$$;

select pg_temp.ok((cb_submit_host_application(pg_temp.app('{"delivery_by":"2999-01-01"}')) -> 'errors' ->> 'delivery_by') = 'after_event',
                  'host application: delivery must come before the event');
select pg_temp.ok((cb_submit_host_application(pg_temp.app('{"event_date":"2001-01-01"}')) -> 'errors' ->> 'event_date') = 'past',
                  'host application: event date cannot be in the past');
select pg_temp.ok((cb_submit_host_application(pg_temp.app('{"requested_quantity":"-4"}')) -> 'errors' ->> 'requested_quantity') = 'invalid',
                  'host application: quantity must be a positive number');
select pg_temp.ok((cb_submit_host_application(pg_temp.app('{"shipping_preference":""}')) -> 'errors' ->> 'shipping_preference') = 'required',
                  'host application: a shipping preference is required');
select pg_temp.ok((cb_submit_host_application(pg_temp.app('{"contact_consent":"maybe"}')) ->> 'ok') = 'false',
                  'host application: malformed values fail cleanly');
select pg_temp.ok((cb_submit_host_application(pg_temp.app('{"company_website":"http://spam"}')) ->> 'ok') = 'true',
                  'host application: decoy field is accepted quietly');
select pg_temp.ok((cb_submit_host_application(pg_temp.app()) ->> 'ok') = 'true', 'host application: valid submission accepted');
select pg_temp.ok((cb_submit_host_application(pg_temp.app()) ->> 'ok') = 'true', 'host application: repeat submission answered');
select pg_temp.ok((cb_submit_host_application(pg_temp.app(jsonb_build_object(
    'idempotency_key','20000000-0000-0000-0000-000000000002','date_status','not_confirmed','event_date','','delivery_by','','name','Spring supper','photos_willing','unsure','photo_public_offered',true,'photo_reuse_offered',true))) ->> 'ok') = 'true',
  'host application: "date not confirmed" needs no dates');
select pg_temp.ok((cb_submit_founder_inquiry('{"email":"x"}'::jsonb) -> 'errors') ?& array['founder_name','email','brand_name','description','explore','contact_consent'],
                  'founder inquiry: invalid input rejected');
select pg_temp.ok((cb_submit_founder_inquiry('{"founder_name":"Bo","email":"bo@example.test","brand_name":"Bo Tea","description":"Tea","explore":"Supper clubs","contact_consent":true}'::jsonb) ->> 'ok') = 'true',
                  'founder inquiry: valid submission accepted');
reset role;

select pg_temp.ok((select count(*) from cb_gatherings) = 2, 'stored: two gatherings (decoy and repeat kept out)');
select pg_temp.ok((select not photo_public_offered and not photo_reuse_offered from cb_gatherings where name = 'Spring supper'), 'stored: photo permissions are not recorded unless the host is sharing photos');
select pg_temp.ok((select count(*) from cb_hosts) = 1, 'stored: one host for both gatherings (matched by email)');
select pg_temp.ok((select bool_and(preferred_brand_id is null and open_to_suggestions) from cb_gatherings), 'stored: an unpublished brand cannot be named as a preference');
select pg_temp.ok((select categories from cb_gatherings where name = 'Autumn book club') = '{beverages}', 'stored: unknown option values are dropped');
select pg_temp.ok((select count(*) from cb_status_log where record_type = 'gathering') = 2, 'stored: status log written');
select pg_temp.ok((select shipping_preference = 'needs_quote' and photo_public_offered and not photo_reuse_offered and photos_willing = 'yes' and recap_ack
                     and discovery @> '{host_introduction,qr_link}' from cb_gatherings where name = 'Autumn book club'),
                  'stored: shipping preference and the visibility, recap, and photo-use permissions offered');

-- ── a signed-in user who is not on the team ──────────────────────────────
set role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000b', false);
select pg_temp.ok((select count(*) from cb_gatherings) = 0, 'signed-in stranger sees no gatherings');
select pg_temp.ok((select count(*) from cb_hosts) = 0, 'signed-in stranger sees no hosts');
select pg_temp.ok((select count(*) from cb_brands) = 0, 'signed-in stranger sees no brand records');
select pg_temp.ok((select count(*) from cb_founder_inquiries) = 0, 'signed-in stranger sees no inquiries');
select pg_temp.ok((select count(*) from cb_admins) = 0, 'signed-in stranger cannot read the admin list');
select pg_temp.denied($$insert into cb_admins (user_id) values ('00000000-0000-0000-0000-00000000000b')$$, 'signed-in stranger cannot make themselves an admin');
do $$ begin
  begin
    insert into cb_brands (name, slug) values ('x', 'x');
  exception when insufficient_privilege then raise notice 'ok - signed-in stranger cannot add a brand'; return;
  end;
  raise exception 'FAILED: signed-in stranger added a brand';
end $$;
with u as (update cb_gatherings set status = 'approved' returning 1)
select pg_temp.ok((select count(*) from u) = 0, 'signed-in stranger cannot change a gathering');

-- ── the team ─────────────────────────────────────────────────────────────
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', false);
select pg_temp.ok((select count(*) from cb_gatherings) = 2, 'team sees gatherings');
update cb_gatherings set status = 'reviewing', internal_notes = 'Lovely fit', campaign_slug = 'autumn-book-club' where name = 'Autumn book club';
insert into cb_partnerships (id, gathering_id, brand_id, status, recap_token)
  select '30000000-0000-0000-0000-000000000001', id, '10000000-0000-0000-0000-000000000001', 'reviewing', '40000000-0000-0000-0000-000000000001'
  from cb_gatherings where name = 'Autumn book club';
select pg_temp.ok((select internal_notes from cb_gatherings where name = 'Autumn book club') = 'Lovely fit', 'team can save notes and reload them');
select pg_temp.ok((select count(*) from cb_status_log where to_status = 'reviewing' and changed_by = '00000000-0000-0000-0000-00000000000a') = 2, 'status changes are logged with who made them');
reset role;

-- ── guest page and recap, as a visitor ───────────────────────────────────
set role anon;
select pg_temp.ok(cb_get_campaign('autumn-book-club') is null, 'guest page: unpublished campaign returns nothing');
select pg_temp.ok((cb_get_recap_context('40000000-0000-0000-0000-000000000001') ->> 'open') = 'false', 'recap: closed until the partnership is approved');
select pg_temp.ok((cb_submit_recap('40000000-0000-0000-0000-000000000001', '{"actual_attendance":"10","served_how":"Poured"}') -> 'errors' ->> 'form') = 'closed', 'recap: cannot be sent before approval');
reset role;
update cb_gatherings set campaign_published = true where campaign_slug = 'autumn-book-club';
set role anon;
select pg_temp.ok(jsonb_array_length(cb_get_campaign('autumn-book-club') -> 'brands') = 0, 'guest page: a brand still under review is not shown');
reset role;
do $$ begin
  begin
    update cb_partnerships set status = 'approved' where id = '30000000-0000-0000-0000-000000000001';
  exception when check_violation then raise notice 'ok - a partnership cannot be approved before the founder approves it'; return;
  end;
  raise exception 'FAILED: a partnership was approved without founder approval';
end $$;
update cb_partnerships set status = 'approved', founder_approved_on = current_date where id = '30000000-0000-0000-0000-000000000001';
set role anon;
select pg_temp.ok(jsonb_array_length(cb_get_campaign('Autumn-Book-Club ') -> 'brands') = 1, 'guest page: approved brand shown');
select pg_temp.ok(jsonb_array_length(cb_get_campaign('autumn-book-club') -> 'brands' -> 0 -> 'links') = 1, 'guest page: only verified https purchase links');
select pg_temp.ok(cb_get_campaign('autumn-book-club')::text !~ 'Richmond|23220|Ada|PRIVATE|Neighbours|example\.test/unverified', 'guest page: no gathering, host, or private details');
select cb_track('autumn-book-club', 'page_view');
select cb_track('autumn-book-club', 'purchase_click', 'https://example.test/shop');
select cb_track('autumn-book-club', 'verified_sale');
select cb_track('no-such-campaign', 'page_view');
select pg_temp.ok(cb_get_recap_context('40000000-0000-0000-0000-00000000dead') is null, 'recap: unknown link returns nothing');
select pg_temp.ok((cb_submit_recap('40000000-0000-0000-0000-000000000001', '{"actual_attendance":"","served_how":""}') -> 'errors') ?& array['actual_attendance','served_how'], 'recap: required fields enforced');
select pg_temp.ok((cb_submit_recap('40000000-0000-0000-0000-000000000001', '{"actual_attendance":"10","tried_count":"8","served_how":"Poured","photo_links":"https://photos.example.test/a","photo_public_ok":true}') ->> 'ok') = 'true', 'recap: valid recap accepted');
select pg_temp.ok((cb_submit_recap('40000000-0000-0000-0000-000000000001', '{"actual_attendance":"99","served_how":"Again"}') -> 'errors' ->> 'form') = 'already_submitted', 'recap: cannot be overwritten');
reset role;
select pg_temp.ok((select actual_attendance = 10 and tried_count = 8 from cb_recaps), 'recap stored with attendance and tried counts kept separate');
select pg_temp.ok((select photo_public_ok and not photo_reuse_ok from cb_recaps), 'recap: public sharing and marketing reuse are stored as separate permissions; providing photos grants neither by itself');
select pg_temp.ok((select status from cb_partnerships where id = '30000000-0000-0000-0000-000000000001') = 'approved', 'recap does not change the partnership status by itself');
select pg_temp.ok((select count(*) from cb_campaign_events) = 2, 'guest page: only page views and clicks on a live campaign are counted');
\echo ALL CHECKS PASSED
set role anon;
select pg_temp.denied('select * from cb_campaign_counts()', 'visitor cannot read guest page counts');
set role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000b', false);
select pg_temp.ok((select count(*) from cb_campaign_counts()) = 0, 'signed-in stranger gets no guest page counts');
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', false);
select pg_temp.ok((select page_views = 1 and purchase_clicks = 1 from cb_campaign_counts()), 'team sees page views and clicks as separate counts');
reset role;
\echo ALL CHECKS PASSED (including counts)
