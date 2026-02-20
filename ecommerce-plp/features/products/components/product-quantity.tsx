'use client';

import { Button, ButtonGroup, Input } from '@ecommerce/ui';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import type { Product } from '../schemas/product-schema';

interface ProductQuantityProps {
  product: Product;
}

export const ProductQuantity = ({ product }: ProductQuantityProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Quantity</span>
      <ButtonGroup className="flex items-center" aria-label="Quantity selector">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <MinusIcon />
        </Button>
        <Input
          type="number"
          max={product.stock}
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 focus-visible:ring-0 focus-visible:border-input"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          disabled={quantity >= product.stock}
        >
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};
