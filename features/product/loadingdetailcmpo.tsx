export default function Loadingdetail() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            {/* Product Image Skeleton */}
            <div className="flex min-h-125 items-center justify-center bg-gray-50 p-8">
              <div className="h-100 w-100 animate-pulse rounded-2xl bg-gray-200" />
            </div>

            {/* Product Information Skeleton */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              {/* Category */}
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />

              {/* Title */}
              <div className="mt-5 space-y-3">
                <div className="h-10 w-4/5 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-3/5 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Rating */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Description */}
              <div className="mt-6 space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Divider */}
              <div className="my-7 h-px bg-gray-200" />

              {/* Price */}
              <div>
                <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-10 w-28 animate-pulse rounded bg-gray-200" />
              </div>

              {/* Add to cart button */}
              <div className="mt-8 h-14 w-full animate-pulse rounded-xl bg-gray-200" />

              {/* Extra information */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="h-20 animate-pulse rounded-xl bg-gray-100" />

                <div className="h-20 animate-pulse rounded-xl bg-gray-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
