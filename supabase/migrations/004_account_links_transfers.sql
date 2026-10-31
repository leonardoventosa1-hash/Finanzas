-- FINANZAS V2 / PROPUESTA. NO EJECUTAR EN PRODUCCIÓN SIN BACKUP Y TESTS.
-- Requiere 002_accounts.sql. No borra ni reclasifica transacciones anteriores.
alter table public.transactions add column if not exists account_id uuid;
alter table public.transactions add constraint transactions_account_owner_fk
 foreign key (account_id,user_id) references public.accounts(id,user_id);
create index if not exists transactions_account_user_idx on public.transactions(user_id,account_id,occurred_on);

-- Las transferencias son operaciones separadas; no se cuentan como ingresos ni gastos.
create table public.account_transfers (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 source_account_id uuid not null,
 destination_account_id uuid not null,
 amount numeric(16,2) not null check(amount>0),
 occurred_on date not null default current_date,
 description text not null default '',
 created_at timestamptz not null default now(),
 check(source_account_id<>destination_account_id),
 foreign key(source_account_id,user_id) references public.accounts(id,user_id),
 foreign key(destination_account_id,user_id) references public.accounts(id,user_id)
);
create index account_transfers_user_date_idx on public.account_transfers(user_id,occurred_on desc);
alter table public.account_transfers enable row level security;
create policy "account_transfers owner" on public.account_transfers for all to authenticated
 using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

-- Advertencia: no hay conversión de moneda en este esquema.
-- La aplicación debe validar moneda igual para origen y destino antes de escribir.
-- Saldos por cuenta = opening_balance + ingresos - gastos + transferencias recibidas - enviadas.
-- account_id NULL mantiene todas las operaciones históricas sin cuenta asignada.
