import { Button } from '@ecommerce/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="h-full container mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight md:tracking-widest text-center uppercase text-[#ff3377]">
        PRODUCT not found
      </h1>
      <Button className="relative px-6 h-12 uppercase text-lg font-bold" size="lg" asChild>
        <Link href={'/products'} className="flex items-center justify-center">
          <span>Back to Products Page</span>
        </Link>
      </Button>
    </section>
  );
}
