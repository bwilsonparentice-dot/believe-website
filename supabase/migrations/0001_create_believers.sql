-- Create Believers — private records, public submission functions, and access rules.
--
-- Shape of the security model:
--   * Visitors (the `anon` role) have NO access to any table. They can only call
--     the handful of functions granted at the bottom of this file. Each one
--     validates its input on the server and returns only public information.
--   * Believe's team signs in with Supabase Auth. A signed-in user can read or
--     change records only if their user id is listed in cb_admins.
--   * Nothing here is ever shipped to the browser except the project URL and the
--     publishable (anon) key, which are safe to publish by design.
--
-- Every object is prefixed cb_ so it can live beside other tables.

create extension if not exists pgcrypto;

-- ── who may use the private workspace ─────────────────────────────────────
create table if not exists public.cb_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create or replace function public.cb_is_admin() returns boolean
language sql stable security definer set search_path = public, pg_temp as $$
  select exists (select 1 from public.cb_admins a where a.user_id = auth.uid());
$$;

-- ── records ───────────────────────────────────────────────────────────────
create table if not exists public.cb_hosts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  organization text,
  host_role text,
  website text,
  marketing_opt_in boolean not null default false,
  internal_notes text
);
create unique index if not exists cb_hosts_email_key on public.cb_hosts (lower(email));

create table if not exists public.cb_brands (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  state text not null default 'draft' check (state in ('draft','needs_information','approved','paused','archived')),
  is_public boolean not null default false,
  -- the founder's own agreement to take part; a profile cannot be shown to visitors without it
  founder_approved_on date,
  founder_approval_note text,
  constraint cb_brands_public_needs_founder check (not is_public or founder_approved_on is not null),
  -- public profile
  category text,
  public_description text,
  occasions text[] not null default '{}',
  geography_served text[] not null default '{}',
  dietary_verified text[] not null default '{}',
  image_url text,
  logo_url text,
  founder_story text,
  serving_idea text,
  purchase_links jsonb not null default '[]'::jsonb,   -- [{label,url,kind,verified_on}]
  -- private profile
  founder_name text,
  contact_email text,
  website text,
  internal_notes text,
  audiences text[] not null default '{}',
  rituals text,
  why_belongs text,
  priority_markets text[] not null default '{}',
  inventory_available integer check (inventory_available is null or inventory_available >= 0),
  inventory_reserved integer check (inventory_reserved is null or inventory_reserved >= 0),
  sampling_allowance integer check (sampling_allowance is null or sampling_allowance >= 0),
  available_from date,
  available_to date,
  ship_origin text,
  min_lead_days integer check (min_lead_days is null or min_lead_days >= 0),
  min_quantity integer check (min_quantity is null or min_quantity >= 0),
  max_quantity integer check (max_quantity is null or max_quantity >= 0),
  cold_storage text not null default 'unknown' check (cold_storage in ('unknown','required','not_required')),
  storage_notes text,
  product_cost numeric(10,2),
  shipping_estimate numeric(10,2),
  host_allowance numeric(10,2),
  campaign_budget numeric(10,2),
  believe_fee numeric(10,2),
  required_visibility text[] not null default '{}',
  extras text[] not null default '{}',
  restrictions text,
  category_conflicts text[] not null default '{}'
);

create table if not exists public.cb_products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references public.cb_brands (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  sku text,
  category text,
  format text,
  serving_size text,
  case_pack integer check (case_pack is null or case_pack > 0),
  ingredients text,
  allergens_status text not null default 'unknown' check (allergens_status in ('unknown','none_declared','contains')),
  allergens text,
  dietary text[] not null default '{}',
  storage text,
  shipping text,
  notes text
);
create index if not exists cb_products_brand_idx on public.cb_products (brand_id);

