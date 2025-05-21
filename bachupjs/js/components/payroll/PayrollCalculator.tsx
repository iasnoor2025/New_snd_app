import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import axios from 'axios';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Badge } from '../ui/badge';
import { CalendarIcon, Calculator, Check, Download, FileText, Lock } from 'lucide-react';

interface Employee {
  id: number;
  file_number: string;
  first_name: string;
  last_name: string;
  position?: {
    id: number;
    name: string;
  };
  basic_salary: number;
  hourly_rate: number;
  housing_allowance: number;
  transport_allowance: number;
  food_allowance: number;
}

interface TimesheetSummary {
  employee_id: number;
  total_regular_hours: number;
  total_overtime_hours: number;
  days_worked: number;
  working_days_in_month: number;
}

interface PayrollEntry {
  id?: number;
  employee_id: number;
  employee?: Employee;
  period_start: string;
  period_end: string;
  basic_salary: number;
  regular_hours: number;
  overtime_hours: number;
  housing_allowance: number;
  transport_allowance: number;
  food_allowance: number;
  overtime_pay: number;
  gross_pay: number;
  deductions: number;
  net_pay: number;
  status: 'draft' | 'approved' | 'paid';
  created_at?: string;
  updated_at?: string;
}

interface PayrollCalculatorProps {
  initialEntries?: PayrollEntry[];
}

