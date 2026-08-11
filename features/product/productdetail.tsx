"use client";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Productdetails } from "@/components/queryoption/productdetails";
import Image from "next/image";
import { useCart } from "@/store/cart-store";
export default function Detailproductpage() {
  const param = useParams();
  const addtocart = useCart((state) => state.addtoCart);
  console.log("PARAM:", param);
  console.log("ID:", param.id);

  const id = param.id as string;
  const { data } = useSuspenseQuery(Productdetails(id));
  return (
    <div className="p-8">
      <Image
        src={data.thumbnail}
        alt={data.title}
        className=" rounded-lg justify-center items-center"
        width={400}
        height={400}
      />

      <h1 className="mt-4 text-3xl font-bold">{data.title}</h1>

      <p className="mt-3 text-gray-600">{data.description}</p>

      <h2 className="mt-4 text-2xl font-bold text-green-600">${data.price}</h2>

      <p>Category: {data.category}</p>

      <p>Rating: ⭐ {data.rating}</p>
      <button
        className="cursor-pointer"
        onClick={() =>
          addtocart({
            id: data.id,
            title: data.title,
            thumbnail: data.thumbnail,
            price: data.price,
          })
        }
      >
        add to cart
      </button>
    </div>
  );
}
