// Define Permission type for use with Spatie Permission
export type Permission =
  // Rental permissions
  | 'rentals.view'
  | 'rentals.create'
  | 'rentals.edit'
  | 'rentals.delete'
  | 'rentals.extend'

  // Quotation permissions
  | 'quotations.view'
  | 'quotations.create'
  | 'quotations.edit'
  | 'quotations.delete'

  // Customer permissions
  | 'customers.view'
  | 'customers.create'
  | 'customers.edit'
  | 'customers.delete'

  // Equipment permissions
  | 'equipment.view'
  | 'equipment.create'
  | 'equipment.edit'
  | 'equipment.delete'

  // Payment permissions
  | 'payments.view'
  | 'payments.create'
  | 'payments.manage'
  | 'payments.delete'

  // Document permissions
  | 'documents.view'
  | 'documents.create'
  | 'documents.manage'
  | 'documents.delete'

  // Report permissions
  | 'reports.view'
  | 'reports.create'

  // Admin permissions
  | 'admin.access'
  | 'users.manage'
  | 'roles.manage'
  | 'settings.manage';
