create extension if not exists pgcrypto;

-- =========================
-- raw tables
-- =========================

create table if not exists jmty_raw_posts (
  id uuid primary key default gen_random_uuid(),
  source_post_id text unique,
  source_url text not null,
  title text,
  raw_json jsonb not null,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists sports_team_raw (
  id uuid primary key default gen_random_uuid(),
  source_post_id text unique,
  source_url text not null,
  title text,
  raw_json jsonb not null,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists circlebook_raw_circles (
  id uuid primary key default gen_random_uuid(),
  source_post_id text unique,
  source_url text not null,
  title text,
  raw_json jsonb not null,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists labola_individual_raw (
  id uuid primary key default gen_random_uuid(),
  source_post_id text unique,
  source_url text not null,
  title text,
  raw_json jsonb not null,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists labola_community_raw (
  id uuid primary key default gen_random_uuid(),
  source_post_id text unique,
  source_url text not null,
  title text,
  raw_json jsonb not null,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- =========================
-- unified public tables
-- =========================

create table if not exists event_hosts (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_host_id text,
  name text not null,
  url text,
  area text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_type, source_host_id)
);

create table if not exists event_occurrences (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references event_hosts(id) on delete cascade,
  title text not null,
  event_date date not null,
  start_time time,
  end_time time,
  area text not null,
  venue_name text,
  participation_type text not null check (participation_type in ('spot', 'regular')),
  fee_yen integer check (fee_yen is null or fee_yen >= 0),
  source_site text not null,
  source_url text not null,
  status text not null default 'published' check (status in ('draft', 'published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_event_occurrences_event_date
  on event_occurrences (event_date);

create index if not exists idx_event_occurrences_area
  on event_occurrences (area);

create index if not exists idx_event_occurrences_participation_type
  on event_occurrences (participation_type);

create index if not exists idx_event_occurrences_fee_yen
  on event_occurrences (fee_yen);

-- =========================
-- RLS
-- =========================

alter table jmty_raw_posts enable row level security;
alter table sports_team_raw enable row level security;
alter table circlebook_raw_circles enable row level security;
alter table labola_individual_raw enable row level security;
alter table labola_community_raw enable row level security;
alter table event_hosts enable row level security;
alter table event_occurrences enable row level security;

-- raw tables: no public policy
-- event_hosts: public read OK
create policy "public can read event_hosts"
on event_hosts
for select
to anon
using (true);

-- event_occurrences: only published rows are public
create policy "public can read published event_occurrences"
on event_occurrences
for select
to anon
using (status = 'published');