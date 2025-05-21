import React, { ReactNode, FC } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayoutTemplate from './app/app-sidebar-layout';
import { usePermission } from '@/hooks/usePermission';
import { useEffect, useState } from 'react';
import { type BreadcrumbItem, User } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import ErrorBoundary from '@/components/ErrorBoundary';
import Permission from '@/components/Permission';

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  requiredPermission?: string;
  requiredRole?: string;
  header: ReactNode;
  user: User & {
    roles: {
      id: number;
      name: string;
      display_name?: string;
    }[];
  };
}

// Map of backward compatible permissions
const PERMISSION_MAPPINGS: Record<string, string> = {
  // Map between different permission formats
  // Format: 'new.permission': 'old.permission'
  'customers.view': 'customers.view',
  'customers.create': 'customers.create',
  'customers.edit': 'customers.edit',
  'customers.delete': 'customers.delete',

  // Add more mappings as needed
};

const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  title,
  breadcrumbs,
  requiredPermission,
  requiredRole = 'admin',
  header,
  user,
  ...props
}) => {
  const { isAdmin } = usePermission();

  // Get page props using usePage hook
  const pageProps = usePage().props as any;

  // Ensure auth object exists with safe defaults
  const auth = pageProps?.auth || {
    user: null,
    hasPermission: [],
    hasRole: []
  };

  // If no permission is required, or the user is admin, render content directly
  if (!requiredPermission || isAdmin) {
    return (
      <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {title && <Head title={title} />}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </AppLayoutTemplate>
    );
  }

  // For non-admin users who need specific permission, use Permission component
  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      {title && <Head title={title} />}
      <ErrorBoundary>
        <Permission
          permission={requiredPermission}
          backwardCompatibleWith={PERMISSION_MAPPINGS[requiredPermission]}
          role={requiredRole}
          showAccessDenied={true}
        >
          {children}
        </Permission>
      </ErrorBoundary>
    </AppLayoutTemplate>
  );
};

export default AdminLayout;