export const PayrollCalculator: React.FC<PayrollCalculatorProps> = ({
  initialEntries = []
}) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [payrollEntries, setPayrollEntries] = useState<PayrollEntry[]>(initialEntries);
  const [timesheetSummaries, setTimesheetSummaries] = useState<Record<number, TimesheetSummary>>({})
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [generatingPayroll, setGeneratingPayroll] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [payrollGenerated, setPayrollGenerated] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'generate' | 'approve'>('generate');

  useEffect(() => {
    fetchEmployees();
    if (initialEntries.length > 0) {
      setPayrollGenerated(true);
    }
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      fetchTimesheetSummaries();
    }
  }, [selectedMonth]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/employees', {
        params: { status: 'active' }
      })
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTimesheetSummaries = async () => {
    try {
      const startDate = format(startOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');

      const response = await axios.get('/api/timesheets/summary', {
        params: {
          start_date: startDate,
          end_date: endDate,
          employee_id: selectedEmployee !== 'all' ? selectedEmployee : undefined,
          status: 'approved'
        }
      })

      // Convert array to record by employee_id
      const summariesByEmployee: Record<number, TimesheetSummary> = {};
      response.data.data.forEach((summary: TimesheetSummary) => {
        summariesByEmployee[summary.employee_id] = summary;
      })

      setTimesheetSummaries(summariesByEmployee);
    } catch (error) {
      console.error('Error fetching timesheet summaries:', error);
    }
  };

  const handleConfirmAction = () => {
    if (confirmAction === 'generate') {
      generatePayroll();
    } else {
      approvePayroll();
    }
    setConfirmDialogOpen(false);
  };

  const calculatePayroll = (employee: Employee, summary?: TimesheetSummary): PayrollEntry => {
    const startDate = format(startOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');
    const endDate = format(endOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');

    const regularHours = summary?.total_regular_hours || 0;
    const overtimeHours = summary?.total_overtime_hours || 0;
    const daysWorked = summary?.days_worked || 0;
    const workingDaysInMonth = summary?.working_days_in_month || 22; // Default to 22 if not provided

    // Calculate prorated salary if employee didn't work all days
    const proratedFactor = daysWorked / workingDaysInMonth;
    const proratedSalary = employee.basic_salary * proratedFactor;

    // Calculate overtime pay (assuming 1.5x regular hourly rate)
    const overtimeRate = employee.hourly_rate * 1.5;
    const overtimePay = overtimeHours * overtimeRate;

    // Calculate allowances (prorated if needed)
    const housingAllowance = employee.housing_allowance * proratedFactor;
    const transportAllowance = employee.transport_allowance * proratedFactor;
    const foodAllowance = employee.food_allowance * proratedFactor;

    // Calculate gross and net pay
    const grossPay = proratedSalary + housingAllowance + transportAllowance + foodAllowance + overtimePay;
    const deductions = 0; // Add logic for deductions if needed
    const netPay = grossPay - deductions;

    return {
      employee_id: employee.id,
      employee: employee,
      period_start: startDate,
      period_end: endDate,
      basic_salary: proratedSalary,
      regular_hours: regularHours,
      overtime_hours: overtimeHours,
      housing_allowance: housingAllowance,
      transport_allowance: transportAllowance,
      food_allowance: foodAllowance,
      overtime_pay: overtimePay,
      gross_pay: grossPay,
      deductions: deductions,
      net_pay: netPay,
      status: 'draft'
    };
  };

  const generatePayroll = async () => {
    setGeneratingPayroll(true);
    try {
      const filteredEmployees = selectedEmployee !== 'all';
        ? employees.filter(emp => emp.id.toString() === selectedEmployee)
        : employees;

      const calculatedEntries = filteredEmployees.map(employee =>
        calculatePayroll(employee, timesheetSummaries[employee.id]);
      );

      // Save to backend
      const startDate = format(startOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');

      const response = await axios.post('/api/payroll/calculate', {
        period_start: startDate,
        period_end: endDate,
        employee_id: selectedEmployee !== 'all' ? parseInt(selectedEmployee) : undefined,
        entries: calculatedEntries
      })

      setPayrollEntries(response.data.data);
      setPayrollGenerated(true);
    } catch (error) {
      console.error('Error generating payroll:', error);
    } finally {
      setGeneratingPayroll(false);
    }
  };

  const approvePayroll = async () => {
    try {
      const payrollIds = payrollEntries.map(entry => entry.id);

      await axios.post('/api/payroll/approve', {
        payroll_ids: payrollIds
      })

      // Update status locally
      setPayrollEntries(prevEntries =>
        prevEntries.map(entry => ({
          ...entry,
          status: 'approved'
        }))
      );
    } catch (error) {
      console.error('Error approving payroll:', error);
    }
  };

  const exportPayroll = async () => {
    try {
      const startDate = format(startOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');
      const endDate = format(endOfMonth(parseISO(`${selectedMonth}-01`)), 'yyyy-MM-dd');

      const response = await axios.get('/api/payroll/export', {
        params: {
          period_start: startDate,
          period_end: endDate,
          employee_id: selectedEmployee !== 'all' ? selectedEmployee : undefined
        },
        responseType: 'blob'
      })

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payroll_${selectedMonth}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting payroll:', error);
    }
  };

  const formatCurrency = (amount: number) => {
    return `SAR ${amount.toFixed(2)}`;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'paid':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'draft':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getEmployeeName = (employee?: Employee) => {
    if (!employee) return 'Unknown';
    return `${employee.first_name} ${employee.last_name}`;
  };

  const canApprove = payrollGenerated && payrollEntries.length > 0 &&
    payrollEntries.every(entry => entry.status === 'draft');

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payroll Calculator</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Calculate employee payroll based on approved timesheets
              </p>
            </div>

            <div className="flex gap-2">
              {payrollGenerated && (
                <Button
                  variant="outline"
                  onClick={exportPayroll}
                  className="flex items-center gap-1"
                  <Download className="h-4 w-4" />
                  Export Payroll
                </Button>
              )}

              {canApprove && (
                <Button
                  onClick={() => {
                    setConfirmAction('approve');
                    setConfirmDialogOpen(true);
                  }}
                  className="flex items-center gap-1"
                  <Check className="h-4 w-4" />
                  Approve Payroll
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <div className="rounded-md border p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="month-selector">Payroll Period</Label>
                  <Input
                    id="month-selector"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="employee-selector">Employee</Label>
                  <Select
                    value={selectedEmployee}
                    onValueChange={setSelectedEmployee}
                    <SelectTrigger id="employee-selector">
                      <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employees</SelectItem>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {getEmployeeName(employee)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setConfirmAction('generate');
                      setConfirmDialogOpen(true);
                    }}
                    className="flex items-center gap-1"
                    disabled={generatingPayroll || loading}
                    <Calculator className="h-4 w-4" />
                    {generatingPayroll ? 'Calculating...' : 'Calculate Payroll'}
                  </Button>
                </div>
              </div>
            </div>

            {payrollGenerated && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Employee</TableHead>
                      <TableHead>Work Hours</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Overtime Pay</TableHead>
                      <TableHead>Gross Pay</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Pay</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollEntries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-10">
                          <p className="text-gray-500 mb-2">No payroll entries generated yet.</p>
                          <p className="text-sm text-gray-400">Use the calculate button to generate payroll.</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      payrollEntries.map((entry) => (
                        <TableRow key={entry.employee_id}>
                          <TableCell>
                            <div className="font-medium">{getEmployeeName(entry.employee)}</div>
                            <div className="text-xs text-gray-500">{entry.employee?.position?.name || '-'}</div>
                          </TableCell>
                          <TableCell>
                            <div>R: {entry.regular_hours}h</div>
                            {entry.overtime_hours > 0 && <div className="text-sm text-orange-600">OT: {entry.overtime_hours}h</div>}
                          </TableCell>
                          <TableCell>{formatCurrency(entry.basic_salary)}</TableCell>
                          <TableCell>
                            <div className="text-xs space-y-0.5">
                              <div>Housing: {formatCurrency(entry.housing_allowance)}</div>
                              <div>Transport: {formatCurrency(entry.transport_allowance)}</div>
                              <div>Food: {formatCurrency(entry.food_allowance)}</div>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(entry.overtime_pay)}</TableCell>
                          <TableCell className="font-medium">{formatCurrency(entry.gross_pay)}</TableCell>
                          <TableCell>{formatCurrency(entry.deductions)}</TableCell>
                          <TableCell className="font-bold">{formatCurrency(entry.net_pay)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusBadgeColor(entry.status)}>
                              {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {payrollGenerated && payrollEntries.length > 0 && (
              <div className="p-4 border rounded-md bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Payroll Period</div>
                    <div className="font-medium">
                      {format(parseISO(payrollEntries[0].period_start), 'MMM d')} - {format(parseISO(payrollEntries[0].period_end), 'MMM d, yyyy')}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Employee Count</div>
                    <div className="font-medium">{payrollEntries.length}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Gross Pay</div>
                    <div className="font-medium">
                      {formatCurrency(payrollEntries.reduce((sum, entry) => sum + entry.gross_pay, 0))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Net Pay</div>
                    <div className="font-medium">
                      {formatCurrency(payrollEntries.reduce((sum, entry) => sum + entry.net_pay, 0))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === 'generate' ? 'Generate Payroll?' : 'Approve Payroll?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === 'generate'
                ? `This will calculate payroll for ${selectedEmployee === 'all' ? 'all employees' : 'the selected employee'} for the period ${format(startOfMonth(parseISO(`${selectedMonth}-01`)), 'MMMM yyyy')}.`
                : 'This will approve all payroll entries. Approved entries cannot be modified later.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={confirmAction === 'generate' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
              {confirmAction === 'generate' ? 'Generate' : 'Approve'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PayrollCalculator;


