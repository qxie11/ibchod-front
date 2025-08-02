import { Home, ListOrdered, Package } from 'lucide-react';

import type { Metadata } from 'next';

import Link from 'next/link';

import Container from '@/shared/ui/container';
import { Header } from '@/widgets/header';

export const metadata: Metadata = {
  title: 'Administrace',
  description: 'Administrační panel IObchod pro správu produktů a objednávek.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Administrace - IObchod',
    description: 'Administrační panel IObchod pro správu produktů a objednávek.',
    url: 'https://iphone-store-jet.vercel.app/admin',
    siteName: 'IObchod',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Administrace - IObchod',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  alternates: {
    canonical: '/admin',
  },
};

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/smartphones', label: 'Smartphony', icon: Package },
  { href: '/admin/orders', label: 'Objednávky', icon: ListOrdered },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container className="flex-1 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <nav className="flex flex-col space-y-2">
              {adminNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <main className="md:col-span-3">{children}</main>
        </div>
      </Container>
    </>
  );
}
