alter table public.products
add column if not exists stock_quantity integer;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'products_stock_quantity_nonnegative'
  ) then
    alter table public.products
    add constraint products_stock_quantity_nonnegative
    check (stock_quantity is null or stock_quantity >= 0);
  end if;
end $$;
