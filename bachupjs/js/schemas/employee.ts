import { z } from 'zod';

export const customCertificationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  number: z.string().min(1, 'Number is required'),
  expiry_date: z.string().min(1, 'Expiry date is required'),
  cost: z.number().min(0, 'Cost must be a positive number'),
})

export const formSchema = z.object({
  user_id: z.number().nullable(),
  file_number: z.string().min(1, 'File number is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  emergency_contact_name: z.string().min(1, 'Emergency contact name is required'),
  emergency_contact_phone: z.string().min(1, 'Emergency contact phone is required'),
  position: z.string().min(1, 'Position is required'),
  department: z.string().min(1, 'Department is required'),
  join_date: z.string().min(1, 'Join date is required'),
  status: z.enum(['active', 'inactive', 'on_leave']),
  basic_salary: z.number().nullable(),
  hourly_rate: z.number().nullable(),
  housing_allowance: z.number().nullable(),
  transport_allowance: z.number().nullable(),
  food_allowance: z.number().nullable(),
  passport: z.string().nullable(),
  iqama: z.string().nullable(),
  driving_license: z.string().nullable(),
  operator_license: z.string().nullable(),
  tuv_certification: z.string().nullable(),
  spsp_license: z.string().nullable(),
  iqama_cost: z.number().nullable(),
  driving_license_cost: z.number().nullable(),
  operator_license_cost: z.number().nullable(),
  tuv_certification_cost: z.number().nullable(),
  spsp_license_cost: z.number().nullable(),
  custom_certifications: z.array(customCertificationSchema).optional(),
})




