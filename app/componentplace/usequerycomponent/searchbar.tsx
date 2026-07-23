"use client";

import { useQueryState } from "nuqs";
import { Search } from "lucide-react"; // Đảm bảo đã cài lucide-react
export default function SearchBar() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    throttleMs: 200,
    shallow: true,
  });

  return (
    <div className="relative w-full">
      {/* Icon Search */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="block w-full pl-10 pr-4 py-2.5 
                   border border-gray-300 rounded-xl 
                   bg-white shadow-sm
                   placeholder:text-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200"
        placeholder="Tìm kiếm sản phẩm..."
      />
    </div>
  );
}
