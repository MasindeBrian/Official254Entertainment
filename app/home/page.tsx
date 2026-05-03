"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <main className="premium-page min-h-screen text-black pt-20 pb-24 md:pb-0">
      <header className="premium-header fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() =>
              setMenuOpen(true)
            }
            className="secondary-btn md:hidden text-sm font-bold w-16 h-10 rounded-full"
          >
            Menu
          </button>

          <h1 className="text-lg md:text-3xl font-black tracking-tight">
            254{" "}
            <span className="brand-pill px-3 py-1">
              ENTERTAINMENT
            </span>
          </h1>

          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="premium-subtle hover:text-black transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={logout}
            className="secondary-btn hidden md:block px-5 py-3 rounded-full text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm">
          <div className="premium-card h-full w-72 p-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black">
                Menu
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="secondary-btn h-10 w-16 rounded-full text-sm font-bold"
              >
                Close
              </button>
            </div>

            <div className="space-y-5 font-semibold">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                >
                  {link.name}
                </a>
              ))}

              <button
                type="button"
                onClick={logout}
                className="secondary-btn mt-4 w-full rounded-full px-5 py-3 text-left font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 pt-14 pb-20 grid md:grid-cols-2 gap-8 items-center min-h-[85vh]">
        <div className="premium-card rounded-[2rem] p-8 md:p-12 transition-all duration-300">
          <p className="eyebrow mb-4">
            BORN IN 254
          </p>

          <h2 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tight">
            Own The Street.
          </h2>

          <p className="mt-6 text-lg premium-subtle max-w-md">
            Premium streetwear built from culture and confidence.
          </p>

          <div className="mt-8">
            <a
              href="/shop"
              className="premium-btn inline-flex px-7 py-3 rounded-full font-semibold"
            >
              Shop Now
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="premium-card rounded-[2rem] p-8 w-full max-w-sm transition-all duration-300">
            <img
              src="/logo.png"
              alt="254Entertainment"
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
