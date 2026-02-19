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
