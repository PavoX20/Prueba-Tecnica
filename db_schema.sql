-- 1. Crear la tabla de productos

create table public.products (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  name text not null,
  description text null,
  price numeric not null, -- Usamos numeric para dinero, evita float por precisión
  user_id uuid not null references auth.users(id) on delete cascade, -- Relación con el usuario de Supabase
  
  constraint products_pkey primary key (id),
  constraint price_positive check (price >= 0)
);

-- 2. Habilitar Row Level Security (RLS)

alter table public.products enable row level security;

-- 3. Crear Políticas de Seguridad (Policies)

create policy "Los usuarios pueden ver sus propios productos"
on public.products for select
to authenticated
using (auth.uid() = user_id);

create policy "Los usuarios pueden crear productos"
on public.products for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Los usuarios pueden actualizar sus propios productos"
on public.products for update
to authenticated
using (auth.uid() = user_id);

create policy "Los usuarios pueden eliminar sus propios productos"
on public.products for delete
to authenticated
using (auth.uid() = user_id);