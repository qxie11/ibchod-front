import React, { ElementType, HTMLAttributes, Ref, forwardRef } from 'react';

import { cn } from '../lib/utils';

interface Props<T extends ElementType = 'p'> extends HTMLAttributes<React.ElementRef<T>> {
  className?: string;
  tagName?: React.ElementType;
}

const Text = forwardRef(
  <T extends ElementType = 'p'>(
    { children, className, tagName, ...rest }: Props<T>,
    ref: Ref<React.ElementRef<T>>
  ) => {
    const Tag = tagName || 'p';

    return (
      <Tag ref={ref} className={cn('text-sm text-muted-foreground ', className)} {...rest}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';

export default Text;
