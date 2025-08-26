'use client';

import { ChevronRight, Home } from 'lucide-react';

import Link from 'next/link';

import { Button } from './button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

export function Breadcrumb({ items = [], className = '', children }: BreadcrumbProps) {
  if (children) {
    return (
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
        {children}
      </nav>
    );
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Button
            variant="ghost"
            size="sm"
            href="/"
            className="text-gray-600 hover:text-gray-900 p-1"
            aria-label="Domů"
          >
            <Home className="w-4 h-4" />
          </Button>
        </li>

        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function BreadcrumbList({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ol className={`flex items-center space-x-2 ${className}`}>{children}</ol>;
}

export function BreadcrumbItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <li className={`flex items-center ${className}`}>{children}</li>;
}

export function BreadcrumbLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

export function BreadcrumbPage({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`text-gray-900 font-medium ${className}`} aria-current="page">
      {children}
    </span>
  );
}

export function BreadcrumbSeparator({ className = '' }: { className?: string }) {
  return <ChevronRight className={`w-4 h-4 text-gray-400 mx-1 ${className}`} />;
}
