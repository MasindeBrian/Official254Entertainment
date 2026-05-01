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

  const navLinks = [
    { name: "Home", href: "/" },
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
    <main className="min-h-screen bg-[#f8f8f8] text-black pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() =>
              setMenuOpen(true)
            }
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <a
            href="/"
            className="text-lg md:text-3xl font-black"
          >
            254{" "}
            <span className="bg-black text-white px-3 py-1 rounded-lg">
              ENTERTAINMENT
            </span>
          </a>

          <nav className="hidden md:flex gap-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Cart Button */}
         {/* Cart Icon */}
<button
  onClick={() =>
    setCartOpen(true)
  }
  className="relative text-2xl"
>
  🛒

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="bg-white w-72 h-full p-6">
            <div className="flex justify-between mb-8">
              <h2 className="font-black text-xl">
                MENU
              </h2>

              <button
                onClick={() =>
                  setMenuOpen(false)
                }
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
              <p className="text-sm text-gray-400 mb-3">
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
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-black">
                Your Cart
              </h2>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
                className="text-2xl"
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
                    className="border rounded-2xl p-4"
                  >
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="w-8 h-8 border rounded-full"
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
                        className="w-8 h-8 border rounded-full"
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

            <div className="p-6 border-t">
              <div className="flex justify-between font-bold text-xl mb-4">
                <span>Total</span>
                <span>
                  KSh {total.toLocaleString()}
                </span>
              </div>

              <a
                href="/checkout"
                className="block w-full bg-black text-white py-4 rounded-full text-center font-semibold"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="tracking-[0.35em] text-xs text-gray-500 mb-4">
            BORN IN 254
          </p>

          <h1 className="text-5xl md:text-8xl font-black leading-[0.92]">
            Own The
            <br />
            Street.
          </h1>

          <p className="mt-6 text-lg text-gray-500">
            Premium drops inspired by culture,
            confidence and movement.
          </p>

          <div className="mt-8">
            <a
              href="/shop"
              className="px-7 py-3 bg-black text-white rounded-full font-semibold"
            >
              Shop Now
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-[2rem] p-8 border shadow-sm w-full max-w-sm">
            <img
              src="/logo.png"
              alt="254Entertainment"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Store */}
      <StoreFront
        products={products}
        selectedCategory={
          selectedCategory
        }
      />

      {/* Footer */}
      <footer className="bg-black text-white text-center py-10 mt-12">
        © 2026 254 ENTERTAINMENT
      </footer>
    </main>
  );
}