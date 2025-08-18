'use client';

import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Search } from 'lucide-react';
import { isWindows } from 'react-device-detect';
import { useHotkeys } from 'react-hotkeys-hook';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { Smartphone } from '@/entities/product/model/types';
import { useIsClient } from '@/shared/lib/hooks/useIsClient';
import { useGetProductsQuery } from '@/shared/lib/slices/productApi';
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
  const [query, setQuery] = useState('');
  const isClient = useIsClient();
  const router = useRouter();

  useHotkeys(
    'ctrl+k,meta+k',
    (e) => {
      e.preventDefault();
      setOpen(true);
    },
    { enableOnFormTags: true },
    [setOpen]
  );
  const { data, isLoading } = useGetProductsQuery(
    { search: query, take: 10 },
    {
      skip: !open || query.length <= 1,
    }
  );
  const results = data?.items || [];

  const handleSelect = (productId: string) => {
    router.push(`/product/${productId}`);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-muted-foreground hover:text-muted-foreground hover:shadow-2xl min-w-[200px] flex justify-center items-center bg-input hover:bg-input py-1 px-2 md:py-2 md:px-4"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-2" />
        Hledat…
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
        <VisuallyHidden>
          <DialogTitle>Vyhledávání produktů</DialogTitle>
        </VisuallyHidden>
        <CommandInput
          placeholder="Zadejte název produktu…"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length < 2 ? null : isLoading ? (
            <div className="p-4 text-center text-muted-foreground text-sm">Načítání…</div>
          ) : results?.length === 0 ? (
            <CommandEmpty>Nebyly nalezeny žádné výsledky.</CommandEmpty>
          ) : (
            <CommandGroup heading="Produkty">
              {results?.map((product: Smartphone, i: number) => (
                <CommandItem
                  key={`${product.id}-${i}`}
                  onSelect={() => handleSelect(product.slug)}
                  value={product.slug}
                >
                  <div className="relative h-8 w-8 mr-4 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={product.gallery?.[0] || ''}
                      alt={product.name ?? 'iPhone'}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <span>
                    {product.name} - {product.capacity}GB - {product.color}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
