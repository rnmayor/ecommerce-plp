'use client';

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
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Product } from '../schemas/product-schema';

interface ProductProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductProps) => {
  const pathname = usePathname();

  return (
    <Card className="h-[400px] w-full max-w-[260px] group relative overflow-hidden transition-all hover:shadow-lg">
      {product.formattedDiscount && (
        <Badge variant={'destructive'} className="absolute left-2 top-2 z-30 text-xs font-semibold">
          {product.formattedDiscount}
        </Badge>
      )}
      <Link
        aria-label={`View ${product.title}`}
        className="relative h-[200px] w-full overflow-hidden bg-muted"
        href={`${pathname}/${product.id}`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title}`}
          fill
          sizes="250px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </Link>
      <CardHeader>
        <CardTitle title={product.title} className="line-clamp-1 text-lg hover:underline">
          <Link href={`${pathname}/${product.id}`}>{product.title}</Link>
        </CardTitle>
        <div className="flex justify-between">
          <span className="text-xl font-bold text-primary">{product.formattedPrice}</span>
          <div className="flex items-center gap-x-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription title={product.description} className="line-clamp-3 min-h-[3rem] text-xs">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`${pathname}/${product.id}`}>Add to Cart</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
