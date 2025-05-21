import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Employee } from '../../types/employee';
import { PayrollGenerationFormData, PayrollAdjustment } from '../../types/payroll';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
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
import { Separator } from '../ui/separator';
import {
  Loader2,
  AlertCircle,
  PlusCircle,
  Trash2,
  Calendar,
  ArrowLeft
} from 'lucide-react';

interface PayrollGenerationProps {
  employees: Employee[];
  onPayrollCreated: () => void;
  onCancel: () => void;
}

// Define form validation schema with Zod
const formSchema = z.object({
  employee_id: z.string().optional().transform(val => val ? parseInt(val) : undefined),
  month: z.date({ required_error: 'Month is required' }),
  manual_adjustments: z.array(
    z.object({
      type: z.string(),
      description: z.string().min(1, 'Description is required'),
      amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
      is_taxable: z.boolean().default(false),
    })
  ).optional(),
})

const PayrollGeneration: React.FC<PayrollGenerationProps> = ({
  employees,
  onPayrollCreated,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [singleEmployee, setSingleEmployee] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PayrollGenerationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: undefined,
      month: new Date(),
      manual_adjustments: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'manual_adjustments',
  })

  const onSubmit = async (data: PayrollGenerationFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format the month to YYYY-MM
      const formattedData = {
        ...data,
        month: format(data.month, 'yyyy-MM-dd'),
      };

      // Single employee or batch mode
      const endpoint = singleEmployee ? '/api/payroll' : '/api/payroll/generate-monthly';

      await axios.post(endpoint, formattedData);
      onPayrollCreated();
    } catch (error: any) {
      console.error('Error generating payroll:', error);
      setError(
        error.response?.data?.message || 'Failed to generate payroll. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addManualAdjustment = () => {
    append({
      id: `temp-${Date.now()}`,
      type: 'bonus',
      description: '',
      amount: 0,
      is_taxable: true,
    })
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Generate Payroll</CardTitle>
            <CardDescription>
              Create a new payroll for an employee or run monthly payroll for all employees
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
                <Label htmlFor="month">Payroll Month</Label>
                <Controller
                  name="month"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                        captionLayout="dropdown-buttons"
                        fromYear={2020}
                        toYear={2030}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => field.onChange(new Date())}
                        disabled={isLoading}
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                />
                {errors.month && (
                  <p className="text-sm text-red-500">{errors.month.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="employee_id">Employee</Label>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="single-employee"
                      className="text-sm text-gray-500"
                      Single Employee
                    </Label>
                    <input
                      type="checkbox"
                      id="single-employee"
                      checked={singleEmployee}
                      onChange={(e) => setSingleEmployee(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </div>
                </div>
                <Controller
                  name="employee_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString() || ''}
                      onValueChange={field.onChange}
                      disabled={!singleEmployee || isLoading}
                      <SelectTrigger id="employee_id">
                        <SelectValue placeholder={singleEmployee ? 'Select employee' : 'All Employees'} />
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
                {errors.employee_id && (
                  <p className="text-sm text-red-500">{errors.employee_id.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Manual Adjustments</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addManualAdjustment}
                    disabled={isLoading || !singleEmployee}
                    className="flex items-center gap-1"
                    <PlusCircle className="h-4 w-4" />
                    Add Adjustment
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Add manual adjustments like bonuses, deductions, or other allowances.
                  {!singleEmployee && ' Only available for single employee payroll generation.'}
                </p>
              </div>

              {singleEmployee && fields.length > 0 ? (
                <div className="space-y-4 border rounded-md p-4 max-h-56 overflow-y-auto">
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-3">
                      {index > 0 && <Separator />}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor={`manual_adjustments.${index}.type`}>
                            Type
                          </Label>
                          <Controller
                            name={`manual_adjustments.${index}.type`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={isLoading}
                                <SelectTrigger id={`manual_adjustments.${index}.type`}>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bonus">Bonus</SelectItem>
                                  <SelectItem value="allowances">Allowance</SelectItem>
                                  <SelectItem value="deduction">Deduction</SelectItem>
                                  <SelectItem value="advance">Advance</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`manual_adjustments.${index}.amount`}>
                            Amount
                          </Label>
                          <Input
                            id={`manual_adjustments.${index}.amount`}
                            type="number"
                            step="0.01"
                            disabled={isLoading}
                            {...register(`manual_adjustments.${index}.amount` as const)}
                          />
                          {errors.manual_adjustments?.[index]?.amount && (
                            <p className="text-sm text-red-500">
                              {errors.manual_adjustments[index]?.amount?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <Label htmlFor={`manual_adjustments.${index}.description`}>
                            Description
                          </Label>
                          <Input
                            id={`manual_adjustments.${index}.description`}
                            disabled={isLoading}
                            {...register(`manual_adjustments.${index}.description` as const)}
                          />
                          {errors.manual_adjustments?.[index]?.description && (
                            <p className="text-sm text-red-500">
                              {errors.manual_adjustments[index]?.description?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <input
                            id={`manual_adjustments.${index}.is_taxable`}
                            type="checkbox"
                            disabled={isLoading}
                            {...register(`manual_adjustments.${index}.is_taxable` as const)}
                            className="rounded border-gray-300"
                          />
                          <Label
                            htmlFor={`manual_adjustments.${index}.is_taxable`}
                            className="text-sm"
                            Taxable
                          </Label>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          disabled={isLoading}
                          className="text-red-500 h-7"
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
                  <div className="text-sm">
                    {singleEmployee
                      ? 'No manual adjustments added yet.'
                      : 'Manual adjustments are only available when generating payroll for a single employee.'}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || (singleEmployee && !watch('employee_id'))}>
              {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                singleEmployee ? 'Generate Payroll' : 'Run Monthly Payroll'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PayrollGeneration;
