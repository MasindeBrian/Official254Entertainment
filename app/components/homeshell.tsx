"use client";

import { useState } from "react";
import StoreFront from "./StoreFront";
import { useCart } from "./CartContext";
import { supabase } from "@/lib/supabase";

export default function HomeShell({
  products,
}: {
  products: any[];
}) {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartOpen, setCartOpen] =
    useState(false);

  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const cartCount = cart.reduce(
    (sum: number, item: any) =>
      sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum: number, item: any) => {
      const price = parseFloat(
        String(item.price).replace(/[^\d.]/g, "")
      );

      return (
        sum +
        (isNaN(price)
          ? 0
          : price * item.quantity)
      );
    },
    0
  );

  function chooseCategory(cat: string) {
    setSelectedCategory(cat);
    setMenuOpen(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "Contact", href: "/contact" },
  ];

  const categories = [
    "All",
    "Men",
    "Women",
    "Unisex",
  ];

  return (
    <main className="premium-page min-h-screen text-black pt-20 pb-20 md:pb-0">
      {/* Header */}
      <header className="premium-header fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-3">

          {/* Mobile Menu */}
          <button
            onClick={() =>
              setMenuOpen(true)
            }
            className="secondary-btn md:hidden text-2xl w-10 h-10 rounded-full flex items-center justify-center"
          >
            ☰
          </button>

          {/* Logo */}
          <a
            href="/home"
            className="text-sm sm:text-lg md:text-3xl font-black whitespace-nowrap tracking-tight"
          >
            254{" "}
            <span className="brand-pill px-2 md:px-3 py-1">
              ENTERTAINMENT
            </span>
          </a>

          {/* Desktop Nav */}
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

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="secondary-btn px-5 py-3 rounded-full text-sm font-semibold"
            >
              Logout
            </button>

            <button
              onClick={() =>
                setCartOpen(true)
              }
              className="secondary-btn relative flex items-center justify-center w-11 h-11 rounded-full active:scale-95 transition-all shrink-0"
            >
              <span className="text-xl">
                🛒
              </span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5b1f2f] text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm">
          <div className="premium-card w-72 h-full p-6">
            <div className="flex justify-between mb-8">
              <h2 className="font-black text-xl">
                MENU
              </h2>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
                className="secondary-btn w-10 h-10 rounded-full text-xl"
              >
                ✕
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
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-sm premium-subtle mb-3">
                Categories
              </p>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    chooseCategory(cat)
                  }
                  className="block py-2 w-full text-left"
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={logout}
              className="secondary-btn mt-8 w-full rounded-full px-5 py-3 text-left font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-full max-w-md premium-card shadow-2xl flex flex-col">

            <div className="p-6 border-b border-black/10 flex justify-between items-center">
              <h2 className="text-2xl font-black">
                Your Cart
              </h2>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
                className="secondary-btn w-10 h-10 rounded-full text-xl hover:scale-105 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white/70 border border-black/5 p-4 shadow-sm"
                  >
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="premium-subtle text-sm">
                      {item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="secondary-btn w-8 h-8 rounded-full"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="secondary-btn w-8 h-8 rounded-full"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="ml-auto text-sm text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-black/10">
              <div className="flex justify-between font-bold text-xl mb-4">
                <span>Total</span>
                <span>
                  KSh {total.toLocaleString()}
                </span>
              </div>

              <a
                href="/checkout"
                className="premium-btn block w-full py-4 rounded-full text-center font-semibold"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
        <div className="premium-card rounded-[2rem] p-8 md:p-12 transition-all duration-300">
          <p className="eyebrow mb-4">
            BORN IN 254
          </p>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.92] tracking-tight">
            Own The
            <br />
            Street.
          </h1>

          <p className="mt-6 text-lg premium-subtle max-w-xl">
            Premium drops inspired by culture,
            confidence and movement.
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
              className="w-full"
            />
          </div>
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
      <footer className="bg-[#14110f] text-white text-center py-10 mt-12">
        © 2026 254 ENTERTAINMENT
      </footer>
    </main>
  );
}
