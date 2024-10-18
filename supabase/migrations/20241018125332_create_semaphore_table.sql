create table public.semaphore (
  id uuid not null references auth.users on delete cascade,
  private_key text not null,
  primary key (id)
);
alter table
  public.semaphore enable row level security;
comment on table public.semaphore is 'users'' semaphore private keys'
