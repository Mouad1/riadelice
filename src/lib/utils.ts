import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: "bg-green-500/20 text-green-400",
    occupied: "bg-red-500/20 text-red-400",
    reserved: "bg-yellow-500/20 text-yellow-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
    preparing: "bg-blue-500/20 text-blue-400",
    ready: "bg-green-500/20 text-green-400",
    served: "bg-purple-500/20 text-purple-400",
    paid: "bg-gray-500/20 text-gray-400",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400";
}
