"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  async function checkAuth() {
    const publicRoutes = [
  "/",
  "/login",
  "/signup",
];
    if (
      publicRoutes.includes(
        pathname
      )
    ) {
      setLoading(false);
      return;
    }

    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    if (!session) {
      window.location.href =
        "/login";
      return;
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f8f8f8] text-black font-bold text-xl">
        Loading...
      </main>
    );
  }

  return <>{children}</>;
}