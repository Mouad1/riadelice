import { Check, X, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reservation } from "@/types";

interface ReservationRowProps {
  reservation: Reservation;
  onStatusChange: (id: string, status: Reservation["status"]) => void;
}

export function ReservationRow({ reservation, onStatusChange }: ReservationRowProps) {
  return (
    <tr className="border-b border-dark-700 hover:bg-dark-800/50">
      <td className="py-4 px-4">
        <div>
          <div className="font-medium text-dark-50">{reservation.customerName}</div>
          <div className="text-sm text-dark-400">{reservation.email}</div>
        </div>
      </td>
      <td className="py-4 px-4 text-dark-300">{reservation.phone}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 text-dark-200">
          <CalendarDays size={14} className="text-primary-400 shrink-0" />
          {reservation.date}
        </div>
      </td>
      <td className="py-4 px-4 text-dark-300">{reservation.time}</td>
      <td className="py-4 px-4 text-dark-300">{reservation.partySize} guests</td>
      <td className="py-4 px-4">
        <Badge variant={reservation.status === "confirmed" ? "success" : reservation.status === "pending" ? "warning" : "danger"}>
          {reservation.status}
        </Badge>
      </td>
      <td className="py-4 px-4">
        {reservation.specialRequests && (
          <p className="text-sm text-dark-400 max-w-xs">{reservation.specialRequests}</p>
        )}
      </td>
      <td className="py-4 px-4">
        {reservation.status === "pending" && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onStatusChange(reservation.id, "confirmed")}
            >
              <Check size={14} className="mr-1" />
              Confirm
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onStatusChange(reservation.id, "cancelled")}
            >
              <X size={14} className="mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}
