'use client';

import { Button } from '@ecommerce/ui';
import { ERRORMAP } from 'features/products/constants';

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <section className="h-full container mx-auto flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight md:tracking-widest text-center text-[#ff3377]">
        {ERRORMAP[error.message] || ERRORMAP.DEFAULT}
      </h1>
      <div className="flex gap-4">
        <Button
          className="px-6 h-12 text-lg font-bold"
          onClick={() => (window.location.href = '/products')}
        >
          Back to Products
        </Button>
      </div>
    </section>
  );
}
