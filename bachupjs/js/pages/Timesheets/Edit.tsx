import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Save as SaveIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/utils/format';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Timesheets', href: '/timesheets' },
  { title: 'Edit', href: '#' }
];

// Define interfaces
interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

interface Project {
  id: number;
  name: string;
}

interface Timesheet {
  id: number;
  employee_id: number;
  employee?: Employee;
  date: string;
  hours_worked: number;
  overtime_hours: number;
  project_id?: number;
  project?: Project;
  description?: string;
  tasks_completed?: string;
  status: string;
}

interface Props extends PageProps {
  timesheet: Timesheet;
  employees: Employee[];
  projects: Project[];
}

// Define form validation schema
const formSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  hours_worked: z.string().min(1, { message: "Hours worked is required" }),
  overtime_hours: z.string().optional(),
  project_id: z.string().optional(),
  description: z.string().optional(),
  tasks_completed: z.string().optional(),
  status: z.string().optional(),
})

export default function TimesheetEdit({ auth, timesheet, employees = [], projects = [] }: Props) {
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    timesheet.date ? new Date(timesheet.date) : new Date()
  );

  // React Hook Form with Zod validation
  const form = useReactHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: timesheet.employee_id.toString(),
      date: timesheet.date || new Date().toISOString().split('T')[0],
      hours_worked: timesheet.hours_worked?.toString() || '',
      overtime_hours: timesheet.overtime_hours?.toString() || '0',
      project_id: timesheet.project_id?.toString() || '',
      description: timesheet.description || '',
      tasks_completed: timesheet.tasks_completed || '',
      status: timesheet.status || 'submitted',
    },
  })

  const onDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      form.setValue('date', date.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert "none" value back to empty string for project_id
    const formData = {
      ...values,
      project_id: values.project_id === 'none' ? '' : values.project_id
    };
    
    setProcessing(true);
     
    router.put(route('timesheets.update', timesheet.id), formData, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Timesheet updated successfully"
        })
        setProcessing(false);
      },
      onError: (errors) => {
        toast({
          title: "Error",
          description: errors.error || 'Failed to update timesheet',
          variant: "destructive"
        })
        setProcessing(false);
        
        // Map errors to form
        Object.keys(errors).forEach(key => {
          form.setError(key as any, { 
            type: 'manual', 
            message: errors[key] 
          })
        })
      }
    })
  };

  return (
    <AdminLayout title="Edit Timesheet" breadcrumbs={breadcrumbs} requiredPermission="timesheets.edit">
      <Head title="Edit Timesheet" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">Edit Timesheet</CardTitle>
              <CardDescription>
                Update your work hours and tasks for {timesheet.date && format(new Date(timesheet.date), 'PPP')}
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href={route('timesheets.index')}>
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Timesheets
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id.toString()}>
                                {employee.first_name} {employee.last_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full pl-3 text-left font-normal"
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={onDateSelect}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hours_worked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hours Worked</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" min="0" max="24" placeholder="8" {...field} />
                        </FormControl>
                        <FormDescription>
                          Regular hours worked (excluding overtime)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overtime_hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overtime Hours</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" min="0" max="24" placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>
                          Additional hours beyond regular schedule
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="project_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project (Optional)</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {projects.map((project) => (
                              <SelectItem key={project.id} value={project.id.toString()}>
                                {project.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {timesheet.status !== 'draft' && (
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="submitted">Submitted</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of work performed" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tasks_completed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tasks Completed (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List of tasks completed during this time" 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={route('timesheets.index')}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={processing}>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Update Timesheet
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
} 
</Input>

