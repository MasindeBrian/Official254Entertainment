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
    setSidebar(false);
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
    {
      name: `Cart (${cartCount})`,
      href: "/cart",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black overflow-x-hidden">
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 px-[5%] py-5 items-center justify-between">
        <a
          href="/"
          className="font-black text-2xl tracking-tight"
        >
          254Entertainment
        </a>

        <nav className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:opacity-60 transition"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur border-b px-4 py-4 flex justify-between items-center">
        <a
          href="/"
          className="font-black text-lg"
        >
          254Entertainment
        </a>

        <button
          onClick={() =>
            setSidebar(true)
          }
          className="text-2xl"
        >
          ☰
        </button>
      </header>

      {/* Mobile Sidebar */}
      {sidebar && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-10">
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

            <div className="space-y-5 text-lg">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setSidebar(false)
                  }
                  className="block"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-6 border-t">
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
      <section className="min-h-[92vh] bg-white grid md:grid-cols-2 gap-10 items-center px-[5%] py-10 md:py-16">
        <div className="order-2 md:order-1">
          <p className="text-xs tracking-[0.35em] text-gray-500 mb-4">
            BORN IN 254
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.95]">
            Own The
            <br />
            Street.
          </h1>

          <p className="mt-6 text-gray-500 text-base md:text-lg max-w-xl">
            Premium drops inspired by
            culture, confidence and
            movement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="/shop"
              className="px-7 py-4 rounded-full bg-black text-white font-semibold text-center hover:-translate-y-1 transition"
            >
              Shop Now
            </a>

            <a
              href="/cart"
              className="px-7 py-4 rounded-full border border-gray-300 font-semibold text-center hover:-translate-y-1 transition"
            >
              View Cart
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <img
            src="/logo.png"
            alt="254Entertainment"
            className="w-full max-w-[420px] rounded-[28px] bg-white p-4 shadow-2xl"
          />
        </div>
      </section>

      {/* Store Section */}
      <section className="py-16">
        <StoreFront
          products={products}
          selectedCategory={
            selectedCategory
          }
        />
      </section>

      {/* Banner */}
      <section className="bg-black text-white text-center px-[5%] py-20">
        <h2 className="text-4xl md:text-6xl font-black">
          254 EXCLUSIVE
        </h2>

        <p className="text-gray-400 mt-4 text-lg">
          Limited pieces. Real culture.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t text-center text-gray-500 px-[5%] py-10">
        © 2026 254Entertainment
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t grid grid-cols-4 text-center text-xs font-bold py-3 z-40">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/cart">
          Cart
        </a>
        <a href="/contact">
          Contact
        </a>
      </nav>
    </main>
  );
}