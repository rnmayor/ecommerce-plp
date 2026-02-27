import { BASE_URL, jsonRepository } from 'features/products/repositories/json-repository';
import { createMockProduct } from 'features/products/testing/product-factory';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { it, describe, beforeAll, afterEach, afterAll } from 'vitest';

const server = setupServer(
  // handler for base: findAll
  http.get(BASE_URL, () => {
    return HttpResponse.json({
      products: [createMockProduct({ id: 1 }), createMockProduct({ id: 2 })],
      total: 2,
      skip: 0,
      limit: 10,
    });
  }),

  // handler for search
  http.get(`${BASE_URL}/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q');

    return HttpResponse.json({
      products: [createMockProduct({ title: `Product for ${query}` })],
      total: 1,
      skip: 0,
      limit: 10,
    });
  }),

  // handler for category
  http.get(`${BASE_URL}/category/:category`, ({ params }) => {
    const { category } = params;

    return HttpResponse.json({
      products: [createMockProduct({ category: category as string })],
      total: 1,
      skip: 0,
      limit: 10,
    });
  }),

  // handler for findById
  http.get(`${BASE_URL}/:id`, ({ params }) => {
    const { id } = params;

    if (id === '999') {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(createMockProduct({ id: Number(id) }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('jsonRepository', () => {
  const repo = jsonRepository();

  it('findAll returns parsed products', async () => {
    const result = await repo.findAll({ limit: 10, skip: 0 });

    expect(result.products).toHaveLength(2);
    expect(result.products[0].id).toBe(1);
    expect(result.products[1].id).toBe(2);
  });

  it('search returns filtered products based on query', async () => {
    const result = await repo.search('phone');

    expect(result.products).toHaveLength(1);
    expect(result.products[0].title).toBe('Product for phone');
  });

  it('findByCategory returns products for specific category', async () => {
    const result = await repo.findByCategory('beauty');

    expect(result.products).toHaveLength(1);
    expect(result.products[0].category).toBe('beauty');
  });

  it('buildUrl handles missing params correctly (Branch Coverage)', async () => {
    let capturedUrl = '';
    server.use(
      http.get(BASE_URL, ({ request }) => {
        capturedUrl = request.url;
        return HttpResponse.json({ products: [], total: 0, skip: 0, limit: 10 });
      }),
    );

    // no params
    await repo.findAll();
    const url1 = new URL(capturedUrl);
    expect(url1.searchParams.has('limit')).toBe(false);
    expect(url1.searchParams.has('skip')).toBe(false);

    // limit params ONLY
    await repo.findAll({ limit: 10 });
    const url2 = new URL(capturedUrl);
    expect(url2.searchParams.get('limit')).toBe('10');
    expect(url2.searchParams.has('skip')).toBe(false);

    // skip params ONLY
    await repo.findAll({ skip: 20 });
    const url3 = new URL(capturedUrl);
    expect(url3.searchParams.has('limit')).toBe(false);
    expect(url3.searchParams.get('skip')).toBe('20');

    // BOTH params
    await repo.findAll({ limit: 5, skip: 10 });
    const url4 = new URL(capturedUrl);
    expect(url4.searchParams.get('limit')).toBe('5');
    expect(url4.searchParams.get('skip')).toBe('10');
  });

  it('throws FETCH_FAILED on findAll - 500 status', async () => {
    // simulate server crash
    server.use(
      http.get(BASE_URL, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(repo.findAll()).rejects.toThrow('FETCH_FAILED');
  });

  it('throws FETCH_FAILED on search - 500 status', async () => {
    // simulate server crash
    server.use(
      http.get(`${BASE_URL}/search`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(repo.search('test')).rejects.toThrow('FETCH_FAILED');
  });

  it('throws FETCH_FAILED on findByCategory - 500 status', async () => {
    // simulate server crash
    server.use(
      http.get(`${BASE_URL}/category/:category`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(repo.findByCategory('beauty')).rejects.toThrow('FETCH_FAILED');
  });

  it('throws Zod error when API returns malformed data', async () => {
    server.use(
      http.get(BASE_URL, () => {
        return HttpResponse.json({ invalid: 'data' }); // missing required field
      }),
    );

    await expect(repo.findAll()).rejects.toThrow();
  });

  it('findById returns a single product', async () => {
    const result = await repo.findById('1');

    expect(result.id).toBe(1);
    expect(result.title).toBeDefined();
  });

  it('throws PRODUCT_NOT_FOUND on 404 status', async () => {
    await expect(repo.findById('999')).rejects.toThrow('PRODUCT_NOT_FOUND');
  });

  it('throws FETCH_FAILED on 500 status', async () => {
    // simulate server crash
    server.use(
      http.get(`${BASE_URL}/:id`, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    await expect(repo.findById('1')).rejects.toThrow('FETCH_FAILED');
  });
});
