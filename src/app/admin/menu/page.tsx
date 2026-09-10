"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { MenuForm } from "@/components/admin/MenuForm";
import { formatCurrency } from "@/lib/utils";
import { store } from "@/lib/store";
import { MenuItem } from "@/types";

export default function AdminMenuPage() {
  const [items, setItems] = useState(store.getMenuItems());
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);

  const refresh = () => setItems([...store.getMenuItems()]);

  const handleAdd = (data: Omit<MenuItem, "id" | "createdAt">) => {
    store.addMenuItem(data);
    refresh();
    setShowModal(false);
  };

  const handleUpdate = (data: Omit<MenuItem, "id" | "createdAt">) => {
    if (editing) {
      store.updateMenuItem(editing.id, data);
      refresh();
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this menu item?")) {
      store.deleteMenuItem(id);
      refresh();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold text-dark-50">Menu Management</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between py-4 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-medium text-dark-50">{item.name}</h3>
                  <Badge variant={item.available ? "success" : "danger"}>
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                  <Badge variant="info">{item.category}</Badge>
                </div>
                <p className="text-dark-400 text-sm mt-1">{item.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-primary-400 font-bold">{formatCurrency(item.price)}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(item)}
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Menu Item">
        <MenuForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
      </Modal>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Menu Item">
        {editing && (
          <MenuForm item={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        )}
      </Modal>
    </div>
  );
}