create table if not exists public.cb_gatherings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.cb_hosts (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  idempotency_key uuid unique,
  source text not null default 'application' check (source in ('application','team')),
  status text not null default 'applied'
    check (status in ('applied','reviewing','needs_information','approved','declined','cancelled','paused','closed')),
  -- step 1
  name text not null,
  type text not null,
  description text not null,
  -- step 2
  date_status text not null default 'confirmed' check (date_status in ('confirmed','not_confirmed')),
  event_date date,
  event_time text,
  timezone text,
  city text not null,
  region text not null,
  country text not null,
  postal_code text not null,
  venue_type text,
  guest_count integer not null check (guest_count > 0),
  audience text not null,
  repeats boolean not null default false,
  frequency text,
  delivery_by date,
  -- step 3
  categories text[] not null default '{}',
  preferred_brand_id uuid references public.cb_brands (id) on delete set null,
  open_to_suggestions boolean not null default true,
  roles text[] not null default '{}',
  requested_quantity integer check (requested_quantity is null or requested_quantity > 0),
  dietary text,
  dietary_unknown boolean not null default false,
  serving_plan text[] not null default '{}',
  capabilities text[] not null default '{}',
  delivery_notes text,
  shipping_preference text check (shipping_preference is null or shipping_preference in ('host_covers','needs_quote','needs_sponsored')),
  -- step 4
  discovery text[] not null default '{}',
  recap_ack boolean not null default false,
  photos_willing text check (photos_willing is null or photos_willing in ('yes','no','unsure')),
  photo_use_offered text check (photo_use_offered is null or photo_use_offered in ('internal_only','ask_first','may_share')),
  reuse_permission boolean not null default false,
  extra text,
  contact_consent boolean not null default false,
  -- Believe's own working fields
  audience_interests text[] not null default '{}',
  tags text[] not null default '{}',
  owner text,
  next_action text,
  next_action_date date,
  internal_notes text,
  campaign_slug text unique check (campaign_slug is null or campaign_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  campaign_published boolean not null default false,
  constraint cb_gatherings_delivery_before_event
    check (delivery_by is null or event_date is null or delivery_by < event_date)
);
create index if not exists cb_gatherings_host_idx on public.cb_gatherings (host_id);
create index if not exists cb_gatherings_event_idx on public.cb_gatherings (event_date);

create table if not exists public.cb_partnerships (
  id uuid primary key default gen_random_uuid(),
  gathering_id uuid not null references public.cb_gatherings (id) on delete cascade,
  brand_id uuid not null references public.cb_brands (id) on delete restrict,
  product_id uuid references public.cb_products (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'reviewing'
    check (status in ('applied','reviewing','needs_information','approved','preparing','shipped','delivered',
                      'gathered','recap_received','closed','declined','cancelled','paused')),
  approved_quantity integer check (approved_quantity is null or approved_quantity >= 0),
  fulfilment text not null default 'ship' check (fulfilment in ('ship','pickup','local_delivery')),
  shipment_info text,
  owner text,
  next_action text,
  next_action_date date,
  commitments text,
  permissions text,
  cost_estimate numeric(10,2),
  cost_actual numeric(10,2),
  fit_audience smallint check (fit_audience is null or fit_audience between 0 and 3),
  fit_occasion smallint check (fit_occasion is null or fit_occasion between 0 and 3),
  fit_market smallint check (fit_market is null or fit_market between 0 and 2),
  fit_extras smallint check (fit_extras is null or fit_extras between 0 and 2),
  internal_notes text,
  -- the founder's agreement to this particular gathering; required before the partnership can be approved
  founder_approved_on date,
  founder_approval_note text,
  recap_token uuid not null unique default gen_random_uuid(),
  unique (gathering_id, brand_id),
  constraint cb_partnerships_needs_founder check (
    status not in ('approved','preparing','shipped','delivered','gathered','recap_received') or founder_approved_on is not null)
);
create index if not exists cb_partnerships_brand_idx on public.cb_partnerships (brand_id);

create table if not exists public.cb_recaps (
  id uuid primary key default gen_random_uuid(),
  partnership_id uuid not null unique references public.cb_partnerships (id) on delete cascade,
  created_at timestamptz not null default now(),
  actual_attendance integer check (actual_attendance is null or actual_attendance >= 0),
  tried_count integer check (tried_count is null or tried_count >= 0),
  units_served integer check (units_served is null or units_served >= 0),
  units_taken_home integer check (units_taken_home is null or units_taken_home >= 0),
  units_remaining integer check (units_remaining is null or units_remaining >= 0),
  served_how text,
  introduced_how text,
  reactions text,
  worked text,
  improve text,
  photo_links text,
  photo_permission text not null default 'not_shared'
    check (photo_permission in ('not_shared','internal_only','ask_first','may_share')),
  photo_permission_notes text,
  host_interest text check (host_interest is null or host_interest in ('yes','maybe','no')),
  purchases_self_reported text,
  internal_notes text
);

create table if not exists public.cb_founder_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  idempotency_key uuid unique,
  status text not null default 'new' check (status in ('new','in_conversation','became_brand','not_now','closed')),
  founder_name text not null,
  email text not null,
  brand_name text not null,
  website text,
  category text,
  description text not null,
  markets text,
  explore text not null,
  timing_budget text,
  contact_consent boolean not null default false,
  internal_notes text
);

-- Guest page measurement. Each row is one page view or one click on a purchase
-- link. These are counts of page activity only; they are not orders or sales.
create table if not exists public.cb_campaign_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  campaign_slug text not null,
  kind text not null check (kind in ('page_view','purchase_click')),
  target text
);
create index if not exists cb_campaign_events_slug_idx on public.cb_campaign_events (campaign_slug, created_at);

