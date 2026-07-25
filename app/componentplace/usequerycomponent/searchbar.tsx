"use client";
import { useState, useMemo } from "react";
import { useQueryState } from "nuqs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { productsQueryOptions } from "./queryoption";

export default function SearchBarWithSuggestions() {
  // 1. Quản lý state URL bằng nuqs
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 200,
    shallow: true,
  });

  // State cục bộ để ẩn/hiện danh sách gợi ý khi focus/blur
  const [isFocused, setIsFocused] = useState(false);

  // 2. Lấy dữ liệu bằng useSuspenseQuery
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  // 3. Xây dựng HashMap tối ưu
  const suggestionMap = useMemo(() => {
    const hashMap = new Map();
    const list = Array.isArray(products) ? products : products?.products || [];

    list.forEach((product: any) => {
      const nameLower = product.title?.toLowerCase();
      if (!nameLower) return;

      for (let i = 1; i <= nameLower.length; i++) {
        const prefix = nameLower.substring(0, i).trim();
        if (prefix) {
          if (!hashMap.has(prefix)) {
            hashMap.set(prefix, []);
          }
          if (
            hashMap.get(prefix).length < 5 &&
            !hashMap.get(prefix).includes(product.title)
          ) {
            hashMap.get(prefix).push(product.title);
          }
        }
      }
    });

    return hashMap;
  }, [products]);

  // 4. Lấy kết quả khớp từ HashMap dựa trên URL state `search`
  const cleanQuery = search.trim().toLowerCase();
  const suggestions = cleanQuery ? suggestionMap.get(cleanQuery) || [] : [];

  return (
    /* THAY ĐỔI TẠI ĐÂY: Thay đổi max-w-md và mt-10 thành w-4/5 mx-auto mb-[10px] */
    <div className="relative w-4/5 mx-auto mb-2.5">
      {/* Icon Search */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Input ô tìm kiếm */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        // Trì hoãn blur một chút để kịp nhận sự kiện onClick của danh sách gợi ý
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
        placeholder="Tìm kiếm sản phẩm..."
      />

      {/* Danh sách gợi ý từ HashMap */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 border border-gray-200 rounded-xl shadow-lg bg-white z-50 overflow-hidden">
          {suggestions.map((title: any, index: any) => (
            <li
              key={index}
              onClick={() => setSearch(title)} // Nhấp vào sẽ tự cập nhật lên URL luôn
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
