import { sortItems } from '@ecommerce/core';
import { z } from 'zod';

import {
  type ProductListResponse,
  type Product,
  type RawProductListResponse,
  ProductListResponseSchema,
} from '../schemas/product-schema';

import type { IProductRepository } from '../repositories/product-repository-interface';
import type { ProductQuery } from '../schemas/product-query-schema';

export async function getProducts(
  query: ProductQuery,
  repository: IProductRepository,
): Promise<ProductListResponse> {
  const { search, category, sort, page, limit } = query;

  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (safePage - 1) * safeLimit;
  const params = { limit: safeLimit, skip };

  let repoData: RawProductListResponse;
  if (category) {
    repoData = await repository.findByCategory(category, params);
  } else if (search) {
    repoData = await repository.search(search, params);
  } else {
    repoData = await repository.findAll(params);
  }

  const products = [...repoData.products];
  // sort
  const sorted = sortItems(products, sort.key, sort.order);
  const totalPages = Math.ceil(repoData.total / safeLimit);

  const output = {
    products: sorted,
    total: repoData.total,
    limit: safeLimit,
    skip: repoData.skip,
    page,
    totalPages,
    hasPrevPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };

  const result = ProductListResponseSchema.safeParse(output);
  if (!result.success) {
    console.error('API Output Validation Error:', z.flattenError(result.error).fieldErrors);
    throw new Error('DATA_INTEGRITY_ERROR');
  }

  return result.data;
}

export async function getProductById(id: string, repository: IProductRepository): Promise<Product> {
  return await repository.findById(id);
}
