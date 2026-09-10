# Restaurant Website MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-stack restaurant website MVP with a public-facing site (menu, reservations, gallery, contact) and a staff admin dashboard (menu CRUD, table management, order management, reservation approvals).

**Architecture:** Next.js 14 App Router with Tailwind CSS, TypeScript throughout. Public pages use SSR/SSG. Admin dashboard behind simple auth. Data stored in hardcoded TypeScript files (swap to CMS later). Responsive design, mobile-first.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React icons, date-fns, zod (validation), next/navigation

---

## File Structure

```
restaurant-mvp/
├── public/
│   └── images/                    # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (providers, nav, footer)
│   │   ├── page.tsx               # Home page
│   │   ├── menu/
│   │   │   └── page.tsx           # Public menu page
│   │   ├── reservations/
│   │   │   └── page.tsx           # Reservation form
│   │   ├── contact/
│   │   │   └── page.tsx           # Contact page
│   │   ├── about/
│   │   │   └── page.tsx           # About page
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Admin layout (sidebar)
│   │   │   ├── page.tsx           # Admin dashboard
│   │   │   ├── menu/
│   │   │   │   └── page.tsx       # Menu CRUD
│   │   │   ├── tables/
│   │   │   │   └── page.tsx       # Table management
│   │   │   ├── orders/
│   │   │   │   └── page.tsx       # Order management
│   │   │   └── reservations/
│   │   │       └── page.tsx       # Reservation approvals
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                    # Shared UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Select.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── FeaturedMenu.tsx
│   │   │   ├── AboutPreview.tsx
│   │   │   └── ReservationCTA.tsx
│   │   ├── menu/
│   │   │   ├── MenuCategory.tsx
│   │   │   ├── MenuItem.tsx
│   │   │   └── MenuFilter.tsx
│   │   └── admin/
│   │       ├── MenuForm.tsx
│   │       ├── TableGrid.tsx
│   │       ├── OrderCard.tsx
│   │       └── ReservationRow.tsx
│   ├── data/
│   │   ├── menu.ts                # Menu data
│   │   ├── tables.ts              # Table data
│   │   ├── reservations.ts        # Reservation data
│   │   └── restaurant.ts          # Restaurant info
│   ├── types/
│   │   └── index.ts               # Shared TypeScript types
│   └── lib/
│       ├── store.ts               # Simple in-memory state (MVP)
│       └── utils.ts               # Helper functions
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── .env.local
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest restaurant-mvp --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- [ ] **Step 2: Install dependencies**

```bash
cd restaurant-mvp && npm install lucide-react date-fns zod
```

- [ ] **Step 3: Update tailwind.config.ts with custom theme**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ee",
          100: "#fdedd3",
          200: "#f9d7a5",
          300: "#f5b96d",
          400: "#f09333",
          500: "#ed7712",
          600: "#de5c08",
          700: "#b84409",
          800: "#93360e",
          900: "#772e0f",
        },
        dark: {
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Create globals.css with Tailwind directives and base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

@layer base {
  body {
    @apply bg-dark-900 text-dark-50 antialiased;
  }
}

@layer components {
  .container-custom {
    @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
  }
}
```

- [ ] **Step 5: Create root layout.tsx**

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LE RIAD DES DELICES | Fine Dining Restaurant",
  description: "Experience exquisite cuisine in an elegant atmosphere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev
