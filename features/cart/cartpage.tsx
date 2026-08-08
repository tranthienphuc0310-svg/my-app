"use client";
import { useCart } from "@/store/cart-store";
import Image from "next/image";
import { X } from "lucide-react";
export default function Cartpage() {
  const items = useCart((state) => state.items);
  const removeitemfromcart = useCart((state) => state.removefromcart);
  return (
    <>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <X />
                <button
                  className="cursor-pointer"
                  onClick={() => removeitemfromcart(item.id)}
                >
                  delete
                </button>
                <span>{item.id}</span>
                <Image
                  src={item.thumbnail}
                  alt="product image"
                  width={200}
                  height={200}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1>there is nothing in the cart</h1>
      )}
    </>
  );
}
