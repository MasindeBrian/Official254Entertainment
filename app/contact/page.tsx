"use client";

import { supabase } from "@/lib/supabase";

export default function ContactPage() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main className="premium-page min-h-screen text-black pt-20">
      <header className="premium-header fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-black tracking-tight">
            254Entertainment
          </h1>

          <nav className="hidden md:flex gap-6 text-sm font-medium premium-subtle">
            <a href="/home">Home</a>
            <a href="/shop">Shop</a>
            <a href="/contact">Contact</a>
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

      <section className="max-w-4xl mx-auto px-6 py-20">
        <p className="eyebrow mb-4">
          CONTACT
        </p>

        <h1 className="text-5xl font-black tracking-tight mb-6">
          Let's Talk.
        </h1>

        <p className="text-lg premium-subtle mb-10">
          Questions, custom orders, wholesale,
          support or delivery inquiries.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="https://wa.me/254757900428"
            target="_blank"
            className="premium-card rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-2">
              WhatsApp
            </h2>

            <p className="premium-subtle">
              Chat instantly with us
            </p>
          </a>

          <a
            href="mailto:brian.masinde2023@students.jkuat.ac.ke"
            className="premium-card rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-2">
              Email
            </h2>

            <p className="premium-subtle">
              Send us a message
            </p>
          </a>

          <div className="premium-card rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-2">
              Delivery
            </h2>

            <p className="premium-subtle">
              Nairobi & countrywide available
            </p>
          </div>

          <div className="premium-card rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-2">
              Hours
            </h2>

            <p className="premium-subtle">
              Mon - Sat / 9AM - 7PM
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
