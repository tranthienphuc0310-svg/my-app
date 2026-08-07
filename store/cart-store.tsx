import { create } from "zustand";
interface Cartitem {
  title: string;
  thumbnail: string;
  price: number;
  id: number;
  quantity: number;
}
interface Carttype {
  items: Cartitem[];
  resetCart: () => void;
  addtoCard: (product: Omit<Cartitem, "quantity">) => void;
}
const useCart = create<Carttype>((set) => ({
  items: [],
  resetCart: () => set({ items: [] }),
  addtoCard: (product) =>
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
        items: [
          ...state.items,
          {
            ...product,
            quantity: 1,
          },
        ],
      };
    }),
}));