-- Who changed a status, and when.
create table if not exists public.cb_status_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  record_type text not null,
  record_id uuid not null,
  from_status text,
  to_status text not null,
  changed_by uuid
);
create index if not exists cb_status_log_record_idx on public.cb_status_log (record_id, created_at);

-- ── housekeeping triggers ─────────────────────────────────────────────────
create or replace function public.cb__touch() returns trigger
language plpgsql set search_path = public, pg_temp as $$
begin
  new.updated_at := now();
  return new;
end $$;

create or replace function public.cb__log_status() returns trigger
language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if tg_op = 'INSERT' then
    insert into public.cb_status_log (record_type, record_id, from_status, to_status, changed_by)
    values (tg_argv[0], new.id, null, new.status, auth.uid());
  elsif new.status is distinct from old.status then
    insert into public.cb_status_log (record_type, record_id, from_status, to_status, changed_by)
    values (tg_argv[0], new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end $$;

do $$
declare t text;
begin
  foreach t in array array['cb_hosts','cb_brands','cb_products','cb_gatherings','cb_partnerships','cb_founder_inquiries'] loop
    execute format('drop trigger if exists %I on public.%I', t || '_touch', t);
    execute format('create trigger %I before update on public.%I for each row execute function public.cb__touch()', t || '_touch', t);
  end loop;
end $$;

drop trigger if exists cb_gatherings_status on public.cb_gatherings;
create trigger cb_gatherings_status after insert or update of status on public.cb_gatherings
  for each row execute function public.cb__log_status('gathering');
drop trigger if exists cb_partnerships_status on public.cb_partnerships;
create trigger cb_partnerships_status after insert or update of status on public.cb_partnerships
  for each row execute function public.cb__log_status('partnership');

-- ── access rules ──────────────────────────────────────────────────────────
do $$
declare t text;
begin
  foreach t in array array['cb_admins','cb_hosts','cb_brands','cb_products','cb_gatherings','cb_partnerships',
                           'cb_recaps','cb_founder_inquiries','cb_campaign_events','cb_status_log'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from anon', t);
    execute format('revoke all on public.%I from authenticated', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin', t);
  end loop;
  -- working records: the team can read and change everything
  foreach t in array array['cb_hosts','cb_brands','cb_products','cb_gatherings','cb_partnerships',
                           'cb_recaps','cb_founder_inquiries'] loop
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('create policy %I on public.%I for all to authenticated using (public.cb_is_admin()) with check (public.cb_is_admin())', t || '_admin', t);
  end loop;
  -- logs and the admin list: read only from the workspace
  foreach t in array array['cb_admins','cb_campaign_events','cb_status_log'] loop
    execute format('grant select on public.%I to authenticated', t);
    execute format('create policy %I on public.%I for select to authenticated using (public.cb_is_admin())', t || '_admin', t);
  end loop;
end $$;

-- ── input helpers (internal) ──────────────────────────────────────────────
create or replace function public.cb__txt(p jsonb, k text, maxlen integer) returns text
language sql immutable as $$
  select nullif(left(btrim(coalesce(p ->> k, '')), maxlen), '');
$$;

create or replace function public.cb__int(p jsonb, k text) returns integer
language plpgsql immutable as $$
declare v text := btrim(coalesce(p ->> k, ''));
begin
  if v ~ '^[0-9]{1,7}$' then return v::integer; end if;
  return null;
end $$;

create or replace function public.cb__date(p jsonb, k text) returns date
language plpgsql immutable as $$
declare v text := btrim(coalesce(p ->> k, ''));
begin
  if v ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' then
    begin return v::date; exception when others then return null; end;
  end if;
  return null;
end $$;

create or replace function public.cb__uuid(p jsonb, k text) returns uuid
language plpgsql immutable as $$
declare v text := btrim(coalesce(p ->> k, ''));
begin
  if v ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then return v::uuid; end if;
  return null;
end $$;

-- the values of p[k] that are in `allowed`; anything else is dropped
create or replace function public.cb__arr(p jsonb, k text, allowed text[]) returns text[]
language sql immutable as $$
  select coalesce(array_agg(distinct v), '{}')
  from jsonb_array_elements_text(case when jsonb_typeof(p -> k) = 'array' then p -> k else '[]'::jsonb end) as t(v)
  where v = any (allowed);
$$;

create or replace function public.cb__email_ok(e text) returns boolean
language sql immutable as $$
  select e is not null and length(e) <= 254 and e ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$';
$$;

-- ── public: a host tells us about a gathering ─────────────────────────────
create or replace function public.cb_submit_host_application(p jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  errs jsonb := '{}'::jsonb;
  v_key uuid := cb__uuid(p, 'idempotency_key');
  v_email text := lower(cb__txt(p, 'email', 254));
  v_name text := cb__txt(p, 'full_name', 160);
  v_gname text := cb__txt(p, 'name', 200);
  v_type text := cb__txt(p, 'type', 40);
  v_desc text := cb__txt(p, 'description', 2000);
  v_date_status text := coalesce(cb__txt(p, 'date_status', 20), 'confirmed');
  v_event date := cb__date(p, 'event_date');
  v_delivery date := cb__date(p, 'delivery_by');
  v_tz text := cb__txt(p, 'timezone', 80);
  v_city text := cb__txt(p, 'city', 120);
  v_region text := cb__txt(p, 'region', 120);
  v_country text := cb__txt(p, 'country', 120);
  v_postal text := cb__txt(p, 'postal_code', 20);
  v_guests integer := cb__int(p, 'guest_count');
  v_audience text := cb__txt(p, 'audience', 2000);
  v_qty integer := cb__int(p, 'requested_quantity');
  v_role text := cb__txt(p, 'host_role', 40);
  v_venue text := cb__txt(p, 'venue_type', 40);
  v_photos text := cb__txt(p, 'photos_willing', 10);
  v_photo_use text := cb__txt(p, 'photo_use_offered', 20);
  v_shipping text := cb__txt(p, 'shipping_preference', 20);
  v_brand uuid := cb__uuid(p, 'preferred_brand_id');
  v_host uuid;
  v_id uuid;
begin
  if p is null or jsonb_typeof(p) <> 'object' then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'invalid'));
  end if;
  -- a filled decoy field means an automated submission: accept quietly, keep nothing
  if cb__txt(p, 'company_website', 200) is not null then
    return jsonb_build_object('ok', true);
  end if;
  -- a repeat of the same submission (double click, retry) is answered, not stored twice
  if v_key is not null and exists (select 1 from cb_gatherings g where g.idempotency_key = v_key) then
    return jsonb_build_object('ok', true);
  end if;

  if v_name is null then errs := errs || jsonb_build_object('full_name', 'required'); end if;
  if not cb__email_ok(v_email) then errs := errs || jsonb_build_object('email', 'invalid'); end if;
  if v_gname is null then errs := errs || jsonb_build_object('name', 'required'); end if;
  if v_type is null or not (v_type = any (array['creative_workshop','supper_club','flower_garden','book_club',
       'wellness_fitness','community_social','corporate_team','hospitality','retreat','other'])) then
    errs := errs || jsonb_build_object('type', 'required');
  end if;
  if v_desc is null then errs := errs || jsonb_build_object('description', 'required'); end if;
  if v_role is not null and not (v_role = any (array['host','event_planner','instructor','venue','community_organizer','other'])) then
    v_role := null;
  end if;

  if v_date_status not in ('confirmed', 'not_confirmed') then
    errs := errs || jsonb_build_object('date_status', 'invalid');
  elsif v_date_status = 'confirmed' then
    if v_event is null then errs := errs || jsonb_build_object('event_date', 'required');
    elsif v_event < current_date then errs := errs || jsonb_build_object('event_date', 'past'); end if;
    if cb__txt(p, 'event_time', 80) is null then errs := errs || jsonb_build_object('event_time', 'required'); end if;
    if v_tz is null then errs := errs || jsonb_build_object('timezone', 'required'); end if;
    if v_delivery is null then errs := errs || jsonb_build_object('delivery_by', 'required');
    elsif v_event is not null and v_delivery >= v_event then errs := errs || jsonb_build_object('delivery_by', 'after_event');
    elsif v_delivery < current_date then errs := errs || jsonb_build_object('delivery_by', 'past'); end if;
  else
    v_event := null;
    v_delivery := null;
  end if;

  if v_city is null then errs := errs || jsonb_build_object('city', 'required'); end if;
  if v_region is null then errs := errs || jsonb_build_object('region', 'required'); end if;
  if v_country is null then errs := errs || jsonb_build_object('country', 'required'); end if;
  if v_postal is null then errs := errs || jsonb_build_object('postal_code', 'required'); end if;
  if v_venue is not null and not (v_venue = any (array['home','studio','shop','restaurant','workplace','outdoor','other'])) then
    v_venue := null;
  end if;
  if v_guests is null or v_guests < 1 or v_guests > 100000 then errs := errs || jsonb_build_object('guest_count', 'invalid'); end if;
  if v_audience is null then errs := errs || jsonb_build_object('audience', 'required'); end if;
  if btrim(coalesce(p ->> 'requested_quantity', '')) <> '' and (v_qty is null or v_qty < 1) then
    errs := errs || jsonb_build_object('requested_quantity', 'invalid');
  end if;
  if v_photos is not null and v_photos not in ('yes', 'no', 'unsure') then v_photos := null; end if;
  if v_photo_use is not null and v_photo_use not in ('internal_only', 'ask_first', 'may_share') then v_photo_use := null; end if;
  if v_shipping is not null and v_shipping not in ('host_covers', 'needs_quote', 'needs_sponsored') then v_shipping := null; end if;
  if coalesce((p ->> 'recap_ack')::boolean, false) is not true then errs := errs || jsonb_build_object('recap_ack', 'required'); end if;
  if coalesce((p ->> 'contact_consent')::boolean, false) is not true then errs := errs || jsonb_build_object('contact_consent', 'required'); end if;

  if errs <> '{}'::jsonb then
    return jsonb_build_object('ok', false, 'errors', errs);
  end if;

  -- basic flood protection
  if (select count(*) from cb_gatherings g join cb_hosts h on h.id = g.host_id
        where lower(h.email) = v_email and g.created_at > now() - interval '24 hours') >= 5
     or (select count(*) from cb_gatherings g where g.source = 'application' and g.created_at > now() - interval '1 hour') >= 120 then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'too_many'));
  end if;

  -- only a brand that is approved and published can be named as a preference
  if v_brand is not null and not exists (select 1 from cb_brands b where b.id = v_brand and b.state = 'approved' and b.is_public and b.founder_approved_on is not null) then
    v_brand := null;
  end if;

  select h.id into v_host from cb_hosts h where lower(h.email) = v_email;
  if v_host is null then
    insert into cb_hosts (full_name, email, organization, host_role, website, marketing_opt_in)
    values (v_name, v_email, cb__txt(p, 'organization', 200), v_role, cb__txt(p, 'website', 300),
            coalesce((p ->> 'marketing_opt_in')::boolean, false))
    returning id into v_host;
  else
    -- a returning host: fill gaps, never overwrite what the team has on file
    update cb_hosts h set
      organization = coalesce(h.organization, cb__txt(p, 'organization', 200)),
      host_role = coalesce(h.host_role, v_role),
      website = coalesce(h.website, cb__txt(p, 'website', 300)),
      marketing_opt_in = h.marketing_opt_in or coalesce((p ->> 'marketing_opt_in')::boolean, false)
    where h.id = v_host;
  end if;

  insert into cb_gatherings (
    host_id, idempotency_key, source, status, name, type, description,
    date_status, event_date, event_time, timezone, city, region, country, postal_code, venue_type,
    guest_count, audience, repeats, frequency, delivery_by,
    categories, preferred_brand_id, open_to_suggestions, roles, requested_quantity, dietary, dietary_unknown,
    serving_plan, capabilities, delivery_notes, shipping_preference,
    discovery, recap_ack, photos_willing, photo_use_offered, reuse_permission, extra, contact_consent
  ) values (
    v_host, v_key, 'application', 'applied', v_gname, v_type, v_desc,
    v_date_status, v_event, cb__txt(p, 'event_time', 80), v_tz, v_city, v_region, v_country, v_postal, v_venue,
    v_guests, v_audience, coalesce((p ->> 'repeats')::boolean, false), cb__txt(p, 'frequency', 120), v_delivery,
    cb__arr(p, 'categories', array['beverages','sweet_snacks','savory_snacks','other']),
    v_brand, v_brand is null,
    cb__arr(p, 'roles', array['welcome_drink','served_with_food','shared_table','tasting','activity_pairing','take_home','other']),
    v_qty, cb__txt(p, 'dietary', 1000), coalesce((p ->> 'dietary_unknown')::boolean, false),
    cb__arr(p, 'serving_plan', array['original_packaging','poured_servings','recipe_mocktail','sampling','other']),
    cb__arr(p, 'capabilities', array['cold_storage','ice','glassware','serving_help']),
    cb__txt(p, 'delivery_notes', 600), v_shipping,
    cb__arr(p, 'discovery', array['host_introduction','menu_place_card','story_display','qr_link','welcome_bag',
                                  'follow_up_email','social_content','sampling_only','other']),
    true, v_photos, v_photo_use, coalesce(v_photo_use = 'may_share', false), cb__txt(p, 'extra', 2000), true
  ) returning id into v_id;

  return jsonb_build_object('ok', true);
