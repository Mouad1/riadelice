"use client";

import { useState } from "react";
import { MenuFilter } from "@/components/menu/MenuFilter";
import { MenuCategory } from "@/components/menu/MenuCategory";
import { menuItems } from "@/data/menu";

const categories = ["all", "appetizers", "mains", "desserts", "drinks"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof menuItems>
  );

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Culinary Artistry
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-4">Our Menu</h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Each dish is crafted with passion using the freshest seasonal ingredients
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <MenuFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {activeCategory === "all" ? (
          <div className="space-y-16">
            {Object.entries(groupedItems).map(([category, items]) => (
              <MenuCategory
                key={category}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
                items={items}
              />
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <MenuCategory
              title={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              items={filteredItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
