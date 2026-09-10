import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
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
            <Card key={item.id} className="group hover:border-primary-500/50 transition-all duration-300">
              <div className="aspect-[4/3] bg-dark-700 rounded-t-xl flex items-center justify-center">
                <span className="text-4xl">
                  {item.category === "appetizers" && "🥗"}
                  {item.category === "mains" && "🥩"}
                  {item.category === "desserts" && "🍰"}
                  {item.category === "drinks" && "🍷"}
                </span>
              </div>
              <CardContent>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-dark-50 group-hover:text-primary-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-primary-400 font-bold">
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <p className="text-dark-400 text-sm mb-3">{item.description}</p>
                <div className="flex gap-1">
                  {item.dietary.map((d) => (
                    <Badge key={d} variant="success" className="text-[10px]">
                      {d}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
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
