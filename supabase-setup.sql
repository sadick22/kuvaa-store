-- Run this in Supabase SQL Editor

-- PRODUCTS TABLE
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null check (category in ('Women','Men','Kids')),
  price numeric not null,
  original_price numeric,
  description text,
  sizes text[] default '{}',
  images text[] default '{}',
  is_featured boolean default false,
  is_new boolean default true,
  is_active boolean default true,
  discount_percent integer default 0,
  stock integer default 0,
  created_at timestamp with time zone default now()
);

-- ORDERS TABLE
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address text,
  items jsonb not null default '[]',
  subtotal numeric not null default 0,
  shipping_cost numeric not null default 0,
  total numeric not null default 0,
  payment_method text not null default 'mpesa',
  payment_status text not null default 'pending',
  order_status text not null default 'processing',
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table products enable row level security;
alter table orders enable row level security;

-- Allow anyone to READ products (shop is public)
create policy "Public can view active products"
  on products for select
  using (is_active = true);

-- Allow authenticated users (admin) to do everything
create policy "Admin full access to products"
  on products for all
  using (auth.role() = 'authenticated');

-- Allow anyone to INSERT orders (checkout)
create policy "Anyone can place orders"
  on orders for insert
  with check (true);

-- Only admin can view/update orders
create policy "Admin can manage orders"
  on orders for all
  using (auth.role() = 'authenticated');
