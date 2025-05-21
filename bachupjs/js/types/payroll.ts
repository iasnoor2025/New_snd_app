import { Employee } from './employee';
import { User } from './user';

/**
 * Payroll status types
 */
export type PayrollStatus = 'pending' | 'approved' | 'paid' | 'cancelled';

/**
 * Payroll item types
 */
export type PayrollItemType =
  | 'base_salary'
  | 'overtime'
  | 'allowances'
  | 'bonus'
  | 'tax'
  | 'insurance'
  | 'advance'
  | 'deduction'
  | 'other';

/**
 * Payment method types
 */
export type PaymentMethod = 'bank_transfer' | 'cash' | 'check' | 'mobile_money';

/**
 * Payroll interface representing a complete payroll record for an employee
 */
export interface Payroll {
  id: number;
  employee_id: number;
  employee?: Employee;
  payroll_month: string;
  base_salary: number;
  overtime_hours: number;
  overtime_amount: number;
  bonus_amount: number;
  deduction_amount: number;
  final_amount: number;
  total_worked_hours: number;
  status: PayrollStatus;
  approved_by?: number;
  approver?: User;
  approved_at?: string;
  payment_method?: PaymentMethod;
  payment_reference?: string;
  paid_by?: number;
  payer?: User;
  paid_at?: string;
  items?: PayrollItem[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * PayrollItem interface representing individual line items in a payroll
 */
export interface PayrollItem {
  id: number;
  payroll_id: number;
  type: PayrollItemType;
  description: string;
  amount: number;
  is_taxable: boolean;
  metadata?: Record<string, any>
  created_at: string;
  updated_at: string;
}

/**
 * PayrollRun interface representing a batch payroll run for multiple employees
 */
export interface PayrollRun {
  id: number;
  run_date: string;
  run_by: number;
  user?: User;
  status: 'processing' | 'completed' | 'cancelled' | 'rejected';
  total_employees: number;
  total_amount: number;
  notes?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Payroll summary statistics
 */
export interface PayrollStats {
  total_payrolls: number;
  total_amount: number;
  pending_count: number;
  approved_count: number;
  paid_count: number;
  employee_count: number;
}

/**
 * Payroll generation form data
 */
export interface PayrollGenerationFormData {
  employee_id?: number;
  month: Date;
  manual_adjustments?: PayrollAdjustment[];
}

/**
 * Payroll adjustment for manual entries
 */
export interface PayrollAdjustment {
  id?: string; // Temporary client-side ID
  type: PayrollItemType;
  description: string;
  amount: number;
  is_taxable: boolean;
}

/**
 * Payroll payment form data
 */
export interface PayrollPaymentFormData {
  payment_method: PaymentMethod;
  payment_reference?: string;
  notes?: string;
}



