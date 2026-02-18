import { z } from 'zod';

export const ProductQuerySchema = z.object({
  search: z.string().optional(),
  category: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return [];
      return val
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    }),
  sort: z
    .enum(['price-asc', 'price-desc'])
    .optional()
    .transform((val) => {
      if (!val) return { key: 'id' as const, order: 'asc' as const };
      const [key, order] = val.split('-');
      return {
        key: key as 'price',
        order: order as 'asc' | 'desc',
      };
    }),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(30),
});

export type ProductQuery = z.infer<typeof ProductQuerySchema>;
