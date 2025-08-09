import React, { HTMLAttributes } from 'react';

interface LiquidGlassProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  className = '',
  children,
  as: Component = 'div',
  ...rest
}) => {
  return (
    <Component className={className} {...rest}>
      {children}
    </Component>
  );
};

export { LiquidGlass };
