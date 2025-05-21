import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Employee } from '../../types/employee';
import { Task, TaskStatus, TaskPriority } from '../../types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { DatePicker } from '../ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../ui/alert';
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ListTodo,
  Info
} from 'lucide-react';

interface TaskFormProps {
  projectId: number;
  employees: Employee[];
  parentTasks?: Task[];
  initialData?: FormValues;
  onTaskCreated: () => void;
  onCancel: () => void;
}

// Define the form values interface
interface FormValues {
  name: string;
  description: string;
  start_date: Date;
  due_date: Date | null;
  status: TaskStatus;
  priority: TaskPriority;
  assigned_to: string | null;
  estimated_hours: number;
  parent_task_id: string | null;
}

// Define form validation schema with Zod
const formSchema = z.object({
  name: z.string().min(3, 'Task name must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  start_date: z.date({ required_error: 'Start date is required' }),
  due_date: z.date().nullable(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled', 'overdue']),
  priority: z.enum(['high', 'medium', 'low']),
  assigned_to: z.string().nullable(),
  estimated_hours: z.coerce.number().min(0, 'Estimated hours must be a positive number'),
  parent_task_id: z.string().nullable(),
})

const TaskForm: React.FC<TaskFormProps> = ({
  projectId,
  employees,
  parentTasks = [],
  initialData,
  onTaskCreated,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      start_date: new Date(),
      due_date: null,
      status: 'pending',
      priority: 'medium',
      assigned_to: null,
      estimated_hours: 0,
      parent_task_id: null,
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format the dates to YYYY-MM-DD
      const formattedData = {
        ...data,
        project_id: projectId,
        assigned_to: data.assigned_to ? parseInt(data.assigned_to) : null,
        parent_task_id: data.parent_task_id ? parseInt(data.parent_task_id) : null,
        start_date: format(data.start_date, 'yyyy-MM-dd'),
        due_date: data.due_date ? format(data.due_date, 'yyyy-MM-dd') : null,
      };

      await axios.post(`/api/projects/${projectId}/tasks`, formattedData);
      onTaskCreated();
    } catch (error: any) {
      console.error('Error creating task:', error);
      setError(
        error.response?.data?.message || 'Failed to create task. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create Task</CardTitle>
            <CardDescription>
              Create a new task for this project
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={onCancel}
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Task Name <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <ListTodo className="h-4 w-4" />
                  </span>
                  <Input
                    id="name"
                    {...register('name')}
                    className="rounded-l-none"
                    placeholder="Enter task name"
                    disabled={isLoading}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  rows={4}
                  placeholder="Provide task details and requirements"
                  disabled={isLoading}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date <span className="text-red-500">*</span></Label>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value}
                        onSelect={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.start_date && (
                    <p className="text-sm text-red-500">{errors.start_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        date={field.value || undefined}
                        onSelect={(date) => field.onChange(date)}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.due_date && (
                    <p className="text-sm text-red-500">{errors.due_date.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_hours">Estimated Hours <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <Clock className="h-4 w-4" />
                  </span>
                  <Input
                    id="estimated_hours"
                    type="number"
                    step="0.5"
                    {...register('estimated_hours')}
                    className="rounded-l-none"
                    placeholder="0.0"
                    disabled={isLoading}
                  />
                </div>
                {errors.estimated_hours && (
                  <p className="text-sm text-red-500">{errors.estimated_hours.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Controller
                  name="assigned_to"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || ''}
                      onValueChange={(value) => field.onChange(value === '' ? null : value)}
                      disabled={isLoading}
                      <SelectTrigger id="assigned_to" className="flex">
                        <span className="inline-flex items-center mr-2">
                          <User className="h-4 w-4" />
                        </span>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Unassigned</SelectItem>
                        {employees.map((employee) => (
                          <SelectItem
                            key={employee.id}
                            value={employee.id.toString()}
                            {employee.first_name} {employee.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.assigned_to && (
                  <p className="text-sm text-red-500">{errors.assigned_to.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parent_task_id">Parent Task</Label>
                <Controller
                  name="parent_task_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || ''}
                      onValueChange={(value) => field.onChange(value === '' ? null : value)}
                      disabled={isLoading}
                      <SelectTrigger id="parent_task_id">
                        <SelectValue placeholder="Select parent task" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No Parent (Root Task)</SelectItem>
                        {parentTasks.map((task) => (
                          <SelectItem
                            key={task.id}
                            value={task.id.toString()}
                            {task.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.parent_task_id && (
                  <p className="text-sm text-red-500">{errors.parent_task_id.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-sm text-red-500">{errors.status.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority <span className="text-red-500">*</span></Label>
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.priority && (
                    <p className="text-sm text-red-500">{errors.priority.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 border rounded-md p-4 bg-gray-50">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-gray-600" />
                  Task Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    When creating a task:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide clear and concise descriptions</li>
                    <li>Set realistic deadlines</li>
                    <li>Assign appropriate team members</li>
                    <li>Organize tasks hierarchically when needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Task'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskForm;
