import { motion } from 'framer-motion';

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
    <Component className={`relative overflow-hidden rounded-2xl mx-auto ${className}`} {...rest}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-500 opacity-50 blur-3xl"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ backgroundSize: '600% 600%' }}
      />
      <div className="relative z-10 backdrop-blur-2xl bg-white/5 rounded-2xl">{children}</div>
    </Component>
  );
};

export { LiquidGlass };
