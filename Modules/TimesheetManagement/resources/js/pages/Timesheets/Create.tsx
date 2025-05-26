import React, { useState, useEffect } from 'react';
import { Head, Link, useForm as useInertiaForm, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/Modules/TimesheetManagement/Resources/js/types';
import AdminLayout from '@/Modules/TimesheetManagement/Resources/js/layouts/AdminLayout';
import { Button } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/form';
import { Input } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/input';
import { Textarea } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/select';
import {
  ArrowLeft as ArrowLeftIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon
} from 'lucide-react';
import { useToast } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/use-toast';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/popover';
import { Calendar } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/calendar';
import { format } from 'date-fns';
import { sonnerToast } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/use-toast';
import { EmployeeSelect } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/shared/EmployeeSelect';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Timesheets', href: '/timesheets' },
  { title: 'Create', href: '/timesheets/create' }
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

interface Rental {
  id: number;
  equipment: {
    name: string;
  };
  rental_number: string;
}

interface Props extends PageProps {
  employees: Employee[];
  projects: Project[];
  rentals?: Rental[];
  include_rentals?: boolean;
  rental_id?: string;
}

// Define form validation schema
const formSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  hours_worked: z.string().min(1, { message: "Hours worked is required" }),
  overtime_hours: z.string().optional(),
  project_id: z.string().optional(),
  rental_id: z.string().optional(),
  description: z.string().optional(),
  tasks_completed: z.string().optional(),
  bulk_mode: z.boolean().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

