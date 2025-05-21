import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Employee } from '../../types/employee';
import { ProjectStatus, ProjectPriority, ProjectFormData } from '../../types/project';
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
  DollarSign,
  User,
  Users,
  Building,
  Phone,
  Info
} from 'lucide-react';

interface ProjectFormProps {
  employees: Employee[];
  initialData?: ProjectFormData;
  onProjectCreated: () => void;
  onCancel: () => void;
}

// Define form validation schema with Zod
const formSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  start_date: z.date({ required_error: 'Start date is required' }),
  end_date: z.date().nullable(),
  status: z.enum(['active', 'completed', 'on_hold', 'cancelled', 'planning']),
  budget: z.coerce.number().min(0, 'Budget must be a positive number'),
  manager_id: z.string().min(1, 'Project manager is required'),
  client_name: z.string().min(1, 'Client name is required'),
  client_contact: z.string().min(1, 'Client contact is required'),
  priority: z.enum(['high', 'medium', 'low']),
})

const ProjectForm: React.FC<ProjectFormProps> = ({
  employees,
  initialData,
  onProjectCreated,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      start_date: new Date(),
      end_date: null,
      status: 'planning',
      budget: 0,
      manager_id: '',
      client_name: '',
      client_contact: '',
      priority: 'medium',
    },
  })

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format the dates to YYYY-MM-DD
      const formattedData = {
        ...data,
        manager_id: parseInt(data.manager_id),
        start_date: format(data.start_date, 'yyyy-MM-dd'),
        end_date: data.end_date ? format(data.end_date, 'yyyy-MM-dd') : null,
      };

      await axios.post('/api/projects', formattedData);
      onProjectCreated();
    } catch (error: any) {
      console.error('Error creating project:', error);
      setError(
        error.response?.data?.message || 'Failed to create project. Please try again.'
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
            <CardTitle>Create Project</CardTitle>
            <CardDescription>
              Create a new project with detailed information
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={onCancel}
            <ArrowLeft className="h-4 w-4" />
            Back to List
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
                <Label htmlFor="name">Project Name <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <Info className="h-4 w-4" />
                  </span>
                  <Input
                    id="name"
                    {...register('name')}
                    className="rounded-l-none"
                    placeholder="Enter project name"
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
                  placeholder="Provide project details and objectives"
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
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.start_date && (
                    <p className="text-sm text-red-500">{errors.start_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">Expected End Date</Label>
                  <Controller
                    name="end_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.end_date && (
                    <p className="text-sm text-red-500">{errors.end_date.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager_id">Project Manager <span className="text-red-500">*</span></Label>
                <Controller
                  name="manager_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      <SelectTrigger id="manager_id" className="flex">
                        <span className="inline-flex items-center mr-2">
                          <User className="h-4 w-4" />
                        </span>
                        <SelectValue placeholder="Select project manager" />
                      </SelectTrigger>
                      <SelectContent>
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
                {errors.manager_id && (
                  <p className="text-sm text-red-500">{errors.manager_id.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client_name">Client Name <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <Building className="h-4 w-4" />
                  </span>
                  <Input
                    id="client_name"
                    {...register('client_name')}
                    className="rounded-l-none"
                    placeholder="Enter client name"
                    disabled={isLoading}
                  />
                </div>
                {errors.client_name && (
                  <p className="text-sm text-red-500">{errors.client_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_contact">Client Contact <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <Phone className="h-4 w-4" />
                  </span>
                  <Input
                    id="client_contact"
                    {...register('client_contact')}
                    className="rounded-l-none"
                    placeholder="Email or phone number"
                    disabled={isLoading}
                  />
                </div>
                {errors.client_contact && (
                  <p className="text-sm text-red-500">{errors.client_contact.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget <span className="text-red-500">*</span></Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                  </span>
                  <Input
                    id="budget"
                    type="number"
                    step="0.01"
                    {...register('budget')}
                    className="rounded-l-none"
                    placeholder="0.00"
                    disabled={isLoading}
                  />
                </div>
                {errors.budget && (
                  <p className="text-sm text-red-500">{errors.budget.message}</p>
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
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="on_hold">On Hold</SelectItem>
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
                  <Calendar className="h-4 w-4 text-gray-600" />
                  Project Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    After creating the project, you'll be able to:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Add team members</li>
                    <li>Create and assign tasks</li>
                    <li>Track progress</li>
                    <li>Manage resources</li>
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
            'Create Project'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectForm;
