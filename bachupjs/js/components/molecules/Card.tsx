import { FC, ReactNode } from 'react';
import { cn } from '@/Utils/cn';

export interface CardProps {
    children: ReactNode;
    className?: string;
    header?: ReactNode;
    footer?: ReactNode;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    variant?: 'default' | 'bordered' | 'elevated';
}

const paddingStyles: Record<CardProps['padding'], string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
};

const variantStyles: Record<CardProps['variant'], string> = {
    default: 'bg-white',
    bordered: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg'
};

export const Card: FC<CardProps> = ({
    children,
    className,
    header,
    footer,
    padding = 'md',
    variant = 'default'
}) => {
    return (
        <div
            className={cn(
                'rounded-lg',
                variantStyles[variant],
                className
            )}
            {header && (
                <div className="border-b border-gray-200 px-6 py-4">
                    {header}
                </div>
            )}
            <div className={cn(paddingStyles[padding])}>{children}</div>
            {footer && (
                <div className="border-t border-gray-200 px-6 py-4">
                    {footer}
                </div>
            )}
        </div>
    );
};
