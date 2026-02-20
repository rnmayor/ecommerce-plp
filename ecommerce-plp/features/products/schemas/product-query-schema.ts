import { z } from 'zod';

import { SORT_OPTIONS } from '../constants';

export const ProductQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  sort: z
    .enum(SORT_OPTIONS.map((o) => o.value))
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
  limit: z.coerce.number().min(1).max(200).default(30),
});

export type ProductQuery = z.infer<typeof ProductQuerySchema>;
