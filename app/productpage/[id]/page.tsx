"use client";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Productdetails } from "@/app/componentplace/usequerycomponent/queryoption";
export default function Detailproductpage() {
  const param = useParams();
  const id = param.id as string;
  const { data } = useSuspenseQuery(Productdetails(id));
  console.log(data);
  return (
    <div className="p-8">
      <img src={data.thumbnail} alt={data.title} className="w-80 rounded-lg" />

      <h1 className="mt-4 text-3xl font-bold">{data.title}</h1>

      <p className="mt-3 text-gray-600">{data.description}</p>

      <h2 className="mt-4 text-2xl font-bold text-green-600">${data.price}</h2>

      <p>Category: {data.category}</p>

      <p>Rating: ⭐ {data.rating}</p>
    </div>
  );
}
