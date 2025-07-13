import { ButtonHTMLAttributes, forwardRef } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'medium', className, href, ...props }, ref) => {
    const baseStyles = `font-medium rounded-lg transition-all duration-150 focus:outline-none hover:shadow-[0px_1px_11px_5px_rgba(255,255,255,0.5)]
    focus:shadow-[0px_1px_11px_5px_rgba(255,255,255,0.5)] disabled:bg-gray-400 disabled:cursor-no-drop`;

    const variantStyles = {
      primary:
        'bg-primary text-white hover:brightness-125 hover:shadow-[0px_1px_11px_5px_rgba(255,255,255,0.5)]',
      ghost:
        'bg-transparent text-primary border-4 border-primary hover:bg-primary hover:text-white',
    };

    const sizeStyles = {
      large: 'px-20 py-6 text-lg',
      medium: 'px-12 py-4 text-base',
      small: 'px-6 py-2 text-sm rounded-sm',
    };

    const buttonClasses = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

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
