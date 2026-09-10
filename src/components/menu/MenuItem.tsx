import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { MenuItem as MenuItemType } from "@/types";

interface MenuItemProps {
  item: MenuItemType;
  withImage?: boolean;
}

const categoryEmoji: Record<string, string> = {
  appetizers: "🥗",
  mains: "🥩",
  desserts: "🍰",
  drinks: "🍷",
};

export function MenuItem({ item, withImage = false }: MenuItemProps) {
  return (
    <Card className="group hover:border-primary-500/50 transition-all duration-300">
      {withImage && (
        <div className="aspect-[4/3] bg-dark-700 rounded-t-xl flex items-center justify-center">
          <span className="text-4xl">{categoryEmoji[item.category]}</span>
        </div>
      )}
      <CardContent>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-dark-50 group-hover:text-primary-400 transition-colors">
              {item.name}
            </h3>
            <p className="text-dark-400 text-sm mt-1">{item.description}</p>
          </div>
          <span className="text-primary-400 font-bold text-lg ml-4">
            {formatCurrency(item.price)}
          </span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {item.dietary.map((d) => (
            <Badge key={d} variant="success" className="text-[10px]">
              {d}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}