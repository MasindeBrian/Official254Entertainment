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
    loadOrders();
  }

  async function loadOrders() {
    const { data } =
      await supabase
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
      <main className="min-h-screen bg-[#f8f8f8] flex items-center justify-center text-2xl font-bold">
        Loading...
      </main>
    );
  }

  function badgeStyle(
    status: string
  ) {
    if (status === "paid")
      return "bg-black text-white";

    if (
      status ===
      "delivered"
    )
      return "bg-gray-200 text-black";

    return "bg-white border";
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-black p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="tracking-[0.35em] text-xs text-gray-400 mb-3">
              ORDERS
            </p>

            <h1 className="text-4xl md:text-6xl font-black">
              Orders Hub
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
              href="/admin"
              className="border px-5 py-3 rounded-full bg-white font-semibold"
            >
              Products
            </a>
          </div>
        </div>

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="bg-white border rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-black mb-2">
              No orders yet
            </h2>

            <p className="text-gray-500">
              Incoming customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(
              (order) => (
                <div
                  key={order.id}
                  className="bg-white border rounded-3xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                    <div>
                      <h2 className="text-2xl font-black">
                        Order #
                        {
                          order.id
                        }
                      </h2>

                      <p className="text-gray-500">
                        {
                          order.customer_name
                        }
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold w-fit ${badgeStyle(
                        order.status
                      )}`}
                    >
                      {order.status ||
                        "pending"}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-5 text-sm">
                    <div>
                      <p className="text-gray-400">
                        Phone
                      </p>

                      <p className="font-semibold">
                        {
                          order.phone
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Location
                      </p>

                      <p className="font-semibold">
                        {
                          order.location
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">
                        Total
                      </p>

                      <p className="font-semibold">
                        {
                          order.total
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-400 mb-2">
                      Items
                    </p>

                    <div className="space-y-2">
                      {order.items?.map(
                        (
                          item: any,
                          i: number
                        ) => (
                          <div
                            key={i}
                            className="flex justify-between border rounded-2xl px-4 py-3"
                          >
                            <span>
                              {
                                item.name
                              }
                            </span>

                            <span className="font-semibold">
                              x
                              {
                                item.quantity
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        updateStatus(
                          order.id,
                          "pending"
                        )
                      }
                      className="border px-5 py-3 rounded-full font-semibold"
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
                      className="bg-black text-white px-5 py-3 rounded-full font-semibold"
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
                      className="border px-5 py-3 rounded-full font-semibold"
                    >
                      Delivered
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </main>
  );
}