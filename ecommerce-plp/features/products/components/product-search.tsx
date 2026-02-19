'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@ecommerce/ui';
import { Search } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((text) => {
    const params = new URLSearchParams(searchParams.toString());
    if (text) {
      params.set('search', text);
    } else {
      params.delete('search');
    }

    // always reset pagination when search changes
    params.delete('page');

    const queryString = params.toString();
    const updatedPath = queryString ? `?${queryString}` : '';

    router.push(`${pathname}${updatedPath}`);
  }, 300);

  return (
    <div className="grid w-full gap-6">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('search') || ''}
          placeholder="Search products..."
        />
      </InputGroup>
    </div>
  );
};
