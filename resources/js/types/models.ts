export interface Timesheet {
  id: number;
  hours_worked: number;
  overtime_hours: number;
  status: string;
  date: string;
  employee?: {
    first_name?: string;
    last_name?: string;
    monthly_regular_hours?: number;
    monthly_overtime_hours?: number;
    recent_timesheets?: Array<{
      date: string;
      hours_worked: number;
      overtime_hours: number;
      status: string;
    }>;
  };
  project?: {
    name?: string;
  };
  tasks_completed?: string;
  description?: string;
}
