"use client";

import { useState } from "react";
import { useCart } from "../components/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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

  async function placeOrder() {
    if (!name || !phone || !location) {
      setMessage("Fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: name,
          phone,
          location,
          items: cart,
          total: `KSh ${total}`,
        },
      ]);

    if (error) {
      setMessage(error.message);
    } else {
      localStorage.removeItem("cart");
      window.location.href = "/";

      alert("Order placed successfully!");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black p-6 md:p-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h1 className="text-5xl font-black mb-8">
            Checkout
          </h1>

          <div className="space-y-4">
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border px-5 py-4 rounded-full"
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border px-5 py-4 rounded-full"
            />

            <input
              placeholder="Delivery Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="w-full border px-5 py-4 rounded-full"
            />

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-full text-lg"
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

            {message && (
              <p className="text-center text-sm">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-8">
            {cart.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.name} x
                  {item.quantity}
                </span>

                <span>{item.price}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-6 flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>
              KSh {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}