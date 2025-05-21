import { z } from 'zod';

// Common validation patterns
export const commonPatterns = {
  phone: /^[\+\d\s\-\(\)]{10,20}$/, // More permissive pattern for phone numbers
  postalCode: /^[\w\d\s\-]{3,12}$/, // More permissive pattern for postal codes
  taxNumber: /^[\w\d\-\.\s]{5,30}$/, // More permissive pattern for tax numbers
};

// Common validation messages
export const commonMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
  maxLength: (field: string, length: number) => `${field} must be less than ${length} characters`,
  phone: 'Please enter a valid phone number',
  postalCode: 'Please enter a valid postal code',
  taxNumber: 'Please enter a valid tax number',
  number: 'Please enter a valid number',
  positive: 'Value must be greater than 0',
  futureDate: 'Date must be in the future',
  pastDate: 'Date must be in the past',
};

// Common field schemas
export const commonSchemas = {
  email: z.string().email(commonMessages.email).max(255, commonMessages.maxLength('Email', 255)),
  phone: z.string().regex(commonPatterns.phone, commonMessages.phone).max(20, commonMessages.maxLength('Phone', 20)),
  postalCode: z.string().regex(commonPatterns.postalCode, commonMessages.postalCode).max(20, commonMessages.maxLength('Postal code', 20)),
  taxNumber: z.string().regex(commonPatterns.taxNumber, commonMessages.taxNumber).max(50, commonMessages.maxLength('Tax number', 50)),
  notes: z.string().max(1000, commonMessages.maxLength('Notes', 1000)).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'completed', 'cancelled']).default('active'),
  date: z.date({
    required_error: commonMessages.required,
    invalid_type_error: 'Please enter a valid date',
  }),
  futureDate: z.date({
    required_error: commonMessages.required,
    invalid_type_error: 'Please enter a valid date',
  }).refine((date) => date > new Date(), {
    message: commonMessages.futureDate,
  }),
  pastDate: z.date({
    required_error: commonMessages.required,
    invalid_type_error: 'Please enter a valid date',
  }).refine((date) => date < new Date(), {
    message: commonMessages.pastDate,
  }),
  amount: z.coerce.number().min(0.01, commonMessages.positive),
  percentage: z.coerce.number().min(0).max(100, 'Percentage must be between 0 and 100'),
  quantity: z.coerce.number().int().min(1, 'Quantity must be at least 1'),
};

// Helper function to create a required string field
export const requiredString = (fieldName: string, minLength = 2, maxLength = 255) =>
  z.string()
    .min(minLength, commonMessages.minLength(fieldName, minLength))
    .max(maxLength, commonMessages.maxLength(fieldName, maxLength));

// Helper function to create an optional string field
export const optionalString = (fieldName: string, maxLength = 255) =>
  z.string()
    .max(maxLength, commonMessages.maxLength(fieldName, maxLength))
    .optional()
    .or(z.literal(''));

// Helper function to create a required number field
export const requiredNumber = (fieldName: string, min = 0) =>
  z.coerce.number()
    .min(min, `Value must be at least ${min}`)
    .max(Number.MAX_SAFE_INTEGER, 'Value is too large');

// Helper function to create an optional number field
export const optionalNumber = (fieldName: string, min = 0) =>
  z.coerce.number()
    .min(min, `Value must be at least ${min}`)
    .max(Number.MAX_SAFE_INTEGER, 'Value is too large')
    .optional()
    .or(z.literal(''));
