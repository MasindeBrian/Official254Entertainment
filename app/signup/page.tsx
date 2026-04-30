"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
          role: "customer",
        },
      ]);
    }

    setMessage("Account created successfully");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md border rounded-3xl p-8 shadow-sm">
        <p className="tracking-[0.4em] text-sm text-gray-500 mb-3">
          BORN IN 254
        </p>

        <h1 className="text-4xl font-black mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-full px-5 py-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-full px-5 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full"
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>

          {message && (
            <p className="text-sm text-center text-gray-600">
              {message}
            </p>
          )}

          <a
            href="/login"
            className="block text-center text-sm underline"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </main>
  );
}