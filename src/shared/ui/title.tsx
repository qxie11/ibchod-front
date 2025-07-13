import React, { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'large' | 'medium' | 'small' | 'extra-small';
}

const Title = forwardRef<HTMLHeadingElement, Props>(
  ({ children, className, variant = 'h1', size = 'medium', ...rest }, ref) => {
    const TagName = variant;

    return (
      <TagName
        className={cn('font-sans font-bold', className, {
          'text-5xl': size === 'large',
          'text-3xl': size === 'medium',
          'text-lg': size === 'small',
          'text-sm': size === 'extra-small',
        })}
        ref={ref}
        {...rest}
      >
        {children}
      </TagName>
    );
  }
);

Title.displayName = 'Title';

export { Title };
