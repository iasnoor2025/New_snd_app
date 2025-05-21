/**
 * Utility functions for working with permissions
 */

/**
 * Maps a resource name from new format to legacy format
 * This helps maintain backward compatibility with older permission systems
 *
 * @param resourceName The current resource name (e.g., 'customers')
 * @returns The legacy resource name if available (e.g., 'clients')
 */
export const mapResourceToLegacyResource = (resourceName: string): string | null => {
  const legacyMappings: Record<string, string> = {
    'customers': 'clients',
    'equipments': 'equipment',
    'employee-schedules': 'timesheets',
    'service-tickets': 'maintenance',
  };

  return legacyMappings[resourceName] || null;
};

/**
 * Normalizes a permission name based on the resource
 *
 * @param resource The resource name (e.g., 'customers')
 * @param action The action (e.g., 'view', 'create', 'edit', 'delete')
 * @returns Formatted permission name (e.g., 'customers.view')
 */
export const formatPermission = (resource: string, action: string): string => {
  return `${resource}.${action}`;
};

/**
 * Gets all possible permission variations for a resource and action
 * This includes both new and legacy permission formats
 *
 * @param resource The resource name (e.g., 'customers')
 * @param action The action (e.g., 'view', 'create', 'edit', 'delete')
 * @returns Array of possible permission names
 */
export const getPermissionVariations = (resource: string, action: string): string[] => {
  const permissions = [formatPermission(resource, action)];

  const legacyResource = mapResourceToLegacyResource(resource);
  if (legacyResource) {
    permissions.push(formatPermission(legacyResource, action));
  }

  return permissions;
};

/**
 * Helper for common CRUD permission formatting
 */
export const PermissionActions = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  UPDATE: 'update', // Alias for edit in some systems
  DELETE: 'delete',
  EXPORT: 'export',
  IMPORT: 'import',
};

export default {
  mapResourceToLegacyResource,
  formatPermission,
  getPermissionVariations,
  PermissionActions,
};

