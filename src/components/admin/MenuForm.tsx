"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MenuItem } from "@/types";

interface MenuFormProps {
  item?: MenuItem;
  onSubmit: (data: Omit<MenuItem, "id" | "createdAt">) => void;
  onCancel: () => void;
}

export function MenuForm({ item, onSubmit, onCancel }: MenuFormProps) {
  const [form, setForm] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || 0,
    category: item?.category || ("mains" as MenuItem["category"]),
    available: item?.available ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      description: form.description,
      price: form.price,
      category: form.category,
      available: form.available,
      dietary: item?.dietary ?? [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        id="name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Input
        label="Description"
        id="description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price ($)"
          id="price"
          type="number"
          step="0.01"
          min="0"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
        />
        <Select
          label="Category"
          id="category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as MenuItem["category"] })}
          options={[
            { value: "appetizers", label: "Appetizers" },
            { value: "mains", label: "Mains" },
            { value: "desserts", label: "Desserts" },
            { value: "drinks", label: "Drinks" },
          ]}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="available"
          checked={form.available}
          onChange={(e) => setForm({ ...form, available: e.target.checked })}
          className="rounded border-dark-600 bg-dark-800 text-primary-500 focus:ring-primary-500"
        />
        <label htmlFor="available" className="text-sm text-dark-200">
          Available
        </label>
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="submit">{item ? "Update" : "Add"} Item</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
