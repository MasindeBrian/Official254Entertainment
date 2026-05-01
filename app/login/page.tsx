"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function handleLogin() {
    setLoading(true);
    setMessage("");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const userId =
      data.user.id;

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

    if (
      profile?.role ===
      "admin"
    ) {
      window.location.href =
        "/dashboard";
    } else {
      window.location.href =
        "/";
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white border rounded-3xl p-8 shadow-sm">
        <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
          WELCOME BACK
        </p>

        <h1 className="text-4xl font-black mb-8">
          Login
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full border rounded-full px-5 py-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border rounded-full px-5 py-4"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-full font-semibold"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

          {message && (
            <p className="text-sm text-center text-red-500">
              {message}
            </p>
          )}

          <a
            href="/signup"
            className="block text-center text-sm text-gray-500 hover:text-black"
          >
            New here? Create account
          </a>
        </div>
      </div>
    </main>
  );
}