"use client";
import { useQueryState } from "nuqs"; // Import từ nuqs
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "@/components/queryoption/productoption";
import SearchBarWithSuggestions from "@/features/product/searchbar";
import { useMemo } from "react";
import ProductGrid from "./productgrid";
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

      <ProductGrid
        products={productsArray}
        getHref={(id) => getLocalizedHref(`/productpage/${id}`)}
      />
    </div>
  );
}
