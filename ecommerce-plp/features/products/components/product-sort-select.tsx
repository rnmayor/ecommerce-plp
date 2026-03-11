'use client';

import {
  cn,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  InputGroupAddon,
  InputGroupButton,
} from '@ecommerce/ui';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import { ClipLoader } from 'react-spinners';

import { SORT_OPTIONS, type SortOption } from '../constants';

export const ProductSortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const currentSortValue = searchParams.get('sort');
  const selectedItem = SORT_OPTIONS.find((opt) => opt.value === currentSortValue) || null;

  const handleChange = useCallback(
    (item: SortOption | null) => {
      if (!item) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', item.value);

      // always reset pagination when sorting change
      params.delete('page');

      const queryString = params.toString();
      const updatedPath = queryString ? `?${queryString}` : '';

      startTransition(() => {
        router.replace(`${pathname}${updatedPath}`, { scroll: false });
      });
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="relative w-full max-w-[200px]">
      <Combobox
        items={SORT_OPTIONS}
        value={selectedItem}
        itemToStringValue={(item: SortOption) => item.label}
        onValueChange={handleChange}
        disabled={isPending}
      >
        <div className={cn('relative transition-opacity duration-200', isPending && 'opacity-60')}>
          <ComboboxInput showTrigger={false} placeholder="Sort by:" className="pr-1">
            {isPending ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/3">
                <ClipLoader color="text-muted-foreground" size={15} aria-label="Loading..." />
              </div>
            ) : (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Sort by:"
                  size="icon-xs"
                  variant="ghost"
                  asChild
                  data-slot="input-group-button"
                  className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
                >
                  <ComboboxTrigger />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </ComboboxInput>
        </div>
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
