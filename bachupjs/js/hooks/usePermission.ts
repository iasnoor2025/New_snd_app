import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

/**
 * Custom hook for checking user permissions and roles
 */
export function usePermission() {
  // Safely access page props with fallback defaults
  const { props } = usePage<PageProps>();
  const auth = props?.auth || { user: null, permissions: [], hasPermission: [], hasRole: [] };

  // Extract permissions and roles, ensuring they're arrays
  const permissions = auth?.permissions || [];
  const userPermissions = Array.isArray(auth?.hasPermission) ? auth.hasPermission : [];
  const userRoles = Array.isArray(auth?.hasRole) ? auth.hasRole : [];

  // Check if user has admin role directly
  const isAdmin = userRoles.includes('admin');

  const hasPermission = (permission: string): boolean => {
    if (!permission) return false;

    // Admin should have all permissions
    if (isAdmin) return true;

    // Check for direct permission
    return userPermissions.includes(permission);
  };

  const hasAnyPermission = (permissionsToCheck: string[]): boolean => {
    // Admin should have all permissions
    if (isAdmin) return true;
    return permissionsToCheck.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissionsToCheck: string[]): boolean => {
    // Admin should have all permissions
    if (isAdmin) return true;
    return permissionsToCheck.every(permission => hasPermission(permission));
  };

  // Check for permission in both formats: `resource.action` and `action-resource`
  const checkResourcePermission = (resource: string, action: string): boolean => {
    if (!resource || !action) return false;

    // Admin should have all permissions
    if (isAdmin) return true;

    // Format 1: resource.action (e.g., quotations.edit)
    const dotFormat = `${resource}.${action}`;

    // Format 2: action-resource (e.g., edit-quotation)
    const dashFormat = `${action}-${resource}`;

    // For a plural resource like 'quotations', also check singular form 'quotation'
    const singularResource = resource.endsWith('s') ? resource.slice(0, -1) : resource;
    const dashFormatSingular = `${action}-${singularResource}`;

    return hasPermission(dotFormat) || hasPermission(dashFormat) || hasPermission(dashFormatSingular);
  };

  const hasRole = (role: string): boolean => {
    if (!role) return false;
    return userRoles.includes(role);
  };

  const hasAnyRole = (rolesToCheck: string[]): boolean => {
    return rolesToCheck.some(role => hasRole(role));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    isAdmin,
    permissions,
    userRoles,
    checkResourcePermission
  };
}

/*
// When ready for production, replace the above function with this:
export function usePermission() {
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;

  const hasPermission = (permission: string): boolean => {
    if (!permission || !auth.hasPermission) return false;
    return auth.hasPermission(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const hasRole = (role: string): boolean => {
    if (!role || !auth.hasRole) return false;
    return auth.hasRole(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
  };
}
*/
