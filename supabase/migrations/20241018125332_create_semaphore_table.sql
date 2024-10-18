create table public.semaphore (
  id uuid not null references auth.users on delete cascade,
  private_key text not null,
  primary key (id)
);
/* TODO create RLS policy
alter table
 public.semaphore enable row level security;
comment on table public.semaphore is 'users'' semaphore private keys'

-- Allow users to insert their own records
create policy "Users can insert their own semaphore private key"
on public.semaphore for insert
to authenticated
with check ( (select auth.uid()) = id);

-- Allow users to select all records (necessary to batch add members to a new group?)
create policy "Users can view their own semaphore"
on public.semaphore for select
to authenticated
using ( true )

-- Optionally, if you want to allow users to delete their own records
CREATE POLICY "Users can delete their own semaphore" ON public.semaphore
 FOR DELETE USING (auth.uid() = id);
*/
