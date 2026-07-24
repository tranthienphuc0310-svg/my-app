"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { useQueryState } from "nuqs";

export default function Navbar() {
  const [lang] = useQueryState("lang", {
    defaultValue: "vi",
  });

  const getLocalizedHref = (path: string) => `${path}?lang=${lang}`;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          <Link href={getLocalizedHref("/")}>Home</Link>
          <Link href={getLocalizedHref("/productpage")}>Product</Link>
        </div>

        <Link
          href={getLocalizedHref("/authpage")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Log in
        </Link>
      </nav>
    </header>
  );
}
