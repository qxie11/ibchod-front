import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          `w-full rounded-lg border-4 border-primary px-4 py-3
          text-lg focus:outline-none transition-all focus:shadow-[0_0_4px]`,
          {
            "border-gray-300 focus:ring-blue-500 focus:shadow-blue-500": error === false,
            "border-red-500 focus:ring-red-500 focus:shadow-red-500": error === true,
          },
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
