'use client';

import { Search } from 'lucide-react';
import { isWindows } from 'react-device-detect';

import React, { useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { mockProducts } from '@/entities/product';
import type { Product } from '@/entities/product';
import { useIsClient } from '@/shared/lib/hooks/useIsClient';
import { cn } from '@/shared/lib/utils/cn';
import { Button } from '@/shared/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const router = useRouter();

  useLayoutEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
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
        variant="ghost"
        className="text-muted-foreground hover:text-muted-foreground hover:shadow-2xl w-full md:w-auto flex justify-center items-center bg-input hover:bg-input py-3"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-2" />
        Search...
        <kbd
          className={cn(
            'pointer-events-none ml-4 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex',
            {
              hidden: !isClient,
            }
          )}
        >
          <span className="text-xs">{isWindows ? 'Ctrl' : '⌘'}</span>K
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
