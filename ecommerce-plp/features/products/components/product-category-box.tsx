'use client';

import { cn } from '@ecommerce/ui';
import {
  Bike,
  Briefcase,
  CarFront,
  Citrus,
  Droplets,
  Dumbbell,
  Flower,
  Footprints,
  Gem,
  Glasses,
  Headphones,
  Lamp,
  Laptop,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  Sofa,
  Sparkles,
  TableProperties,
  UtensilsCrossed,
  Watch,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const iconMap = {
  sparkles: Sparkles,
  flower: Flower,
  sofa: Sofa,
  shoppingBasket: ShoppingBasket,
  lamp: Lamp,
  utensilsCrossed: UtensilsCrossed,
  laptop: Laptop,
  shirt: Shirt,
  footprints: Footprints,
  watch: Watch,
  headphones: Headphones,
  bike: Bike,
  droplets: Droplets,
  smartphone: Smartphone,
  dumbbell: Dumbbell,
  glasses: Glasses,
  tableProperties: TableProperties,
  shoppingBag: ShoppingBag,
  carFront: CarFront,
  briefcase: Briefcase,
  citrus: Citrus,
  gem: Gem,
};

type IconName = keyof typeof iconMap;

interface ProductCategoryBoxProps {
  label: string;
  icon: IconName;
}

export const ProductCategoryBox = ({ label, icon }: ProductCategoryBoxProps) => {
  const Icon = iconMap[icon];

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryValue = label.toLowerCase();

    const currentCategoriesRaw = params.get('category');
    let categories = currentCategoriesRaw
      ? currentCategoriesRaw
          .split(',')
          .map((c) => c.trim().toLowerCase())
          .filter(Boolean)
      : [];
    if (categories.includes(categoryValue)) {
      categories = categories.filter((c) => c !== categoryValue);
    } else {
      categories.push(categoryValue);
    }

    // update the params
    if (categories.length > 0) {
      params.set('category', categories.join(','));
    } else {
      params.delete('category');
    }

    // always reset pagination when filters change
    params.delete('page');

    const queryString = params.toString();
    const updatedPath = queryString ? `?${queryString}` : '';

    router.push(`${pathname}${updatedPath}`);
  }, [label, router, searchParams, pathname]);

  const currentCategories = searchParams.get('category') || '';

  const isSelected = currentCategories
    .split(',')
    .map((c) => c.trim().toLowerCase())
    .includes(label.toLowerCase());

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex flex-col w-[110px] h-22 items-center justify-between p-3 gap-2 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-105 hover:shadow-md',
        isSelected
          ? `bg-foreground/80 text-background shadow-inner`
          : `text-muted-foreground border border-border hover:text-primary hover:bg-accent dark:hover:text-accent-foreground`,
      )}
    >
      <div className="flex flex-1 items-center justify-center">
        <Icon size={26} />
      </div>
      <div className="flex items-center justify-center h-8 w-full mt-auto">
        <div title={label} className="font-semibold text-xs leading-tight text-center line-clamp-2">
          {label}
        </div>
      </div>
    </div>
  );
};
