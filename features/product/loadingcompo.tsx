export default function Loading() {
  const skeletonCards = Array.from({ length: 8 });

  return (
    <div className="min-h-screen bg-white px-8 py-10">
      <div className="mb-8 h-10 w-48 animate-pulse rounded-lg bg-gray-200" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            {/* Skeleton cho ID (Dạng nhãn bo tròn) */}
            <div className="h-6 w-16 rounded-full bg-gray-200" />

            {/* Skeleton cho Title (Dạng 2 dòng) */}
            <div className="mt-4 space-y-2">
              <div className="h-6 w-5/6 rounded-md bg-gray-200" />
              <div className="h-6 w-1/2 rounded-md bg-gray-200" />
            </div>

            {/* Skeleton cho Description (Khớp với line-clamp-4) */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-11/12 rounded bg-gray-100" />
              <div className="h-4 w-3/4 rounded bg-gray-100" />
            </div>

            {/* Skeleton cho Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              <div className="h-6 w-14 rounded-full bg-gray-200" />
              <div className="h-6 w-16 rounded-full bg-gray-200" />
              <div className="h-6 w-12 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