exception
  when invalid_text_representation then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'invalid'));
end $$;

-- ── public: a founder asks about the programme ────────────────────────────
create or replace function public.cb_submit_founder_inquiry(p jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  errs jsonb := '{}'::jsonb;
  v_key uuid := cb__uuid(p, 'idempotency_key');
  v_email text := lower(cb__txt(p, 'email', 254));
begin
  if p is null or jsonb_typeof(p) <> 'object' then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'invalid'));
  end if;
  if cb__txt(p, 'company_website', 200) is not null then return jsonb_build_object('ok', true); end if;
  if v_key is not null and exists (select 1 from cb_founder_inquiries f where f.idempotency_key = v_key) then
    return jsonb_build_object('ok', true);
  end if;

  if cb__txt(p, 'founder_name', 160) is null then errs := errs || jsonb_build_object('founder_name', 'required'); end if;
  if not cb__email_ok(v_email) then errs := errs || jsonb_build_object('email', 'invalid'); end if;
  if cb__txt(p, 'brand_name', 200) is null then errs := errs || jsonb_build_object('brand_name', 'required'); end if;
  if cb__txt(p, 'description', 2000) is null then errs := errs || jsonb_build_object('description', 'required'); end if;
  if cb__txt(p, 'explore', 2000) is null then errs := errs || jsonb_build_object('explore', 'required'); end if;
  if coalesce((p ->> 'contact_consent')::boolean, false) is not true then errs := errs || jsonb_build_object('contact_consent', 'required'); end if;
  if errs <> '{}'::jsonb then return jsonb_build_object('ok', false, 'errors', errs); end if;

  if (select count(*) from cb_founder_inquiries f where lower(f.email) = v_email and f.created_at > now() - interval '24 hours') >= 5
     or (select count(*) from cb_founder_inquiries f where f.created_at > now() - interval '1 hour') >= 120 then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'too_many'));
  end if;

  insert into cb_founder_inquiries (idempotency_key, founder_name, email, brand_name, website, category,
                                    description, markets, explore, timing_budget, contact_consent)
  values (v_key, cb__txt(p, 'founder_name', 160), v_email, cb__txt(p, 'brand_name', 200), cb__txt(p, 'website', 300),
          cb__txt(p, 'category', 60), cb__txt(p, 'description', 2000), cb__txt(p, 'markets', 1000),
          cb__txt(p, 'explore', 2000), cb__txt(p, 'timing_budget', 600), true);
  return jsonb_build_object('ok', true);
