import React from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

interface PageBreadcrumbProps {
  items: BreadcrumbItemType[];
}

export const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ items }) => {
  return <Breadcrumbs breadcrumbs={items} />
};
