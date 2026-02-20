'use client';

import { cn } from '@ecommerce/ui';
import {
  Bike,
  Briefcase,
  CarFront,
  Citrus,
  Droplets,
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
  TabletSmartphone,
  UtensilsCrossed,
  Volleyball,
  Watch,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { ClipLoader } from 'react-spinners';

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
  volleyball: Volleyball,
  glasses: Glasses,
  tabletSmartphone: TabletSmartphone,
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

  const [isPending, startTransition] = useTransition();

  const handleClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryValue = label.toLowerCase();

    // update the params
    if (categoryValue) {
      params.set('category', categoryValue);
    } else {
      params.delete('category');
    }

    // always reset pagination and search when filters change
    params.delete('page');
    params.delete('search');

    const queryString = params.toString();
    const updatedPath = queryString ? `?${queryString}` : '';

    startTransition(() => {
      router.replace(`${pathname}${updatedPath}`, { scroll: false });
    });
  }, [label, router, searchParams, pathname]);

  const currentCategory = searchParams.get('category') || '';

  const isSelected = currentCategory.toLowerCase() === label.toLowerCase();

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex flex-col w-[110px] h-22 items-center justify-between p-3 gap-2 rounded-xl transition-all cursor-pointer shadow-sm hover:scale-105 hover:shadow-md',
        isSelected
          ? `bg-foreground/80 text-background shadow-inner`
          : `text-muted-foreground border border-border hover:text-primary hover:bg-accent dark:hover:text-accent-foreground`,
        isPending && 'pointer-events-none',
      )}
    >
      <div className="flex flex-1 items-center justify-center">
        {isPending ? (
          <ClipLoader color="text-muted-foreground" size={20} aria-label="Loading..." />
        ) : (
          <Icon size={26} />
        )}
      </div>
      <div className="flex items-center justify-center h-8 w-full mt-auto">
        <div title={label} className="font-semibold text-xs leading-tight text-center line-clamp-2">
          {label}
        </div>
      </div>
    </div>
  );
};
