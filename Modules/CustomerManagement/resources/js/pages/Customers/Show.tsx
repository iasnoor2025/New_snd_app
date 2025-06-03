import React from 'react';
import { useTranslation } from 'react-i18next';
import { Head, Link } from '@inertiajs/react';
import type { PageProps, Customer } from '../../types/index.d';
import AdminLayout from '../../../../../../resources/js/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { Button } from '../../../../../../resources/js/components/ui/button';
import { Badge } from '../../../../../../resources/js/components/ui/badge';
import { route } from 'ziggy-js';

const breadcrumbs = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Customers', href: route('customers.index') },
  { title: 'Show', href: '#' },
];

interface Props extends PageProps {
  customer: Customer;
}

const ShowCustomer: React.FC<Props> = ({ customer }) => {
  const getStatusBadge = (status: string) => {
  const { t } = useTranslation('customer');

    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      inactive: 'secondary',
    };
    return <Badge variant={variants[status] || 'outline'}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  return (
    <AdminLayout title={t('ttl_customer_details')} breadcrumbs={breadcrumbs}>
      <Head title={t('ttl_customer_details')} />
      <div className="flex justify-center mt-8">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>{t('ttl_customer_details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4"><strong>Name:</strong> {customer.name}</div>
            <div className="mb-4"><strong>Contact Person:</strong> {customer.contact_person}</div>
            <div className="mb-4"><strong>Email:</strong> {customer.email}</div>
            <div className="mb-4"><strong>Phone:</strong> {customer.phone}</div>
            <div className="mb-4"><strong>Address:</strong> {customer.address}</div>
            <div className="mb-4"><strong>City:</strong> {customer.city}</div>
            <div className="mb-4"><strong>State:</strong> {customer.state}</div>
            <div className="mb-4"><strong>Zip:</strong> {customer.zip}</div>
            <div className="mb-4"><strong>Country:</strong> {customer.country}</div>
            <div className="mb-4"><strong>Tax ID:</strong> {customer.tax_id}</div>
            <div className="mb-4"><strong>Payment Terms:</strong> {customer.payment_terms}</div>
            <div className="mb-4"><strong>Status:</strong> {getStatusBadge(customer.status)}</div>
            <div className="mb-4"><strong>Notes:</strong> {customer.notes}</div>
            <div className="mb-4"><strong>User ID:</strong> {customer.user_id}</div>
            <div className="mb-4"><strong>Created At:</strong> {customer.created_at}</div>
            <div className="mb-4"><strong>Updated At:</strong> {customer.updated_at}</div>
            <div className="flex gap-2 mt-6">
              <Button asChild variant="secondary">
                <Link href={route('customers.edit', customer.id)}>Edit</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={route('customers.index')}>Back</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ShowCustomer;
