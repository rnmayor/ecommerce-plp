import {
  type Product,
  ProductSchema,
  type RawProductListResponse,
  RawProductResponseSchema,
} from '../schemas/product-schema';

import type { IProductRepository } from './product-repository-interface';

export const BASE_URL = `https://dummyjson.com/products`;

const buildUrl = (path: string, params?: { limit?: number; skip?: number }) => {
  const url = new URL(`${BASE_URL}${path}`);
  if (params?.limit) {
    url.searchParams.set('limit', String(params.limit));
  }
  if (params?.skip) {
    url.searchParams.set('skip', String(params.skip));
  }

  return url.toString();
};

export const jsonRepository = (): IProductRepository => {
  return {
    async findAll(params): Promise<RawProductListResponse> {
      const res = await fetch(buildUrl('', params));
      if (!res.ok) throw new Error('FETCH_FAILED');

      const json = await res.json();
      return RawProductResponseSchema.parse(json);
    },

    async search(query: string, params): Promise<RawProductListResponse> {
      const res = await fetch(buildUrl(`/search?q=${query}`, params));
      if (!res.ok) throw new Error('FETCH_FAILED');

      const json = await res.json();
      return RawProductResponseSchema.parse(json);
    },

    async findByCategory(category: string, params): Promise<RawProductListResponse> {
      const res = await fetch(buildUrl(`/category/${category}`, params));
      if (!res.ok) throw new Error('FETCH_FAILED');

      const json = await res.json();
      return RawProductResponseSchema.parse(json);
    },

    async findById(id: string): Promise<Product> {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (res.status === 404) throw new Error('PRODUCT_NOT_FOUND');
      if (!res.ok) throw new Error('FETCH_FAILED');

      const json = await res.json();
      return ProductSchema.parse(json);
    },
  };
};
