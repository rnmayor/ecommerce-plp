import { jsonRepository } from '../repositories/json-repository';
import { ProductQuerySchema } from '../schemas/product-query-schema';
import { getProducts } from '../services/product-service';

export async function getProductsAction(rawParams: {
  [key: string]: string | string[] | undefined;
}) {
  const parseQuery = ProductQuerySchema.parse(rawParams);

  return await getProducts(parseQuery, jsonRepository());
}