exception
  when invalid_text_representation then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'invalid'));
end $$;

-- ── public: approved, published brand profiles (public fields only) ───────
create or replace function public.cb_public_brands() returns table (
  id uuid, slug text, name text, category text, description text,
  occasions text[], geography text[], dietary_verified text[], image_url text
)
language sql stable security definer set search_path = public, pg_temp as $$
  select b.id, b.slug, b.name, b.category, b.public_description,
         b.occasions, b.geography_served, b.dietary_verified, b.image_url
  from cb_brands b
  where b.state = 'approved' and b.is_public and b.founder_approved_on is not null
  order by b.name;
$$;

-- only purchase links with a verification date and an https address are shown
create or replace function public.cb__confirmed_links(links jsonb) returns jsonb
language sql immutable as $$
  select coalesce(jsonb_agg(jsonb_build_object('label', l ->> 'label', 'url', l ->> 'url', 'kind', l ->> 'kind')), '[]'::jsonb)
  from jsonb_array_elements(case when jsonb_typeof(links) = 'array' then links else '[]'::jsonb end) as t(l)
  where coalesce(l ->> 'verified_on', '') <> '' and (l ->> 'url') ~* '^https://' and coalesce(l ->> 'label', '') <> '';
$$;

-- ── public: the guest page for one gathering's campaign ───────────────────
-- Returns brand stories and confirmed purchase links only. Nothing about the
-- gathering, the host, or where it happened leaves the database.
create or replace function public.cb_get_campaign(p_slug text) returns jsonb
language sql stable security definer set search_path = public, pg_temp as $$
  select case when g.id is null then null else jsonb_build_object(
    'slug', g.campaign_slug,
    'brands', coalesce((
      select jsonb_agg(jsonb_build_object(
        'name', b.name, 'category', b.category, 'description', b.public_description,
        'founder_story', b.founder_story, 'serving_idea', b.serving_idea, 'image_url', b.image_url,
        'links', cb__confirmed_links(b.purchase_links)) order by b.name)
      from cb_partnerships pt join cb_brands b on b.id = pt.brand_id
      where pt.gathering_id = g.id and b.state = 'approved' and b.founder_approved_on is not null and pt.founder_approved_on is not null
        and pt.status in ('approved','preparing','shipped','delivered','gathered','recap_received','closed')
    ), '[]'::jsonb)
  ) end
  from (select 1) one
  left join cb_gatherings g on g.campaign_slug = lower(btrim(p_slug)) and g.campaign_published;
