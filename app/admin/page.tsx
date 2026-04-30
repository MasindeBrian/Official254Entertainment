"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [authorized, setAuthorized] =
    useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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
      window.location.href = "/";
      return;
    }

    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
      window.location.href = "/";
      return;
    }

    setAuthorized(true);
    loadProducts();
  }

  async function loadProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", {
        ascending: false,
      });

    setProducts(data || []);
  }

  async function uploadImage(file: File) {
    const extension =
      file.name.split(".").pop() ||
      "jpg";

    const fileName = `product-${Date.now()}.${extension}`;

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
        await uploadImage(imageFile);

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
            image_url: imageUrl,
          },
        ]);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Product added");
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

  function startEdit(item: any) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price);
    setEditCategory(item.category);
    setEditImageFile(null);
  }

  async function saveEdit(item: any) {
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

    const { error } =
      await supabase
        .from("products")
        .update({
          name: editName,
          price: editPrice,
          category:
            editCategory,
          image_url: imageUrl,
        })
        .eq("id", item.id);

    if (!error) {
      setEditingId(null);
      loadProducts();
    }
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-black">
          ADMIN DASHBOARD
        </h1>

        <div className="flex gap-3">
          <a
            href="/dashboard"
            className="border px-4 py-2 rounded-full"
          >
            Hub
          </a>

          <a
            href="/admin-orders"
            className="border px-4 py-2 rounded-full"
          >
            Orders
          </a>
        </div>
      </div>

      {/* Add Product */}
      <div className="max-w-xl bg-white text-black rounded-3xl p-8 space-y-4 mb-10">
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border px-4 py-3 rounded-full"
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          className="w-full border px-4 py-3 rounded-full"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full border px-4 py-3 rounded-full"
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
              e.target.files?.[0] ||
                null
            )
          }
        />

        <button
          onClick={addProduct}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-full"
        >
          {loading
            ? "Uploading..."
            : "Add Product"}
        </button>

        {message && (
          <p className="text-sm text-center">
            {message}
          </p>
        )}
      </div>

      {/* Products */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white text-black rounded-3xl p-6"
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover rounded-2xl mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-2xl mb-4"></div>
            )}

            {editingId === item.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) =>
                    setEditName(
                      e.target.value
                    )
                  }
                  className="w-full border px-4 py-2 rounded-full mb-3"
                />

                <input
                  value={editPrice}
                  onChange={(e) =>
                    setEditPrice(
                      e.target.value
                    )
                  }
                  className="w-full border px-4 py-2 rounded-full mb-3"
                />

                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(
                      e.target.value
                    )
                  }
                  className="w-full border px-4 py-2 rounded-full mb-3"
                >
                  <option>Men</option>
                  <option>Women</option>
                  <option>Unisex</option>
                </select>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditImageFile(
                      e.target
                        .files?.[0] ||
                        null
                    )
                  }
                  className="mb-4"
                />

                <button
                  onClick={() =>
                    saveEdit(item)
                  }
                  className="bg-black text-white px-4 py-2 rounded-full mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setEditingId(
                      null
                    )
                  }
                  className="border px-4 py-2 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p>
                  {item.price}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                  {item.category}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      startEdit(
                        item
                      )
                    }
                    className="bg-black text-white px-4 py-2 rounded-full"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(
                        item.id
                      )
                    }
                    className="border px-4 py-2 rounded-full"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}