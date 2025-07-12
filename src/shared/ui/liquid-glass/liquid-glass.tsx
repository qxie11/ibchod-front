'use client';

import React, { ElementType } from 'react';

import { cn } from '@/shared/lib/utils';

interface LiquidGlassProps {
  as?: ElementType;
  className?: string;
  children?: React.ReactNode;
}

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  className,
  children,
  as: Component = 'div',
}) => {
  return (
    <>
      <svg className="hidden">
        <filter
          id="glass-distortion"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          filterUnits="objectBoundingBox"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="turbulence"
          />

          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>

          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

          <feSpecularLighting
            in="softMap"
            surfaceScale="5"
            specularConstant="1"
            specularExponent="100"
            lightingColor="white"
            result="specLight"
          >
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>

          <feComposite
            in="specLight"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litImage"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="softMap"
            scale={200}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <Component className={cn('relative', className)}>
        <span
          style={{ filter: 'url(#glass-distortion)' }}
          className="absolute z-0 backdrop-blur-[3px] overflow-hidden isolate inset-0"
        />
        <span className="z-[1] absolute inset-0 bg-white/25" />
        <span className="absolute z-[2] overflow-hidden shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.5),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.5)] inset-0" />
        <div className="relative z-[3]">{children}</div>
      </Component>
    </>
  );
};