$$;

create or replace function public.cb_track(p_slug text, p_kind text, p_target text default null) returns void
language plpgsql security definer set search_path = public, pg_temp as $$
declare v_slug text := lower(btrim(coalesce(p_slug, '')));
begin
  if p_kind not in ('page_view', 'purchase_click') then return; end if;
  if not exists (select 1 from cb_gatherings g where g.campaign_slug = v_slug and g.campaign_published) then return; end if;
  if (select count(*) from cb_campaign_events e where e.campaign_slug = v_slug and e.created_at > now() - interval '1 hour') >= 2000 then return; end if;
  insert into cb_campaign_events (campaign_slug, kind, target) values (v_slug, p_kind, left(p_target, 300));
end $$;

-- ── public: the recap form, reached by a private link ─────────────────────
create or replace function public.cb_get_recap_context(p_token uuid) returns jsonb
language sql stable security definer set search_path = public, pg_temp as $$
  select jsonb_build_object(
    'gathering_name', g.name, 'brand_name', b.name, 'event_date', g.event_date,
    'open', pt.status in ('approved','preparing','shipped','delivered','gathered'),
    'submitted', exists (select 1 from cb_recaps r where r.partnership_id = pt.id))
  from cb_partnerships pt
  join cb_gatherings g on g.id = pt.gathering_id
  join cb_brands b on b.id = pt.brand_id
  where pt.recap_token = p_token;
