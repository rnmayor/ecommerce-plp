import { productModule } from 'features/products/module';
import { createMockProduct } from 'features/products/testing/product-factory';
import { NextRequest } from 'next/server';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { GET } from './route';

vi.mock('features/products/module', () => ({
  productModule: {
    getProductById: vi.fn(),
  },
}));

describe('GET /api/products/:id', () => {
  const createReq = (id: string) => {
    return new NextRequest(`http://localhost/api/products/${id}`);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 when product exists', async () => {
    const mockData = createMockProduct({ id: 1 });
    vi.mocked(productModule.getProductById).mockResolvedValue(mockData);

    const req = createReq('1');
    const context = {
      params: Promise.resolve({ id: '1' }),
    };
    const res = await GET(req, context);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(mockData);

    expect(productModule.getProductById).toHaveBeenCalledWith('1');
  });

  it('returns 404 when product not found', async () => {
    vi.mocked(productModule.getProductById).mockRejectedValue(new Error('PRODUCT_NOT_FOUND'));

    const req = createReq('999');
    const context = {
      params: Promise.resolve({ id: '999' }),
    };
    const res = await GET(req, context);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body.message).toBe('Product not found');
  });

  it('returns 500 on data integrity error', async () => {
    vi.mocked(productModule.getProductById).mockRejectedValue(new Error('DATA_INTEGRITY_ERROR'));

    const req = createReq('1');
    const context = {
      params: Promise.resolve({ id: '1' }),
    };
    const res = await GET(req, context);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.message).toBe('Data Integrity Error');
  });

  it('returns 500 for unexpected error', async () => {
    vi.mocked(productModule.getProductById).mockRejectedValue(new Error('UNKNOWN'));

    const req = createReq('1');
    const context = {
      params: Promise.resolve({ id: '1' }),
    };
    const res = await GET(req, context);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.message).toBe('An unexpected error occured');
  });
});
