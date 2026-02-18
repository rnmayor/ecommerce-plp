import { getProductsAction } from 'features/products/actions/get-products';
import { CategoryBox } from 'features/products/components/category-box';
import { ProductCard } from 'features/products/components/product-card';
import { CATEGORIES } from 'features/products/constants';

import type { Product } from 'features/products/schemas/product-schema';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const result = await getProductsAction(rawParams);

  return (
    <div className="container mx-auto flex flex-col items-center gap-y-8 px-4 py-10">
      <h1 className="text-4xl font-bold uppercase tracking-wide text-center">
        Product Listings Page
      </h1>
      <div className="flex w-full items-center justify-center gap-4 pb-2 flex-wrap">
        {CATEGORIES.map((item) => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
      <div className="grid w-full justify-items-center gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {result.products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
