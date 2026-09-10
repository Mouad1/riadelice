import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-primary-900/20" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary-400 font-medium tracking-widest uppercase mb-4">
          Fine Dining Experience
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-dark-50 mb-6">
          Where Every Meal
          <br />
          <span className="text-primary-400">Becomes a Memory</span>
        </h1>
        <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Indulge in exquisite cuisine crafted from the finest local ingredients,
          served in an atmosphere of timeless elegance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg">
              View Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/reservations">
            <Button variant="outline" size="lg">
              Reserve a Table
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
