create table public.roots (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  root text not null
);
comment on table public.roots is 'Sempahore group roots';
comment on column public.roots.root is 'Semaphore group root';
