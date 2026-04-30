"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminOrdersPage() {
  const [authorized, setAuthorized] =
    useState(false);

  const [orders, setOrders] =
    useState<any[]>([]);

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
    loadOrders();
  }

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("id", {
        ascending: false,
      });

    setOrders(data || []);
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
    await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    loadOrders();
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
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-black">
          ORDERS DASHBOARD
        </h1>

        <div className="flex gap-3">
          <a
            href="/dashboard"
            className="border px-4 py-2 rounded-full"
          >
            Hub
          </a>

          <a
            href="/admin"
            className="border px-4 py-2 rounded-full"
          >
            Products
          </a>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white text-black rounded-3xl p-6"
          >
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">
                Order #{order.id}
              </h2>

              <span className="uppercase text-sm">
                {order.status}
              </span>
            </div>

            <p>
              <strong>Name:</strong>{" "}
              {order.customer_name}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {order.location}
            </p>

            <p className="mt-2">
              <strong>Total:</strong>{" "}
              {order.total}
            </p>

            <div className="mt-4">
              <strong>Items:</strong>

              <div className="mt-2 space-y-1">
                {order.items?.map(
                  (
                    item: any,
                    i: number
                  ) => (
                    <p key={i}>
                      {item.name} x
                      {item.quantity}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-6 flex-wrap">
              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "pending"
                  )
                }
                className="px-4 py-2 rounded-full border"
              >
                Pending
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "paid"
                  )
                }
                className="px-4 py-2 rounded-full bg-black text-white"
              >
                Paid
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order.id,
                    "delivered"
                  )
                }
                className="px-4 py-2 rounded-full border"
              >
                Delivered
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="bg-white text-black rounded-3xl p-10 text-center">
            No orders yet.
          </div>
        )}
      </div>
    </main>
  );
}