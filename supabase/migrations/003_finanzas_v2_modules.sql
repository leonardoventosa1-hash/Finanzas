-- FINANZAS V2: borrador aditivo. NO ejecutar sin copia de seguridad y pruebas de RLS.
-- Independiente de cuentas: no modifica ni elimina transactions ni categories.
create table public.credit_cards (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(trim(name)) between 1 and 80),
 issuer text,
 currency text not null default 'ARS' check (currency in ('ARS','USD')),
 closing_day integer not null check (closing_day between 1 and 31),
 due_day integer not null check (due_day between 1 and 31),
 credit_limit numeric(16,2) check (credit_limit is null or credit_limit >= 0),
 created_at timestamptz not null default now(),
 unique(id,user_id)
);
create index credit_cards_owner_idx on public.credit_cards(user_id);
alter table public.credit_cards enable row level security;
create policy "credit_cards owner" on public.credit_cards for all to authenticated
 using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create table public.card_purchases (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 card_id uuid not null,
 description text not null check (char_length(trim(description)) between 1 and 120),
 purchase_date date not null default current_date,
 total_amount numeric(16,2) not null check (total_amount > 0),
 installment_count integer not null default 1 check (installment_count between 1 and 120),
 first_statement_month date not null check (extract(day from first_statement_month) = 1),
 created_at timestamptz not null default now(),
 unique(id,user_id),
 foreign key (card_id,user_id) references public.credit_cards(id,user_id) on delete cascade
);
create index card_purchases_owner_card_idx on public.card_purchases(user_id,card_id);
alter table public.card_purchases enable row level security;
create policy "card_purchases owner" on public.card_purchases for all to authenticated
 using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create table public.recurring_expenses (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(trim(name)) between 1 and 120),
 amount numeric(16,2) not null check (amount > 0),
 currency text not null default 'ARS' check (currency in ('ARS','USD')),
 frequency text not null default 'monthly' check (frequency in ('weekly','monthly','yearly')),
 next_due_on date not null,
 is_active boolean not null default true,
 created_at timestamptz not null default now()
);
create index recurring_expenses_owner_due_idx on public.recurring_expenses(user_id,next_due_on);
alter table public.recurring_expenses enable row level security;
create policy "recurring_expenses owner" on public.recurring_expenses for all to authenticated
 using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create table public.savings_goals (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 name text not null check (char_length(trim(name)) between 1 and 100),
 currency text not null default 'ARS' check (currency in ('ARS','USD')),
 target_amount numeric(16,2) not null check (target_amount > 0),
 saved_amount numeric(16,2) not null default 0 check (saved_amount >= 0),
 deadline date,
 created_at timestamptz not null default now()
);
create index savings_goals_owner_idx on public.savings_goals(user_id);
alter table public.savings_goals enable row level security;
create policy "savings_goals owner" on public.savings_goals for all to authenticated
 using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