$$;

create or replace function public.cb_submit_recap(p_token uuid, p jsonb) returns jsonb
language plpgsql security definer set search_path = public, pg_temp as $$
declare
  v_pt cb_partnerships%rowtype;
  errs jsonb := '{}'::jsonb;
  v_perm text := coalesce(cb__txt(p, 'photo_permission', 20), 'not_shared');
  v_interest text := cb__txt(p, 'host_interest', 10);
  k text;
begin
  if p is null or jsonb_typeof(p) <> 'object' then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'invalid'));
  end if;
  select * into v_pt from cb_partnerships pt where pt.recap_token = p_token;
  if not found or v_pt.status not in ('approved','preparing','shipped','delivered','gathered') then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'closed'));
  end if;
  if exists (select 1 from cb_recaps r where r.partnership_id = v_pt.id) then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'already_submitted'));
  end if;

  if cb__int(p, 'actual_attendance') is null then errs := errs || jsonb_build_object('actual_attendance', 'required'); end if;
  foreach k in array array['tried_count','units_served','units_taken_home','units_remaining'] loop
    if btrim(coalesce(p ->> k, '')) <> '' and cb__int(p, k) is null then errs := errs || jsonb_build_object(k, 'invalid'); end if;
  end loop;
  if cb__txt(p, 'served_how', 2000) is null then errs := errs || jsonb_build_object('served_how', 'required'); end if;
  if v_perm not in ('not_shared','internal_only','ask_first','may_share') then errs := errs || jsonb_build_object('photo_permission', 'invalid'); end if;
  -- sharing photos requires an explicit statement of how they may be used
  if cb__txt(p, 'photo_links', 2000) is not null and v_perm = 'not_shared' then
    errs := errs || jsonb_build_object('photo_permission', 'required');
  end if;
  if v_interest is not null and v_interest not in ('yes','maybe','no') then v_interest := null; end if;
  if errs <> '{}'::jsonb then return jsonb_build_object('ok', false, 'errors', errs); end if;

  insert into cb_recaps (partnership_id, actual_attendance, tried_count, units_served, units_taken_home, units_remaining,
                         served_how, introduced_how, reactions, worked, improve, photo_links, photo_permission,
                         photo_permission_notes, host_interest, purchases_self_reported)
  values (v_pt.id, cb__int(p, 'actual_attendance'), cb__int(p, 'tried_count'), cb__int(p, 'units_served'),
          cb__int(p, 'units_taken_home'), cb__int(p, 'units_remaining'),
          cb__txt(p, 'served_how', 2000), cb__txt(p, 'introduced_how', 2000), cb__txt(p, 'reactions', 3000),
          cb__txt(p, 'worked', 3000), cb__txt(p, 'improve', 3000), cb__txt(p, 'photo_links', 2000), v_perm,
          cb__txt(p, 'photo_permission_notes', 1000), v_interest, cb__txt(p, 'purchases_self_reported', 2000));
  return jsonb_build_object('ok', true);
