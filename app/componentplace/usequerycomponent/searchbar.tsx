"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryState } from "nuqs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { productsQueryOptions } from "./queryoption";
import { useTranslations } from "next-intl";

const removeDiacritics = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function SearchBarWithSuggestions() {
  const t = useTranslations("searchbar");
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 200,
    shallow: true,
  });

  const [isFocused, setIsFocused] = useState(false);
  const blurTimeoutRef = useRef<number | null>(null);

  const { data: products } = useSuspenseQuery(productsQueryOptions);

  const suggestionMap = useMemo(() => {
    const map = new Map<string, string[]>();
    const list = Array.isArray(products)
      ? products
      : (products?.products ?? []);

    list.forEach((product: any) => {
      const title =
        typeof product?.title === "string" ? product.title.trim() : "";
      if (!title) return;

      const normalizedTitle = removeDiacritics(title);

      for (let i = 1; i <= normalizedTitle.length; i++) {
        const prefix = normalizedTitle.slice(0, i);
        if (!prefix) continue;

        const existing = map.get(prefix) ?? [];
        if (existing.length < 5 && !existing.includes(title)) {
          map.set(prefix, [...existing, title]);
        }
      }
    });

    return map;
  }, [products]);

  const cleanQuery = useMemo(() => removeDiacritics(search.trim()), [search]);
  const suggestions = useMemo(() => {
    if (!cleanQuery) return [];
    return suggestionMap.get(cleanQuery) ?? [];
  }, [cleanQuery, suggestionMap]);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const handleBlur = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    blurTimeoutRef.current = window.setTimeout(() => setIsFocused(false), 200);
  };

  const handleSuggestionSelect = (title: string) => {
    setSearch(title);
    setIsFocused(false);
  };

  return (
    <div className="relative w-4/5 mx-auto mb-2.5">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
        placeholder={t("searchwords")}
      />

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 border border-gray-200 rounded-xl shadow-lg bg-white z-50 overflow-hidden">
          {suggestions.map((title, index) => (
            <li
              key={`${title}-${index}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => handleSuggestionSelect(title)}
              className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b last:border-0 transition-colors"
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
