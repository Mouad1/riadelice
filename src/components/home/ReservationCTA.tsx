import Link from "next/link";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReservationCTA() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 p-12 md:p-16">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Reserve Your Table
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join us for an unforgettable dining experience. Book your table today
              and let us take care of the rest.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/90">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} />
                <span>Open 7 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>Lunch & Dinner</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>Up to 12 Guests</span>
              </div>
            </div>

            <Link href="/reservations">
              <Button variant="secondary" size="lg" className="bg-white text-dark-900 hover:bg-dark-50">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
