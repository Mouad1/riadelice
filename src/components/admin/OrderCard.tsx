import { Clock, CheckCircle, ChefHat, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types";

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: Order["status"]) => void;
}

const statusFlow: Record<Order["status"], Order["status"] | undefined> = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
  served: "paid",
  paid: undefined,
};

const statusIcons = {
  pending: Clock,
  preparing: ChefHat,
  ready: CheckCircle,
  served: CheckCircle,
  paid: CreditCard,
} as const;

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const nextStatus = statusFlow[order.status];
  const Icon = statusIcons[order.status];

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div>
            <span className="font-semibold text-dark-50">Order #{order.id.slice(0, 8)}</span>
            <span className="text-dark-400 text-sm ml-2">Table {order.tableId}</span>
          </div>
          <Badge variant={order.status === "paid" ? "default" : "info"}>
            <Icon size={12} className="mr-1" />
            {order.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-dark-300 gap-2">
              <span>{item.quantity}x {item.name}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-dark-700">
          <span className="font-bold text-dark-50">Total: {formatCurrency(order.total)}</span>
          {nextStatus && (
            <Button size="sm" onClick={() => onStatusChange(order.id, nextStatus)}>
              Mark as {nextStatus}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
