"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-6">
          <SidebarTrigger />

          <Link
            href={"/"}
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href={"/productpage"}
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Product
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            href={"/authpage/register"}
            className="rounded-lg border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            Register
          </Link>

          <Link
            href={"/authpage/Login"}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-600"
          >
            <ShoppingCart size={20} />
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}
