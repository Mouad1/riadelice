import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MenuItem } from "@/components/menu/MenuItem";
import { menuItems } from "@/data/menu";

export function FeaturedMenu() {
  const featured = menuItems.filter((item) => item.available).slice(0, 4);

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Our Favorites
          </p>
          <h2 className="font-display text-4xl font-bold text-dark-50">
            Featured Dishes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <MenuItem key={item.id} item={item} withImage />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            View Full Menu <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}