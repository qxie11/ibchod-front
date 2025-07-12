'use client';

import { Search, Apple } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Cart from '@/components/cart';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <h1 className="text-xl font-semibold tracking-tight">iStore</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search iPhones..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Cart />
        </div>
      </div>
    </header>
  );
}
