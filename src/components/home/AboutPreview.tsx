import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";

export function AboutPreview() {
  return (
    <section className="py-24 bg-dark-800/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
              Our Story
            </p>
            <h2 className="font-display text-4xl font-bold text-dark-50 mb-6">
              A Legacy of Culinary Excellence
            </h2>
            <p className="text-dark-300 leading-relaxed mb-6">
              {restaurant.description}
            </p>
            <p className="text-dark-300 leading-relaxed mb-8">
              Our award-winning chefs combine traditional techniques with modern innovation,
              creating dishes that are both familiar and surprising. Every plate tells a story,
              every visit creates a memory.
            </p>
            <Link href="/about">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500/20 to-dark-700 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl font-display font-bold text-primary-400">15</span>
                <p className="text-dark-300 mt-2">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
