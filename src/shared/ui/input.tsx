import { forwardRef } from 'react';

import { cn } from '@/shared/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          `w-full rounded-lg border-4 border-primary px-4 py-3
          text-lg focus:outline-none transition-all focus:shadow-[0_0_4px]`,
          {
            'border-gray-300 focus:ring-blue-500 focus:shadow-blue-500': error === false,
            'border-red-500 focus:ring-red-500 focus:shadow-red-500': error === true,
            'file:border-0 file:bg-transparent file:text-sm file:font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-primary file:bg-blue-50 hover:file:bg-blue-100':
              type === 'file',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
