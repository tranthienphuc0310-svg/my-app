"use client";

import { useCart } from "@/store/cart-store";
import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cartpage() {
  const items = useCart((state) => state.items);
  const removeitemfromcart = useCart((state) => state.removefromcart);
  const router = useRouter();
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <ShoppingCart className="h-9 w-9 text-green-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => router.push("/productpage")}
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {/* Product Image */}
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-contain p-3"
                />
              </div>

              {/* Product Information */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="line-clamp-2 font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Product ID: {item.id}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeitemfromcart(item.id)}
                    className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label={`Remove ${item.title}`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {/* Quantity */}
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
                    Quantity: {item.quantity}
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
          <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

          <div className="mt-6 space-y-4 border-b border-gray-200 pb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Items</span>
              <span className="font-medium text-gray-900">{totalQuantity}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between py-6">
            <span className="text-lg font-semibold text-gray-900">Total</span>

            <span className="text-xl font-bold text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button className="w-full cursor-pointer rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700">
            Proceed to Checkout
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">
            Secure checkout · Free shipping
          </p>
        </div>
      </div>
    </div>
  );
}
