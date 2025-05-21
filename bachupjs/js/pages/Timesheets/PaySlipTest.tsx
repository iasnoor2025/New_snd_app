import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';

interface Props extends PageProps {
  employeeId?: string;
  month?: string;
}

export default function PaySlipTest({ auth, employeeId, month }: Props) {
  return (
    <AdminLayout title="Pay Slip Test" breadcrumbs={[]} requiredPermission="timesheets.view">
      <Head title="Pay Slip Test" />
      
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Pay Slip Test Page</CardTitle>
            <CardDescription>
              This is a test page to verify that the pay slip route is working.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Route Parameters:</h3>
                <p>Employee ID: {employeeId || 'Not provided'}</p>
                <p>Month: {month || 'Not provided'}</p>
              </div>
              
              <Button variant="outline" asChild>
                <Link href="/timesheets/monthly">
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />
                  Back to Monthly View
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
} 