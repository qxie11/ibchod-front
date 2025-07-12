'use client';

import React, { useState, useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from '@/shared/ui/command';
import { Button } from '@/shared/ui/button';
import { Search } from 'lucide-react';
import { mockProducts } from '@/entities/product';
import type { Product } from '@/entities/product';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === 'k' || e.key === 'K') &&
        (e.metaKey || e.ctrlKey)
      ) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (productId: string) => {
    router.push(`/product/${productId}`);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground w-full justify-start md:w-auto"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-2" />
        Search...
        <kbd className="pointer-events-none ml-4 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a product name..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Products">
            {mockProducts.map((product: Product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelect(product.id)}
                value={product.name}
              >
                <div className="relative h-8 w-8 mr-4 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <span>
                  {product.name} - {product.storage} - {product.color}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
