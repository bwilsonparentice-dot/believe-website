-- Create Believers — one-time setup, run AFTER the migration, in the Supabase SQL editor.
--
-- 1. In Supabase: Authentication → Users → "Add user". Create a user for each
--    team member with their email and a strong password.
-- 2. Replace the email below with that person's email and run this statement.
--    Repeat for each team member. Only people listed in cb_admins can open the workspace.

insert into public.cb_admins (user_id, email)
select id, email from auth.users where email = 'REPLACE-WITH-TEAM-EMAIL'
on conflict (user_id) do nothing;

-- To remove someone's access later:
-- delete from public.cb_admins where email = 'their-email';
