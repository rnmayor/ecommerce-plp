import { type RawProductListResponse, RawProductResponseSchema } from '../schemas/product-schema';

import type { IProductRepository } from './product-repository-interface';

const BASE_URL = 'https://dummyjson.com/products';

export const jsonRepository = (): IProductRepository => {
  return {
    async findAll(): Promise<RawProductListResponse> {
      const res = await fetch(BASE_URL);

      if (!res.ok) {
        throw new Error('Failed to fetch products.');
      }

      const json = await res.json();
      return RawProductResponseSchema.parse(json);
    },
  };
};
