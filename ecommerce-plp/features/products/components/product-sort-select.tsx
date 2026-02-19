'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@ecommerce/ui';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { SORT_OPTIONS, type SortOption } from '../constants';

export const ProductSortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChange = useCallback(
    (item: SortOption | null) => {
      if (!item) return;

      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', item.value);

      // always reset pagination when sorting change
      params.delete('page');

      const queryString = params.toString();
      const updatedPath = queryString ? `?${queryString}` : '';

      router.push(`${pathname}${updatedPath}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <Combobox
      items={SORT_OPTIONS}
      itemToStringValue={(item: SortOption) => item.label}
      onValueChange={handleChange}
    >
      <ComboboxInput placeholder="Sort by:" />
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
  );
};