```

Expected: Server starts at http://localhost:3000

- [ ] **Step 7: Commit**

```bash
git init && git add . && git commit -m "feat: scaffold Next.js restaurant MVP project"
```

---

### Task 2: TypeScript Types & Data Layer

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/menu.ts`
- Create: `src/data/tables.ts`
- Create: `src/data/reservations.ts`
- Create: `src/data/restaurant.ts`
- Create: `src/lib/store.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create shared types**

```typescript
// src/types/index.ts
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
```

- [ ] **Step 2: Create menu data**

```typescript
// src/data/menu.ts
import { MenuItem } from "@/types";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Bruschetta Trio",
    description: "Toasted sourdough with tomato basil, mushroom truffle, and ricotta honey",
    price: 14,
    category: "appetizers",
    available: true,
    dietary: ["vegetarian"],
    createdAt: "2025-01-01",
  },
  {
    id: "2",
    name: "Tuna Tartare",
    description: "Fresh ahi tuna, avocado, sesame ginger dressing, wonton crisps",
    price: 18,
    category: "appetizers",
    available: true,
    dietary: ["gluten-free"],
    createdAt: "2025-01-01",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Romaine hearts, parmesan, croutons, house-made Caesar dressing",
    price: 12,
    category: "appetizers",
    available: true,
    dietary: ["vegetarian"],
    createdAt: "2025-01-01",
  },
  {
    id: "4",
    name: "Grilled Ribeye",
    description: "12oz prime ribeye, roasted garlic butter, truffle mashed potatoes",
    price: 48,
    category: "mains",
    available: true,
    dietary: ["gluten-free"],
    createdAt: "2025-01-01",
  },
  {
    id: "5",
    name: "Pan-Seared Salmon",
    description: "Atlantic salmon, lemon dill sauce, asparagus, wild rice",
    price: 36,
    category: "mains",
    available: true,
    dietary: ["gluten-free"],
    createdAt: "2025-01-01",
  },
  {
    id: "6",
    name: "Mushroom Risotto",
    description: "Arborio rice, wild mushrooms, parmesan, white truffle oil",
    price: 28,
    category: "mains",
    available: true,
    dietary: ["vegetarian", "gluten-free"],
    createdAt: "2025-01-01",
  },
  {
    id: "7",
    name: "Chicken Marsala",
    description: "Pan-fried chicken breast, mushroom marsala sauce, spaghetti",
    price: 32,
    category: "mains",
    available: true,
    dietary: [],
    createdAt: "2025-01-01",
  },
  {
    id: "8",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake, molten center, vanilla ice cream",
    price: 14,
    category: "desserts",
    available: true,
    dietary: ["vegetarian"],
    createdAt: "2025-01-01",
  },
  {
    id: "9",
    name: "Crème Brûlée",
    description: "Classic vanilla custard, caramelized sugar crust",
    price: 12,
    category: "desserts",
    available: true,
    dietary: ["vegetarian", "gluten-free"],
    createdAt: "2025-01-01",
  },
  {
    id: "10",
    name: "Tiramisu",
    description: "Espresso-soaked ladyfingers, mascarpone cream, cocoa",
    price: 13,
    category: "desserts",
    available: true,
    dietary: ["vegetarian"],
    createdAt: "2025-01-01",
  },
  {
    id: "11",
    name: "House Red Wine",
    description: "Glass of premium Cabernet Sauvignon",
    price: 14,
    category: "drinks",
    available: true,
    dietary: ["vegan", "gluten-free"],
    createdAt: "2025-01-01",
  },
  {
    id: "12",
    name: "Craft Cocktail",
    description: "Seasonal signature cocktail, ask your server",
    price: 16,
    category: "drinks",
    available: true,
    dietary: ["vegan", "gluten-free"],
    createdAt: "2025-01-01",
  },
];
```

- [ ] **Step 3: Create tables data**

```typescript
// src/data/tables.ts
import { Table } from "@/types";

export const tables: Table[] = [
  { id: "t1", number: 1, capacity: 2, status: "available", location: "indoor" },
  { id: "t2", number: 2, capacity: 2, status: "available", location: "indoor" },
  { id: "t3", number: 3, capacity: 4, status: "available", location: "indoor" },
  { id: "t4", number: 4, capacity: 4, status: "available", location: "indoor" },
  { id: "t5", number: 5, capacity: 6, status: "available", location: "indoor" },
  { id: "t6", number: 6, capacity: 8, status: "available", location: "indoor" },
  { id: "t7", number: 7, capacity: 2, status: "available", location: "outdoor" },
  { id: "t8", number: 8, capacity: 4, status: "available", location: "outdoor" },
  { id: "t9", number: 9, capacity: 4, status: "available", location: "outdoor" },
  { id: "t10", number: 10, capacity: 6, status: "available", location: "outdoor" },
  { id: "t11", number: 11, capacity: 10, status: "available", location: "private" },
  { id: "t12", number: 12, capacity: 12, status: "available", location: "private" },
];
```

- [ ] **Step 4: Create restaurant info & reservation data**

```typescript
// src/data/restaurant.ts
import { Restaurant } from "@/types";

