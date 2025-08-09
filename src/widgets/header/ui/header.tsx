'use client';

import Image from 'next/image';
import Link from 'next/link';

import { SearchDialog } from '@/features/search-products';
import Logo from '@/shared/assets/icons/logo.svg';
import Container from '@/shared/ui/container';
import { CartButton } from '@/widgets/cart-button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} width={68} height={61} alt="IObchod" />
          <span className="font-bold text-xl hidden sm:inline-block">IObchod</span>
        </Link>
        <div className="flex flex-1 items-center justify-end ml-2 space-x-2 md:space-x-4">
          <div className="w-full max-w-sm">
            <SearchDialog />
          </div>
          <CartButton />
        </div>
      </Container>
    </header>
  );
}
