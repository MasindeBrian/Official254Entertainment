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

    const { error } =
      await supabase
        .from("products")
        .insert([
          {
            name,
            price,
            category,
            image_url:
              imageUrl,
          },
        ]);

    if (error) {
      setMessage(
        error.message
      );
    } else {
      setMessage(
        "Product added."
      );
      setName("");
      setPrice("");
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
    setEditCategory(
      item.category
    );
    setEditImageFile(null);
  }

  async function saveEdit(
    item: any
  ) {
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

    await supabase
      .from("products")
      .update({
        name: editName,
        price: editPrice,
        category:
          editCategory,
        image_url:
          imageUrl,
      })
      .eq("id", item.id);

    setEditingId(null);
    loadProducts();
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center text-2xl font-bold">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
              PRODUCTS
            </p>

            <h1 className="text-4xl md:text-6xl font-black">
              Inventory
            </h1>
          </div>

          <div className="flex gap-3 flex-wrap">
            <a
              href="/dashboard"
              className="border px-5 py-3 rounded-full bg-white font-semibold"
            >
              Hub
            </a>

            <a
              href="/admin-orders"
              className="border px-5 py-3 rounded-full bg-white font-semibold"
            >
              Orders
            </a>
          </div>
        </div>

        {/* Add Product */}
        <div className="bg-white border rounded-3xl p-6 md:p-8 mb-10">
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
              className="border rounded-full px-5 py-4"
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(
                  e.target.value
                )
              }
              className="border rounded-full px-5 py-4"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="border rounded-full px-5 py-4"
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
              className="border rounded-full px-5 py-4"
            />
          </div>

          <button
            onClick={addProduct}
            disabled={loading}
            className="mt-5 bg-black text-white px-6 py-4 rounded-full font-semibold"
          >
            {loading
              ? "Uploading..."
              : "Add Product"}
          </button>

          {message && (
            <p className="text-sm mt-4 text-gray-500">
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
                className="bg-white border rounded-3xl p-5"
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
                  <div className="w-full h-52 rounded-2xl bg-[#f3f3f3] mb-4" />
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
                      className="w-full border rounded-full px-4 py-3 mb-3"
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
                      className="w-full border rounded-full px-4 py-3 mb-3"
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
                      className="w-full border rounded-full px-4 py-3 mb-3"
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
                        className="bg-black text-white px-5 py-3 rounded-full"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditingId(
                            null
                          )
                        }
                        className="border px-5 py-3 rounded-full"
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

                    <p className="text-sm text-gray-400 uppercase tracking-[0.25em] mb-5 mt-1">
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
                        className="bg-black text-white px-5 py-3 rounded-full"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(
                            item.id
                          )
                        }
                        className="border px-5 py-3 rounded-full"
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