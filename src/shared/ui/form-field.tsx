import { cn } from "@/lib/utils";
import React, { useId } from "react";


interface FormFieldProps {
    label: string;
    error?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    children,
    className,
}) => {
    const id = useId();
    const child = React.Children.map(children, (el) =>
        React.cloneElement(el as React.ReactElement, {
            id,
        })
    );

    return (
        <div className={className}>
            <label htmlFor={id} className="block text-lg font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">{child}</div>
            <p
                className={cn(
                    "mt-1 text-lg font-medium text-red-600 overflow-hidden transition-all duration-300 ease-in-out",
                    {
                        "max-h-0": !error,
                        "max-h-[100px]": error,
                    }
                )}
            >
                {error}
            </p>
        </div>
    );
};

export default FormField;
