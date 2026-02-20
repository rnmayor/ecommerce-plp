import { getProductsAction } from 'features/products/actions/get-products';
import { ProductCard } from 'features/products/components/product-card';
import { ProductCategories } from 'features/products/components/product-categories';
import { ProductPagination } from 'features/products/components/product-pagination';
import { ProductSearch } from 'features/products/components/product-search';
import { ProductSortSelect } from 'features/products/components/product-sort-select';

import type { Product } from 'features/products/schemas/product-schema';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop All Products',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const rawParams = await searchParams;
  const result = await getProductsAction(rawParams);

  return (
    <div className="container mx-auto flex flex-col items-center gap-y-4 px-4 py-10">
      <ProductCategories />
      <div className="flex w-full flex-col gap-y-4 items-center py-4 md:grid md:grid-cols-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">All Products</h1>
          <p className="text-sm text-muted-foreground">{result?.total ?? 0} result(s) found.</p>
        </div>
        <div className="flex w-full max-w-md justify-center">
          <ProductSearch />
        </div>
        <div className="flex justify-start md:justify-end">
          <ProductSortSelect />
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="grid w-full justify-items-center gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {result.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {result.products.length === 0 && (
          <div className="flex h-full items-center justify-center uppercase tracking-tighter md:tracking-wide text-center text-3xl font-bold text-destructive/80">
            No results found
          </div>
        )}
      </div>
      <div className="flex shrink-0 mt-2 pb-8">
        <ProductPagination
          currentPage={result.page}
          totalPages={result.totalPages}
          hasPreviousPage={result.hasPrevPage}
          hasNextPage={result.hasNextPage}
        />
      </div>
    </div>
  );
}
