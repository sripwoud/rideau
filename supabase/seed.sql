set CLIENT_ENCODING TO 'UTF8';
begin;
insert into public.users (email, public_key) values
(
  'alice@example.com',
  '7c1a0e3f4b5c2d9a8e7f6b1d3c5a9e2f4b7c1d8a3f6e9c2b5a7d4f1e8c3b6a9'
),
(
  'bob@example.com',
  '2f4a6b8c1e3d5f7a9c2b4e6d8f1a3c5e7b9d1f3a5c7e9b2d4f6a8c1e3d5f7a'
),
(
  'charlie@example.com',
  '9e1d3f5a7c2b4d6f8a1c3e5b7d9f2a4c6e8b1d3f5a7c2b4e6d8f1a3c5e7b9d'
);
commit;
