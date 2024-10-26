create table public.roots (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  group_id text unique not null,
  root text not null
);
comment on table public.roots is 'Sempahore group roots';
comment on column public.roots.group_id is 'Corresponding Bandada group id';
comment on column public.roots.root is 'Latest merkle tree root of the group';
