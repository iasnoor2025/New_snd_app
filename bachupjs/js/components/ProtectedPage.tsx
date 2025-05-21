import React, { ReactNode, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { usePermission } from '@/hooks/usePermission';

interface ProtectedPageProps {
  children: ReactNode;
  permission?: string;
  permissions?: string[];
  allPermissions?: boolean;
  role?: string;
  roles?: string[];
  allRoles?: boolean;
  title?: string;
  redirectTo?: string;
}

export default function ProtectedPage({
  children,
  permission,
  permissions,
  allPermissions = false,
  role,
  roles,
  allRoles = false,
  title,
  redirectTo = '/dashboard',
}: ProtectedPageProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
  } = usePermission();

  // Check permissions
  let hasAccess = true;

  if (permission) {
    hasAccess = hasPermission(permission);
  }

  if (permissions) {
    hasAccess = allPermissions
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions);
  }

  // Check roles
  if (role) {
    hasAccess = hasAccess && hasRole(role);
  }

  if (roles) {
    hasAccess = hasAccess && (allRoles
      ? roles.every(r => hasRole(r))
      : hasAnyRole(roles));
  }

  // Redirect if no access
  useEffect(() => {
    if (!hasAccess) {
      router.visit(redirectTo);
    }
  }, [hasAccess, redirectTo]);

  if (!hasAccess) {
    return (
      <AppShell>
        <Head title="Access Denied" />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">
              You do not have permission to access this page.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {title && <Head title={title} />}
      {children}
    </AppShell>
  );
}
