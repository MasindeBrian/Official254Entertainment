"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [authorized, setAuthorized] =
    useState(false);

  const [name, setName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stockQuantity, setStockQuantity] =
    useState("");

  const [category, setCategory] =
    useState("Men");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  const [editStockQuantity, setEditStockQuantity] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("Men");

  const [editImageFile, setEditImageFile] =
    useState<File | null>(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href =
        "/login";
      return;
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
      profile?.role !==
      "admin"
    ) {
      window.location.href =
        "/";
      return;
    }

    setAuthorized(true);
    loadProducts();
  }

  async function loadProducts() {
    const { data } =
      await supabase
        .from("products")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setProducts(data || []);
  }

  async function uploadImage(file: File) {
    const ext =
      file.name.split(".").pop() ||
      "jpg";

    const fileName = `product-${Date.now()}.${ext}`;

    const { error } =
      await supabase.storage
        .from("products")
        .upload(fileName, file);

    if (error) return null;

    const { data } =
      supabase.storage
        .from("products")
        .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function addProduct() {
    setLoading(true);
    setMessage("");

    let imageUrl = "";

    if (imageFile) {
      const uploaded =
        await uploadImage(
          imageFile
        );

      if (uploaded)
        imageUrl = uploaded;
    }

    const payload = {
      name,
      price,
      category,
      image_url:
        imageUrl,
      stock_quantity:
        stockQuantity === ""
          ? null
          : Number(stockQuantity),
    };

    let { error } =
      await supabase
        .from("products")
        .insert([payload]);

    let stockColumnMissing =
      false;

    if (
      error &&
      error.message
        .toLowerCase()
        .includes(
          "stock_quantity"
        )
      ) {
      stockColumnMissing =
        true;

      const {
        stock_quantity,
        ...fallbackPayload
      } = payload;

      const fallback =
        await supabase
          .from("products")
          .insert([
            fallbackPayload,
          ]);

      error = fallback.error;
    }

    if (error) {
      setMessage(
        error.message
      );
    } else {
      setMessage(
        stockColumnMissing
          ? "Product added, but stock quantity did not save because the products table needs a stock_quantity column."
          : "Product added."
      );
      setName("");
      setPrice("");
      setStockQuantity("");
      setCategory("Men");
      setImageFile(null);
      loadProducts();
    }

    setLoading(false);
  }

  async function deleteProduct(
    id: number
  ) {
    await supabase
      .from("products")
      .delete()
      .eq("id", id);

    loadProducts();
  }

  function startEdit(
    item: any
  ) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price);
    setEditStockQuantity(
      item.stock_quantity ??
        ""
    );
    setEditCategory(
      item.category
    );
    setEditImageFile(null);
  }

  async function saveEdit(
    item: any
  ) {
    setMessage("");

    let imageUrl =
      item.image_url;

    if (editImageFile) {
      const uploaded =
        await uploadImage(
          editImageFile
        );

      if (uploaded)
        imageUrl = uploaded;
    }

    const payload = {
      name: editName,
      price: editPrice,
      category:
        editCategory,
      image_url:
        imageUrl,
      stock_quantity:
        editStockQuantity ===
        ""
          ? null
          : Number(
              editStockQuantity
            ),
    };

    let { error } =
      await supabase
      .from("products")
      .update(payload)
      .eq("id", item.id);

    if (
      error &&
      error.message
        .toLowerCase()
        .includes(
          "stock_quantity"
        )
    ) {
      const {
        stock_quantity,
        ...fallbackPayload
      } = payload;

      const fallback =
        await supabase
        .from("products")
        .update(
          fallbackPayload
        )
        .eq("id", item.id);

      error = fallback.error;

      if (!error) {
        setMessage(
          "Product saved, but stock quantity did not save because the products table needs a stock_quantity column."
        );
        setEditingId(null);
        loadProducts();
        return;
      }
    }

    if (error) {
      setMessage(
        error.message
      );
      return;
    }

    setMessage(
      "Product saved."
    );
    setEditingId(null);
    loadProducts();
  }

  if (!authorized) {
    return (
      <main className="premium-page min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </main>
    );
  }

  return (
    <main className="premium-page min-h-screen text-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow mb-3">
              PRODUCTS
            </p>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Inventory
            </h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="/dashboard"
              className="secondary-btn px-5 py-3 rounded-full font-semibold"
            >
              Hub
            </a>

            <a
              href="/admin-orders"
              className="secondary-btn px-5 py-3 rounded-full font-semibold"
            >
              Orders
            </a>
          </div>
        </div>

        {/* Add Product */}
        <div className="premium-card rounded-3xl p-6 md:p-8 mb-10">
          <h2 className="text-2xl font-black mb-6">
            Add Product
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Product Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="premium-input rounded-full px-5 py-4"
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="premium-input rounded-full px-5 py-4"
            />

            <input
              type="number"
              min="0"
              placeholder="Stock Quantity"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(
                  e.target.value
                )
              }
              className="premium-input rounded-full px-5 py-4"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="premium-input rounded-full px-5 py-4"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(
                  e.target
                    .files?.[0] ||
                    null
                )
              }
              className="premium-input rounded-full px-5 py-4"
            />
          </div>

          <button
            onClick={addProduct}
            disabled={loading}
            className="premium-btn mt-5 px-6 py-4 rounded-full font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </button>

          {message && (
            <p className="text-sm mt-4 premium-subtle">
              {message}
            </p>
          )}
        </div>

        {/* Products */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map(
            (item) => (
              <div
                key={item.id}
                className="premium-card rounded-3xl p-5"
              >
                {item.image_url ? (
                  <img
                    src={
                      item.image_url
                    }
                    alt={
                      item.name
                    }
                    className="w-full h-52 object-cover rounded-2xl mb-4"
                  />
                ) : (
                  <div className="product-stage w-full h-52 rounded-2xl mb-4" />
                )}

                {editingId ===
                item.id ? (
                  <>
                    <input
                      value={
                        editName
                      }
                      onChange={(
                        e
                      ) =>
                        setEditName(
                          e.target
                            .value
                        )
                      }
                      className="premium-input w-full rounded-full px-4 py-3 mb-3"
                    />

                    <input
                      value={
                        editPrice
                      }
                      onChange={(
                        e
                      ) =>
                        setEditPrice(
                          e.target
                            .value
                        )
                      }
                      className="premium-input w-full rounded-full px-4 py-3 mb-3"
                    />

                    <input
                      type="number"
                      min="0"
                      value={
                        editStockQuantity
                      }
                      onChange={(
                        e
                      ) =>
                        setEditStockQuantity(
                          e.target
                            .value
                        )
                      }
                      className="premium-input w-full rounded-full px-4 py-3 mb-3"
                    />

                    <select
                      value={
                        editCategory
                      }
                      onChange={(
                        e
                      ) =>
                        setEditCategory(
                          e.target
                            .value
                        )
                      }
                      className="premium-input w-full rounded-full px-4 py-3 mb-3"
                    >
                      <option>
                        Men
                      </option>
                      <option>
                        Women
                      </option>
                      <option>
                        Unisex
                      </option>
                    </select>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(
                        e
                      ) =>
                        setEditImageFile(
                          e.target
                            .files?.[0] ||
                            null
                        )
                      }
                      className="mb-4"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          saveEdit(
                            item
                          )
                        }
                        className="premium-btn px-5 py-3 rounded-full"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditingId(
                            null
                          )
                        }
                        className="secondary-btn px-5 py-3 rounded-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-black">
                      {
                        item.name
                      }
                    </h3>

                    <p className="mt-1">
                      {
                        item.price
                      }
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {item.stock_quantity ===
                      0
                        ? "Out of stock"
                        : item.stock_quantity
                        ? `${item.stock_quantity} in stock`
                        : "Stock not set"}
                    </p>

                    <p className="text-sm premium-subtle uppercase tracking-[0.22em] mb-5 mt-1">
                      {
                        item.category
                      }
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          startEdit(
                            item
                          )
                        }
                        className="premium-btn px-5 py-3 rounded-full"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            item.id
                          )
                        }
                        className="secondary-btn px-5 py-3 rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