export const restaurant: Restaurant = {
  name: "LE RIAD DES DELICES",
  tagline: "Where Every Meal Becomes a Memory",
  description:
    "Nestled in the heart of downtown, LE RIAD DES DELICES offers an intimate dining experience that celebrates the art of French-inspired cuisine. Our chefs source the finest local ingredients to create dishes that delight the palate and nourish the soul.",
  address: "123 Gourmet Avenue, Downtown, NY 10001",
  phone: "+1 (212) 555-0199",
  email: "reservations@leriaddesdelices.com",
  hours: [
    { day: "Monday", open: "11:30", close: "22:00" },
    { day: "Tuesday", open: "11:30", close: "22:00" },
    { day: "Wednesday", open: "11:30", close: "22:00" },
    { day: "Thursday", open: "11:30", close: "23:00" },
    { day: "Friday", open: "11:30", close: "23:00" },
    { day: "Saturday", open: "10:00", close: "23:00" },
    { day: "Sunday", open: "10:00", close: "22:00" },
  ],
};
```

```typescript
// src/data/reservations.ts
import { Reservation } from "@/types";

export const reservations: Reservation[] = [
  {
    id: "r1",
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1 555-0101",
    date: "2025-02-14",
    time: "19:00",
    partySize: 2,
    status: "confirmed",
    createdAt: "2025-01-28",
  },
  {
    id: "r2",
    customerName: "Emily Johnson",
    email: "emily@example.com",
    phone: "+1 555-0102",
    date: "2025-02-14",
    time: "20:00",
    partySize: 4,
    status: "pending",
    specialRequests: "Anniversary dinner, window seat preferred",
    createdAt: "2025-01-29",
  },
];
```

- [ ] **Step 5: Create in-memory store for state management**

```typescript
// src/lib/store.ts
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
    return this._menuItems;
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

  updateMenuItem(id: string, updates: Partial<MenuItem>): MenuItem | null {
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
    return this._tables;
  }

  updateTableStatus(id: string, status: Table["status"]): Table | null {
    const index = this._tables.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this._tables[index] = { ...this._tables[index], status };
    return this._tables[index];
  }

  // Reservations
  getReservations(): Reservation[] {
    return this._reservations;
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
    return this._orders;
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
```

- [ ] **Step 6: Create utility functions**

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: "bg-green-500/20 text-green-400",
    occupied: "bg-red-500/20 text-red-400",
    reserved: "bg-yellow-500/20 text-yellow-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    confirmed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
    preparing: "bg-blue-500/20 text-blue-400",
    ready: "bg-green-500/20 text-green-400",
    served: "bg-purple-500/20 text-purple-400",
    paid: "bg-gray-500/20 text-gray-400",
  };
  return colors[status] || "bg-gray-500/20 text-gray-400";
}
```

- [ ] **Step 7: Install clsx dependency**

```bash
npm install clsx
```

- [ ] **Step 8: Commit**

```bash
git add . && git commit -m "feat: add TypeScript types, data layer, and store"
```

---

### Task 3: UI Components Library

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Input.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Select.tsx`
- Create: `src/components/ui/Modal.tsx`

- [ ] **Step 1: Create Button component**

```tsx
// src/components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500":
              variant === "primary",
            "bg-dark-700 text-dark-50 hover:bg-dark-600 focus:ring-dark-500":
              variant === "secondary",
            "border border-dark-600 text-dark-200 hover:bg-dark-800 focus:ring-dark-500":
              variant === "outline",
            "text-dark-200 hover:bg-dark-800 hover:text-dark-50 focus:ring-dark-500":
              variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
              variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
```

- [ ] **Step 2: Create Card component**

```tsx
// src/components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-dark-700 bg-dark-800/50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 border-b border-dark-700", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardContent };
```

- [ ] **Step 3: Create Input component**

```tsx
// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-dark-200">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
```

- [ ] **Step 4: Create Badge and Select components**

```tsx
// src/components/ui/Badge.tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-dark-700 text-dark-200": variant === "default",
          "bg-green-500/20 text-green-400": variant === "success",
          "bg-yellow-500/20 text-yellow-400": variant === "warning",
          "bg-red-500/20 text-red-400": variant === "danger",
          "bg-blue-500/20 text-blue-400": variant === "info",
        },
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
export { Badge };
```

```tsx
// src/components/ui/Select.tsx
import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, id, ...props }, ref) => (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark-200">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
);
Select.displayName = "Select";
export { Select };
```

- [ ] **Step 5: Create Modal component**

```tsx
// src/components/ui/Modal.tsx
"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className={cn(
          "w-full max-w-lg rounded-xl border border-dark-700 bg-dark-800 shadow-2xl",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-dark-700 px-6 py-4">
            <h2 className="text-lg font-semibold text-dark-50">{title}</h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-dark-400 hover:bg-dark-700 hover:text-dark-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add . && git commit -m "feat: add UI component library (Button, Card, Input, Badge, Select, Modal)"
