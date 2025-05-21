import React, { memo } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import ListErrorBoundary from '@/components/error/ListErrorBoundary';

// Memoize the Breadcrumbs component to prevent unnecessary re-renders
export const Breadcrumbs = memo(function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    // Safe check to make sure breadcrumbs is an array
    const breadcrumbsArray = Array.isArray(breadcrumbs) ? breadcrumbs : [];

    if (breadcrumbsArray.length === 0) return null;

    return (
        <ListErrorBoundary fallback={<div className="py-2"></div>}>
            <Breadcrumb
                segments={breadcrumbsArray.map(item => ({
                    title: item.title,
                    href: item.href
                }))}
            />
        </ListErrorBoundary>
    );
})
