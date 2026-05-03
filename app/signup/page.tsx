"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function handleSignup() {
    setLoading(true);
    setMessage("");

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase
        .from("profiles")
        .insert([
          {
            id: data.user.id,
            role: "customer",
          },
        ]);
    }

    setMessage(
      "Account created successfully."
    );

    setLoading(false);
  }

  return (
    <main className="premium-page min-h-screen flex items-center justify-center px-6 py-10">
      <div className="premium-card w-full max-w-md rounded-3xl p-8">
        <p className="eyebrow mb-3">
          JOIN THE MOVEMENT
        </p>

        <h1 className="text-4xl font-black tracking-tight mb-8">
          Create Account
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
            className="premium-input w-full rounded-full px-5 py-4"
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
            className="premium-input w-full rounded-full px-5 py-4"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="premium-btn w-full py-4 rounded-full font-semibold"
          >
            {loading
              ? "Creating..."
              : "Sign Up"}
          </button>

          {message && (
            <p className="text-sm text-center text-gray-600">
              {message}
            </p>
          )}

          <a
            href="/login"
            className="block text-center text-sm premium-subtle hover:text-black"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </main>
  );
}
