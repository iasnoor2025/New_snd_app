import { Employee } from './employee';
import { Equipment } from './models';
import { User } from './user';

/**
 * Equipment Rental status types
 */
export type EquipmentRentalStatus =
  | 'assigned'
  | 'in_use'
  | 'scheduled_return'
  | 'returned'
  | 'overdue'
  | 'damaged'
  | 'lost';

/**
 * Equipment Condition types for assessment
 */
export type EquipmentCondition =
  | 'excellent'
  | 'good'
  | 'fair'
  | 'poor'
  | 'damaged'
  | 'unusable';

/**
 * Equipment Rental interface representing equipment assigned to employees
 */
export interface EquipmentRental {
  id: number;
  employee_id: number;
  equipment_id: number;
  assigned_by: number;
  assigned_date: string;
  expected_return_date: string;
  actual_return_date?: string;
  initial_condition: EquipmentCondition;
  return_condition?: EquipmentCondition;
  status: EquipmentRentalStatus;
  rental_purpose: string;
  notes?: string;
  acknowledgment_signed: boolean;
  acknowledgment_date?: string;
  is_damaged: boolean;
  damage_description?: string;
  damage_cost?: number;
  damage_charged: boolean;
  damage_paid: boolean;
  created_at: string;
  updated_at: string;

  // Relations
  employee?: Employee;
  equipment?: Equipment;
  assignedBy?: User;
}

/**
 * Equipment Rental Form Data
 */
export interface EquipmentRentalFormData {
  employee_id: number;
  equipment_id: number;
  assigned_date: Date;
  expected_return_date: Date;
  initial_condition: EquipmentCondition;
  rental_purpose: string;
  notes?: string;
  acknowledgment_signed: boolean;
}

/**
 * Equipment Return Form Data
 */
export interface EquipmentReturnFormData {
  actual_return_date: Date;
  return_condition: EquipmentCondition;
  is_damaged: boolean;
  damage_description?: string;
  damage_cost?: number;
  notes?: string;
}

/**
 * Equipment Rental Filter
 */
export interface EquipmentRentalFilter {
  employee_id?: number;
  equipment_id?: number;
  status?: EquipmentRentalStatus;
  date_from?: string;
  date_to?: string;
}

/**
 * Damage Report interface
 */
export interface DamageReport {
  id: number;
  rental_id: number;
  reported_by: number;
  report_date: string;
  damage_description: string;
  repair_cost_estimate: number;
  repair_needed: boolean;
  repair_completed: boolean;
  repair_date?: string;
  repair_cost_actual?: number;
  charged_to_employee: boolean;
  created_at: string;
  updated_at: string;

  // Relations
  rental?: EquipmentRental;
  reportedBy?: User;
}
