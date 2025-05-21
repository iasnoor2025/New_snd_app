import { Employee } from './employee';
import { User } from './user';

/**
 * Final Settlement status types
 */
export type FinalSettlementStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'paid';

/**
 * Settlement component types
 */
export type SettlementComponentType =
  | 'salary'
  | 'leave_encashment'
  | 'bonus'
  | 'gratuity'
  | 'notice_period'
  | 'deduction'
  | 'advance_recovery'
  | 'equipment_recovery'
  | 'other';

/**
 * Final Settlement interface representing a complete settlement record for a departing employee
 */
export interface FinalSettlement {
  id: number;
  employee_id: number;
  employee?: Employee;
  exit_date: string;
  settlement_date: string;
  status: FinalSettlementStatus;
  total_settlement_amount: number;
  total_deduction_amount: number;
  final_amount: number;
  notice_period_served: boolean;
  notice_period_days: number;
  approved_by?: number;
  approver?: User;
  approved_at?: string;
  paid_by?: number;
  payer?: User;
  paid_at?: string;
  payment_method?: string;
  payment_reference?: string;
  components?: SettlementComponent[];
  notes?: string;
  documents?: SettlementDocument[];
  created_at: string;
  updated_at: string;
}

/**
 * Settlement Component interface representing individual line items in a settlement
 */
export interface SettlementComponent {
  id: number;
  settlement_id: number;
  type: SettlementComponentType;
  description: string;
  amount: number;
  is_deduction: boolean;
  calculation_notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Settlement Document interface for tracking final clearance documents
 */
export interface SettlementDocument {
  id: number;
  settlement_id: number;
  name: string;
  file_path: string;
  file_type: string;
  is_mandatory: boolean;
  is_submitted: boolean;
  submitted_at?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Final Settlement form data
 */
export interface FinalSettlementFormData {
  employee_id: number;
  exit_date: Date;
  settlement_date: Date;
  notice_period_served: boolean;
  notice_period_days: number;
  components: {
    type: SettlementComponentType;
    description: string;
    amount: number;
    is_deduction: boolean;
    calculation_notes?: string;
  }[];
  notes?: string;
}

/**
 * Final Settlement filter interface
 */
export interface FinalSettlementFilter {
  employee_id?: number;
  status?: FinalSettlementStatus;
  date_from?: string;
  date_to?: string;
}
