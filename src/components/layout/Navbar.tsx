"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, UtensilsCrossed } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-dark-700 bg-dark-900/80 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <UtensilsCrossed className="h-6 w-6 text-primary-500 group-hover:rotate-12 transition-transform" />
            <span className="font-display text-xl font-bold text-dark-50">
              LE RIAD DES DELICES
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors"
            >
              Staff Portal
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-dark-50"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-dark-300 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-primary-500 hover:bg-dark-800 rounded-lg transition-colors"
            >
              Staff Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
