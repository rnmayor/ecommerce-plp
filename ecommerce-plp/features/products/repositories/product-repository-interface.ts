import type { Product, RawProductListResponse } from '../schemas/product-schema';

export interface IProductRepository {
  findAll(): Promise<RawProductListResponse>;
  findById(id: string): Promise<Product>;
}
