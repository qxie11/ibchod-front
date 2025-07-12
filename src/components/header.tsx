'use client';

import { Apple } from 'lucide-react';
import Cart from '@/components/cart';
import SearchDialog from '@/components/search-dialog';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <h1 className="text-xl font-semibold tracking-tight">iObchod</h1>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <SearchDialog />
          <Cart />
        </div>
      </div>
    </header>
  );
}
