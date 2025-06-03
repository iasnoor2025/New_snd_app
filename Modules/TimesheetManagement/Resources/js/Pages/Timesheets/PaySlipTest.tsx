import React from 'react';
import { useTranslation } from 'react-i18next';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/Modules/TimesheetManagement/Resources/js/types';
import AdminLayout from '@/Modules/TimesheetManagement/Resources/js/layouts/AdminLayout';
import { Button } from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Modules/TimesheetManagement/Resources/js/Modules/TimesheetManagement/Resources/js/components/ui/card';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';

interface Props extends PageProps {
  employeeId?: string;
  month?: string;
}

export default function PaySlipTest({ auth, employeeId, month }: Props) {
  const { t } = useTranslation('timesheet');

  return (
    <AdminLayout title={t('ttl_pay_slip_test')} breadcrumbs={[]} requiredPermission="timesheets.view">
      <Head title={t('ttl_pay_slip_test')} />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('ttl_pay_slip_test_page')}</CardTitle>
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
                <Link href="/hr/timesheets/monthly">
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
