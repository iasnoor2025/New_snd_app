import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/Modules/EmployeeManagement/Resources/js/types';
import AdminLayout from '@/Modules/EmployeeManagement/Resources/js/layouts/AdminLayout';
import { BreadcrumbItem } from '@/Modules/EmployeeManagement/Resources/js/types';
import { Breadcrumb } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/card';
import { PaymentHistory } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/advances/PaymentHistory';
import { Button } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  employee_id: string;
}

interface Payment {
  id: number;
  amount: number;
  payment_date: string;
  notes: string;
  recorded_by: string;
  advance_payment_id: number;
}

interface MonthlyHistoryItem {
  month: string;
  total_amount: number;
  payments: Payment[];
}

interface Props extends PageProps {
  employee: Employee;
  monthlyHistory: MonthlyHistoryItem[];
  totalRepaid: number;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function History({ auth, employee, monthlyHistory, totalRepaid, pagination }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Employees',
      href: '/employees',
    },
    {
      title: 'Employee Details',
      href: `/employees/${employee.id}`,
    },
    {
      title: 'Payment History',
      href: `/employees/${employee.id}/advances/history`,
    },
  ];

  return (
    <AdminLayout title="Payment History" breadcrumbs={breadcrumbs} requiredPermission="employees.view">
      <Head title="Payment History" />

      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Payment History
            </h1>
            <p className="text-muted-foreground">
              {employee.first_name} {employee.last_name} • ID: {employee.employee_id}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.visit(`/employees/${employee.id}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Employee
          </Button>
        </div>

        <Card>
          {/* <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track and manage employee advance payments and deductions</CardDescription>
          </CardHeader> */}
          <CardContent>
            <PaymentHistory
              employeeId={employee.id}
              initialMonthlyHistory={monthlyHistory}
              initialTotalRepaid={totalRepaid}
              initialPagination={pagination}
              showOnlyLast={false}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
