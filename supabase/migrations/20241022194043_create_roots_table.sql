create table public.roots (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  group_id text not null,
  root text not null,
  unique (group_id, root)
);
comment on table public.roots is 'Sempahore group roots';
comment on column public.roots.group_id is 'Corresponding Bandada group id';
comment on column public.roots.root is 'Merkle tree root history of the group';
