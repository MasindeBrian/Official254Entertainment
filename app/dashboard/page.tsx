"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/";
      return;
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
      window.location.href = "/";
      return;
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-black mb-4">
          ADMIN HUB
        </h1>

        <p className="text-gray-400 mb-12 text-lg">
          Manage your store operations.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="/admin"
            className="bg-white text-black rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold mb-2">
              Products
            </h2>

            <p className="text-gray-500">
              Add, edit, delete products
            </p>
          </a>

          <a
            href="/admin-orders"
            className="bg-white text-black rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold mb-2">
              Orders
            </h2>

            <p className="text-gray-500">
              View customer orders
            </p>
          </a>

          <button
            onClick={logout}
            className="bg-white text-black rounded-3xl p-8 text-left"
          >
            <h2 className="text-3xl font-bold mb-2">
              Logout
            </h2>

            <p className="text-gray-500">
              Sign out securely
            </p>
          </button>
        </div>
      </div>
    </main>
  );
}