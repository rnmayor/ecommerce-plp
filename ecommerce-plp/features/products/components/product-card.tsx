import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ecommerce/ui';
import { Star } from 'lucide-react';
import Image from 'next/image';

import type { Product } from '../schemas/product-schema';

interface ProductProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductProps) => {
  return (
    <Card className="h-[400px] w-full max-w-[260px] group relative overflow-hidden transition-all hover:shadow-lg">
      {product.formattedDiscount && (
        <Badge variant={'destructive'} className="absolute left-2 top-2 z-30 text-xs font-semibold">
          {product.formattedDiscount}
        </Badge>
      )}
      <div className="relative h-[200px] w-full overflow-hidden bg-muted">
        <Image
          src={product.thumbnail}
          alt="Product Cover"
          fill
          sizes="250px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      <CardHeader>
        <CardTitle title={product.title} className="line-clamp-1 text-lg">
          {product.title}
        </CardTitle>
        <div className="flex justify-between">
          <span className="text-xl font-bold text-primary">{product.formattedPrice}</span>
          <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription title={product.description} className="line-clamp-3 min-h-[3rem] text-xs">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button size={'lg'} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
