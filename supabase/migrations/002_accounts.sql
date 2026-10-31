-- ETAPA 1 (BORRADOR PARA REVISIÓN). No ejecutar en producción antes de backup.
-- Migración aditiva: no borra ni modifica movimientos existentes.
create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 80),
  kind text not null check (kind in ('bank','wallet','cash')),
  currency text not null check (currency in ('ARS','USD')),
  opening_balance numeric(16,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(id,user_id)
);
create index if not exists accounts_user_idx on public.accounts(user_id);
alter table public.accounts enable row level security;
create policy "accounts read own" on public.accounts for select to authenticated using ((select auth.uid())=user_id);
create policy "accounts create own" on public.accounts for insert to authenticated with check ((select auth.uid())=user_id);
create policy "accounts update own" on public.accounts for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "accounts delete own" on public.accounts for delete to authenticated using ((select auth.uid())=user_id);

-- La vinculación de transacciones a cuentas se hará en otra migración probada.
-- Así se evita una modificación prematura de la tabla que contiene gastos reales.
