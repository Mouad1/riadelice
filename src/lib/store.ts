import { MenuItem, Table, Reservation, Order } from "@/types";
import { menuItems as initialMenu } from "@/data/menu";
import { tables as initialTables } from "@/data/tables";
import { reservations as initialReservations } from "@/data/reservations";

// Simple in-memory store for MVP (swap with database later)
class Store {
  private _menuItems: MenuItem[] = [...initialMenu];
  private _tables: Table[] = [...initialTables];
  private _reservations: Reservation[] = [...initialReservations];
  private _orders: Order[] = [];

  // Menu
  getMenuItems(): MenuItem[] {
    return [...this._menuItems];
  }

  addMenuItem(item: Omit<MenuItem, "id" | "createdAt">): MenuItem {
    const newItem: MenuItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this._menuItems.push(newItem);
    return newItem;
  }

  updateMenuItem(id: string, updates: Omit<Partial<MenuItem>, "id" | "createdAt">): MenuItem | null {
    const index = this._menuItems.findIndex((item) => item.id === id);
    if (index === -1) return null;
    this._menuItems[index] = { ...this._menuItems[index], ...updates };
    return this._menuItems[index];
  }

  deleteMenuItem(id: string): boolean {
    const index = this._menuItems.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this._menuItems.splice(index, 1);
    return true;
  }

  // Tables
  getTables(): Table[] {
    return [...this._tables];
  }

  updateTableStatus(id: string, status: Table["status"]): Table | null {
    const index = this._tables.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this._tables[index] = { ...this._tables[index], status };
    return this._tables[index];
  }

  // Reservations
  getReservations(): Reservation[] {
    return [...this._reservations];
  }

  addReservation(res: Omit<Reservation, "id" | "createdAt" | "status">): Reservation {
    const newRes: Reservation = {
      ...res,
      id: crypto.randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    this._reservations.push(newRes);
    return newRes;
  }

  updateReservationStatus(
    id: string,
    status: Reservation["status"]
  ): Reservation | null {
    const index = this._reservations.findIndex((r) => r.id === id);
    if (index === -1) return null;
    this._reservations[index] = { ...this._reservations[index], status };
    return this._reservations[index];
  }

  // Orders
  getOrders(): Order[] {
    return [...this._orders];
  }

  addOrder(order: Omit<Order, "id" | "createdAt">): Order {
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this._orders.push(newOrder);
    return newOrder;
  }

  updateOrderStatus(id: string, status: Order["status"]): Order | null {
    const index = this._orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    this._orders[index] = { ...this._orders[index], status };
    return this._orders[index];
  }
}

export const store = new Store();
