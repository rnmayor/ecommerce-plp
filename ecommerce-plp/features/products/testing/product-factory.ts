import type { ProductQuery } from '../schemas/product-query-schema';
import type { Product, ProductListResponse } from '../schemas/product-schema';

export const createMockProductList = (
  products: Product[] = [createMockProduct()],
  overrides: Partial<ProductListResponse> = {},
): ProductListResponse => ({
  products,
  total: products.length,
  limit: 30,
  skip: 0,
  page: 1,
  totalPages: 1,
  hasPrevPage: false,
  hasNextPage: false,
  ...overrides,
});

export const createMockProduct = (overrides: Partial<Product> = {}): Product => ({
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description:
    'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
  category: 'beauty',
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  reviews: [
    {
      rating: 3,
      comment: 'Would not recommend!',
      date: '2025-04-30T09:41:02.053Z',
      reviewerName: 'Eleanor Collins',
    },
    {
      rating: 4,
      comment: 'Very satisfied!',
      date: '2025-04-30T09:41:02.053Z',
      reviewerName: 'Lucas Gordon',
    },
    {
      rating: 5,
      comment: 'Highly impressed!',
      date: '2025-04-30T09:41:02.053Z',
      reviewerName: 'Eleanor Collins',
    },
  ],
  thumbnail:
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
  images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'],
  tags: ['beauty', 'mascara'],
  brand: 'Essence',
  sku: 'BEA-ESS-ESS-001',
  warrantyInformation: '1 week warranty',
  shippingInformation: 'Ships in 3-5 business days',
  stock: 99,
  availabilityStatus: 'In Stock',
  returnPolicy: 'No return policy',
  reviewCount: 3,
  formattedPrice: '$9.99',
  formattedDiscount: '10% OFF',
  ...overrides,
});

export const createMockProductQuery = (overrides: Partial<ProductQuery> = {}): ProductQuery => ({
  search: '',
  category: '',
  sort: { key: 'id', order: 'asc' },
  page: 1,
  limit: 30,
  ...overrides,
});
