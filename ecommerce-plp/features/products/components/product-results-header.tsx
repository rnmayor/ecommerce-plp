'use client';

import { Badge, Button } from '@ecommerce/ui';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition } from 'react';

import { SORT_OPTIONS } from '../constants';

export const ProductResultsHeader = ({ totalResults }: { totalResults: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';
  const sortQuery = searchParams.get('sort') || '';
  const pageQuery = searchParams.get('page') || '';

  const hasFilters = searchQuery || categoryQuery || sortQuery || pageQuery;

  const clearQuery = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);

    const queryString = params.toString();
    const updatePath = queryString ? `?${queryString}` : '';

    startTransition(() => {
      router.replace(`${pathname}${updatePath}`, { scroll: false });
    });
  };

  const clearAll = () => {
    startTransition(() => {
      router.replace(`${pathname}`, { scroll: false });
    });
  };

  return (
    <div className="flex w-full items-center justify-center border-b pb-4 mt-2">
      <div className="flex flex-col gap-y-1 items-center justify-center">
        <h1 className="text-xl font-bold tracking-wide uppercase">All Products</h1>
        <div className="flex items-center gap-x-2">
          <p className="text-sm text-muted-foreground font-medium">
            {totalResults ?? 0} result(s) found.
          </p>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="px-4 text-destructive text-xs font-normal hover:text-destructive hover:bg-destructive/10"
            >
              Clear All
            </Button>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categoryQuery && (
            <Badge
              variant="outline"
              className="capitalize cursor-pointer hover:text-destructive/80"
              onClick={() => clearQuery('category')}
            >
              Category: {categoryQuery}
              <X data-icon="inline-end" />
            </Badge>
          )}
          {searchQuery && (
            <Badge
              variant="outline"
              className="capitalize cursor-pointer hover:text-destructive/80"
              onClick={() => clearQuery('search')}
            >
              Search: {searchQuery}
              <X data-icon="inline-end" />
            </Badge>
          )}
          {sortQuery && (
            <Badge
              variant="outline"
              className="capitalize cursor-pointer hover:text-destructive/80"
              onClick={() => clearQuery('sort')}
            >
              Sort: {SORT_OPTIONS.find((o) => o.value === sortQuery)?.label || ''}
              <X data-icon="inline-end" />
            </Badge>
          )}
          {pageQuery && (
            <Badge
              variant="outline"
              className="capitalize cursor-pointer hover:text-destructive/80"
              onClick={() => clearQuery('page')}
            >
              Page: {pageQuery}
              <X data-icon="inline-end" />
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
