'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ecommerce/ui';

import { ProductCategoryBox } from './product-category-box';
import { CATEGORIES } from '../constants';

export const ProductCategories = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2">
        {CATEGORIES.map((item) => (
          <CarouselItem key={item.label} className="pl-2 basis-auto">
            <div className="p-0.5">
              <ProductCategoryBox label={item.label} icon={item.icon} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
