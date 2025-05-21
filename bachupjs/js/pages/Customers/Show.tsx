import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Customer } from '@/types/models';
import { formatPaymentTerms } from '@/schemas/customer.schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, Building2, MapPin, Phone, Mail, Receipt, CreditCard, ClipboardEdit, Trash2 } from 'lucide-react';
import CrudButtons from '@/components/shared/CrudButtons';
import axios from 'axios';
import ToastService from '@/utils/toast-service';
import { router } from '@inertiajs/react';
import ConfirmDialog from '@/components/shared/ConfirmDialog';
import ActionButton from '@/components/shared/ActionButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CustomerDetailsProps extends PageProps {
  customer: Customer;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Customers',
    href: route('customers.index'),
  },
  {
    title: 'Customer Details',
  },
];

export default function Show({ customer, auth }: CustomerDetailsProps) {
  if (!customer) {
    return (
      <AdminLayout title="Customer Not Found" breadcrumbs={breadcrumbs} requiredPermission="customers.view">
        <Head title="Customer Not Found" />
        <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Customer Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The requested customer could not be found or you do not have permission to view it.</p>
              <Button className="mt-4" asChild>
                <Link href={route('customers.index')}>Back to Customers</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  const handleDirectDelete = () => {
    try {
      console.log('Starting delete of customer:', customer.id);

      // Use Inertia's router.delete directly
      router.delete(route('customers.destroy', { customer: customer.id }), {
        onBefore: () => {
          console.log('Before delete request');
          return true; // Continue with the request
        },
        onSuccess: () => {
          console.log('Delete successful');
          ToastService.success(`${customer.company_name} deleted successfully`);
          // Router will automatically redirect to customers.index due to redirect in the controller
        },
        onError: (errors) => {
          console.error('Delete errors:', errors);
          if (errors.message) {
            ToastService.error(`Failed to delete: ${errors.message}`);
          } else {
            ToastService.error(`Failed to delete ${customer.company_name}`);
          }
        },
        preserveScroll: true,
      })
    } catch (error) {
      console.error('Delete error:', error);
      ToastService.error(`Failed to delete ${customer.company_name}: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <AdminLayout title={`Customer: ${customer.company_name}`} breadcrumbs={breadcrumbs} requiredPermission="customers.view">
      <Head title={`Customer: ${customer.company_name}`} />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">
                {customer.company_name}
                <Badge className="ml-3" variant={customer.is_active ? "default" : "destructive"}>
                  {customer.is_active ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Customer ID: {customer.id}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href={route('customers.index')}>
                  Back to Customers
                </Link>
              </Button>
              <ActionButton
                action="edit"
                resourceType="customers"
                resourceId={customer.id}
                resourceName={customer.company_name}
                showText
                buttonSize="default"
              />
              <ActionButton
                action="delete"
                resourceType="customers"
                resourceId={customer.id}
                resourceName={customer.company_name}
                showText
                buttonSize="default"
              />
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Company Name</div>
                <div className="col-span-2">{customer.company_name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Contact Person</div>
                <div className="col-span-2">{customer.contact_person}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Email</div>
                <div className="col-span-2">
                  <a href={`mailto:${customer.email}`} className="text-primary hover:underline">
                    {customer.email}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Phone</div>
                <div className="col-span-2">
                  <a href={`tel:${customer.phone}`} className="hover:underline">
                    {customer.phone}
                  </a>
                </div>
              </div>
              {customer.tax_number && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Tax Number</div>
                  <div className="col-span-2">{customer.tax_number}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Street</div>
                <div className="col-span-2">{customer.address}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">City</div>
                <div className="col-span-2">{customer.city}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">State/Province</div>
                <div className="col-span-2">{customer.state}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Postal Code</div>
                <div className="col-span-2">{customer.postal_code}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Country</div>
                <div className="col-span-2">{customer.country}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Financial Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Credit Limit</div>
                <div className="col-span-2">
                  {typeof customer.credit_limit === 'number'
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(customer.credit_limit)
                    : customer.credit_limit}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Payment Terms</div>
                <div className="col-span-2">{formatPaymentTerms(customer.payment_terms)}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarClock className="mr-2 h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Created At</div>
                <div className="col-span-2">
                  {new Date(customer.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Last Updated</div>
                <div className="col-span-2">
                  {new Date(customer.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              {customer.notes && (
                <div className="mt-4">
                  <div className="font-medium mb-2">Notes</div>
                  <div className="whitespace-pre-line px-4 py-3 bg-muted rounded-md">
                    {customer.notes}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
