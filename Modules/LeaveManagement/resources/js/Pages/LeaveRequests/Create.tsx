import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/form';
import { Input } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/input';
import { Textarea } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/select';
import { ClipboardList, ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/Modules/LeaveManagement/Resources/js/layouts/AdminLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/breadcrumb';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ToastService } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/shared/ToastManager';
import { PageProps } from '@/Modules/LeaveManagement/Resources/js/types';

// Temporary inline implementation of usePermission hook
function usePermission() {
  const { props } = usePage<PageProps>();
  const auth = props?.auth || { user: null, permissions: [], hasPermission: [], hasRole: [] };

  const isAdmin = Array.isArray(auth?.hasRole) ? auth.hasRole.includes('admin') : false;

  const hasPermission = (permission: string): boolean => {
    if (!permission) return false;
    if (isAdmin) return true;
    return Array.isArray(auth?.hasPermission) ? auth.hasPermission.includes(permission) : false;
  };

  return { hasPermission, isAdmin };
}

// Define the Employee interface
interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

interface Props {
  employees?: Employee[];
  currentUserOnly?: boolean;
}

// Define form validation schema
const formSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee is required" }),
  leave_type: z.string().min(1, { message: "Leave type is required" }),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  notes: z.string().optional(),
});

// Define leave types constant array to ensure it's always available
const LEAVE_TYPES = [;
  { value: 'annual', label: 'Annual Leave' },
  { value: 'vacation', label: 'Vacation Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'personal', label: 'Personal Leave' },
  { value: 'maternity', label: 'Maternity Leave' },
  { value: 'hajj', label: 'Hajj Leave' },
  { value: 'umrah', label: 'Umrah Leave' },
  { value: 'unpaid', label: 'Unpaid Leave' },
  { value: 'other', label: 'Other' },
];

export default function LeaveRequestCreate({ employees = [], currentUserOnly = false }: Props) {
  const { hasPermission } = usePermission();
  const [submitting, setSubmitting] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const [safeEmployees, setSafeEmployees] = useState<Employee[]>([]);
  const [daysBetween, setDaysBetween] = useState<number | null>(null);

  // Initialize safe employees
  useEffect(() => {
    if (Array.isArray(employees)) {
      setSafeEmployees(employees);
    } else {
      setSafeEmployees([]);
    }
    setIsFormReady(true);
  }, [employees]);

  // React Hook Form with Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: '',
      leave_type: '',
      start_date: '',
      end_date: '',
      reason: '',
      notes: '',
    },
  });

  // Calculate days between start and end date
  useEffect(() => {
    const startDate = form.watch('start_date');
    const endDate = form.watch('end_date');

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if dates are valid before calculating
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        // Add 1 to include both start and end days
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDaysBetween(diffDays);
      } else {
        setDaysBetween(null);
      }
    } else {
      setDaysBetween(null);
    }
  }, [form.watch('start_date'), form.watch('end_date')]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);

    // Convert leave_type to type as expected by the backend
    const formData = {
      ...values,
      type: values.leave_type,
    };

    router.post(route('leave-requests.store'), formData, {
      onSuccess: () => {
        ToastService.success("Leave request created successfully");
        form.reset();
        router.visit(route('leave-requests.index'));
      },
      onError: (errors) => {
        ToastService.error("Failed to create leave request");
        if (errors && typeof errors === 'object') {
          Object.keys(errors).forEach(key => {
            form.setError(key as any, {
              type: 'manual',
              message: errors[key]
            });
          });
        }
        setSubmitting(false);
      },
      onFinish: () => {
        setSubmitting(false);
      },
    });
  };

  // If form is not ready yet, show a simple loading placeholder
  if (!isFormReady) {
    return (
      <AdminLayout>
        <Head title="Loading..." />
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-center h-64">
            <p>Loading form...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head title="Create Leave Request" />
      <div className="container mx-auto py-6">
        <Breadcrumb
          segments={[
            { title: "Dashboard", href: route('dashboard') },
            { title: "Leave Requests", href: route('leave-requests.index') },
            { title: "Create", href: route('leave-requests.create') }
          ]}
          className="mb-6"
        >
          <BreadcrumbItem>
            <BreadcrumbLink href={route('dashboard')}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={route('leave-requests.index')}>Leave Requests</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={route('leave-requests.create')}>Create</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Create Leave Request</h1>
          </div>
          <Link href={route('leave-requests.index')}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leave Requests
            </Button>
          </Link>
        </div>

        <Card className="shadow-md">
          <CardHeader className="bg-muted/50">
            <CardTitle>New Leave Request</CardTitle>
            <CardDescription>
              Create a new leave request for an employee
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="space-y-6 pt-6">
                {/* Employee and Leave Type Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <h3 className="text-sm font-medium">Request Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="employee_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="employee_id">
                                <SelectValue placeholder="Select Employee" />
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
                      name="leave_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Leave Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="leave_type">
                                <SelectValue placeholder="Select Leave Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {LEAVE_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Date Range Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <h3 className="text-sm font-medium">Leave Duration</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="start_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              id="start_date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              id="end_date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {daysBetween !== null && (
                    <div className="bg-muted/5 p-4 rounded-lg border flex items-center">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-semibold">Total Duration:</span>
                        <span className="text-sm">{daysBetween} day{daysBetween !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <span className="h-1 w-1 rounded-full bg-primary"></span>
                    <h3 className="text-sm font-medium">Additional Information</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Reason for leave request"
                            rows={3}
                            id="reason"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information or comments"
                            rows={3}
                            id="notes"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <Link href={route('leave-requests.index')}>
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {submitting ? 'Saving...' : 'Save Leave Request'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
}

