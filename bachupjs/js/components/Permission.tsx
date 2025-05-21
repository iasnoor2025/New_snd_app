import React, { ReactNode } from 'react';
import { usePermission } from '@/hooks/usePermission';
import AccessDenied from './AccessDenied';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import PermissionUtils from '@/utils/permission-utils';

interface PermissionProps {
  // Permission checking
  permission?: string;
  permissions?: string[];
  allPermissions?: boolean;

  // Resource-based permission checking
  resource?: string;
  action?: string;

  // Role checking
  role?: string;
  roles?: string[];
  allRoles?: boolean;

  // UI elements
  children: ReactNode;
  fallback?: ReactNode;
  showAccessDenied?: boolean;

  // Legacy support
  backwardCompatibleWith?: string;
}

/**
 * Permission component for conditional rendering based on user permissions
 *
 * Usage examples:
 * <Permission permission="rentals.create">
 *   <Button>Create Rental</Button>
 * </Permission>
 *
 * <Permission resource="rentals" action="create">
 *   <Button>Create Rental</Button>
 * </Permission>
 *
 * <Permission permissions={['rentals.edit', 'rentals.delete']} allPermissions={true}>
 *   <div>User has all these permissions</div>
 * </Permission>
 *
 * <Permission role="admin">
 *   <AdminPanel />
 * </Permission>
 *
 * <Permission roles={['admin', 'manager']}>
 *   <ManagerTools />
 * </Permission>
 *
 * <Permission permission="rentals.delete" fallback={<p>You don't have permission</p>}>
 *   <DeleteButton />
 * </Permission>
 */
export default function Permission({
  permission,
  permissions,
  allPermissions = false,
  resource,
  action,
  role,
  roles,
  allRoles = false,
  children,
  fallback = null,
  showAccessDenied = true,
  backwardCompatibleWith
}: PermissionProps) {
  const {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    isAdmin,
    checkResourcePermission
  } = usePermission();

  // Get auth data directly to check if it's available
  const pageProps = usePage<PageProps>().props;
  const auth = pageProps?.auth || { user: null, hasPermission: [], hasRole: [] };

  // Check if user is logged in
  if (!auth?.user) {
    console.warn('Permission component: No user data found in auth context');
    return showAccessDenied ? <AccessDenied /> : <>{fallback}</>
  }

  // Admin always has access to everything
  if (isAdmin) {
    return <>{children}</>
  }

  // Check if permission data exists
  if (!Array.isArray(auth?.hasPermission)) {
    console.error('Permission component: auth.hasPermission is not an array', auth?.hasPermission);

    // In development, allow access for debugging
    if (import.meta.env.DEV) {
      console.warn('DEV MODE: bypassing permission check due to missing data');
      return <>{children}</>
    }

    return showAccessDenied ? <AccessDenied /> : <>{fallback}</>
  }

  // Permissions check
  let hasAccess = true;
  let failReason = '';

  // If resource and action are provided, format into a permission
  if (resource && action) {
    // Use the checkResourcePermission to check all permission variants
    hasAccess = checkResourcePermission(resource, action);
    if (!hasAccess) {
      failReason = `Missing resource permission: ${resource}.${action}`;
    }
  }
  // Check for specific single permission with backward compatibility
  else if (permission) {
    hasAccess = hasPermission(permission);

    // Check alternative permission format if the primary permission format fails
    if (!hasAccess) {
      // For format resource.action, try action-resource
      if (permission.includes('.')) {
        const [res, act] = permission.split('.');
        // Try action-resource format
        hasAccess = hasPermission(`${act}-${res.endsWith('s') ? res.slice(0, -1) : res}`);
      }
      // For format action-resource, try resource.action
      else if (permission.includes('-')) {
        const [act, res] = permission.split('-');
        // Try resource.action format (plural)
        hasAccess = hasPermission(`${res}s.${act}`);
        // If still no access, try without making the resource plural
        if (!hasAccess) {
          hasAccess = hasPermission(`${res}.${act}`);
        }
      }
    }

    // If there's a backward compatible permission and the user doesn't have the primary one,
    // check if they have the backward compatible permission instead
    if (!hasAccess && backwardCompatibleWith) {
      hasAccess = hasPermission(backwardCompatibleWith);
      if (hasAccess && import.meta.env.DEV) {
        console.info(`Access granted through backward compatible permission: ${backwardCompatibleWith}`);
      }
    }

    if (!hasAccess) failReason = `Missing permission: ${permission}${backwardCompatibleWith ? ` or ${backwardCompatibleWith}` : ''}`;
  }

  // Check for multiple permissions - either any or all
  if (permissions && permissions.length > 0 && hasAccess) {
    if (allPermissions) {
      hasAccess = hasAllPermissions(permissions);
      if (!hasAccess) failReason = `Missing some permissions from: ${permissions.join(', ')}`;
    } else {
      hasAccess = hasAnyPermission(permissions);
      if (!hasAccess) failReason = `Missing all permissions from: ${permissions.join(', ')}`;
    }
  }

  // Check for specific role
  if (role && hasAccess) {
    hasAccess = hasRole(role);
    if (!hasAccess) failReason = `Missing role: ${role}`;
  }

  // Check for multiple roles - either any or all
  if (roles && roles.length > 0 && hasAccess) {
    if (allRoles) {
      // Only checks hasRole for all provided roles
      hasAccess = roles.every(r => hasRole(r));
      if (!hasAccess) failReason = `Missing some roles from: ${roles.join(', ')}`;
    } else {
      hasAccess = hasAnyRole(roles);
      if (!hasAccess) failReason = `Missing all roles from: ${roles.join(', ')}`;
    }
  }

  // If development mode, log access checks
  if (import.meta.env.DEV) {
    console.log('Permission Check:', {
      component: 'Permission',
      permission,
      permissions,
      resource,
      action,
      role,
      roles,
      allPermissions,
      allRoles,
      hasAccess,
      failReason,
      backwardCompatibleWith,
      user: auth.user.name
    })
  }

  // Return appropriate content
  return hasAccess ? <>{children}</> : (showAccessDenied ? <AccessDenied /> : <>{fallback}</>);
}
