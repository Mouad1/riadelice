export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizers" | "mains" | "desserts" | "drinks";
  image?: string;
  available: boolean;
  dietary: ("vegetarian" | "vegan" | "gluten-free" | "spicy")[];
  createdAt: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  location: "indoor" | "outdoor" | "private";
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  tableId?: string;
  status: "pending" | "confirmed" | "cancelled";
  specialRequests?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: "pending" | "preparing" | "ready" | "served" | "paid";
  total: number;
  createdAt: string;
  notes?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    day: string;
    open: string;
    close: string;
  }[];
}
