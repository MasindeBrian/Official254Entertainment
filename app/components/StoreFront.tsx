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
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [alert, setAlert] =
    useState("");

  const { addToCart } =
    useCart();

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const filtered = useMemo(() => {
    return products.filter(
      (item) => {
        const matchSearch =
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchCategory =
          category === "All"
            ? true
            : item.category
                .toLowerCase() ===
              category.toLowerCase();

        return (
          matchSearch &&
          matchCategory
        );
      }
    );
  }, [
    products,
    search,
    category,
  ]);

  function handleAdd(item: any) {
    addToCart(item);

    setAlert(
      `${item.name} added to cart`
    );

    setTimeout(() => {
      setAlert("");
    }, 1800);
  }

  const categories = [
    "All",
    "Men",
    "Women",
    "Unisex",
  ];

  return (
    <section className="bg-[#f8f8f8]">
      {/* Alert */}
      {alert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold">
            {alert}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
              COLLECTIONS
            </p>

            <h2 className="text-4xl md:text-6xl font-black leading-none">
              Shop All
            </h2>

            <p className="text-gray-500 mt-3">
              Curated premium pieces for culture and movement.
            </p>
          </div>

          <div className="text-sm text-gray-400">
            {filtered.length} products
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="bg-white border rounded-3xl p-5 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search products..."
              className="w-full rounded-full border px-6 py-4 outline-none bg-[#fafafa]"
            />

            <div className="flex flex-wrap gap-2 md:justify-end">
              {categories.map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setCategory(cat)
                    }
                    className={`px-5 py-3 rounded-full text-sm font-semibold transition ${
                      category === cat
                        ? "bg-black text-white"
                        : "bg-[#fafafa] border"
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border p-12 text-center">
            <h3 className="text-2xl font-bold">
              No products found
            </h3>

            <p className="text-gray-500 mt-2">
              Try another search.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filtered.map(
              (item, i) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300 group"
                >
                  {/* Image */}
                  {item.image_url ? (
                    <div className="relative overflow-hidden bg-[#f5f5f5]">
                      <span className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] px-3 py-1 rounded-full tracking-wide">
                        {i % 3 === 0
                          ? "NEW"
                          : i % 3 === 1
                          ? "HOT"
                          : "LIMITED"}
                      </span>

                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-72 bg-[#f3f3f3]" />
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h4 className="font-black text-lg leading-tight mb-2">
                      {item.name}
                    </h4>

                    <p className="text-sm text-gray-400 uppercase tracking-[0.25em] mb-3">
                      {item.category}
                    </p>

                    <div className="flex justify-between items-center mb-5">
                      <span className="text-xl font-black">
                        {item.price}
                      </span>

                      <span className="text-xs text-gray-400">
                        Premium
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleAdd(item)
                      }
                      className="w-full bg-black text-white py-3 rounded-full font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}