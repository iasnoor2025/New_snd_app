export interface Customer {
  id: number;
  company_name: string;
  contact_person: string;
  additional_contact_person?: string;
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  tax_number: string;
  credit_limit: number;
  payment_terms: string;
  notes: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  full_address?: string;
}

export interface Position {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  user_id: number;
  employee_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  nationality: string;
  date_of_birth?: string;
  position: string | Position;
  role: 'admin' | 'manager' | 'foreman' | 'workshop' | 'employee';
  hourly_rate: number;
  basic_salary: number;
  food_allowance?: number;
  housing_allowance?: number;
  transport_allowance?: number;
  absent_deduction_rate?: number;
  advance_payment?: number;
  overtime_rate_multiplier?: number;
  overtime_fixed_rate?: number;
  bank_name?: string;
  bank_account_number?: string;
  bank_iban?: string;
  contract_hours_per_day: number;
  contract_days_per_month: number;
  hire_date: string;
  status: 'active' | 'inactive' | 'on_leave';
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  full_name?: string;
  user?: User;
  file_number?: string;
  current_location?: string;
  current_assignment?: {
    type: 'project' | 'rental' | 'leave';
    name: string;
    location: string;
    start_date?: string;
    end_date?: string;
    project_name?: string;
    customer_name?: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  roles?: Role[];
  permissions?: Permission[];
}

export interface Role {
  id: number;
  name: string;
  display_name?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  permissions?: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  display_name?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Allow string literals as Permission values for simpler permission checks
export type PermissionString =
  | 'customers.view' | 'customers.create' | 'customers.edit' | 'customers.delete' | 'customers.export' | 'customers.import'
  | 'clients.view' | 'clients.create' | 'clients.edit' | 'clients.delete' | 'clients.export' | 'clients.import'
  | 'rentals.view' | 'rentals.create' | 'rentals.edit' | 'rentals.delete' | 'rentals.extend'
  | 'equipment.view' | 'equipment.create' | 'equipment.edit' | 'equipment.delete'
  | 'employees.view' | 'employees.create' | 'employees.edit' | 'employees.delete'
  | 'quotations.view' | 'quotations.create' | 'quotations.edit' | 'quotations.delete' | 'quotations.approve'
  | 'invoices.view' | 'invoices.create' | 'invoices.edit' | 'invoices.delete'
  | 'payments.view' | 'payments.create' | 'payments.edit' | 'payments.delete' | 'payments.manage'
  | 'documents.view' | 'documents.create' | 'documents.edit' | 'documents.delete' | 'documents.manage'
  | 'reports.view' | string;

export interface LeaveRequest {
  id: number;
  employee_id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
  reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
  employee?: Employee;
}

export interface Timesheet {
  id: number;
  employee_id: number;
  date: string;
  hours_worked: number;
  overtime_hours: number;
  project: string;
  notes: string;
  created_at: string;
  updated_at: string;
  employee?: Employee;
}

export interface Equipment {
  id: number;
  name: string;
  model: string;
  serial_number: string;
  door_number?: string;
  description?: string;
  status: string;
  daily_rate: number;
  hourly_rate?: number;
  weekly_rate?: number;
  monthly_rate?: number;
  purchase_date?: string;
  purchase_cost?: number;
  last_maintenance_date: string | null;
  next_maintenance_date: string | null;
  location: string;
  category: string;
  location_id?: number;
  category_id?: number;
  notes: string;
  created_at: string;
  updated_at: string;
  documents?: Document[];
}

export interface Document {
  id: number;
  name: string;
  file_path: string;
  file_type: string;
  size: string;
  added_date: string;
  documentable_id: number;
  documentable_type: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceRecord {
  id: number;
  equipment_id: number;
  maintenance_date: string;
  maintenance_type: string;
  description: string;
  cost: number;
  performed_by: string;
  status: string;
  notes: string;
  next_maintenance_date: string | null;
  created_at: string;
  updated_at: string;
  equipment?: Equipment;
}

export interface MaintenancePart {
  id: number;
  maintenance_record_id: number;
  part_name: string;
  part_number?: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  supplier?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  part_number?: string;
  description?: string;
  quantity_in_stock: number;
  minimum_stock_level: number;
  unit_cost: number;
  location?: string;
  category?: string;
  supplier?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface RentalItem {
  id: number;
  rental_id: number;
  equipment_id: number;
  quantity: number;
  rate: number;
  rate_type: 'hourly' | 'daily' | 'weekly' | 'monthly';
  total_amount: number;
  operator_id?: number | null;
  created_at: string;
  updated_at: string;
  equipment?: Equipment;
  operator?: Employee | null;
  rental?: Rental;
}

export interface Rental {
  id: number;
  customer_id: number;
  customer?: Customer;
  quotation_id?: number | null;
  rental_number: string;
  start_date: string;
  expected_end_date: string;
  actual_end_date?: string | null;
  mobilization_date?: string | null;
  invoice_date?: string | null;
  status: RentalStatus;
  deposit_amount?: number | null;
  payment_terms_days?: number | null;
  payment_due_date?: string | null;
  total_amount: number;
  tax_percentage?: number | null;
  discount_percentage?: number | null;
  has_timesheet?: boolean;
  has_operators?: boolean;
  notes?: string | null;
  created_by?: number;
  completed_by?: number | null;
  completed_at?: string | null;
  approved_by?: number | null;
  approved_at?: string | null;
  duration_days?: number;
  created_at: string;
  updated_at: string;
  rentalItems?: RentalItem[];
  invoices?: Invoice[];
  timesheets?: RentalTimesheet[];
  quotation?: Quotation;
}

export interface RentalTimesheet {
  id: number;
  rental_id: number;
  rental_item_id: number;
  date: string;
  start_time: string;
  end_time: string;
  hours_used: number;
  notes?: string;
  operator_id?: number;
  operator_absent?: boolean;
  rate: number;
  total_amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_by: number;
  approved_by?: number;
  approved_at?: string;
  created_at: string;
  updated_at: string;
  rental?: Rental;
  rentalItem?: RentalItem;
  operator?: User;
  creator?: User;
  approver?: User;
  equipment?: Equipment;
}

export interface Quotation {
  id: number;
  customer_id: number;
  rental_id: number | null;
  quotation_number: string;
  issue_date: string;
  valid_until: string;
  status: string;
  subtotal: number;
  tax_percentage: number;
  tax_amount: number;
  discount_percentage: number;
  discount_amount: number;
  total_amount: number;
  notes: string | null;
  terms_and_conditions: string | null;
  approved_at: string | null;
  rejected_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Operator {
  id: number;
  name: string;
  employee_id?: number;
  category: 'operator' | 'driver';
  hourly_rate?: number;
  daily_rate?: number;
  is_available?: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuotationItem {
  id: number;
  quotation_id: number;
  equipment_id: number | null;
  operator_id: number | null;
  description: string;
  quantity: number;
  rate: number;
  rate_type: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
  equipment?: Equipment;
  operator?: Operator;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  customer_id: number;
  rental_id: number | null;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  balance: number;
  status: 'draft' | 'sent' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  rental?: Rental;
  invoiceItems?: InvoiceItem[];
  balance_due?: number;
  is_overdue?: boolean;
  payment_status?: 'paid' | 'partial' | 'unpaid';
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  created_at: string;
  updated_at: string;
  subtotal?: number;
}

export interface Payment {
  id: number;
  invoice_id: number;
  customer_id: number;
  payment_number: string;
  payment_date: string;
  amount: number;
  payment_method: string;
  reference_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  invoice?: Invoice;
  customer?: Customer;
}

export interface AdvancePayment {
  id: number;
  employee_id: number;
  amount: number;
  payment_date: string;
  repaid_amount: number;
  repayment_date: string | null;
  status: 'pending' | 'partially_repaid' | 'fully_repaid';
  notes: string;
  approved_by: number;
  created_at: string;
  updated_at: string;
  employee?: Employee;
  approver?: User;
}

export type RentalStatus =
  | 'pending'
  | 'quotation'
  | 'quotation_approved'
  | 'mobilization'
  | 'mobilization_completed'
  | 'active'
  | 'completed'
  | 'invoice_prepared'
  | 'payment_pending'
  | 'overdue'
  | 'closed';

export interface ProjectEquipment {
  id: number;
  project_id: number;
  equipment_id: number;
  start_date: string;
  end_date: string | null;
  usage_hours: number;
  hourly_rate: number;
  maintenance_cost: number;
  total_cost: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
  project?: {
    id: number;
    name: string;
  };
  equipment?: Equipment;
}

export interface Assignment {
  id: number;
  employee_id: number;
  type: 'project' | 'rental';
  name: string;
  location?: string;
  start_date: string;
  end_date?: string | null;
  status: string;
  notes?: string | null;
  assigned_by?: { id: number; name: string } | null;
  project?: {
    id: number;
    name: string;
    location?: {
      id: number;
      name: string;
    } | null;
  } | null;
  rental?: {
    id: number;
    number: string;
    customer?: {
      id: number;
      name: string;
    } | null;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  client: Customer | null;
  customer_id: number;
  location_id?: number;
  location?: Location;
  start_date: string;
  end_date: string | null;
  status: string;
  budget: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
