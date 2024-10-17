-- TODO: refine type of email and public_key
create table users (
    id bigint primary key generated always as identity,
    email varchar(255) not null,
    public_key char(64) not null, -- or is bytea more appropriate?
    created_at timestamptz not null default now()
    -- updated_at timestamptz not null default now()
);
