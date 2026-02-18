import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;

export const RawProductResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  limit: z.number(),
  skip: z.number(),
});

export const ProductListResponseSchema = RawProductResponseSchema.extend({
  page: z.number(),
});

export type RawProductListResponse = z.infer<typeof RawProductResponseSchema>;
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>;
