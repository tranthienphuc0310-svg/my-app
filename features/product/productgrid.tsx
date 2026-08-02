import ProductCard from "./productcard";
type ProductGridProps = {
  products: any[];
  getHref: (id: number) => string;
};
export default function ProductGrid({ products, getHref }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
          href={getHref(product.id)}
        />
      ))}
    </div>
  );
}
