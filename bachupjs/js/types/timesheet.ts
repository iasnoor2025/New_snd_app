import { Employee } from './employee';
import { User } from './user';
import { Project } from './project';

/**
 * Possible timesheet status values
 */
export type TimesheetStatus = 'pending' | 'approved' | 'rejected';

/**
 * Employee timesheet interface for daily work records
 */
export interface EmployeeTimesheet {
  id: number;
  employee_id: number;
  employee?: Employee;
  date: string;
  regular_hours: number;
  overtime_hours: number;
  total_hours: number;
  break_duration?: number;
  clock_in?: string;
  clock_out?: string;
  break_start?: string;
  break_end?: string;
  status: TimesheetStatus;
  project_id?: number;
  project?: Project;
  location?: string;
  notes?: string;
  rejection_reason?: string;
  approved_by?: number;
  approver?: User;
  approved_at?: string;
  created_by?: number;
  creator?: User;
  created_at: string;
  updated_at: string;
}

/**
 * Timesheet submission form data interface
 */
export interface TimesheetFormData {
  employee_id: number;
  date: Date;
  clock_in?: string;
  clock_out?: string;
  break_start?: string;
  break_end?: string;
  regular_hours?: number;
  overtime_hours?: number;
  project_id?: number;
  location?: string;
  notes?: string;
}

/**
 * Timesheet filter interface
 */
export interface TimesheetFilter {
  start_date?: string;
  end_date?: string;
  employee_id?: number;
  project_id?: number;
  status?: TimesheetStatus;
}

/**
 * Timesheet statistics
 */
export interface TimesheetStats {
  total_regular_hours: number;
  total_overtime_hours: number;
  total_hours: number;
  days_worked: number;
  avg_hours_per_day: number;
  approved_count: number;
  pending_count: number;
  rejected_count: number;
}

/**
 * Timesheet Daily Summary
 */
export interface TimesheetDailySummary {
  date: string;
  regular_hours: number;
  overtime_hours: number;
  status: TimesheetStatus | 'absent';
  notes?: string;
  timesheet_id?: number;
}
