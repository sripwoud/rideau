create table public.feedbacks (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  feedback boolean not null,
  question_id bigint not null references public.questions(id)
);
comment on table public.feedbacks is 'Feedback semaphore signals from users';
comment on column public.feedbacks.feedback is 'Feedback semaphore signal (only boolean answer supported for now)';

create function tally()
returns trigger
language plpgsql
as $$
begin
    if new.feedback then
       update public.questions
       set yes = yes + 1
       where id = new.question_id;
    else
        update public.questions
        set no = no + 1
        where id = new.question_id;
    end if;
    return new;
end;
$$;

create trigger tally_trigger
after
insert on public.feedbacks
for each row
execute function tally();
