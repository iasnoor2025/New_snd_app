import { z } from 'zod';
import type {
    ManpowerFormData,
    EquipmentFormData,
    MaterialFormData,
    FuelFormData,
    ExpenseFormData
} from '@/types/projectResources';

// Base schema for common fields
const baseSchema = z.object({
    notes: z.string().optional(),
    date: z.string().min(1, 'Date is required'),
})

// Manpower schema
export const manpowerSchema = baseSchema.extend({
    employee_id: z.number().optional(),
    worker_name: z.string().min(1, 'Worker name is required').optional(),
    job_title: z.string().min(1, 'Job title is required'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().optional(),
    daily_rate: z.number().min(0, 'Daily rate must be positive'),
    total_days: z.number().min(0, 'Total days must be positive'),
})

// Equipment schema
export const equipmentSchema = baseSchema.extend({
    equipment_id: z.number().min(1, 'Equipment is required'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().optional(),
    daily_rate: z.number().min(0, 'Daily rate must be positive'),
    total_days: z.number().min(0, 'Total days must be positive'),
    maintenance_cost: z.number().min(0, 'Maintenance cost must be positive').optional(),
})

// Material schema
export const materialSchema = baseSchema.extend({
    name: z.string().min(1, 'Material name is required'),
    unit: z.string().min(1, 'Unit is required'),
    quantity: z.number().min(0, 'Quantity must be positive'),
    unit_price: z.number().min(0, 'Unit price must be positive'),
})

// Fuel schema
export const fuelSchema = baseSchema.extend({
    equipment_id: z.number().min(1, 'Equipment is required'),
    fuel_type: z.string().min(1, 'Fuel type is required'),
    quantity: z.number().min(0, 'Quantity must be positive'),
    unit_price: z.number().min(0, 'Unit price must be positive'),
})

// Expense schema
export const expenseSchema = baseSchema.extend({
    category: z.string().min(1, 'Category is required'),
    amount: z.number().min(0, 'Amount must be positive'),
    description: z.string().min(1, 'Description is required'),
})

// Export types
export type ManpowerFormData = z.infer<typeof manpowerSchema>
export type EquipmentFormData = z.infer<typeof equipmentSchema>
export type MaterialFormData = z.infer<typeof materialSchema>
export type FuelFormData = z.infer<typeof fuelSchema>
export type ExpenseFormData = z.infer<typeof expenseSchema>
