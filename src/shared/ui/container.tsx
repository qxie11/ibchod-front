'use client';

import React, { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Container = forwardRef<HTMLDivElement, Props>(({ children, className, ...rest }, ref) => (
  <div className={cn('max-w-[1250px] px-6 mx-auto', className)} {...rest} ref={ref}>
    {children}
  </div>
));

Container.displayName = 'Container';

export default Container;
