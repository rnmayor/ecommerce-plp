import { productService } from 'features/products/services/product-service';
import {
  createMockProduct,
  createMockProductQuery,
} from 'features/products/testing/product-factory';
import { describe, vi, it, expect, beforeEach } from 'vitest';

import type { IProductRepository } from 'features/products/repositories/product-repository-interface';

describe('product-service', () => {
  let repository: IProductRepository;
  let service: ReturnType<typeof productService>;

  beforeEach(() => {
    repository = {
      findAll: vi.fn(),
      findById: vi.fn(),
      search: vi.fn(),
      findByCategory: vi.fn(),
    };

    service = productService(repository);
  });

  it('getProducts - calls findAll when no search or category provided', async () => {
    const mockProducts = [createMockProduct({ id: 1 }), createMockProduct({ id: 2 })];
    const query = createMockProductQuery();

    repository.findAll = vi.fn().mockResolvedValue({
      products: mockProducts,
      total: 2,
      skip: 0,
      limit: 30,
    });

    const result = await service.getProducts(query);

    expect(repository.findAll).toHaveBeenCalled();
    expect(result.total).toBe(mockProducts.length);
    expect(result.products.length).toBe(mockProducts.length);
  });

  it('getProducts - calls search when search is provided', async () => {
    const mockProducts = [
      createMockProduct({ title: 'Test Phone' }),
      createMockProduct({ title: 'Test Laptop' }),
    ];
    const query = createMockProductQuery({ search: 'test' });

    repository.search = vi.fn().mockResolvedValue({
      products: mockProducts,
      total: 2,
      skip: 0,
      limit: 30,
    });

    const result = await service.getProducts(query);

    expect(repository.search).toHaveBeenCalledWith('test', expect.any(Object));
    expect(result.total).toBe(mockProducts.length);
    expect(result.products.length).toBe(mockProducts.length);
    expect(result.products[0].title).toBe(mockProducts[0].title);
  });

  it('getProducts - calls findByCategory when category is provided', async () => {
    const mockProducts = [
      createMockProduct({ category: 'beauty', id: 1 }),
      createMockProduct({ category: 'beauty', id: 2 }),
    ];
    const query = createMockProductQuery({ category: 'beauty' });
    repository.findByCategory = vi.fn().mockResolvedValue({
      products: mockProducts,
      total: 2,
      skip: 0,
      limit: 30,
    });

    const result = await service.getProducts(query);

    expect(repository.findByCategory).toHaveBeenCalledWith('beauty', expect.any(Object));
    expect(result.total).toBe(mockProducts.length);
    expect(result.products.length).toBe(mockProducts.length);
    expect(result.products[0].category).toBe(mockProducts[0].category);
  });

  it('getProducts - applies sorting to the products returned from the repository', async () => {
    const unsorted = [
      createMockProduct({ id: 1, price: 50 }),
      createMockProduct({ id: 2, price: 10 }),
    ];
    repository.findAll = vi.fn().mockResolvedValue({
      products: unsorted,
      total: 2,
      skip: 0,
      limit: 10,
    });

    // sorting by price descending
    const query = createMockProductQuery({ sort: { key: 'price', order: 'asc' } });
    const result = await service.getProducts(query);

    expect(result.products[0].id).toBe(2);
    expect(result.products[1].id).toBe(1);
  });

  it('getProducts - throws DATA_INTEGRITY_ERROR when schema validation fails', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const query = createMockProductQuery();
    repository.findAll = vi.fn().mockResolvedValue({
      products: [{ id: 'not-a-number', title: 123 }],
      total: 1,
      skip: 0,
      limit: 10,
    });

    await expect(service.getProducts(query)).rejects.toThrow('DATA_INTEGRITY_ERROR');

    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('getProductById - call findById when Id is provided', async () => {
    const mockProduct = createMockProduct({ id: 1 });
    repository.findById = vi.fn().mockResolvedValue(mockProduct);

    const result = await service.getProductById('1');

    expect(repository.findById).toHaveBeenCalledWith('1');
    expect(result.id).toBe(mockProduct.id);
    expect(result.title).toBe(mockProduct.title);
  });
});
