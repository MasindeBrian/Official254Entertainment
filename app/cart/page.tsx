"use client";

import { useCart } from "../components/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

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

  const itemCount = cart.reduce(
    (sum: number, item: any) =>
      sum + item.quantity,
    0
  );

  function whatsappCartLink() {
    const lines = cart.map(
      (item: any) =>
        `${item.name} x${item.quantity} - ${item.price}`
    );

    const msg =
      `Hello, I want to order:\n\n` +
      lines.join("\n") +
      `\n\nTotal: KSh ${total.toLocaleString()}`;

    return `https://wa.me/254757900428?text=${encodeURIComponent(
      msg
    )}`;
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-black p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-5xl font-black">
              Your Cart
            </h1>

            <a
              href="/"
              className="border px-5 py-3 rounded-full"
            >
              Continue Shopping
            </a>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
              <p className="text-xl text-gray-500">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 shadow-sm flex flex-col md:flex-row gap-6 items-center"
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 rounded-2xl"></div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      {item.price}
                    </p>

                    <p className="text-sm text-gray-400">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                      className="w-10 h-10 rounded-full border"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                      className="w-10 h-10 rounded-full border"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="bg-black text-white px-5 py-3 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-3xl font-bold mb-6">
              Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="flex justify-between mb-6 text-xl font-bold">
              <span>Total</span>
              <span>
                KSh {total.toLocaleString()}
              </span>
            </div>

            {cart.length > 0 ? (
              <>
                <a
                  href="/checkout"
                  className="block w-full bg-black text-white py-4 rounded-full text-lg font-semibold text-center mb-3"
                >
                  Checkout
                </a>

                <a
                  href={whatsappCartLink()}
                  target="_blank"
                  className="block w-full border py-4 rounded-full text-lg font-semibold text-center"
                >
                  Order via WhatsApp
                </a>
              </>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-4 rounded-full text-lg font-semibold"
              >
                Checkout
              </button>
            )}

            <p className="text-sm text-gray-400 text-center mt-4">
              Fast ordering available
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}