```

---

### Task 4: Layout Components (Navbar, Footer, AdminSidebar)

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/AdminSidebar.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-dark-700 bg-dark-900/80 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <UtensilsCrossed className="h-6 w-6 text-primary-500 group-hover:rotate-12 transition-transform" />
            <span className="font-display text-xl font-bold text-dark-50">
              LE RIAD DES DELICES
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-dark-300 hover:text-primary-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="text-sm font-medium text-primary-500 hover:text-primary-400 transition-colors"
            >
              Staff Portal
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-dark-50"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-dark-300 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-primary-500 hover:bg-dark-800 rounded-lg transition-colors"
            >
              Staff Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Create Footer**

```tsx
// src/components/layout/Footer.tsx
import Link from "next/link";
import { UtensilsCrossed, MapPin, Phone, Mail } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <UtensilsCrossed className="h-6 w-6 text-primary-500" />
              <span className="font-display text-xl font-bold text-dark-50">
                LE RIAD DES DELICES
              </span>
            </Link>
            <p className="text-dark-400 text-sm max-w-md">
              {restaurant.description}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-dark-50 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-dark-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-500" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary-500" />
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary-500" />
                <span>{restaurant.email}</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold text-dark-50 mb-4">Hours</h3>
            <div className="space-y-1 text-sm text-dark-400">
              {restaurant.hours.slice(0, 5).map((h) => (
                <div key={h.day} className="flex justify-between">
                  <span>{h.day}</span>
                  <span>{h.open} - {h.close}</span>
                </div>
              ))}
              <div className="flex justify-between text-primary-400 font-medium pt-1">
                <span>Weekend</span>
                <span>{restaurant.hours[5].open} - {restaurant.hours[5].close}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-700 text-center text-sm text-dark-500">
          <p>&copy; {new Date().getFullYear()} LE RIAD DES DELICES. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create AdminSidebar**

```tsx
// src/components/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Grid3X3,
  ClipboardList,
  CalendarCheck,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/tables", label: "Tables", icon: Grid3X3 },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/reservations", label: "Reservations", icon: CalendarCheck },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-dark-700 bg-dark-900 min-h-screen p-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-dark-400 hover:text-dark-50 transition-colors mb-8 px-3 py-2"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back to Site</span>
      </Link>

      <nav className="space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-500/10 text-primary-400"
                  : "text-dark-300 hover:bg-dark-800 hover:text-dark-50"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add . && git commit -m "feat: add layout components (Navbar, Footer, AdminSidebar)"
```

---

### Task 5: Public Pages - Home, Menu, Reservations, About, Contact

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/FeaturedMenu.tsx`
- Create: `src/components/home/AboutPreview.tsx`
- Create: `src/components/home/ReservationCTA.tsx`
- Create: `src/components/menu/MenuCategory.tsx`
- Create: `src/components/menu/MenuItem.tsx`
- Create: `src/components/menu/MenuFilter.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/menu/page.tsx`
- Create: `src/app/reservations/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create Hero component**

```tsx
// src/components/home/Hero.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-primary-900/20" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary-400 font-medium tracking-widest uppercase mb-4">
          Fine Dining Experience
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-dark-50 mb-6">
          Where Every Meal
          <br />
          <span className="text-primary-400">Becomes a Memory</span>
        </h1>
        <p className="text-dark-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Indulge in exquisite cuisine crafted from the finest local ingredients,
          served in an atmosphere of timeless elegance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg">
              View Menu <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/reservations">
            <Button variant="outline" size="lg">
              Reserve a Table
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create FeaturedMenu component**

```tsx
// src/components/home/FeaturedMenu.tsx
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
```

- [ ] **Step 3: Create AboutPreview and ReservationCTA**

```tsx
// src/components/home/AboutPreview.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";

