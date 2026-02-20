import { Button } from '@ecommerce/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="h-full container mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight md:tracking-widest text-center uppercase text-[#ff3377]">
        page not found
      </h1>
      <Button
        className="relative px-8 h-14 uppercase text-lg font-bold overflow-hidden"
        size="lg"
        asChild
      >
        <Link href={'/'} className="flex items-center justify-center">
          <span>Back to Home Page</span>
        </Link>
      </Button>
    </section>
  );
}
