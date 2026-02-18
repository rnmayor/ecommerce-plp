import type { RawProductListResponse } from '../schemas/product-schema';

export interface IProductRepository {
  findAll(): Promise<RawProductListResponse>;
}
