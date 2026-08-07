import { useCart } from "@/store/cart-store";
import Image from "next/image";
import { X } from "lucide-react";
export default function Cartpage() {
  const items = useCart((state) => state.items);
  const removeitemfromcart = useCart((state) => state.removefromcart);
  return (
    <>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <X />
              <button onClick={() => removeitemfromcart(item.id)}>
                delete
              </button>
              <span>{item.id}</span>
              <Image
                src={item.thumbnail}
                alt="product image"
                width={200}
                height={200}
              >
                {item.thumbnail}
              </Image>
              
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
