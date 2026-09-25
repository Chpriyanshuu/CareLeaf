import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartLine, Plant } from "./types";

interface CartContextValue {
  lines: CartLine[];
  addToCart: (plant: Plant) => void;
  updateQuantity: (plantId: number, quantity: number) => void;
  removeFromCart: (plantId: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "plantup-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  function addToCart(plant: Plant) {
    setLines((prev) => {
      const existing = prev.find((l) => l.plant.id === plant.id);
      if (existing) {
        return prev.map((l) =>
          l.plant.id === plant.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { plant, quantity: 1 }];
    });
  }

  function updateQuantity(plantId: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.plant.id === plantId ? { ...l, quantity } : l))
    );
  }

  function removeFromCart(plantId: number) {
    setLines((prev) => prev.filter((l) => l.plant.id !== plantId));
  }

  function clearCart() {
    setLines([]);
  }

  const total = lines.reduce((sum, l) => sum + l.plant.price * l.quantity, 0);
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);

  return (
    <CartContext.Provider
      value={{ lines, addToCart, updateQuantity, removeFromCart, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
