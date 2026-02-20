'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@ecommerce/ui';
import { Search } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDebouncedCallback } from 'use-debounce';

export const ProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(query);
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    setInputValue(query);
  }

  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (text) {
      params.set('search', text);
    } else {
      params.delete('search');
    }

    // always reset pagination and category when search changes
    params.delete('page');
    params.delete('category');

    const queryString = params.toString();
    const updatedPath = queryString ? `?${queryString}` : '';

    startTransition(() => {
      router.replace(`${pathname}${updatedPath}`, { scroll: false });
    });
  }, 300);

  const onChange = (value: string) => {
    setInputValue(value);
    handleSearch(value);
  };

  return (
    <div className="grid w-full gap-6">
      <InputGroup>
        <InputGroupInput
          onChange={(e) => onChange(e.target.value)}
          value={inputValue}
          placeholder="Search products..."
        />
        {isPending ? (
          <InputGroupAddon>
            <ClipLoader color="text-muted-foreground" size={15} aria-label="Loading..." />
          </InputGroupAddon>
        ) : (
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
};
