import { Employee } from './employee';
import { Customer } from './models';

/**
 * Project status types
 */
export type ProjectStatus =
  | 'active'
  | 'completed'
  | 'on_hold'
  | 'cancelled'
  | 'planning';

/**
 * Project priority types
 */
export type ProjectPriority =
  | 'high'
  | 'medium'
  | 'low';

/**
 * Task status types
 */
export type TaskStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'overdue';

/**
 * Task priority types
 */
export type TaskPriority =
  | 'high'
  | 'medium'
  | 'low';

/**
 * Team member role types
 */
export type TeamMemberRole =
  | 'manager'
  | 'lead'
  | 'member'
  | 'consultant';

/**
 * Project interface
 */
export interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string | null;
  status: ProjectStatus;
  budget: number;
  manager_id: number;
  client_name: string;
  client_contact: string;
  priority: ProjectPriority;
  progress: number;
  created_at: string;
  updated_at: string;

  // Relations
  manager?: Employee;
  tasks?: Task[];
  teamMembers?: ProjectTeamMember[];
}

/**
 * Project task interface
 */
export interface Task {
  id: number;
  project_id: number;
  name: string;
  description: string;
  start_date: string;
  due_date: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: number | null;
  estimated_hours: number;
  actual_hours: number;
  progress: number;
  parent_task_id: number | null;
  created_at: string;
  updated_at: string;

  // Relations
  project?: Project;
  assignedEmployee?: Employee;
  parentTask?: Task;
  subtasks?: Task[];
}

/**
 * Project team member interface
 */
export interface ProjectTeamMember {
  id: number;
  project_id: number;
  employee_id: number;
  role: TeamMemberRole;
  start_date: string;
  end_date: string | null;
  allocation_percentage: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // Relations
  project?: Project;
  employee?: Employee;
}

/**
 * Project form data interface
 */
export interface ProjectFormData {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date | null;
  status: ProjectStatus;
  budget: number;
  manager_id: number;
  client_name: string;
  client_contact: string;
  priority: ProjectPriority;
}

/**
 * Task form data interface
 */
export interface TaskFormData {
  name: string;
  description: string;
  start_date: Date;
  due_date: Date | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: number | null;
  estimated_hours: number;
  parent_task_id: number | null;
}

/**
 * Team member form data interface
 */
export interface TeamMemberFormData {
  employee_id: number;
  role: TeamMemberRole;
  start_date: Date;
  end_date: Date | null;
  allocation_percentage: number;
}

/**
 * Project filter interface
 */
export interface ProjectFilter {
  status?: ProjectStatus;
  priority?: ProjectPriority;
  manager_id?: number;
  search?: string;
  date_from?: string;
  date_to?: string;
}

/**
 * Project daily log interface
 */
export interface ProjectDailyLog {
  id: number;
  project_id: number;
  user_id: number;
  log_date: string;
  description: string;
  hours_worked: number;
  work_completed: string;
  challenges: string | null;
  next_steps: string | null;
  created_at: string;
  updated_at: string;

  // Relations
  project?: Project;
  user?: any; // User model
}

/**
 * Daily log form data interface
 */
export interface DailyLogFormData {
  log_date: Date;
  description: string;
  hours_worked: number;
  work_completed: string;
  challenges: string | null;
  next_steps: string | null;
}
