import { Reservation } from "@/types";

export const reservations: Reservation[] = [
  {
    id: "r1",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1 555-0101",
    date: "2025-02-14",
    time: "19:00",
    partySize: 2,
    status: "confirmed",
    createdAt: "2025-01-28",
  },
  {
    id: "r2",
    customerName: "Emily Johnson",
    email: "emily@example.com",
    phone: "+1 555-0102",
    date: "2025-02-14",
    time: "20:00",
    partySize: 4,
    status: "pending",
    specialRequests: "Anniversary dinner, window seat preferred",
    createdAt: "2025-01-29",
  },
];
