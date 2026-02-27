import type { Product, RawProductListResponse } from '../schemas/product-schema';

export interface IProductRepository {
  findAll(params?: { limit?: number; skip?: number }): Promise<RawProductListResponse>;
  search(q: string, params?: { limit?: number; skip?: number }): Promise<RawProductListResponse>;
  findByCategory(
    category: string,
    params?: { limit?: number; skip?: number },
  ): Promise<RawProductListResponse>;
  findById(id: string): Promise<Product>;
}
