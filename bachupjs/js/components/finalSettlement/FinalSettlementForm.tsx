import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Employee } from '../../types/employee';
import { FinalSettlementFormData, SettlementComponentType } from '../../types/finalSettlement';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { DatePicker } from '../ui/date-picker';
import { Switch } from '../ui/switch';
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
  ArrowLeft,
  Calculator
} from 'lucide-react';

interface FinalSettlementFormProps {
  employees: Employee[];
  onSettlementCreated: () => void;
  onCancel: () => void;
}

// Define form validation schema with Zod
const formSchema = z.object({
  employee_id: z.string().min(1, 'Employee is required'),
  exit_date: z.date({ required_error: 'Exit date is required' }),
  settlement_date: z.date({ required_error: 'Settlement date is required' }),
  notice_period_served: z.boolean().default(false),
  notice_period_days: z.coerce.number().min(0).default(0),
  components: z.array(
    z.object({
      type: z.string(),
      description: z.string().min(1, 'Description is required'),
      amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
      is_deduction: z.boolean().default(false),
      calculation_notes: z.string().optional(),
    })
  ).nonempty('At least one settlement component is required'),
  notes: z.string().optional(),
})

const FinalSettlementForm: React.FC<FinalSettlementFormProps> = ({
  employees,
  onSettlementCreated,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [employeeSalary, setEmployeeSalary] = useState<number>(0);
  const [leaveBalance, setLeaveBalance] = useState<number>(0);
  const [employeeAdvances, setEmployeeAdvances] = useState<number>(0);
  const [calculationInProgress, setCalculationInProgress] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FinalSettlementFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: '',
      exit_date: new Date(),
      settlement_date: new Date(),
      notice_period_served: true,
      notice_period_days: 30,
      components: [
        {
          type: 'salary',
          description: 'Outstanding Salary',
          amount: 0,
          is_deduction: false,
        }
      ],
      notes: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'components',
  })

  const selectedEmployeeId = watch('employee_id');
  const exitDate = watch('exit_date');
  const settlementDate = watch('settlement_date');
  const noticeServed = watch('notice_period_served');
  const noticeDays = watch('notice_period_days');
  const components = watch('components');

  // Fetch employee data when employee selection changes
  useEffect(() => {
    if (selectedEmployeeId) {
      fetchEmployeeData(parseInt(selectedEmployeeId));
    }
  }, [selectedEmployeeId]);

  const fetchEmployeeData = async (employeeId: number) => {
    try {
      const response = await axios.get(`/api/employees/${employeeId}/settlement-data`);
      const data = response.data;

      setEmployeeSalary(data.salary || 0);
      setLeaveBalance(data.leave_balance || 0);
      setEmployeeAdvances(data.outstanding_advances || 0);

      // Update notice period days based on employee's contract
      if (data.notice_period_days) {
        setValue('notice_period_days', data.notice_period_days);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setError('Failed to load employee data');
    }
  };

  const calculateSettlement = async () => {
    if (!selectedEmployeeId) {
      setError('Please select an employee first');
      return;
    }

    setCalculationInProgress(true);
    try {
      const response = await axios.post('/api/final-settlements/calculate', {
        employee_id: parseInt(selectedEmployeeId),
        exit_date: format(exitDate, 'yyyy-MM-dd'),
        settlement_date: format(settlementDate, 'yyyy-MM-dd'),
        notice_period_served: noticeServed,
        notice_period_days: noticeDays,
      })

      const calculatedComponents = response.data.components;

      // Replace existing components with calculated ones
      setValue('components', calculatedComponents);

      setError(null);
    } catch (error) {
      console.error('Error calculating settlement:', error);
      setError('Failed to calculate settlement');
    } finally {
      setCalculationInProgress(false);
    }
  };

  const onSubmit = async (data: FinalSettlementFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format the dates to YYYY-MM-DD
      const formattedData = {
        ...data,
        employee_id: parseInt(data.employee_id),
        exit_date: format(data.exit_date, 'yyyy-MM-dd'),
        settlement_date: format(data.settlement_date, 'yyyy-MM-dd'),
      };

      await axios.post('/api/final-settlements', formattedData);
      onSettlementCreated();
    } catch (error: any) {
      console.error('Error creating settlement:', error);
      setError(
        error.response?.data?.message || 'Failed to create settlement. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addComponent = (type: SettlementComponentType, isDeduction: boolean = false) => {
    let description = '';
    let defaultAmount = 0;

    // Set default descriptions and amounts based on type
    switch (type) {
      case 'salary':
        description = 'Outstanding Salary';
        break;
      case 'leave_encashment':
        description = 'Leave Encashment';
        defaultAmount = leaveBalance > 0 ? (employeeSalary / 30) * leaveBalance : 0;
        break;
      case 'gratuity':
        description = 'Gratuity Payment';
        break;
      case 'bonus':
        description = 'Performance Bonus';
        break;
      case 'notice_period':
        description = noticeServed ? 'Notice Period Served' : 'Notice Period Not Served';
        defaultAmount = noticeServed ? 0 : employeeSalary;
        isDeduction = !noticeServed;
        break;
      case 'advance_recovery':
        description = 'Advance Salary Recovery';
        defaultAmount = employeeAdvances;
        isDeduction = true;
        break;
      case 'equipment_recovery':
        description = 'Equipment Recovery';
        isDeduction = true;
        break;
      case 'deduction':
        description = 'Miscellaneous Deduction';
        isDeduction = true;
        break;
      default:
        description = 'Other Component';
    }

    append({
      type,
      description,
      amount: defaultAmount,
      is_deduction: isDeduction,
      calculation_notes: '',
    })
  };

  // Calculate totals for display
  const calculateTotals = () => {
    let totalPayments = 0;
    let totalDeductions = 0;

    components.forEach(component => {
      if (component.is_deduction) {
        totalDeductions += parseFloat(component.amount.toString()) || 0;
      } else {
        totalPayments += parseFloat(component.amount.toString()) || 0;
      }
    })

    const finalAmount = totalPayments - totalDeductions;

    return { totalPayments, totalDeductions, finalAmount };
  };

  const { totalPayments, totalDeductions, finalAmount } = calculateTotals();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create Final Settlement</CardTitle>
            <CardDescription>
              Generate a final settlement for departing employees
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
                <Label htmlFor="employee_id">Employee <span className="text-red-500">*</span></Label>
                <Controller
                  name="employee_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      <SelectTrigger id="employee_id">
                        <SelectValue placeholder="Select employee" />
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exit_date">Exit Date <span className="text-red-500">*</span></Label>
                  <Controller
                    name="exit_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.exit_date && (
                    <p className="text-sm text-red-500">{errors.exit_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="settlement_date">Settlement Date <span className="text-red-500">*</span></Label>
                  <Controller
                    name="settlement_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.settlement_date && (
                    <p className="text-sm text-red-500">{errors.settlement_date.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="notice_period_served">Notice Period Served</Label>
                  <Controller
                    name="notice_period_served"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notice_period_days">Notice Period (Days)</Label>
                <Input
                  id="notice_period_days"
                  type="number"
                  {...register('notice_period_days')}
                  disabled={isLoading}
                />
                {errors.notice_period_days && (
                  <p className="text-sm text-red-500">{errors.notice_period_days.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  rows={4}
                  disabled={isLoading}
                  placeholder="Enter any additional notes about this settlement"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <h3 className="font-medium">Employee Information</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={calculateSettlement}
                  disabled={isLoading || calculationInProgress || !selectedEmployeeId}
                  className="flex items-center gap-1"
                  {calculationInProgress ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Calculator className="h-4 w-4" />
                  )}
                  Auto-Calculate
                </Button>
              </div>

              <div className="space-y-1 border rounded-md p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Monthly Salary:</div>
                  <div className="font-medium">${employeeSalary.toLocaleString()}</div>

                  <div className="text-gray-600">Leave Balance:</div>
                  <div className="font-medium">{leaveBalance} days</div>

                  <div className="text-gray-600">Outstanding Advances:</div>
                  <div className="font-medium">${employeeAdvances.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Settlement Components</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addComponent('salary')}
                    disabled={isLoading}
                    className="text-xs"
                    + Salary
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addComponent('leave_encashment')}
                    disabled={isLoading}
                    className="text-xs"
                    + Leave
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addComponent('deduction', true)}
                    disabled={isLoading}
                    className="text-xs"
                    + Deduction
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addComponent('other')}
                    disabled={isLoading}
                    className="text-xs"
                    + Other
                  </Button>
                </div>
              </div>

              {fields.length > 0 ? (
                <div className="border rounded-md p-4 space-y-4 max-h-72 overflow-y-auto">
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-3 border rounded-md bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <Controller
                          name={`components.${index}.type`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={isLoading}
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="salary">Outstanding Salary</SelectItem>
                                <SelectItem value="leave_encashment">Leave Encashment</SelectItem>
                                <SelectItem value="bonus">Bonus</SelectItem>
                                <SelectItem value="gratuity">Gratuity</SelectItem>
                                <SelectItem value="notice_period">Notice Period</SelectItem>
                                <SelectItem value="advance_recovery">Advance Recovery</SelectItem>
                                <SelectItem value="equipment_recovery">Equipment Recovery</SelectItem>
                                <SelectItem value="deduction">Deduction</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(index)}
                          disabled={isLoading || fields.length <= 1}
                          className="h-8 w-8 p-0 text-red-500"
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-2">
                        <div className="space-y-1">
                          <Label className="text-xs" htmlFor={`components.${index}.description`}>
                            Description
                          </Label>
                          <Input
                            id={`components.${index}.description`}
                            {...register(`components.${index}.description` as const)}
                            disabled={isLoading}
                          />
                          {errors.components?.[index]?.description && (
                            <p className="text-xs text-red-500">
                              {errors.components[index]?.description?.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs" htmlFor={`components.${index}.amount`}>
                            Amount
                          </Label>
                          <Input
                            id={`components.${index}.amount`}
                            type="number"
                            step="0.01"
                            {...register(`components.${index}.amount` as const)}
                            disabled={isLoading}
                          />
                          {errors.components?.[index]?.amount && (
                            <p className="text-xs text-red-500">
                              {errors.components[index]?.amount?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Controller
                          name={`components.${index}.is_deduction`}
                          control={control}
                          render={({ field }) => (
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isLoading}
                            />
                          )}
                        />
                        <Label className="text-xs">Mark as deduction</Label>
                      </div>

                      <div className="mt-2">
                        <Label className="text-xs" htmlFor={`components.${index}.calculation_notes`}>
                          Calculation Notes (Optional)
                        </Label>
                        <Textarea
                          id={`components.${index}.calculation_notes`}
                          {...register(`components.${index}.calculation_notes` as const)}
                          rows={2}
                          disabled={isLoading}
                          className="text-xs"
                          placeholder="Explain how this amount was calculated"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-6 flex flex-col items-center justify-center text-center text-gray-500 space-y-2">
                  <div className="text-sm">No settlement components added yet.</div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addComponent('salary')}
                    disabled={isLoading}
                    className="mt-2"
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Component
                  </Button>
                </div>
              )}

              {errors.components && (
                <p className="text-sm text-red-500">
                  {errors.components.message}
                </p>
              )}

              {/* Settlement Totals */}
              <div className="mt-4 border rounded-md p-4 bg-gray-50">
                <h4 className="text-sm font-medium mb-3">Settlement Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Payments:</span>
                    <span className="text-sm font-medium">
                      ${totalPayments.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Total Deductions:</span>
                    <span className="text-sm font-medium text-red-600">
                      -${totalDeductions.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Final Settlement Amount:</span>
                    <span className="text-base font-bold">
                      ${finalAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
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
            'Create Settlement'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FinalSettlementForm;
