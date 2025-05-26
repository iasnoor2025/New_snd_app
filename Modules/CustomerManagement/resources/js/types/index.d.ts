import { User } from '@/types';

export interface PageProps {
  auth: {
    user: User;
  };
  errors: Record<string, string>;
  [key: string]: any;
}

export interface Customer {
  id: number;
  name: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  tax_id?: string;
  payment_terms?: string;
  status: string;
  notes?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
}