export function AboutPreview() {
  return (
    <section className="py-24 bg-dark-800/30">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
              Our Story
            </p>
            <h2 className="font-display text-4xl font-bold text-dark-50 mb-6">
              A Legacy of Culinary Excellence
            </h2>
            <p className="text-dark-300 leading-relaxed mb-6">
              {restaurant.description}
            </p>
            <p className="text-dark-300 leading-relaxed mb-8">
              Our award-winning chefs combine traditional techniques with modern innovation,
              creating dishes that are both familiar and surprising. Every plate tells a story,
              every visit creates a memory.
            </p>
            <Link href="/about">
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-500/20 to-dark-700 flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl font-display font-bold text-primary-400">15</span>
                <p className="text-dark-300 mt-2">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

```tsx
// src/components/home/ReservationCTA.tsx
import Link from "next/link";
import { CalendarDays, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ReservationCTA() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 p-12 md:p-16">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Reserve Your Table
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join us for an unforgettable dining experience. Book your table today
              and let us take care of the rest.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/90">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} />
                <span>Open 7 Days</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>Lunch & Dinner</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>Up to 12 Guests</span>
              </div>
            </div>

            <Link href="/reservations">
              <Button variant="secondary" size="lg" className="bg-white text-dark-900 hover:bg-dark-50">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Home page**

```tsx
// src/app/page.tsx
import { Hero } from "@/components/home/Hero";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ReservationCTA } from "@/components/home/ReservationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <AboutPreview />
      <ReservationCTA />
    </>
  );
}
```

- [ ] **Step 5: Create Menu components and page**

```tsx
// src/components/menu/MenuFilter.tsx
"use client";

