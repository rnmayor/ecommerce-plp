'use server';

import { jsonRepository } from '../repositories/json-repository';
import { getProductById } from '../services/product-service';

export async function GetProductByIdAction(id: string) {
  return await getProductById(id, jsonRepository());
}
