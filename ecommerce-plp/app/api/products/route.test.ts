import { productModule } from 'features/products/module';
import { createMockProductList } from 'features/products/testing/product-factory';
import { NextRequest } from 'next/server';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { GET } from './route';

vi.mock('features/products/module', () => ({
  productModule: {
    getProducts: vi.fn(),
  },
}));

describe('GET /api/products', () => {
  const createReq = (queryString = '') => {
    const url = `http://localhost/api/products${queryString ? `?${queryString}` : ''}`;
    return new NextRequest(url);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 and data on successful service call', async () => {
    const mockData = createMockProductList();
    vi.mocked(productModule.getProducts).mockResolvedValue(mockData);

    const req = createReq('limit=10');
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(mockData);

    expect(productModule.getProducts).toHaveBeenCalledWith(expect.objectContaining({ limit: 10 }));
  });

  it('returns 400 on invalid query parameters', async () => {
    const mockData = createMockProductList();
    vi.mocked(productModule.getProducts).mockResolvedValue(mockData);

    const req = createReq('limit=not-a-number');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.message).toBe('Invalid query parameters');
  });

  it('returns 500 on data integrity error', async () => {
    vi.mocked(productModule.getProducts).mockRejectedValue(new Error('DATA_INTEGRITY_ERROR'));

    const req = createReq('limit=10');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.message).toBe('Data Integrity Error');
  });

  it('returns 500 for unexpected error', async () => {
    vi.mocked(productModule.getProducts).mockRejectedValue(new Error('UNKNOWN'));

    const req = createReq('limit=10');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.message).toBe('An unexpected error occured');
  });
});
