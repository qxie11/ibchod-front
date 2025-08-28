import React, { useId } from 'react';

import { cn } from '@/shared/lib/utils';

import Text from './text';

interface FormFieldProps {
  label: string;
  error?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, children, className }) => {
  const id = useId();
  const child = React.Children.map(children, (el) =>
    React.cloneElement(el as React.ReactElement, {
      id,
    })
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="block font-medium text-gray-700 mb-1 text-xs md:text-sm">
        {label}
      </label>
      <div className="mb-1">{child}</div>
      <Text
        className={cn(
          'mb-1 text-sm md:text-lg font-medium text-red-600 overflow-hidden transition-all duration-300 ease-in-out',
          {
            'max-h-0': !error,
            'max-h-[100px]': error,
          }
        )}
      >
        {error}
      </Text>
    </div>
  );
};

export default FormField;
