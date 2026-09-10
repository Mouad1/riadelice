"use client";

import { cn } from "@/lib/utils";

interface MenuFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuFilter({ categories, activeCategory, onCategoryChange }: MenuFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          aria-pressed={activeCategory === cat}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            activeCategory === cat
              ? "bg-primary-500 text-white"
              : "bg-dark-700 text-dark-300 hover:bg-dark-600"
          )}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
