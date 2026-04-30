"use client";

import { useState } from "react";
import StoreFront from "./StoreFront";
import { useCart } from "./CartContext";

export default function HomeShell({
  products,
}: {
  products: any[];
}) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [open, setOpen] =
    useState(false);

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (sum: number, item: any) =>
      sum + item.quantity,
    0
  );

  function chooseCategory(cat: string) {
    setSelectedCategory(cat);
    setOpen(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-3">
          <h1 className="text-lg sm:text-2xl font-black leading-tight">
            254Entertainment
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
            <a href="#top">Home</a>

            <div className="relative">
              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="cursor-pointer"
              >
                Collections
              </button>

              {open && (
                <div className="absolute top-8 left-0 bg-white shadow-xl border rounded-2xl p-3 w-40 z-50">
                  {[
                    "All",
                    "Men",
                    "Women",
                    "Unisex",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        chooseCategory(cat)
                      }
                      className="block w-full text-left py-2 hover:bg-gray-100 rounded-lg px-2"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href="#shop">Shop</a>

            <a href="/cart">
              Cart ({cartCount})
            </a>

            <a href="#contact">
              Contact
            </a>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex gap-3">
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

          {/* Mobile Cart */}
          <a
            href="/cart"
            className="md:hidden text-sm border px-4 py-2 rounded-full"
          >
            Cart ({cartCount})
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="text-center md:text-left order-2 md:order-1">
          <p className="tracking-[0.35em] text-xs sm:text-sm text-gray-500 mb-4">
            BORN IN 254
          </p>

          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-none">
            Own The Street.
          </h2>

          <p className="mt-5 text-gray-500 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
            Discover premium drops built from culture.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="#shop"
              className="px-6 py-3 rounded-full bg-black text-white"
            >
              Shop Now
            </a>

            <a
              href="/cart"
              className="px-6 py-3 rounded-full border"
            >
              View Cart
            </a>
          </div>
        </div>

        <div className="flex justify-center order-1 md:order-2">
          <img
            src="/logo.png"
            alt="254Entertainment"
            className="w-52 sm:w-72 md:max-w-sm rounded-3xl shadow-xl bg-white p-4 md:p-6"
          />
        </div>
      </section>

      {/* Store */}
      <section id="shop">
        <StoreFront
          products={products}
          selectedCategory={
            selectedCategory
          }
        />
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-black text-white py-10 px-4 md:px-6 pb-24 md:pb-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold">
              254Entertainment
            </h4>

            <p className="text-gray-400 mt-2">
              Born in 254
            </p>
          </div>

          <div className="space-y-2 text-gray-300 text-center md:text-right">
            <p>Instagram</p>
            <p>TikTok</p>
            <p>WhatsApp</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-4 text-center text-xs py-3 z-50">
        <a href="#top">Home</a>
        <a href="#shop">Shop</a>
        <a href="/cart">
          Cart ({cartCount})
        </a>
        <a href="#contact">
          Contact
        </a>
      </div>
    </main>
  );
}