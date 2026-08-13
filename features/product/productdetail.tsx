"use client";

import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Productdetails } from "@/components/queryoption/productdetails";
import { useCart } from "@/store/cart-store";
import Image from "next/image";
import { ShoppingCart, Star, Tag } from "lucide-react";

export default function Detailproductpage() {
  const param = useParams();
  const addtocart = useCart((state) => state.addtoCart);

  const id = param.id as string;

  const { data } = useSuspenseQuery(Productdetails(id));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Product Image */}
            <div className="flex min-h-125 items-center justify-center bg-gray-50 p-8">
              <div className="relative h-100 w-100">
                <Image
                  src={data.thumbnail}
                  alt={data.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              {/* Category */}
              <div className="mb-4 flex items-center gap-2">
                <Tag size={16} className="text-blue-600" />

                <span className="text-sm font-medium capitalize text-blue-600">
                  {data.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                {data.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-yellow-400 text-yellow-400" />

                  <span className="font-semibold text-gray-900">
                    {data.rating}
                  </span>
                </div>

                <span className="text-sm text-gray-500">Customer rating</span>
              </div>

              {/* Description */}
              <p className="mt-6 leading-7 text-gray-600">{data.description}</p>

              {/* Divider */}
              <div className="my-7 h-px bg-gray-200" />

              {/* Price */}
              <div>
                <p className="text-sm text-gray-500">Price</p>

                <p className="mt-1 text-4xl font-bold text-gray-900">
                  ${data.price}
                </p>
              </div>

              {/* Add to cart */}
              <button
                onClick={() =>
                  addtocart({
                    id: data.id,
                    title: data.title,
                    thumbnail: data.thumbnail,
                    price: data.price,
                  })
                }
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                <ShoppingCart size={20} />

                <span>Add to cart</span>
              </button>

              {/* Extra information */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-gray-500">Product ID</p>
                  <p className="mt-1 font-semibold text-gray-900">#{data.id}</p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-gray-500">Category</p>
                  <p className="mt-1 capitalize font-semibold text-gray-900">
                    {data.category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
