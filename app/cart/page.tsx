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

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <p className="tracking-[0.35em] text-xs text-gray-400 mb-2">
                CART
              </p>

              <h1 className="text-4xl md:text-6xl font-black">
                Your Bag
              </h1>
            </div>

            <a
              href="/shop"
              className="border px-5 py-3 rounded-full font-semibold text-center"
            >
              Continue Shopping
            </a>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl border p-12 text-center">
              <h2 className="text-2xl font-bold mb-3">
                Your cart is empty
              </h2>

              <p className="text-gray-500 mb-6">
                Add premium pieces to begin.
              </p>

              <a
                href="/shop"
                className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold"
              >
                Shop Now
              </a>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-3xl p-5 flex flex-col md:flex-row gap-5 items-center"
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-28 h-28 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-2xl bg-[#f3f3f3]" />
                  )}

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-black">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      {item.price}
                    </p>

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mt-1">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                      className="w-10 h-10 rounded-full border text-lg"
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                      className="w-10 h-10 rounded-full border text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="px-5 py-3 rounded-full border font-semibold"
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
          <div className="bg-white border rounded-3xl p-6 sticky top-24">
            <h2 className="text-3xl font-black mb-6">
              Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="flex justify-between text-xl font-black mb-6">
              <span>Total</span>
              <span>
                KSh {total.toLocaleString()}
              </span>
            </div>

            {cart.length > 0 ? (
              <a
                href="/checkout"
                className="block w-full bg-black text-white py-4 rounded-full text-center font-semibold text-lg"
              >
                Checkout
              </a>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-4 rounded-full font-semibold"
              >
                Checkout
              </button>
            )}

            <p className="text-sm text-gray-400 text-center mt-4">
              Secure checkout and WhatsApp confirmation.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}