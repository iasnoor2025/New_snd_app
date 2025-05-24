import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/Modules/EmployeeManagement/Resources/js/types';
import AdminLayout from '@/Modules/EmployeeManagement/Resources/js/layouts/AdminLayout';
import { Employee, User } from '@/Modules/EmployeeManagement/Resources/js/types/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/EmployeeManagement/Resources/js/Components/ui/card';
import { Button } from '@/Modules/EmployeeManagement/Resources/js/Components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/Modules/EmployeeManagement/Resources/js/Components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Modules/EmployeeManagement/Resources/js/Components/ui/tabs';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/schemas/employee';
import { FileUpload } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/Employee/FileUpload';
import { ExpiryDateInput } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/Employee/ExpiryDateInput';
import { SectionHeader } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/Employee/SectionHeader';
import { COUNTRIES, EMPLOYEE_ROLES, EMPLOYEE_STATUS } from '@/Modules/EmployeeManagement/Resources/js/constants/employee';
import { toast } from 'sonner';
import axios from 'axios';
import { Input } from '@/Modules/EmployeeManagement/Resources/js/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Modules/EmployeeManagement/Resources/js/Components/ui/select';
import SalaryInfoTab from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/employees/create/tabs/SalaryInfoTab';

interface Position {
  id: number;
  name: string;
}

interface Props extends PageProps {
  employee: Employee;
  users: User[];
  positions: Position[];
}

export default function Edit({ auth, employee, users, positions }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('personal');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_number: employee.file_number || '',
      first_name: employee.first_name || '',
      last_name: employee.last_name || '',
      email: employee.email || '',
      phone: employee.phone || '',
      date_of_birth: employee.date_of_birth || '',
      nationality: employee.nationality || '',
      emergency_contact_name: employee.emergency_contact_name || '',
      emergency_contact_phone: employee.emergency_contact_phone || '',
      position_id: employee.position_id?.toString() || '',
      department: employee.department || '',
      join_date: employee.join_date || '',
      status: employee.status || 'active',
      basic_salary: employee.basic_salary || 0,
      hourly_rate: employee.hourly_rate || 0,
      food_allowance: employee.food_allowance || 0,
      housing_allowance: employee.housing_allowance || 0,
      transport_allowance: employee.transport_allowance || 0,
      // These fields may not exist in the employee model
      absent_deduction_rate: employee.absent_deduction_rate || 0,
      advance_payment: employee.advance_payment || 0,
      overtime_rate_multiplier: employee.overtime_rate_multiplier || 1.5,
      overtime_fixed_rate: employee.overtime_fixed_rate || 0,
      contract_hours_per_day: employee.contract_hours_per_day || 8,
      contract_days_per_month: employee.contract_days_per_month || 22,
      other_allowance: employee.other_allowance || 0,
      mobile_allowance: employee.mobile_allowance || 0,
      bank_name: employee.bank_name || '',
      bank_account_number: employee.bank_account_number || '',
      bank_iban: employee.bank_iban || '',
    },
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`/api/employees/${employee.id}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await router.put(`/employees/${employee.id}`, data);
      toast.success('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <AdminLayout
      user={auth.user}
      title="Edit Employee"
      breadcrumbs={[
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Employees', href: '/employees' },
        { title: 'Edit Employee', href: `/employees/${employee.id}/edit` }
      ]}
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/employees">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h2 className="text-xl font-semibold">Edit Employee</h2>
          </div>
          <Button
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      }
    >
      <Head title="Edit Employee" />

      <div className="container mx-auto py-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList>
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="employment">Employment Details</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="salary">Salary & Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <SectionHeader title="Basic Information" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="file_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employee File #</FormLabel>
                            <FormControl>
                              <Input className="h-10" {...field} placeholder="Enter employee file number" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                {...field}
                                value={employee.user?.email || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="Phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select nationality" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[200px]">
                                {COUNTRIES.map((country) => (
                                  <SelectItem key={`country-${country.value}`} value={country.value}>
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <SectionHeader title="Emergency Contact" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="emergency_contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter emergency contact name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="emergency_contact_phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Phone</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="+966 50 123 4567" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="employment">
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <SectionHeader title="Job Information" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="position_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Position</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {positions.map((position) => (
                                  <SelectItem key={position.id} value={position.id.toString()}>
                                    {position.name}
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
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter department" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="join_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Join Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {EMPLOYEE_STATUS.map((status) => (
                                  <SelectItem key={status.value} value={status.value}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <SectionHeader title="Required Documents" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="passport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passport</FormLabel>
                            <FormControl>
                              <FileUpload
                                field={field}
                                name="passport"
                                onFileSelect={(file) => field.onChange(file)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="iqama"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Iqama</FormLabel>
                            <FormControl>
                              <FileUpload
                                field={field}
                                name="iqama"
                                onFileSelect={(file) => field.onChange(file)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="driving_license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driving License</FormLabel>
                            <FormControl>
                              <FileUpload
                                field={field}
                                name="driving_license"
                                onFileSelect={(file) => field.onChange(file)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operator_license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operator License</FormLabel>
                            <FormControl>
                              <FileUpload
                                field={field}
                                name="operator_license"
                                onFileSelect={(file) => field.onChange(file)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tuv_certification"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TUV Certification</FormLabel>
                            <FormControl>
                              <FileUpload
                                field={field}
                                name="tuv_certification"
                                onFileSelect={(file) => field.onChange(file)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="spsp_license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SPSP License</FormLabel>
                            <FormControl>
                              <FileUpload
                                field={field}
                                name="spsp_license"
                                onFileSelect={(file) => field.onChange(file)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <SectionHeader title="Document Costs" />
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="iqama_cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Iqama Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="driving_license_cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driving License Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operator_license_cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operator License Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tuv_certification_cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TUV Certification Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="spsp_license_cost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SPSP License Cost</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="salary">
                <SalaryInfoTab form={form} />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}

