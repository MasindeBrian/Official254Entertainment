"use client";

import { useState } from "react";
import { useCart } from "../components/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

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

  function whatsappLink() {
    const items = cart
      .map(
        (item: any) =>
          `${item.name} x${item.quantity}`
      )
      .join("\n");

    const msg =
      `NEW ORDER - 254 ENTERTAINMENT\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Location: ${location}\n\n` +
      `Items:\n${items}\n\n` +
      `Total: KSh ${total}`;

    return `https://wa.me/254757900428?text=${encodeURIComponent(
      msg
    )}`;
  }

  async function placeOrder() {
    if (cart.length === 0) {
      setMessage(
        "Your cart is empty."
      );
      return;
    }

    if (!name || !phone || !location) {
      setMessage(
        "Fill all required fields."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } =
      await supabase
        .from("orders")
        .insert([
          {
            customer_name:
              name,
            phone,
            location,
            items: cart,
            total: `KSh ${total}`,
          },
        ]);

    if (error) {
      setMessage(
        error.message
      );
      setLoading(false);
      return;
    }

    localStorage.removeItem(
      "cart"
    );

    window.open(
      whatsappLink(),
      "_blank"
    );

    window.location.href =
      "/";
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-3xl border p-8 shadow-sm">
          <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
            CHECKOUT
          </p>

          <h1 className="text-4xl md:text-6xl font-black mb-8">
            Complete Order
          </h1>

          <div className="space-y-4">
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full border rounded-full px-6 py-4"
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full border rounded-full px-6 py-4"
            />

            <input
              placeholder="Delivery Location"
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              className="w-full border rounded-full px-6 py-4"
            />

            <button
              onClick={placeOrder}
              disabled={
                loading ||
                cart.length === 0
              }
              className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : cart.length === 0
                ? "Cart Empty"
                : "Order via WhatsApp"}
            </button>

            {message && (
              <p className="text-sm text-center text-red-500">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl border p-8 shadow-sm">
          <h2 className="text-3xl font-black mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-8">
            {cart.length === 0 ? (
              <p className="text-gray-500">
                No items in cart.
              </p>
            ) : (
              cart.map(
                (item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {
                          item.name
                        }
                      </p>

                      <p className="text-sm text-gray-400">
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>
                    </div>

                    <span className="font-semibold">
                      {
                        item.price
                      }
                    </span>
                  </div>
                )
              )
            )}
          </div>

          <div className="border-t pt-6 flex justify-between text-2xl font-black">
            <span>Total</span>

            <span>
              KSh{" "}
              {total.toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-5">
            Secure order handling.
          </p>
        </div>
      </div>
    </main>
  );
}