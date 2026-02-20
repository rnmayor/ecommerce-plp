import {
  Badge,
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Separator,
} from '@ecommerce/ui';
import { GetProductByIdAction } from 'features/products/actions/get-product-by-id';
import { ProductQuantity } from 'features/products/components/product-quantity';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await GetProductByIdAction(id);

  return {
    title: `${product.title}`,
    description: product.description.slice(0, 150),
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await GetProductByIdAction(id);

    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Product Image Carousel */}
          <div className="flex flex-col gap-y-6 lg:col-span-1">
            <Carousel className="group w-full max-w-xl">
              <CarouselContent className="-ml-2">
                {product.images.map((img, index) => (
                  <CarouselItem key={index} className="pl-2 basis-full">
                    <div className="relative aspect-square rounded-xl bg-muted p-0.5">
                      <Image
                        src={img}
                        alt={product.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {product.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-2">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              )}
            </Carousel>
            <div className="flex gap-2 overflow-x-auto">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
              <div className="flex items-center gap-x-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="font-medium text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount})</span>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground text-xs">SKU</p>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-muted-foreground text-xs">Warranty</p>
                <p className="font-medium">{product.warrantyInformation}</p>
              </div>
            </div>
          </div>

          {/* Product Card */}
          <div className="md:sticky md:top-8">
            <Card className="shadow-lg border-1">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{product.formattedPrice}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-sm text-destructive font-semibold">
                        -{product.formattedDiscount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{product.shippingInformation}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex gap-x-1">
                      <span>Availability</span>
                      <span className="text-muted-foreground">({product.stock})</span>
                    </div>
                    <Badge
                      className="text-md"
                      variant={product.stock > 0 ? 'success' : 'destructive'}
                    >
                      {product.availabilityStatus}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3 pt-2">
                  <ProductQuantity product={product} />
                  <Button className="w-full h-12 text-lg font-bold" size="lg">
                    Buy Now
                  </Button>
                  <Button
                    className="w-full text-lg h-12 font-semibold"
                    variant="secondary"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                </div>
                <p className="text-center text-muted-foreground italic">{product.returnPolicy}</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <section className="mt-16 border-t pt-10">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          <div className="flex flex-col gap-y-4">
            {product.reviews.map((review, index) => (
              <Card key={index} className="bg-muted/30">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-y-1">
                      <p className="font-bold text-sm">{review.reviewerName}</p>
                      <div className="flex text-yellow-500 scale-75 origin-left">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm italic">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'PRODUCT_NOT_FOUND') {
      notFound();
    }

    throw error;
  }
}
