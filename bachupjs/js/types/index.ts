import { User } from './models';

export interface PageProps {
  auth: {
    user: User & {
      roles: {
        id: number;
        name: string;
        display_name?: string;
      }[];
    };
    permissions: string[];
    hasPermission: string[];
    hasRole: string[];
  };
  errors: Record<string, string>
  flash?: {
    message?: string;
    success?: string;
    error?: string;
  };
  version: string;
  [key: string]: any; // Add index signature for Inertia
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>
}

export interface Document {
  id: number;
  name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  documentable_type: string;
  documentable_id: number;
  uploaded_by: number;
  created_at: string;
  updated_at: string;
  url: string;
  download_url: string;
  preview_url: string | null;
}

export interface FinalSettlement {
    id: number;
    employee: {
        id: number;
        employee_id: string;
        first_name: string;
        last_name: string;
        basic_salary: number;
        leave_balance: number;
    };
    last_working_day: string;
    leave_encashment: number;
    unpaid_salary: number;
    unpaid_overtime: number;
    deductions: number;
    gratuity: number;
    total_payable: number;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    notes: string | null;
    agreement_terms: string | null;
    created_at: string;
    updated_at: string;
    approved_by?: {
        id: number;
        name: string;
    };
    approved_at?: string;
    completed_at?: string;
    deductions_list: Array<{
        type: string;
        description: string;
        amount: number;
        reference_number?: string;
        notes?: string;
    }>
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_customer?: boolean;
  roles: {
    id: number;
    name: string;
    display_name?: string;
  }[];
}

export interface Position {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}



