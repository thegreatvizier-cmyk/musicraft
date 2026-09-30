-- Musicraft Partner Program: register a referral from the main site (musicraft.eu).
-- Run once in Supabase SQL Editor (project musicraft-partners).
-- The main site calls this via the Supabase REST API with the publishable key;
-- the call is only accepted with the shared secret (REFERRAL_WEBHOOK_SECRET),
-- whose SHA-256 hash is stored in pp_settings.referral_secret_sha256.

create or replace function public.pp_register_referral(
  p_secret        text,
  p_submission_id text,
  p_code          text,
  p_name          text,
  p_email         text,
  p_country       text
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_expected text;
  v_partner  record;
  v_email    text := lower(trim(coalesce(p_email, '')));
  v_code     text := upper(trim(coalesce(p_code, '')));
  v_name     text := trim(coalesce(p_name, ''));
  v_country  text := trim(coalesce(p_country, ''));
  v_blocked  jsonb;
  v_status   public.pp_referral_status := 'applied';
  v_note     text;
  v_masked   text;
begin
  -- 1. authenticate
  select value #>> '{}' into v_expected from pp_settings where key = 'referral_secret_sha256';
  if v_expected is null or encode(digest(coalesce(p_secret, ''), 'sha256'), 'hex') <> v_expected then
    return jsonb_build_object('status', 'unauthorized');
  end if;

  if v_email = '' or v_code = '' or coalesce(p_submission_id, '') = '' then
    return jsonb_build_object('status', 'invalid');
  end if;

  -- 2. idempotency
  if exists (select 1 from pp_referrals where submission_id = p_submission_id) then
    return jsonb_build_object('status', 'duplicate');
  end if;

  -- 3. partner must exist and be approved
  select id, name, email, code into v_partner
    from pp_partners
   where upper(code) = v_code and status = 'approved'
   limit 1;
  if not found then
    return jsonb_build_object('status', 'ignored');
  end if;

  -- 4. one referral per client (first partner wins)
  if exists (select 1 from pp_referrals where lower(client_email) = v_email) then
    return jsonb_build_object('status', 'duplicate');
  end if;

  -- 5. blocked countries (codes from pp_settings + full names used by the form)
  select value into v_blocked from pp_settings where key = 'blocked_countries';
  if v_country in ('Russia', 'Russian Federation', 'North Korea')
     or (v_blocked is not null and v_blocked ? upper(v_country)) then
    v_status := 'rejected';
    v_note := 'Blocked country: ' || v_country;
  end if;

  -- 6. insert
  begin
    insert into pp_referrals (partner_id, code, source, client_name, client_email, client_country,
                              submission_id, status, rejected_at, self_referral_flag, notes_admin)
    values (v_partner.id, v_partner.code, 'form_code', v_name, v_email, v_country,
            p_submission_id, v_status,
            case when v_status = 'rejected' then now() end,
            lower(v_partner.email) = v_email, v_note);
  exception when unique_violation then
    return jsonb_build_object('status', 'duplicate');
  end;

  -- masked client name for the partner e-mail ("J. Novak")
  if position(' ' in v_name) = 0 then
    v_masked := left(v_name, 1) || '.';
  else
    v_masked := left(v_name, 1) || '. ' || regexp_replace(v_name, '^.*\s', '');
  end if;

  return jsonb_build_object(
    'status', 'created',
    'referral_status', v_status,
    'partner_name', v_partner.name,
    'partner_email', v_partner.email,
    'masked_name', v_masked
  );
end;
$$;

revoke all on function public.pp_register_referral(text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.pp_register_referral(text, text, text, text, text, text) to anon, service_role;
