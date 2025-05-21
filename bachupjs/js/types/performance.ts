import { Employee } from './employee';
import { User } from './user';

export interface PerformanceReview {
  id: number;
  employee_id: number;
  employee?: Employee;
  reviewer_id: number;
  reviewer?: User;
  review_date: string;
  review_period_start: string;
  review_period_end: string;
  overall_rating: number;
  job_knowledge_rating: number;
  work_quality_rating: number;
  attendance_rating: number;
  communication_rating: number;
  teamwork_rating: number;
  initiative_rating: number;
  strengths: string[];
  weaknesses: string[];
  goals: string[];
  comments?: string;
  employee_comments?: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: number;
  approver?: User;
  approved_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PerformanceRatingCategory {
  min: number;
  max: number;
  label: string;
  color: string;
  description: string;
}

export const PERFORMANCE_RATING_CATEGORIES: PerformanceRatingCategory[] = [
  {
    min: 4.5,
    max: 5.0,
    label: 'Outstanding',
    color: 'bg-green-100 text-green-800 border-green-300',
    description: 'Consistently exceeds expectations in all areas.',
  },
  {
    min: 3.5,
    max: 4.49,
    label: 'Excellent',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Frequently exceeds job requirements.',
  },
  {
    min: 2.5,
    max: 3.49,
    label: 'Good',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Meets job requirements.',
  },
  {
    min: 1.5,
    max: 2.49,
    label: 'Needs Improvement',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    description: 'Sometimes falls short of job requirements.',
  },
  {
    min: 1.0,
    max: 1.49,
    label: 'Unsatisfactory',
    color: 'bg-red-100 text-red-800 border-red-300',
    description: 'Consistently fails to meet job requirements.',
  },
];

export interface PerformanceReviewFormData {
  employee_id: number;
  reviewer_id: number;
  review_date: Date;
  review_period_start: Date;
  review_period_end: Date;
  job_knowledge_rating: number;
  work_quality_rating: number;
  attendance_rating: number;
  communication_rating: number;
  teamwork_rating: number;
  initiative_rating: number;
  strengths: string[];
  weaknesses: string[];
  goals: string[];
  comments?: string;
}

export interface PerformanceReviewFilter {
  status?: string;
  employee_id?: number;
  reviewer_id?: number;
  start_date?: string;
  end_date?: string;
}
