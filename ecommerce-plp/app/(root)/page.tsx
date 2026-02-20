import { Button } from '@ecommerce/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight md:tracking-widest text-center uppercase text-[#ff3377]">
        shop now
      </h1>
      <Button
        className="group relative px-8 h-14 uppercase text-lg font-bold overflow-hidden"
        size="lg"
        asChild
      >
        <Link href={'/products'} className="flex items-center justify-center">
          <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
            discover more
          </span>
          <div className="absolute flex items-center gap-x-2 -translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span>let&apos;s go</span>
            <MoveRight />
          </div>
        </Link>
      </Button>
    </section>
  );
}
