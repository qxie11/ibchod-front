import { type VariantProps, cva } from 'class-variance-authority';

import { ButtonHTMLAttributes, forwardRef } from 'react';

import Link from 'next/link';

import { cn } from '@/shared/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none hover:shadow-[0px_1px_11px_5px_rgba(255,255,255,0.5)] focus:shadow-[0px_1px_11px_5px_rgba(255,255,255,0.5)] disabled:bg-gray-400 disabled:cursor-no-drop',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:brightness-125 hover:shadow-[0px_1px_11px_5px_rgba(255,255,255,0.5)]',
        ghost:
          'bg-transparent text-primary border-4 border-primary hover:bg-primary hover:text-white',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        large: 'px-20 py-6 text-lg',
        medium: 'px-12 py-4 text-base',
        small: 'px-6 py-2 text-sm rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, className }));

    if (href) {
      return (
        <Link href={href} className={cn('inline-block text-center', buttonClasses)} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