import { Badge } from "@/components/ui/Badge";
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
```

```tsx
// src/components/menu/MenuItem.tsx
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { MenuItem as MenuItemType } from "@/types";

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <Card className="group hover:border-primary-500/50 transition-all duration-300">
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
```

```tsx
// src/components/menu/MenuCategory.tsx
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
```

```tsx
// src/app/menu/page.tsx
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
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Culinary Artistry
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-4">Our Menu</h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Each dish is crafted with passion using the freshest seasonal ingredients
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-12">
          <MenuFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Menu Items */}
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
          <div className="space-y-4 max-w-3xl mx-auto">
            {filteredItems.map((item) => (
              <div key={item.id}> {/* Simplified rendering for filtered view */}
                <MenuCategory title="" items={filteredItems} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create Reservations page**

```tsx
// src/app/reservations/page.tsx
"use client";

import { useState } from "react";
import { CalendarDays, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "2",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-24 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-12">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-dark-50 mb-2">
              Reservation Received!
            </h2>
            <p className="text-dark-300 mb-6">
              We&apos;ll confirm your reservation via email shortly.
            </p>
            <Button onClick={() => setSubmitted(false)}>Make Another Reservation</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Book a Table
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-4">
            Make a Reservation
          </h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Secure your spot for an unforgettable dining experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-dark-50">Reservation Details</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    id="name"
                    placeholder="John Smith"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-dark-200">
                      Party Size
                    </label>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-dark-400" />
                      <select
                        value={form.partySize}
                        onChange={(e) => setForm({ ...form, partySize: e.target.value })}
                        className="flex-1 rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    id="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-dark-200">
                      Time
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-dark-400" />
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="flex-1 rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        required
                      >
                        <option value="">Select time</option>
                        {[
                          "11:30", "12:00", "12:30", "13:00", "13:30",
                          "17:00", "17:30", "18:00", "18:30", "19:00",
                          "19:30", "20:00", "20:30", "21:00",
                        ].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-dark-200">
                    Special Requests
                  </label>
                  <textarea
                    value={form.specialRequests}
                    onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                    placeholder="Allergies, celebrations, seating preferences..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Reserve Table
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create About and Contact pages**

```tsx
// src/app/about/page.tsx
import { MapPin, Phone, Mail, Clock, Award, Users, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { restaurant } from "@/data/restaurant";

export default function AboutPage() {
  const stats = [
    { icon: Award, value: "15+", label: "Years of Excellence" },
    { icon: Users, value: "50k+", label: "Happy Guests" },
    { icon: Utensils, value: "200+", label: "Signature Dishes" },
  ];

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Our Story
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-6">About LE RIAD DES DELICES</h1>
          <p className="text-dark-300 max-w-3xl mx-auto text-lg leading-relaxed">
            {restaurant.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="py-8">
                <stat.icon className="h-10 w-10 text-primary-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-dark-50 mb-1">{stat.value}</div>
                <div className="text-dark-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Utensils className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="font-semibold text-dark-50 mb-2">Farm to Table</h3>
            <p className="text-dark-400 text-sm">
              We partner with local farmers and suppliers to bring you the freshest seasonal ingredients.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="font-semibold text-dark-50 mb-2">Culinary Excellence</h3>
            <p className="text-dark-400 text-sm">
              Our award-winning chefs bring passion and innovation to every dish they create.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary-400" />
            </div>
            <h3 className="font-semibold text-dark-50 mb-2">Warm Hospitality</h3>
            <p className="text-dark-400 text-sm">
              From the moment you walk in, you&apos;re family. We believe great food starts with great service.
            </p>
          </div>
        </div>

        {/* Hours & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent>
              <h2 className="font-display text-2xl font-bold text-dark-50 mb-6">Hours</h2>
              <div className="space-y-3">
                {restaurant.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-dark-300">
                    <span>{h.day}</span>
                    <span className="text-dark-100">{h.open} - {h.close}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-display text-2xl font-bold text-dark-50 mb-6">Contact</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                  <span className="text-dark-300">{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <span className="text-dark-300">{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary-400" />
                  <span className="text-dark-300">{restaurant.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

```tsx
// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/data/restaurant";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-primary-400 font-medium tracking-widest uppercase mb-2">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl font-bold text-dark-50 mb-4">Contact Us</h1>
          <p className="text-dark-300 max-w-xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-medium text-dark-50 mb-1">Address</h3>
                  <p className="text-dark-400 text-sm">{restaurant.address}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-medium text-dark-50 mb-1">Phone</h3>
                  <p className="text-dark-400 text-sm">{restaurant.phone}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary-400 mt-1" />
                <div>
                  <h3 className="font-medium text-dark-50 mb-1">Email</h3>
                  <p className="text-dark-400 text-sm">{restaurant.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-dark-50">Send a Message</h2>
              </CardHeader>
              <CardContent>
                {sent ? (
                  <div className="text-center py-12">
                    <p className="text-green-400 text-lg font-medium">Message sent! We&apos;ll get back to you soon.</p>
                    <Button className="mt-4" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Name"
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      <Input
                        label="Email"
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <Input
                      label="Subject"
                      id="subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-dark-200">Message</label>
                      <textarea
                        rows={5}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-lg border border-dark-600 bg-dark-800 px-4 py-2.5 text-dark-50 placeholder:text-dark-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    <Button type="submit" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Commit**

```bash
git add . && git commit -m "feat: add public pages (Home, Menu, Reservations, About, Contact)"
```

---

### Task 6: Admin Dashboard Pages

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/app/admin/menu/page.tsx`
- Create: `src/app/admin/tables/page.tsx`
- Create: `src/app/admin/orders/page.tsx`
- Create: `src/app/admin/reservations/page.tsx`
- Create: `src/components/admin/MenuForm.tsx`
- Create: `src/components/admin/OrderCard.tsx`
- Create: `src/components/admin/ReservationRow.tsx`

- [ ] **Step 1: Create Admin layout**

```tsx
// src/app/admin/layout.tsx
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <div className="flex-1 p-8 bg-dark-900">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Create Admin Dashboard**

```tsx
// src/app/admin/page.tsx
import { ClipboardList, CalendarCheck, UtensilsCrossed, Grid3X3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { store } from "@/lib/store";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Menu Items",
      value: store.getMenuItems().length,
      icon: UtensilsCrossed,
      color: "text-blue-400",
    },
    {
      label: "Active Tables",
      value: store.getTables().filter((t) => t.status === "available").length,
      icon: Grid3X3,
      color: "text-green-400",
    },
    {
      label: "Pending Orders",
      value: store.getOrders().filter((o) => o.status === "pending").length,
      icon: ClipboardList,
      color: "text-yellow-400",
    },
    {
      label: "Pending Reservations",
      value: store.getReservations().filter((r) => r.status === "pending").length,
      icon: CalendarCheck,
      color: "text-purple-400",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 py-6">
              <div className={`p-3 rounded-xl bg-dark-700 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold text-dark-50">{stat.value}</div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardContent>
            <h2 className="font-semibold text-dark-50 mb-4">Recent Orders</h2>
            {store.getOrders().length === 0 ? (
              <p className="text-dark-400 text-sm">No orders yet</p>
            ) : (
              <div className="space-y-3">
                {store.getOrders().slice(0, 5).map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 rounded-lg bg-dark-700/50">
                    <span className="text-dark-200">Table {order.tableId}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                      order.status === "ready" ? "bg-green-500/20 text-green-400" :
                      "bg-dark-600 text-dark-300"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Reservations */}
        <Card>
          <CardContent>
            <h2 className="font-semibold text-dark-50 mb-4">Recent Reservations</h2>
            {store.getReservations().length === 0 ? (
              <p className="text-dark-400 text-sm">No reservations yet</p>
            ) : (
              <div className="space-y-3">
                {store.getReservations().slice(0, 5).map((res) => (
                  <div key={res.id} className="flex justify-between items-center p-3 rounded-lg bg-dark-700/50">
                    <div>
                      <span className="text-dark-200">{res.customerName}</span>
                      <span className="text-dark-400 text-sm ml-2">({res.partySize} guests)</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      res.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                      res.status === "confirmed" ? "bg-green-500/20 text-green-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Admin Menu page with CRUD**

```tsx
// src/components/admin/MenuForm.tsx
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
    category: item?.category || "mains",
    available: item?.available ?? true,
    dietary: item?.dietary || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form as Omit<MenuItem, "id" | "createdAt">);
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
```

```tsx
// src/app/admin/menu/page.tsx
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
    store.deleteMenuItem(id);
    refresh();
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
            <CardContent className="flex items-center justify-between py-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
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
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Menu Item">
        <MenuForm onSubmit={handleAdd} onCancel={() => setShowModal(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Menu Item">
        {editing && (
          <MenuForm item={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        )}
      </Modal>
    </div>
  );
}
```

- [ ] **Step 4: Create Tables management page**

```tsx
// src/app/admin/tables/page.tsx
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
```

- [ ] **Step 5: Create Orders management page**

```tsx
// src/components/admin/OrderCard.tsx
import { Clock, CheckCircle, ChefHat, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types";

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: Order["status"]) => void;
}

const statusFlow: Record<string, Order["status"]> = {
  pending: "preparing",
  preparing: "ready",
  ready: "served",
  served: "paid",
};

const statusIcons = {
  pending: Clock,
  preparing: ChefHat,
  ready: CheckCircle,
  served: CheckCircle,
  paid: CreditCard,
};

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const nextStatus = statusFlow[order.status];
  const Icon = statusIcons[order.status];

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="font-semibold text-dark-50">Order #{order.id.slice(0, 8)}</span>
            <span className="text-dark-400 text-sm ml-2">Table {order.tableId}</span>
          </div>
          <Badge variant={order.status === "paid" ? "default" : "info"}>
            <Icon size={12} className="mr-1" />
            {order.status}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm text-dark-300">
              <span>{item.quantity}x {item.name}</span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-dark-700">
          <span className="font-bold text-dark-50">Total: {formatCurrency(order.total)}</span>
          {nextStatus && (
            <Button size="sm" onClick={() => onStatusChange(order.id, nextStatus)}>
              Mark as {nextStatus}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

```tsx
// src/app/admin/orders/page.tsx
"use client";

import { useState } from "react";
import { OrderCard } from "@/components/admin/OrderCard";
import { store } from "@/lib/store";
import { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(store.getOrders());

  const updateStatus = (id: string, status: Order["status"]) => {
    store.updateOrderStatus(id, status);
    setOrders([...store.getOrders()]);
  };

  const activeOrders = orders.filter((o) => o.status !== "paid");
  const completedOrders = orders.filter((o) => o.status === "paid");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Order Management</h1>

      {activeOrders.length === 0 && completedOrders.length === 0 ? (
        <div className="text-center py-16 text-dark-400">
          <p className="text-lg">No orders yet</p>
          <p className="text-sm mt-1">Orders will appear here when customers place them</p>
        </div>
      ) : (
        <div className="space-y-8">
          {activeOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-dark-200 mb-4">Active Orders ({activeOrders.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
                ))}
              </div>
            </div>
          )}

          {completedOrders.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-dark-200 mb-4">Completed Orders ({completedOrders.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={updateStatus} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Create Reservations management page**

```tsx
// src/components/admin/ReservationRow.tsx
import { Check, X, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reservation } from "@/types";

interface ReservationRowProps {
  reservation: Reservation;
  onStatusChange: (id: string, status: Reservation["status"]) => void;
}

export function ReservationRow({ reservation, onStatusChange }: ReservationRowProps) {
  return (
    <tr className="border-b border-dark-700 hover:bg-dark-800/50">
      <td className="py-4 px-4">
        <div>
          <div className="font-medium text-dark-50">{reservation.customerName}</div>
          <div className="text-sm text-dark-400">{reservation.email}</div>
        </div>
      </td>
      <td className="py-4 px-4 text-dark-300">{reservation.phone}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2 text-dark-200">
          <CalendarDays size={14} className="text-primary-400" />
          {reservation.date}
        </div>
      </td>
      <td className="py-4 px-4 text-dark-300">{reservation.time}</td>
      <td className="py-4 px-4 text-dark-300">{reservation.partySize} guests</td>
      <td className="py-4 px-4">
        <Badge variant={reservation.status === "confirmed" ? "success" : reservation.status === "pending" ? "warning" : "danger"}>
          {reservation.status}
        </Badge>
      </td>
      <td className="py-4 px-4">
        {reservation.specialRequests && (
          <p className="text-sm text-dark-400 max-w-xs">{reservation.specialRequests}</p>
        )}
      </td>
      <td className="py-4 px-4">
        {reservation.status === "pending" && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onStatusChange(reservation.id, "confirmed")}
            >
              <Check size={14} className="mr-1" />
              Confirm
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onStatusChange(reservation.id, "cancelled")}
            >
              <X size={14} className="mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </td>
    </tr>
  );
}
```

```tsx
// src/app/admin/reservations/page.tsx
"use client";

import { useState } from "react";
import { ReservationRow } from "@/components/admin/ReservationRow";
import { store } from "@/lib/store";
import { Reservation } from "@/types";

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState(store.getReservations());

  const updateStatus = (id: string, status: Reservation["status"]) => {
    store.updateReservationStatus(id, status);
    setReservations([...store.getReservations()]);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-dark-50 mb-8">Reservation Management</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-16 text-dark-400">
          <p className="text-lg">No reservations yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700 text-left text-sm text-dark-400">
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Party</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <ReservationRow key={res.id} reservation={res} onStatusChange={updateStatus} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add . && git commit -m "feat: add admin dashboard (Menu CRUD, Tables, Orders, Reservations)"
```

---

### Task 7: Final Polish & Verification

**Files:**
- Modify: `src/app/globals.css`
- Verify all pages render

- [ ] **Step 1: Run dev server and verify all pages**

```bash
npm run dev
```

Verify these pages load without errors:
- http://localhost:3000 (Home)
- http://localhost:3000/menu
- http://localhost:3000/reservations
- http://localhost:3000/about
- http://localhost:3000/contact
- http://localhost:3000/admin
- http://localhost:3000/admin/menu
- http://localhost:3000/admin/tables
- http://localhost:3000/admin/orders
- http://localhost:3000/admin/reservations

- [ ] **Step 2: Run type check**

```bash
npx tsc --noEmit
```

Expected: No type errors

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build succeeds

- [ ] **Step 4: Fix any build errors (if any)**

- [ ] **Step 5: Final commit**

```bash
git add . && git commit -m "fix: resolve build issues and polish MVP"
```

---

## Summary

### Public Website (5 pages)
1. **Home** - Hero, featured dishes, about preview, reservation CTA
2. **Menu** - Filterable menu by category with dietary badges
3. **Reservations** - Full booking form with date/time/party size
4. **About** - Restaurant story, stats, values, hours & contact
5. **Contact** - Contact form + info cards

### Admin Dashboard (5 pages)
1. **Dashboard** - Stats overview (menu items, tables, orders, reservations)
2. **Menu Management** - Full CRUD with modal forms
3. **Table Management** - Visual grid with status controls
4. **Order Management** - Order cards with status progression
5. **Reservation Management** - Table with confirm/cancel actions

### Data
- 12 menu items across 4 categories
- 12 tables across 3 locations
- Sample reservations
- Restaurant info (hours, contact)

### Future Enhancements
- Connect to Sanity CMS (swap hardcoded data)
- Add authentication for admin
- Connect to database for persistence
- Add payment processing
- Add email notifications
