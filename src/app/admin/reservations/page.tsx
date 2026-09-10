"use client";

import { useState } from "react";
import { ReservationRow } from "@/components/admin/ReservationRow";
import { store } from "@/lib/store";
import { Reservation } from "@/types";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState(store.getReservations());

  const updateStatus = (id: string, status: Reservation["status"]) => {
    store.updateReservationStatus(id, status);
    setReservations([...store.getReservations()]);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Reservation Management</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-16 text-dark-400">
          <p className="text-lg">No reservations yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-dark-700 text-left text-sm text-dark-400">
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Party</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <ReservationRow key={res.id} reservation={res} onStatusChange={updateStatus} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
