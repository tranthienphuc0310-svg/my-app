"use client";
import { useQueryState } from "nuqs"; // Import từ nuqs
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/components/queryoption/productoption";
import SearchBarWithSuggestions from "@/features/product/searchbar";
import { useMemo } from "react";
import Link from "next/link";
const removeDiacritics = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function PostPage() {
  const [lang] = useQueryState("lang", {
    defaultValue: "vi",
  });

  const getLocalizedHref = (path: string) => `${path}?lang=${lang}`;

  const { data } = useSuspenseQuery(productsQueryOptions);

  const [search] = useQueryState("search", { defaultValue: "" });

  const productsArray = useMemo(() => {
    if (!data?.products) return [];

    const searchTerm = search.toLowerCase();

    // 1. Lọc sản phẩm
    const filtered = data.products.filter((product: any) => {
      const title = removeDiacritics(product.title || "");
      const description = removeDiacritics(product.description || "");
      const category = removeDiacritics(product.category || "");

      return (
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        category.includes(searchTerm)
      );
    });
    return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }, [data?.products, search]);

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <SearchBarWithSuggestions />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.isArray(productsArray) &&
          productsArray.map((product: any) => (
            <Link
              key={product.id}
              href={getLocalizedHref(`/productpage/${product.id}`)}
            >
              <div
                key={product.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Nội dung card giữ nguyên */}
                <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  ID: {product.id}
                </span>
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {product.category?.toUpperCase()}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 line-clamp-2">
                  {product.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-4">
                  {product.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
