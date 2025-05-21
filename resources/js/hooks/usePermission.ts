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
    userRoles
  };
}
