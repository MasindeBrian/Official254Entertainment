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

  const [sidebar, setSidebar] =
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
    setSidebar(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-lg sm:text-2xl font-black"
          >
            254Entertainment
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-sm font-medium items-center">
            <a href="/">Home</a>

            <div className="relative">
              <button
                onClick={() =>
                  setOpen(!open)
                }
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

            <a href="/shop">
              Shop
            </a>

            <a href="/cart">
              Cart ({cartCount})
            </a>

            <a href="/contact">
              Contact
            </a>

            <a href="/login">
              Login
            </a>
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="/cart"
              className="border px-3 py-2 rounded-full text-sm"
            >
              Cart ({cartCount})
            </a>

            <button
              onClick={() =>
                setSidebar(true)
              }
              className="text-2xl"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {sidebar && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute top-0 right-0 h-full w-72 bg-white p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Menu
              </h2>

              <button
                onClick={() =>
                  setSidebar(false)
                }
                className="text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-lg">
              <a
                href="/"
                onClick={() =>
                  setSidebar(false)
                }
                className="block"
              >
                Home
              </a>

              <a
                href="/shop"
                onClick={() =>
                  setSidebar(false)
                }
                className="block"
              >
                Shop
              </a>

              <a
                href="/cart"
                onClick={() =>
                  setSidebar(false)
                }
                className="block"
              >
                Cart ({cartCount})
              </a>

              <a
                href="/contact"
                onClick={() =>
                  setSidebar(false)
                }
                className="block"
              >
                Contact
              </a>

              <a
                href="/login"
                onClick={() =>
                  setSidebar(false)
                }
                className="block"
              >
                Login
              </a>

              <a
                href="/signup"
                onClick={() =>
                  setSidebar(false)
                }
                className="block"
              >
                Sign Up
              </a>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-400 mb-3">
                  Collections
                </p>

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
                    className="block w-full text-left py-2"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
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
              href="/shop"
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

      {/* Products */}
      <StoreFront
        products={products}
        selectedCategory={
          selectedCategory
        }
      />

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-4 md:px-6">
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
    </main>
  );
}