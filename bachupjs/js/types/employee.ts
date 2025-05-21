import { Employee as BaseEmployee } from './models';

export interface EmployeeDocument {
  id: number;
  employee_id: number;
  title: string;
  type: string;
  file_path: string;
  expiry_date?: string;
  is_verified: boolean;
  verified_by?: number;
  verified_at?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Employee {
  id: number;
  employee_id?: string;
  file_number: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  nationality?: string;
  position_id?: number;
  position?: Position;
  department_id?: number;
  department?: Department;
  supervisor?: string;
  hire_date?: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  current_location?: string;
  iqama_number?: string;
  iqama_expiry?: string;
  passport_number?: string;
  passport_expiry?: string;
  date_of_birth?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  notes?: string;
  user_id?: number;
  bank_name?: string;
  bank_account_number?: string;
  bank_iban?: string;
  hourly_rate?: number;
  basic_salary?: number;
  food_allowance?: number;
  housing_allowance?: number;
  transport_allowance?: number;
  absent_deduction_rate?: number;
  overtime_rate_multiplier?: number;
  overtime_fixed_rate?: number;
  contract_hours_per_day?: number;
  contract_days_per_month?: number;
  driving_license_number?: string;
  driving_license_expiry?: string;
  operator_license_number?: string;
  operator_license_expiry?: string;
  documents?: EmployeeDocument[];
  media?: Media[];
  created_at?: string;
  updated_at?: string;
}

export interface Department {
  id: number;
  name: string;
  code?: string;
  description?: string;
  manager_id?: number;
  manager?: Employee;
  parent_id?: number;
  parent?: Department;
  children?: Department[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Position {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FormSection {
  title: string;
  description?: string;
}

export interface DocumentsByType {
  [key: string]: EmployeeDocument[];
}

export interface FileUploadProps {
  name: string;
  label: string;
  fileKey: string;
}

export interface ExpiryDateInputProps {
  field: any;
  name: string;
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
}

export interface Media {
  id: number;
  model_type: string;
  model_id: number;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk?: string;
  size: number;
  manipulations: any[];
  custom_properties: any;
  generated_conversions: any;
  responsive_images: any;
  order_column?: number;
  created_at?: string;
  updated_at?: string;
  url?: string;
  thumbnail_url?: string;
  preview_url?: string;
}

export interface OrgChartNode {
  id: number;
  name: string;
  code?: string;
  manager?: {
    id: number;
    name: string;
  };
  children: OrgChartNode[];
}
