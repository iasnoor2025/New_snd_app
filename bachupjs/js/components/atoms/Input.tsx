import { FC, InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/Utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        className={cn(
                            'block w-full rounded-md border-gray-300 shadow-sm',
                            'focus:border-primary-500 focus:ring-primary-500 sm:text-sm',
                            'disabled:bg-gray-100 disabled:cursor-not-allowed',
                            error && 'border-red-300 text-red-900 placeholder-red-300',
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {(error || helperText) && (
                    <p
                        className={cn(
                            'mt-1 text-sm',
                            error ? 'text-red-600' : 'text-gray-500'
                        )}
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);
