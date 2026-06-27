-- TATICO - Schema do Banco de Dados
-- Modelo orientado a integracoes e configuracao MCP

create table if not exists offices (
  id                            uuid default gen_random_uuid() primary key,
  name                          text not null,
  owner_id                      uuid references auth.users not null,
  api_key                       text unique not null default 'sk-tatico-' || replace(gen_random_uuid()::text, '-', ''),
  google_calendar_access_token  text,
  google_calendar_refresh_token text,
  google_calendar_id            text default 'primary',
  google_drive_access_token     text,
  google_drive_refresh_token    text,
  google_drive_root_folder_id   text,
  advbox_token                  text,
  escavador_token               text,
  zapsign_token                 text,
  asaas_token                   text,
  last_used_at                  timestamp with time zone,
  request_count                 integer default 0,
  created_at                    timestamp with time zone default now(),
  updated_at                    timestamp with time zone default now()
);

create table if not exists mcp_logs (
  id          uuid default gen_random_uuid() primary key,
  office_id   uuid references offices(id) on delete cascade,
  tool_name   text,
  duration_ms integer,
  error       text,
  created_at  timestamp with time zone default now()
);

create index if not exists idx_mcp_logs_office on mcp_logs(office_id);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists offices_updated_at on offices;
create trigger offices_updated_at
  before update on offices
  for each row execute function update_updated_at();

create or replace function regenerate_api_key(office_id_input uuid)
returns text as $$
declare
  new_key text;
begin
  new_key := 'sk-tatico-' || replace(gen_random_uuid()::text, '-', '');
  update offices set api_key = new_key where id = office_id_input;
  return new_key;
end;
$$ language plpgsql security definer;

alter table offices enable row level security;
alter table mcp_logs enable row level security;

drop policy if exists "offices_owner" on offices;
create policy "offices_owner" on offices
  for all using (auth.uid() = owner_id);

drop policy if exists "mcp_logs_service" on mcp_logs;
create policy "mcp_logs_service" on mcp_logs
  for all using (false);
