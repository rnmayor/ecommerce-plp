'use client';

import { cn } from '@ecommerce/ui';
import { Flower, ShoppingBasket, Sofa, Sparkles } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const iconMap = {
  sparkles: Sparkles,
  flower: Flower,
  sofa: Sofa,
  shoppingBasket: ShoppingBasket,
};

type IconName = keyof typeof iconMap;

interface CategoryBoxProps {
  label: string;
  icon: IconName;
}

export const CategoryBox = ({ label, icon }: CategoryBoxProps) => {
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
        'flex flex-col w-[100px] items-center justify-center gap-2 p-3 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-105 hover:shadow-md',
        isSelected
          ? `bg-foreground/80 text-background shadow-inner`
          : `text-muted-foreground border border-border hover:text-accent-foreground hover:bg-accent`,
      )}
    >
      <Icon size={26} />
      <div className="font-semibold text-xs tracking-wide uppercase">{label}</div>
    </div>
  );
};
