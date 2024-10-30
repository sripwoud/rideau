create type question_type as enum ('boolean', 'text', 'number', 'option');
create table public.questions (
  id bigint generated always as identity primary key,
  active boolean not null default true,
  author text not null,
  created_at timestamptz not null default now(),
  group_id text not null,
  -- TODO allow list of groupIds? Build dynamically union of groups on the fly in bandada?
  options text [] default null,
  type question_type not null,
  title text not null
);
comment on table public.questions is 'Questions for users to give feedback on';
comment on column public.questions.group_id is 'Id of the Bandada Semaphore Group that restrict who can see and answer this question';
comment on column public.questions.type is 'List of possible feedback values (for option question type only)';
