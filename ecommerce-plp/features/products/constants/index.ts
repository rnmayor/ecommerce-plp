import type { Product } from '../schemas/product-schema';

export const CATEGORIES = [
  {
    label: 'Beauty',
    icon: 'sparkles',
  },
  {
    label: 'Fragrances',
    icon: 'flower',
  },
  {
    label: 'Furniture',
    icon: 'sofa',
  },
  {
    label: 'Groceries',
    icon: 'shoppingBasket',
  },
  {
    label: 'Home-Decoration',
    icon: 'lamp',
  },
  {
    label: 'Kitchen-Accessories',
    icon: 'utensilsCrossed',
  },
  {
    label: 'Laptops',
    icon: 'laptop',
  },
  {
    label: 'Mens-Shirts',
    icon: 'shirt',
  },
  {
    label: 'Mens-Shoes',
    icon: 'footprints',
  },
  {
    label: 'Mens-Watches',
    icon: 'watch',
  },
  {
    label: 'Mobile-Accessories',
    icon: 'headphones',
  },
  {
    label: 'Motorcycle',
    icon: 'bike',
  },
  {
    label: 'Skin-Care',
    icon: 'droplets',
  },
  {
    label: 'Smartphones',
    icon: 'smartphone',
  },
  {
    label: 'Sports',
    icon: 'dumbbell',
  },
  {
    label: 'Sunglasses',
    icon: 'glasses',
  },
  {
    label: 'Tables',
    icon: 'tableProperties',
  },
  {
    label: 'Tops',
    icon: 'shoppingBag',
  },
  {
    label: 'Vehicle',
    icon: 'carFront',
  },
  {
    label: 'Womens-Bags',
    icon: 'briefcase',
  },
  {
    label: 'Womens-Dresses',
    icon: 'citrus',
  },
  {
    label: 'Womens-Jewellery',
    icon: 'gem',
  },
  {
    label: 'Womens-Shoes',
    icon: 'footprints',
  },
  {
    label: 'Womens-Watches',
    icon: 'watch',
  },
] as const;

export type SortOption = {
  label: string;
  value: string;
};

export const SORT_OPTIONS: SortOption[] = [
  {
    label: 'Price: Low to High',
    value: 'price-asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price-desc',
  },
  {
    label: 'Avg. Customer Review',
    value: 'rating-desc',
  },
];

export const SEARCHABLE_KEYS: (keyof Product)[] = ['title', 'description'];
