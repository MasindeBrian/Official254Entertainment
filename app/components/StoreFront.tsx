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
    if (item.stock_quantity === 0) {
      setAlert(
        `${item.name} is out of stock`
      );

      setTimeout(() => {
        setAlert("");
      }, 1800);

      return;
    }

    addToCart(item);

    setAlert(`${item.name} added to cart`);

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
    <section>
      {alert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
          <div className="premium-btn px-6 py-3 rounded-full text-sm font-semibold">
            {alert}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="eyebrow mb-3">
              COLLECTIONS
            </p>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Shop All
            </h2>

            <p className="premium-subtle mt-3">
              Curated premium pieces for culture and movement.
            </p>
          </div>

          <p className="text-sm premium-subtle">
            {filtered.length} products
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="premium-card rounded-[2rem] p-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="premium-input w-full rounded-full px-6 py-4 outline-none transition"
            />

            <div className="flex flex-wrap gap-2 md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setCategory(cat)
                  }
                  className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    category === cat
                      ? "premium-btn shadow-md"
                      : "secondary-btn"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="premium-card rounded-[2rem] p-12 text-center">
            <h3 className="text-2xl font-bold">
              No products found
            </h3>

            <p className="premium-subtle mt-2">
              Try another search.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {filtered.map((item, i) => {
              const outOfStock =
                item.stock_quantity ===
                  0 ||
                item.stock_quantity ==
                  null;

              return (
              <div
                key={item.id}
                className="premium-card rounded-[2rem] overflow-hidden transition-all duration-300 group"
              >
                {/* Image */}
                <div className="product-stage relative overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 bg-[#14110f] text-white text-[10px] px-3 py-1 rounded-full tracking-wide">
                    {outOfStock
                      ? "OUT"
                      : i % 3 === 0
                      ? "NEW"
                      : i % 3 === 1
                      ? "HOT"
                      : "LIMITED"}
                  </span>

                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="aspect-[3/4]" />
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-black text-lg mb-2">
                    {item.name}
                  </h4>

                  <p className="text-xs premium-subtle uppercase tracking-[0.22em] mb-4">
                    {item.category}
                  </p>

                  <p className="mb-4 text-sm font-semibold">
                    {outOfStock
                      ? "Out of stock"
                      : item.stock_quantity
                      ? `${item.stock_quantity} in stock`
                      : "Out of stock"}
                  </p>

                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xl font-black">
                      {item.price}
                    </span>

                    <span className="text-xs premium-subtle">
                      Premium
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      handleAdd(item)
                    }
                    disabled={outOfStock}
                    className="premium-btn w-full py-3 rounded-full font-semibold transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
                  >
                    {outOfStock
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
