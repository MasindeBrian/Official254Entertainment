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
            : item.category.toLowerCase() ===
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
    }, 2000);
  }

  function whatsappLink(
    item: any
  ) {
    const msg =
      `Hello, I want to order ${item.name}.\n` +
      `Price: ${item.price}\n` +
      `Category: ${item.category}`;

    return `https://wa.me/254757900428?text=${encodeURIComponent(
      msg
    )}`;
  }

  const categories = [
    "All",
    "Men",
    "Women",
    "Unisex",
  ];

  return (
    <section className="bg-white">
      {/* Alert */}
      {alert && (
        <div className="sticky top-24 z-40 px-4">
          <div className="max-w-md mx-auto mt-4 bg-black text-white px-6 py-3 rounded-full text-center shadow-xl">
            {alert}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-8">
        <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
          COLLECTIONS
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black leading-none">
              Shop The Drop
            </h2>

            <p className="text-gray-500 mt-3 max-w-xl">
              Premium essentials built
              for movement, culture and
              identity.
            </p>
          </div>

          <div className="text-sm text-gray-400">
            {filtered.length} products
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="bg-[#f7f7f7] rounded-3xl p-4 md:p-6 border">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search tees, hoodies, caps..."
              className="w-full bg-white border rounded-full px-6 py-4 outline-none"
            />

            <div className="flex flex-wrap gap-2 md:justify-end">
              {categories.map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setCategory(
                        cat
                      )
                    }
                    className={`px-5 py-3 rounded-full text-sm transition ${
                      category === cat
                        ? "bg-black text-white"
                        : "bg-white border"
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="bg-[#f7f7f7] rounded-3xl p-12 text-center border">
            <h3 className="text-2xl font-bold mb-2">
              No products found
            </h3>

            <p className="text-gray-500">
              Try another search or
              category.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(
              (item) => (
                <div
                  key={item.id}
                  className="group bg-[#fafafa] border rounded-3xl overflow-hidden hover:shadow-xl transition"
                >
                  {/* Image */}
                  {item.image_url ? (
                    <div className="overflow-hidden">
                      <img
                        src={
                          item.image_url
                        }
                        alt={
                          item.name
                        }
                        className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-72 bg-gray-100"></div>
                  )}

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex justify-between gap-4 mb-2">
                      <h4 className="font-bold text-xl leading-tight">
                        {
                          item.name
                        }
                      </h4>

                      <span className="font-semibold">
                        {
                          item.price
                        }
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-6 uppercase tracking-wide">
                      {
                        item.category
                      }
                    </p>

                    <div className="grid gap-3">
                      <button
                        onClick={() =>
                          handleAdd(
                            item
                          )
                        }
                        className="w-full bg-black text-white py-3 rounded-full font-medium"
                      >
                        Add to Cart
                      </button>

                      <a
                        href={whatsappLink(
                          item
                        )}
                        target="_blank"
                        className="w-full text-center border py-3 rounded-full font-medium"
                      >
                        Order via WhatsApp
                      </a>
                    </div>
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