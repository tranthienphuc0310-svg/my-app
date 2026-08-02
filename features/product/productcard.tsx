import Link from "next/link";

type ProductCardProps = {
  product: any;
  href: string;
};

export default function ProductCard({ product, href }: ProductCardProps) {
  return (
    <Link href={href}>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          ID: {product.id}
        </span>

        <div className="mb-2">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {product.category?.toUpperCase()}
          </span>
        </div>

        <h2 className="mt-4 line-clamp-2 text-xl font-bold text-gray-900">
          {product.title}
        </h2>

        <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600">
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
  );
}