exception
  when unique_violation then
    return jsonb_build_object('ok', false, 'errors', jsonb_build_object('form', 'already_submitted'));
end $$;

-- ── who may call what ─────────────────────────────────────────────────────
do $$
declare f text;
begin
  -- internal helpers and triggers: nobody calls these directly
  foreach f in array array[
    'cb__touch()', 'cb__log_status()', 'cb__txt(jsonb, text, integer)', 'cb__int(jsonb, text)',
    'cb__date(jsonb, text)', 'cb__uuid(jsonb, text)', 'cb__arr(jsonb, text, text[])', 'cb__email_ok(text)',
    'cb__confirmed_links(jsonb)'] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', f);
  end loop;
  -- the public surface
  foreach f in array array[
    'cb_submit_host_application(jsonb)', 'cb_submit_founder_inquiry(jsonb)', 'cb_public_brands()',
    'cb_get_campaign(text)', 'cb_track(text, text, text)', 'cb_get_recap_context(uuid)', 'cb_submit_recap(uuid, jsonb)'] loop
    execute format('revoke all on function public.%s from public', f);
    execute format('grant execute on function public.%s to anon, authenticated', f);
  end loop;
  execute 'revoke all on function public.cb_is_admin() from public, anon';
  execute 'grant execute on function public.cb_is_admin() to authenticated';
end $$;

-- ── workspace: guest page activity, summed per campaign ───────────────────
-- Runs with the caller's own rights, so only the team gets rows back.
create or replace function public.cb_campaign_counts() returns table (campaign_slug text, page_views bigint, purchase_clicks bigint)
language sql stable security invoker set search_path = public, pg_temp as $$
  select e.campaign_slug,
         count(*) filter (where e.kind = 'page_view'),
         count(*) filter (where e.kind = 'purchase_click')
  from cb_campaign_events e group by e.campaign_slug;
$$;
revoke all on function public.cb_campaign_counts() from public, anon;
grant execute on function public.cb_campaign_counts() to authenticated;
