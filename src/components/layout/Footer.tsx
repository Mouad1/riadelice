import Link from "next/link";
import { UtensilsCrossed, MapPin, Phone, Mail } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary-500" />
              <span className="font-display text-xl font-bold text-dark-50">
                LE RIAD DES DELICES
              </span>
            </Link>
            <p className="text-dark-400 text-sm max-w-md">
              {restaurant.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-dark-50 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-dark-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-500 shrink-0" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-500 shrink-0" />
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary-500 shrink-0" />
                <span>{restaurant.email}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-dark-50 mb-4">Hours</h3>
            <div className="space-y-1 text-sm text-dark-400">
              {restaurant.hours.slice(0, 5).map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.open} - {h.close}</span>
                </div>
              ))}
              <div className="flex justify-between gap-4 text-primary-400 font-medium pt-1">
                <span>Sat</span>
                <span>{restaurant.hours[5].open} - {restaurant.hours[5].close}</span>
              </div>
              <div className="flex justify-between gap-4 text-primary-400 font-medium">
                <span>Sun</span>
                <span>{restaurant.hours[6].open} - {restaurant.hours[6].close}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700 text-center text-sm text-dark-500">
          <p>&copy; {new Date().getFullYear()} LE RIAD DES DELICES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
