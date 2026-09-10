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
