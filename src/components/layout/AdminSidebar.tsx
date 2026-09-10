"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Grid3X3,
  ClipboardList,
  CalendarCheck,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/tables", label: "Tables", icon: Grid3X3 },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-dark-700 bg-dark-900 min-h-screen p-4 hidden md:block">
      <Link
        href="/"
        className="flex items-center gap-2 text-dark-400 hover:text-dark-50 transition-colors mb-8 px-3 py-2"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back to Site</span>
      </Link>

      <nav className="space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-500/10 text-primary-400"
                  : "text-dark-300 hover:bg-dark-800 hover:text-dark-50"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
