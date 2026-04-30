"use client";

import { useState } from "react";
import StoreFront from "./StoreFront";
import { useCart } from "./CartContext";

export default function HomeShell({
  products,
}: {
  products: any[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const { cart } = useCart();

  function chooseCategory(cat: string) {
    setSelectedCategory(cat);
    setOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-black">
            254Entertainment
          </h1>

          <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
            <a href="#top">Home</a>

            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
              >
                Collections
              </button>

              {open && (
                <div className="absolute top-8 left-0 bg-white shadow-xl border rounded-2xl p-3 w-40 z-50">
                  {["All", "Men", "Women", "Unisex"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => chooseCategory(cat)}
                      className="block w-full text-left py-2 hover:bg-gray-100 rounded-lg px-2"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#shop">Shop</a>

            <a
              href="/cart"
              className="font-semibold"
            >
              Cart ({cart.length})
            </a>

            <a href="#contact">Contact</a>
          </nav>

          <div className="flex gap-3">
            <a
              href="/login"
              className="px-4 py-2 rounded-full border"
            >
              Login
            </a>

            <a
              href="/signup"
              className="px-4 py-2 rounded-full bg-black text-white"
            >
              Sign Up
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <p className="tracking-[0.4em] text-sm text-gray-500 mb-4">
            BORN IN 254
          </p>

          <h2 className="text-6xl md:text-8xl font-black leading-none">
            Own The Street.
          </h2>

          <p className="mt-6 text-gray-500 text-lg">
            Discover premium drops built from culture.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="254Entertainment"
            className="max-w-sm w-full rounded-3xl shadow-xl bg-white p-6"
          />
        </div>
      </section>

      {/* Store */}
      <section id="shop">
        <StoreFront
          products={products}
          selectedCategory={selectedCategory}
        />
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-black text-white py-10 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold">
              254Entertainment
            </h4>

            <p className="text-gray-400 mt-2">
              Born in 254
            </p>
          </div>

          <div className="space-y-2 text-gray-300">
            <p>Instagram</p>
            <p>TikTok</p>
            <p>WhatsApp</p>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-4 text-center text-sm py-3">
        <a href="#top">Home</a>
        <a href="#shop">Shop</a>
        <a href="/cart">Cart</a>
        <a href="#contact">Contact</a>
      </div>
    </main>
  );
}