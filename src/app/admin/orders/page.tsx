"use client";

import { useState } from "react";
import { OrderCard } from "@/components/admin/OrderCard";
import { store } from "@/lib/store";
import { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(store.getOrders());

  const updateStatus = (id: string, status: Order["status"]) => {
    store.updateOrderStatus(id, status);
    setOrders([...store.getOrders()]);
  };

  const activeOrders = orders.filter((o) => o.status !== "paid");
  const completedOrders = orders.filter((o) => o.status === "paid");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Order Management</h1>

      {activeOrders.length === 0 && completedOrders.length === 0 ? (
        <div className="text-center py-16 text-dark-400">
          <p className="text-lg">No orders yet</p>
          <p className="text-sm mt-1">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="space-y-8">
          {activeOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-dark-200 mb-4">Active Orders ({activeOrders.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
                ))}
              </div>
            </div>
          )}

          {completedOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-dark-200 mb-4">Completed Orders ({completedOrders.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
