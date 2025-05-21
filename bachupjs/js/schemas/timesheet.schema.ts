import { z } from 'zod';
import { commonSchemas, requiredString } from './common.schema';

/**
 * Schema for timesheet validation
 */
export const timesheetSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee is required" }),
  date: z.date({
    required_error: "Date is required",
    invalid_type_error: "Please enter a valid date",
  }),
  hours_worked: z.coerce.number()
    .min(0.5, "Hours worked must be at least 0.5")
    .max(24, "Hours worked cannot exceed 24"),
  overtime_hours: z.coerce.number()
    .min(0, "Overtime hours cannot be negative")
    .max(24, "Overtime hours cannot exceed 24")
    .optional(),
  project_id: z.string().optional(),
  rental_id: z.string().optional(),
  description: commonSchemas.notes,
  tasks_completed: commonSchemas.notes,
  status: z.enum(['submitted', 'approved', 'rejected']).default('submitted'),
})

/**
 * Schema for bulk timesheet validation
 */
export const bulkTimesheetSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee is required" }),
  start_date: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Please enter a valid date",
  }),
  end_date: z.date({
    required_error: "End date is required",
    invalid_type_error: "Please enter a valid date",
  }),
  hours_worked: z.coerce.number()
    .min(0.5, "Hours worked must be at least 0.5")
    .max(24, "Hours worked cannot exceed 24"),
  overtime_hours: z.coerce.number()
    .min(0, "Overtime hours cannot be negative")
    .max(24, "Overtime hours cannot exceed 24")
    .optional(),
  project_id: z.string().optional(),
  rental_id: z.string().optional(),
  description: commonSchemas.notes,
  tasks_completed: commonSchemas.notes,
  status: z.enum(['submitted', 'approved', 'rejected']).default('submitted'),
}).refine((data) => data.end_date >= data.start_date, {
  message: "End date must be after start date",
  path: ["end_date"],
})

export type TimesheetFormData = z.infer<typeof timesheetSchema>
export type BulkTimesheetFormData = z.infer<typeof bulkTimesheetSchema>
