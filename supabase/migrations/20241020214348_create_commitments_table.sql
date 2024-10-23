create table public.commitments (
  id bigint generated always as identity primary key,
  email varchar(255) unique not null,
  commitment text unique not null,
  constraint validEmail check (
    email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'
  )
);
comment on table public.commitments is 'Semaphore identity commitments of the users who have logged in at least once';
comment on column public.commitments.commitment is 'Semaphore identity commitment aka Bandada''s memberId';
