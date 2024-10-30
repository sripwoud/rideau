create table public.feedbacks (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  feedback text not null,
  -- future proof, store all feedbacks for any question type as text, do validation on the application layer
  question_id bigint not null references public.questions(id)
);
comment on table public.feedbacks is 'Feedback semaphore signals from users';
comment on column public.feedbacks.feedback is 'Feedback semaphore signal (only boolean answer supported for now)';
--
create type boolean_feedback as enum ('yes', 'no');
create type boolean_feedbacks_count as (yes integer, no integer);

create or replace function count_boolean_feedbacks(question_id bigint)
returns boolean_feedbacks_count
language plpgsql
as $$
declare result boolean_feedbacks_count;
begin
  select
    coalesce(sum(case when feedback::boolean_feedback = 'yes' then 1 else 0 end), 0) as yes,
    coalesce(sum(case when feedback::boolean_feedback = 'no' then 1 else 0 end), 0) as no
  into result
  from public.feedbacks
  where question_id = $1;
  return result;
end;
$$;
