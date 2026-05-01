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
      window.location.href =
        "/login";
      return;
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
      profile?.role !==
      "admin"
    ) {
      window.location.href =
        "/";
      return;
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href =
      "/login";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center text-2xl font-bold">
        Loading...
      </main>
    );
  }

  const cards = [
    {
      title: "Products",
      desc: "Add, edit and manage store inventory.",
      link: "/admin",
      icon: "🛍️",
    },
    {
      title: "Orders",
      desc: "Track and manage customer orders.",
      link: "/admin-orders",
      icon: "📦",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
          ADMIN PANEL
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-black">
              Control Hub
            </h1>

            <p className="text-gray-500 mt-3">
              Manage your store operations.
            </p>
          </div>

          <button
            onClick={logout}
            className="border px-6 py-3 rounded-full font-semibold bg-white"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.link}
              className="bg-white border rounded-3xl p-8 hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">
                {card.icon}
              </div>

              <h2 className="text-3xl font-black mb-2">
                {card.title}
              </h2>

              <p className="text-gray-500">
                {card.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}