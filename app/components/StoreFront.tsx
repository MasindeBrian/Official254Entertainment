"use client";

import { useMemo, useState, useEffect } from "react";
import { useCart } from "./CartContext";

export default function StoreFront({
  products,
  selectedCategory = "All",
}: {
  products: any[];
  selectedCategory?: string;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [alert, setAlert] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All"
          ? true
          : item.category.toLowerCase() ===
            category.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  function handleAdd(item: any) {
    addToCart(item);

    setAlert(`${item.name} added to cart`);

    setTimeout(() => {
      setAlert("");
    }, 2000);
  }

  function whatsappLink(item: any) {
    const msg =
      `Hello, I want to order ${item.name}.\n` +
      `Price: ${item.price}\n` +
      `Category: ${item.category}`;

    return `https://wa.me/254757900428?text=${encodeURIComponent(
      msg
    )}`;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
      {/* Alert */}
      {alert && (
        <div className="sticky top-24 z-40 mb-6">
          <div className="max-w-md mx-auto bg-black text-white px-6 py-3 rounded-full text-center shadow-xl">
            {alert}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="max-w-2xl mx-auto pt-8 pb-6">
        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search hoodies, tees, caps..."
          className="w-full bg-white border rounded-full px-6 py-4 outline-none shadow-sm"
        />
      </div>

      <h3 className="text-4xl font-bold mb-8">
        Featured Drops
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border p-4 shadow-sm hover:shadow-xl transition"
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-56 object-cover rounded-2xl mb-4"
              />
            ) : (
              <div className="w-full h-56 bg-gray-100 rounded-2xl mb-4"></div>
            )}

            <h4 className="font-semibold text-xl">
              {item.name}
            </h4>

            <p className="text-gray-700 font-medium">
              {item.price}
            </p>

            <p className="text-sm text-gray-400 mb-4">
              {item.category}
            </p>

            <div className="space-y-3">
              <button
                onClick={() =>
                  handleAdd(item)
                }
                className="w-full bg-black text-white py-3 rounded-full"
              >
                Add to Cart
              </button>

              <a
                href={whatsappLink(item)}
                target="_blank"
                className="block w-full border text-center py-3 rounded-full"
              >
                Order via WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}