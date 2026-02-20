import {
  type Product,
  ProductSchema,
  type RawProductListResponse,
  RawProductResponseSchema,
} from '../schemas/product-schema';

import type { IProductRepository } from './product-repository-interface';

const BASE_URL = `https://dummyjson.com/products`; // ?limit=1000

export const jsonRepository = (): IProductRepository => {
  return {
    async findAll(): Promise<RawProductListResponse> {
      const res = await fetch(BASE_URL);

      if (!res.ok) {
        throw new Error('FETCH_FAILED');
      }

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
