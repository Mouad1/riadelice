"use client";

import { useState } from "react";
import { Grid3X3, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Select";
import { store } from "@/lib/store";
import { Table } from "@/types";

export default function AdminTablesPage() {
  const [tables, setTables] = useState(store.getTables());

  const updateStatus = (id: string, status: Table["status"]) => {
    store.updateTableStatus(id, status);
    setTables([...store.getTables()]);
  };

  const grouped = {
    indoor: tables.filter((t) => t.location === "indoor"),
    outdoor: tables.filter((t) => t.location === "outdoor"),
    private: tables.filter((t) => t.location === "private"),
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Table Management</h1>

      {Object.entries(grouped).map(([location, locTables]) => (
        <div key={location} className="mb-8">
          <h2 className="text-lg font-semibold text-dark-200 mb-4 capitalize">{location} Seating</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locTables.map((table) => (
              <Card key={table.id} className="hover:border-dark-600 transition-colors">
                <CardContent className="py-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Grid3X3 className="h-5 w-5 text-primary-400" />
                      <span className="font-semibold text-dark-50">Table {table.number}</span>
                    </div>
                    <Badge variant={table.status === "available" ? "success" : table.status === "occupied" ? "danger" : "warning"}>
                      {table.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                    <Users size={14} />
                    <span>Up to {table.capacity} guests</span>
                  </div>
                  <Select
                    value={table.status}
                    onChange={(e) => updateStatus(table.id, e.target.value as Table["status"])}
                    options={[
                      { value: "available", label: "Available" },
                      { value: "occupied", label: "Occupied" },
                      { value: "reserved", label: "Reserved" },
                    ]}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
