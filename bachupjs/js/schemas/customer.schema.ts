import { z } from 'zod';
import { commonSchemas, requiredString, optionalString } from './common.schema';

/**
 * Schema for customer validation
 */
export const customerSchema = z.object({
  company_name: requiredString('Company name')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  contact_person: requiredString('Contact person')
    .min(2, 'Contact person name must be at least 2 characters')
    .max(100, 'Contact person name must be less than 100 characters'),
  email: commonSchemas.email
    .optional()
    .or(z.literal(''))
    .refine((email) => {
      if (!email) return true;
      return email.includes('@') && email.includes('.');
    }, 'Please enter a valid email address'),
  phone: commonSchemas.phone
    .refine((phone) => {
      if (!phone) return true;
      return phone.length >= 10;
    }, 'Phone number must be at least 10 characters'),
  address: z.string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  city: z.string()
    .max(100, 'City must be less than 100 characters')
    .optional()
    .or(z.literal(''))
    .refine((city) => {
      if (!city) return true;
      return /^[a-zA-Z\s-]+$/.test(city);
    }, 'City name can only contain letters, spaces, and hyphens'),
  state: z.string()
    .max(100, 'State must be less than 100 characters')
    .optional()
    .or(z.literal(''))
    .refine((state) => {
      if (!state) return true;
      return /^[a-zA-Z\s-]+$/.test(state);
    }, 'State name can only contain letters, spaces, and hyphens'),
  postal_code: commonSchemas.postalCode
    .optional()
    .or(z.literal(''))
    .refine((code) => {
      if (!code) return true;
      return /^[\w\d\s\-]{3,12}$/i.test(code);
    }, 'Please enter a valid postal code'),
  country: z.string()
    .max(100, 'Country must be less than 100 characters')
    .optional()
    .or(z.literal(''))
    .refine((country) => {
      if (!country) return true;
      return /^[a-zA-Z\s-]+$/.test(country);
    }, 'Country name can only contain letters, spaces, and hyphens'),
  tax_number: commonSchemas.taxNumber
    .optional()
    .or(z.literal(''))
    .refine((tax) => {
      if (!tax) return true;
      return /^[\w\d\-\.\s]{5,30}$/i.test(tax);
    }, 'Please enter a valid tax number'),
  credit_limit: z.coerce
    .number()
    .nonnegative('Credit limit must be a positive number')
    .max(1000000, 'Credit limit cannot exceed 1,000,000')
    .optional(),
  payment_terms: z.coerce
    .number()
    .int()
    .nonnegative()
    .refine(
      (value) => [15, 30, 45, 60].includes(value),
      {
        message: 'Payment terms must be one of: 15, 30, 45, or 60 days',
      }
    ),
  notes: commonSchemas.notes,
  is_active: z.boolean().default(true),
  billing_address: z.string()
    .max(200, 'Billing address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  shipping_address: z.string()
    .max(200, 'Shipping address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  preferred_payment_method: z.enum(['cash', 'bank_transfer', 'credit_card', 'check', 'other'])
    .optional(),
  credit_rating: z.enum(['A', 'B', 'C', 'D'])
    .optional(),
})

/**
 * Type definition for customer data based on the schema
 */
export type CustomerFormData = z.infer<typeof customerSchema>

/**
 * Default values for customer form
 */
export const defaultCustomerValues: Partial<CustomerFormData> = {
  company_name: '',
  contact_person: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  tax_number: '',
  credit_limit: undefined,
  payment_terms: 30,
  notes: '',
  is_active: true,
};

/**
 * Function to transform payment terms to readable text
 */
export const formatPaymentTerms = (term: number | string): string => {
  const termValue = typeof term === 'string' ? parseInt(term, 10) : term;

  switch (termValue) {
    case 15:
      return 'Net 15 Days';
    case 30:
      return 'Net 30 Days';
    case 45:
      return 'Net 45 Days';
    case 60:
      return 'Net 60 Days';
    default:
      return `${term} Days`;
  }
};

/**
 * Payment terms options for dropdown
 */
export const paymentTermsOptions = [
  { value: '15', label: '15 Days' },
  { value: '30', label: '30 Days' },
  { value: '45', label: '45 Days' },
  { value: '60', label: '60 Days' },
];
