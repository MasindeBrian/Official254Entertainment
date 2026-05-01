export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import HomeShell from "../components/homeshell";

export default async function ShopPage() {
  const { data: products } =
    await supabase
      .from("products")
      .select("*")
      .order("id", {
        ascending: false,
      });

  return (
    <HomeShell
      products={products || []}
    />
  );
}