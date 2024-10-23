create table public.nullifiers (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  nullifier text not null
);
comment on table public.nullifiers is 'Nullifiers of semaphore proofs to prevent double signaling';
comment on column public.nullifiers.nullifier is 'Nullifier hash of a semaphore proof';
