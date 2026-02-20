import { z } from 'zod';

const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  reviewerName: z.string(),
  date: z.string(),
});

export const ProductSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number(),
    rating: z.number(),
    reviews: z.array(ReviewSchema),
    thumbnail: z.url(),
    images: z.array(z.url()),
    tags: z.array(z.string()),
    brand: z.string().optional(),
    sku: z.string(),
    warrantyInformation: z.string(),
    shippingInformation: z.string(),
    stock: z.number(),
    availabilityStatus: z.string(),
    returnPolicy: z.string(),
  })
  .transform((data) => ({
    ...data,
    reviewCount: data.reviews.length,
    formattedPrice: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(data.price),
    formattedDiscount:
      data.discountPercentage && Math.round(data.discountPercentage) > 0
        ? `${Math.round(data.discountPercentage)}% OFF`
        : null,
    reviews: [...data.reviews].sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }),
  }));

export type Product = z.infer<typeof ProductSchema>;

export const RawProductResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  limit: z.number(),
  skip: z.number(),
});

export const ProductListResponseSchema = RawProductResponseSchema.extend({
  page: z.number(),
  totalPages: z.number(),
  hasPrevPage: z.boolean(),
  hasNextPage: z.boolean(),
});

export type RawProductListResponse = z.infer<typeof RawProductResponseSchema>;
export type ProductListResponse = z.infer<typeof ProductListResponseSchema>;
