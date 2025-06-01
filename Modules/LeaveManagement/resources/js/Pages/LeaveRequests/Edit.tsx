import React, { useState } from 'react';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/form';
import { Input } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/input';
import { Textarea } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/select';
import { CalendarDays, ArrowLeft } from 'lucide-react';
import { ToastService } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/shared/ToastManager';
import AdminLayout from '@/Modules/LeaveManagement/Resources/js/layouts/AdminLayout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/Modules/LeaveManagement/Resources/js/Modules/LeaveManagement/Resources/js/components/ui/breadcrumb';
import { formatDate } from '@/Modules/LeaveManagement/Resources/js/utils/format';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

// Define interfaces
interface Employee {
  id: number;
  first_name: string;
  last_name: string;
}

interface LeaveRequest {
  id: number;
  employee_id: number;
  employee?: Employee;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  notes?: string;
  status: string;
}

interface Props {
  leaveRequest: LeaveRequest;
  employees: Employee[];
}

// Define form validation schema
const formSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee is required" }),
  leave_type: z.string().min(1, { message: "Leave type is required" }),
  start_date: z.string().min(1, { message: "Start date is required" }),
  end_date: z.string().min(1, { message: "End date is required" }),
  reason: z.string().min(1, { message: "Reason is required" }),
  notes: z.string().optional(),
  status: z.string().optional(),
});

export default function LeaveRequestEdit({ leaveRequest, employees = [] }: Props) {
  const [processing, setProcessing] = useState(false);

  const leaveTypes = [;
    { id: 'annual', name: 'Annual Leave' },
    { id: 'sick', name: 'Sick Leave' },
    { id: 'personal', name: 'Personal Leave' },
    { id: 'unpaid', name: 'Unpaid Leave' },
    { id: 'maternity', name: 'Maternity Leave' },
    { id: 'paternity', name: 'Paternity Leave' },
    { id: 'bereavement', name: 'Bereavement Leave' },
    { id: 'other', name: 'Other' },
  ];

  // React Hook Form with Zod validation
  const form = useReactHookForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: leaveRequest.employee_id.toString(),
      leave_type: leaveRequest.leave_type || '',
      start_date: leaveRequest.start_date || '',
      end_date: leaveRequest.end_date || '',
      reason: leaveRequest.reason || '',
      notes: leaveRequest.notes || '',
      status: leaveRequest.status || 'pending',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setProcessing(true);

    // Convert leave_type to type as expected by the backend
    const formData = {
      employee_id: values.employee_id,
      start_date: values.start_date,
      end_date: values.end_date,
      type: values.leave_type,
      reason: values.reason,
      notes: values.notes,
    };

    router.put(route('leave-requests.update', leaveRequest.id), formData, {
      onSuccess: () => {
        ToastService.success('Leave request updated successfully');
        router.visit(route('leave-requests.index'));
      },
      onError: (errors: { error?: string; errors?: Record<string, string[]> }) => {
        ToastService.error(errors.error || 'Failed to update leave request');
        // Map errors to form
        if (errors.errors) {
          Object.keys(errors.errors).forEach(key => {
            form.setError(key as any, {
              type: 'manual',
              message: errors.errors![key][0]
            });
          });
        }
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  return (
    <AdminLayout>
      <Head title="Edit Leave Request" />
      <div className="container mx-auto py-6">
        <Breadcrumb
          segments={[
            { title: "Dashboard", href: route('dashboard') },
            { title: "Leave Requests", href: route('leave-requests.index') },
            { title: "Edit", href: route('leave-requests.edit', leaveRequest.id) }
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
            <BreadcrumbLink href={route('leave-requests.edit', leaveRequest.id)}>Edit</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CalendarDays className="h-8 w-8 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Edit Leave Request</h1>
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
            <CardTitle>Edit Leave Request</CardTitle>
            <CardDescription>
              Update the leave request details
            </CardDescription>
          </CardHeader>
          <Form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                              {leaveTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
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

                {leaveRequest.status !== 'pending' && (
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t p-6">
                <Link href={route('leave-requests.index')}>
                  <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700">
                  Update Leave Request
                </Button>
              </CardFooter>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  );
}

