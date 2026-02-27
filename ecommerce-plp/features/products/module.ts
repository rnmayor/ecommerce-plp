import { jsonRepository } from './repositories/json-repository';
import { productService } from './services/product-service';

const repository = jsonRepository();

export const productModule = productService(repository);
