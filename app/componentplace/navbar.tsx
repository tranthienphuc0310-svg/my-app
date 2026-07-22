"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className={`font-medium transition-colors ${
              pathname === "/"
                ? "text-blue-600 font-bold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href="/productpage"
            className={`font-medium transition-colors ${
              pathname === "/productpage"
                ? "text-blue-600 font-bold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Product
          </Link>
        </div>

        {/* Nút đăng nhập bên phải */}
        <div>
          <Link
            href="/authpage"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
}
