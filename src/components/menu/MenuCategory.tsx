import { MenuItem } from "./MenuItem";
import { MenuItem as MenuItemType } from "@/types";

interface MenuCategoryProps {
  title: string;
  items: MenuItemType[];
}

export function MenuCategory({ title, items }: MenuCategoryProps) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-dark-50 mb-6 pb-2 border-b border-dark-700">
        {title}
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
