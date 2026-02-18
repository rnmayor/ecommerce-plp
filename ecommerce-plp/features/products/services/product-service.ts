import { paginate, sortItems } from '@ecommerce/core';

import {
  ProductListResponseSchema,
  type Product,
  type ProductListResponse,
} from '../schemas/product-schema';

import type { IProductRepository } from '../repositories/product-repository-interface';
import type { ProductQuery } from '../schemas/product-query-schema';

const SEARCHABLE_KEYS: (keyof Product)[] = ['title', 'description'];

export async function getProducts(
  query: ProductQuery,
  repository: IProductRepository,
): Promise<ProductListResponse> {
  const { search, category, sort, page: pageQuery, limit: limitQuery } = query;
  const repoData = await repository.findAll();
  let products = [...repoData.products];

  // search
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter((p) =>
      SEARCHABLE_KEYS.some((key) => String(p[key]).toLowerCase().includes(searchLower)),
    );
  }

  // filter by category
  if (category && category.length > 0) {
    products = products.filter((p) => category.includes(p.category.toLowerCase()));
  }

  // sort
  const sorted = sortItems(products, sort.key, sort.order);

  // paginate
  const { items, total, page, limit, skip } = paginate(sorted, pageQuery, limitQuery);
  const output = { products: items, total, page, limit, skip };
  const result = ProductListResponseSchema.safeParse(output);

  if (!result.success) {
    console.error('API Output Validation Error:', result.error.flatten().fieldErrors);
    throw new Error('DATA_INTEGRITY_ERROR');
  }

  return result.data;
}
