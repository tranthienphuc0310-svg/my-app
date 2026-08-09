import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartState = {
  items: Product[];
  addtoCart: (product: Product) => void;
  removefromcart: (id: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addtoCart: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, product],
          };
        }),

      removefromcart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "cart-storage",
    },
  ),
);
