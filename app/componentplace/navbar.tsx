"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LanguagePage from "./Languagechange";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy giá trị lang hiện tại từ URL (mặc định là "vi" nếu không có)
  const lang = searchParams.get("lang") || "vi";

  // Hàm tiện ích giúp tự động gắn ?lang=... vào mọi đường dẫn
  const getLocalizedHref = (path: string) => `${path}?lang=${lang}`;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <LanguagePage />
          <Link
            href={getLocalizedHref("/")}
            className={`font-medium transition-colors ${
              pathname === "/"
                ? "text-blue-600 font-bold"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            href={getLocalizedHref("/productpage")}
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
            href={getLocalizedHref("/authpage")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
}