export default function TimesheetCreate({ auth, employees = [], projects = [], rentals = [], include_rentals = false, rental_id }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [customOvertimePerDay, setCustomOvertimePerDay] = useState(false);
  const [dailyOvertimeHours, setDailyOvertimeHours] = useState<Record<string, string>>({});

  // React Hook Form with Zod validation
  const form = useReactHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: employees.length > 0 ? employees[0].id.toString() : '',
      date: new Date().toISOString().split('T')[0],
      hours_worked: '8',
      overtime_hours: '0',
      project_id: '',
      rental_id: rental_id || '',
      description: '',
      tasks_completed: '',
      bulk_mode: false,
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
    },
  });

  // Set default values when component mounts
  useEffect(() => {
    // Set default employee if available
    if (employees.length > 0) {
      form.setValue('employee_id', employees[0].id.toString());
    }

    // Set default hours worked
    form.setValue('hours_worked', '8');
  }, []);

  // Check URL parameters for bulk mode and month
  useEffect(() => {
    const url = new URL(window.location.href);
    const bulkParam = url.searchParams.get('bulk');
    const monthParam = url.searchParams.get('month');

    if (bulkParam === 'true') {
      setIsBulkMode(true);
      form.setValue('bulk_mode', true);

      if (monthParam) {
        // Parse the month parameter (format: yyyy-MM)
        const [year, month] = monthParam.split('-').map(Number);

        // Set start date to first day of month
        const firstDay = new Date(year, month - 1, 1);
        setStartDate(firstDay);
        form.setValue('start_date', firstDay.toISOString().split('T')[0]);

        // Set end date to last day of month
        const lastDay = new Date(year, month, 0);
        setEndDate(lastDay);
        form.setValue('end_date', lastDay.toISOString().split('T')[0]);
      }
    }
  }, []);

  const { data, setData, post, processing, errors: inertiaErrors } = useInertiaForm({
    employee_id: employees.length > 0 ? employees[0].id.toString() : '',
    date: new Date().toISOString().split('T')[0],
    hours_worked: '8',
    overtime_hours: '0',
    project_id: '',
    rental_id: rental_id || '',
    description: '',
    tasks_completed: '',
    bulk_mode: false,
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    daily_overtime_hours: {},
  });

  // Update Inertia form data when React Hook Form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      // @ts-ignore - Ignoring type errors for setData
      if (value.employee_id) setData('employee_id', value.employee_id);
      // @ts-ignore - Ignoring type errors for setData
      if (value.date) setData('date', value.date);
      // @ts-ignore - Ignoring type errors for setData
      if (value.hours_worked) setData('hours_worked', value.hours_worked);
      // @ts-ignore - Ignoring type errors for setData
      if (value.overtime_hours) setData('overtime_hours', value.overtime_hours);
      // @ts-ignore - Ignoring type errors for setData
      if (value.project_id) setData('project_id', value.project_id === 'none' ? '' : value.project_id);
      // @ts-ignore - Ignoring type errors for setData
      if (value.rental_id) setData('rental_id', value.rental_id === 'none' ? '' : value.rental_id);
      // @ts-ignore - Ignoring type errors for setData
      if (value.description) setData('description', value.description);
      // @ts-ignore - Ignoring type errors for setData
      if (value.tasks_completed) setData('tasks_completed', value.tasks_completed);
      // @ts-ignore - Ignoring type errors for setData
      if (value.bulk_mode !== undefined) setData('bulk_mode', value.bulk_mode);
      // @ts-ignore - Ignoring type errors for setData
      if (value.start_date) setData('start_date', value.start_date);
      // @ts-ignore - Ignoring type errors for setData
      if (value.end_date) setData('end_date', value.end_date);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Update daily_overtime_hours in Inertia form data
  useEffect(() => {
    if (customOvertimePerDay) {
      // @ts-ignore - Ignoring type errors for setData
      setData('daily_overtime_hours', dailyOvertimeHours);
    }
  }, [dailyOvertimeHours, customOvertimePerDay]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Manually trigger validation for required fields
      const isValid = await form.trigger(['employee_id', 'hours_worked']);

      // If validation fails, don't proceed with submission
      if (!isValid) {
        sonnerToast.error("Please fill in all required fields");
        return;
      }

      // Prepare the data object
      const formData = {
        employee_id: values.employee_id,
        date: values.date,
        hours_worked: values.hours_worked,
        overtime_hours: values.overtime_hours || '0',
        project_id: values.project_id === 'none' ? '' : (values.project_id || ''),
        rental_id: values.rental_id === 'none' ? '' : (values.rental_id || ''),
        description: values.description || '',
        tasks_completed: values.tasks_completed || '',
      };

      // Check for duplicate timesheet entry
      if (!values.bulk_mode) {
        try {
          const response = await fetch(route('api.timesheets.check-duplicate'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            },
            body: JSON.stringify({
              employee_id: values.employee_id,
              date: values.date,
            }),
          });

          const result = await response.json();

          if (result.exists) {
            sonnerToast.error("A timesheet already exists for this employee on this date.");
            form.setError('date', {
              type: 'manual',
              message: 'A timesheet already exists for this employee on this date.'
            });
            return;
          }
        } catch (error) {
          console.error('Error checking duplicate:', error);
          sonnerToast.error("Error checking for duplicate timesheet");
          return;
        }
      }

      if (values.bulk_mode) {
        // Set bulk mode specific data
        const bulkData = {
          employee_id: values.employee_id,
          start_date: values.start_date,
          end_date: values.end_date,
          hours_worked: values.hours_worked,
          overtime_hours: values.overtime_hours || '0',
          project_id: values.project_id === 'none' ? '' : (values.project_id || ''),
          rental_id: values.rental_id === 'none' ? '' : (values.rental_id || ''),
          description: values.description || '',
          tasks_completed: values.tasks_completed || '',
          daily_overtime_hours: customOvertimePerDay ? dailyOvertimeHours : {},
        };

        // Ensure we have valid start and end dates
        if (!values.start_date || !values.end_date) {
          sonnerToast.error("Start date and end date are required for bulk mode");
          return;
        }

        // Submit the form using Inertia's post method
        router.post(route('timesheets.store-bulk'), bulkData, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            sonnerToast.success("Bulk timesheets created successfully");
            form.reset();
            router.visit(route('timesheets.monthly'));
          },
          onError: (errors) => {
            sonnerToast.error("Failed to create bulk timesheets. Please check the form for errors.");
            Object.entries(errors).forEach(([field, message]) => {
              form.setError(field as any, { type: 'manual', message: message as string });
            });
          }
        });
      } else {
        // Regular single timesheet submission using Inertia's post method
        router.post(route('timesheets.store'), formData, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            sonnerToast.success("Timesheet created successfully");
            form.reset();
            router.visit(route('timesheets.index'));
          },
          onError: (errors) => {
            sonnerToast.error("Failed to create timesheet. Please check the form for errors.");
            Object.entries(errors).forEach(([field, message]) => {
              form.setError(field as any, { type: 'manual', message: message as string });
            });
          }
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      sonnerToast.error("An unexpected error occurred while submitting the form");
    }
  };

  const onDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      form.setValue('date', date.toISOString().split('T')[0]);
    }
  };

  const onStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      form.setValue('start_date', date.toISOString().split('T')[0]);

      // If bulk mode is enabled and we have a start date and end date, generate daily overtime hours
      if (isBulkMode && endDate) {
        generateDailyOvertimeHours(date, endDate);
      }
    }
  };

  const onEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    if (date) {
      form.setValue('end_date', date.toISOString().split('T')[0]);

      // If bulk mode is enabled and we have a start date and end date, generate daily overtime hours
      if (isBulkMode && startDate) {
        generateDailyOvertimeHours(startDate, date);
      }
    }
  };

  // Generate daily overtime hours for the date range
  const generateDailyOvertimeHours = (start: Date, end: Date) => {
    const newDailyOvertimeHours: Record<string, string> = {};
    const currentDate = new Date(start);
    const endDateValue = new Date(end);

    // Add one day to include the end date
    endDateValue.setDate(endDateValue.getDate() + 1);

    while (currentDate < endDateValue) {
      const dateString = currentDate.toISOString().split('T')[0];
      newDailyOvertimeHours[dateString] = '0';
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDailyOvertimeHours(newDailyOvertimeHours);

    // Also update the Inertia form data
    // @ts-ignore - Ignoring type errors for setData
    setData('daily_overtime_hours', newDailyOvertimeHours);
  };

  const toggleBulkMode = (enabled: boolean) => {
    setIsBulkMode(enabled);

    // Update the form value
    form.setValue('bulk_mode', enabled);

    // Also update the Inertia form data
    // @ts-ignore - Ignoring type errors for setData
    setData('bulk_mode', enabled);

    if (enabled && startDate && endDate) {
      generateDailyOvertimeHours(startDate, endDate);
    }
  };

  const updateDailyOvertimeHours = (start: Date, end: Date) => {
    const newDailyOvertimeHours: Record<string, string> = {};
    const currentDate = new Date(start);

    // Loop through each day in the range
    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      // Initialize with default overtime value
      newDailyOvertimeHours[dateString] = dailyOvertimeHours[dateString] || '0';
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDailyOvertimeHours(newDailyOvertimeHours);
  };

  // Update daily overtime hours when date range changes
  useEffect(() => {
    if (isBulkMode && startDate && endDate) {
      updateDailyOvertimeHours(startDate, endDate);
    }
  }, [startDate, endDate, isBulkMode]);

  const handleDailyOvertimeChange = (date: string, value: string) => {
    setDailyOvertimeHours(prev => ({
      ...prev,
      [date]: value
    }));
  };

  return (
    <AdminLayout title="Create Timesheet" breadcrumbs={breadcrumbs} requiredPermission="timesheets.create">
      <Head title="Create Timesheet" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create Timesheet</CardTitle>
              <CardDescription>
                Record your work hours and tasks for a specific day
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
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6" noValidate>
                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''} />
                {inertiaErrors.employee_id && (
                  <div className="text-red-500 text-sm">
                    {inertiaErrors.employee_id}
                  </div>
                )}
                {inertiaErrors.hours_worked && (
                  <div className="text-red-500 text-sm">
                    {inertiaErrors.hours_worked}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="bulk_mode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => {
                              toggleBulkMode(e.target.checked);
                              field.onChange(e.target.checked);
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Bulk Entry Mode</FormLabel>
                          <FormDescription>
                            Create timesheets for multiple days at once
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    {isBulkMode && (
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 border rounded-md p-4 mb-4">
                        <FormField
                          control={form.control}
                          name="start_date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full pl-3 text-left font-normal"
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {startDate ? format(startDate, 'PPP') : <span>Pick a start date</span>}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={onStartDateSelect}
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
                          name="end_date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>End Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full pl-3 text-left font-normal"
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {endDate ? format(endDate, 'PPP') : <span>Pick an end date</span>}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={onEndDateSelect}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                              <FormDescription>
                                All days between start and end date will have timesheets created
                              </FormDescription>
                            </FormItem>
                          )}
                        />

                        <div className="md:col-span-2">
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={customOvertimePerDay}
                                onChange={(e) => setCustomOvertimePerDay(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Custom Overtime Per Day</FormLabel>
                              <FormDescription>
                                Specify different overtime hours for each day
                              </FormDescription>
                            </div>
                          </FormItem>
                        </div>
                      </div>
                    )}
                  </div>

                  {isBulkMode && customOvertimePerDay && startDate && endDate && (
                    <div className="md:col-span-2 border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Daily Overtime Hours</h3>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            step="0.5"
                            min="0"
                            max="24"
                            placeholder="Hours"
                            className="w-24"
                            id="bulk-overtime"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const value = (document.getElementById('bulk-overtime') as HTMLInputElement)?.value || '0';
                              const newDailyOvertimeHours = { ...dailyOvertimeHours };
                              Object.keys(newDailyOvertimeHours).forEach(dateString => {
                                newDailyOvertimeHours[dateString] = value;
                              });
                              setDailyOvertimeHours(newDailyOvertimeHours);
                            }}
                          >
                            Apply to All Days
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const value = (document.getElementById('bulk-overtime') as HTMLInputElement)?.value || '0';
                            const newDailyOvertimeHours = { ...dailyOvertimeHours };
                            Object.keys(newDailyOvertimeHours).forEach(dateString => {
                              const date = new Date(dateString);
                              const day = date.getDay();
                              // If weekday (Monday-Friday)
                              if (day >= 1 && day <= 5) {
                                newDailyOvertimeHours[dateString] = value;
                              }
                            });
                            setDailyOvertimeHours(newDailyOvertimeHours);
                          }}
                        >
                          Apply to Weekdays
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const value = (document.getElementById('bulk-overtime') as HTMLInputElement)?.value || '0';
                            const newDailyOvertimeHours = { ...dailyOvertimeHours };
                            Object.keys(newDailyOvertimeHours).forEach(dateString => {
                              const date = new Date(dateString);
                              const day = date.getDay();
                              // If weekend (Saturday-Sunday)
                              if (day === 0 || day === 6) {
                                newDailyOvertimeHours[dateString] = value;
                              }
                            });
                            setDailyOvertimeHours(newDailyOvertimeHours);
                          }}
                        >
                          Apply to Weekends
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newDailyOvertimeHours = { ...dailyOvertimeHours };
                            Object.keys(newDailyOvertimeHours).forEach(dateString => {
                              const date = new Date(dateString);
                              const day = date.getDay();
                              // If weekday (Monday-Friday)
                              if (day >= 1 && day <= 5) {
                                newDailyOvertimeHours[dateString] = '0';
                              }
                            });
                            setDailyOvertimeHours(newDailyOvertimeHours);
                          }}
                        >
                          Clear Weekdays
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newDailyOvertimeHours = { ...dailyOvertimeHours };
                            Object.keys(newDailyOvertimeHours).forEach(dateString => {
                              const date = new Date(dateString);
                              const day = date.getDay();
                              // If weekend (Saturday-Sunday)
                              if (day === 0 || day === 6) {
                                newDailyOvertimeHours[dateString] = '0';
                              }
                            });
                            setDailyOvertimeHours(newDailyOvertimeHours);
                          }}
                        >
                          Clear Weekends
                        </Button>
                      </div>

                      <div className="overflow-auto max-h-[400px] mt-4">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-2 text-left">Date</th>
                              <th className="p-2 text-left">Day</th>
                              <th className="p-2 text-left">Overtime Hours</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(dailyOvertimeHours).sort().map(dateString => {
                              const date = new Date(dateString);
                              return (
                                <tr key={dateString} className="border-b">
                                  <td className="p-2">{format(date, 'MMM dd, yyyy')}</td>
                                  <td className="p-2">{format(date, 'EEEE')}</td>
                                  <td className="p-2">
                                    <Input
                                      type="number"
                                      step="0.5"
                                      min="0"
                                      max="24"
                                      value={dailyOvertimeHours[dateString]}
                                      onChange={(e) => handleDailyOvertimeChange(dateString, e.target.value)}
                                      className="w-24"
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  <EmployeeSelect
                    form={form}
                    name="employee_id"
                    employees={employees}
                    required
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
                                className={`w-full pl-3 text-left font-normal ${form.formState.errors.date ? "border-red-500" : ""}`}
                                disabled={isBulkMode}
                              >
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
                        {isBulkMode && (
                          <FormDescription>
                            Not used in bulk mode - use date range above
                          </FormDescription>
                        )}
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
                          <Input
                            type="number"
                            step="0.5"
                            min="0"
                            max="24"
                            placeholder="8"
                            className={form.formState.errors.hours_worked ? "border-red-500" : undefined}
                            onChange={(e) => {
                              field.onChange(e);
                              // Clear error when value is entered
                              if (e.target.value) {
                                form.clearErrors('hours_worked');
                              }
                            }}
                            value={field.value}
                            required
                          />
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
                          defaultValue={field.value || 'none'}
                        >
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

                  <FormField
                    control={form.control}
                    name="rental_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rental Equipment (Optional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value || 'none'}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rental" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {rentals?.map((rental) => (
                              <SelectItem key={rental.id} value={rental.id.toString()}>
                                {rental.equipment.name} - {rental.rental_number}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    <ClockIcon className="mr-2 h-4 w-4" />
                    {isBulkMode ? 'Submit Bulk Timesheets' : 'Submit Timesheet'}
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
</Input>

