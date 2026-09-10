"use client";

import { useEffect, useState } from "react";
import { ClipboardList, CalendarCheck, UtensilsCrossed, Grid3X3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { store } from "@/lib/store";

export default function AdminDashboard() {
  const [orders, setOrders] = useState(store.getOrders());
  const [reservations, setReservations] = useState(store.getReservations());
  const [menuCount, setMenuCount] = useState(store.getMenuItems().length);
  const [availableTables, setAvailableTables] = useState(
    store.getTables().filter((t) => t.status === "available").length
  );

  useEffect(() => {
    const refresh = () => {
      setOrders([...store.getOrders()]);
      setReservations([...store.getReservations()]);
      setMenuCount(store.getMenuItems().length);
      setAvailableTables(store.getTables().filter((t) => t.status === "available").length);
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  const stats = [
    { label: "Menu Items", value: menuCount, icon: UtensilsCrossed, color: "text-blue-400" },
    { label: "Available Tables", value: availableTables, icon: Grid3X3, color: "text-green-400" },
    {
      label: "Pending Orders",
      value: orders.filter((o) => o.status === "pending").length,
      icon: ClipboardList,
      color: "text-yellow-400",
    },
    {
      label: "Pending Reservations",
      value: reservations.filter((r) => r.status === "pending").length,
      icon: CalendarCheck,
      color: "text-purple-400",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 py-6">
              <div className={`p-3 rounded-xl bg-dark-700 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-dark-50">{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="font-semibold text-dark-50 mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-dark-400 text-sm">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 rounded-lg bg-dark-700/50">
                    <span className="text-dark-200">Table {order.tableId}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                      order.status === "ready" ? "bg-green-500/20 text-green-400" :
                      "bg-dark-600 text-dark-300"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-semibold text-dark-50 mb-4">Recent Reservations</h2>
            {reservations.length === 0 ? (
              <p className="text-dark-400 text-sm">No reservations yet</p>
            ) : (
              <div className="space-y-3">
                {reservations.slice(0, 5).map((res) => (
                  <div key={res.id} className="flex justify-between items-center p-3 rounded-lg bg-dark-700/50">
                    <div>
                      <span className="text-dark-200">{res.customerName}</span>
                      <span className="text-dark-400 text-sm ml-2">({res.partySize} guests)</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      res.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                      res.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
