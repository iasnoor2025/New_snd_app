import { usePage } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  roles: string[];
}

interface Auth {
  user: User;
}

/**
 * Custom hook for checking user permissions and roles
 */
export function usePermission() {
  const props = usePage().props as unknown;
  const auth = (props && typeof props === 'object' && 'auth' in props) ? (props as any).auth as Auth : undefined;

  const hasPermission = (permission: string): boolean => {
    if (!auth?.user) return false;

    // If user has a specific permission
    if (auth.user.permissions?.includes(permission)) {
      return true;
    }

    // If user has super admin or admin role
    if (auth.user.roles?.includes('super-admin') || auth.user.roles?.includes('admin')) {
      return true;
    }

    return false;
  };

  const hasRole = (role: string): boolean => {
    if (!auth?.user) return false;
    return auth.user.roles?.includes(role) || false;
  };

  return {
    hasPermission,
    hasRole,
    user: auth?.user,
  };
}
