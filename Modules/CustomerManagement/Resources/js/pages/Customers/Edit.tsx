import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import type { PageProps, Customer } from '../../types/index.d';
import AdminLayout from '../../../../../../resources/js/layouts/AdminLayout';
import { Input } from '../../../../../../resources/js/components/ui/input';
import { Button } from '../../../../../../resources/js/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../resources/js/components/ui/card';
import { route } from 'ziggy-js';
// import Permission from '@/components/Permission';

const breadcrumbs = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Customers', href: route('customers.index') },
  { title: 'Edit', href: '#' },
];

interface Props extends PageProps {
  customer: Customer;
}

const EditCustomer: React.FC<Props> = ({ customer }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: customer.name || '',
    contact_person: customer.contact_person || '',
    email: customer.email || '',
    phone: customer.phone || '',
    address: customer.address || '',
    city: customer.city || '',
    state: customer.state || '',
    zip: customer.zip || '',
    country: customer.country || '',
    tax_id: customer.tax_id || '',
    payment_terms: customer.payment_terms || '',
    status: customer.status || 'active',
    notes: customer.notes || '',
    user_id: customer.user_id || '',
  });
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    put(route('customers.update', customer.id), {
      onError: (err) => setError('Failed to update customer.'),
      onSuccess: () => setError(null),
    });
  }

  return (
    <AdminLayout title="Edit Customer" breadcrumbs={breadcrumbs}>
      <Head title="Edit Customer" />
      <div className="flex justify-center mt-8">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Edit Customer</CardTitle>
          </CardHeader>
          <CardContent>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Name</label>
                  <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                  {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                </div>
                <div>
                  <label className="block mb-1">Contact Person</label>
                  <Input value={data.contact_person} onChange={e => setData('contact_person', e.target.value)} />
                  {errors.contact_person && <div className="text-red-500 text-xs">{errors.contact_person}</div>}
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                  {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                </div>
                <div>
                  <label className="block mb-1">Phone</label>
                  <Input value={data.phone} onChange={e => setData('phone', e.target.value)} />
                  {errors.phone && <div className="text-red-500 text-xs">{errors.phone}</div>}
                </div>
                <div>
                  <label className="block mb-1">Address</label>
                  <Input value={data.address} onChange={e => setData('address', e.target.value)} />
                  {errors.address && <div className="text-red-500 text-xs">{errors.address}</div>}
                </div>
                <div>
                  <label className="block mb-1">City</label>
                  <Input value={data.city} onChange={e => setData('city', e.target.value)} />
                  {errors.city && <div className="text-red-500 text-xs">{errors.city}</div>}
                </div>
                <div>
                  <label className="block mb-1">State</label>
                  <Input value={data.state} onChange={e => setData('state', e.target.value)} />
                  {errors.state && <div className="text-red-500 text-xs">{errors.state}</div>}
                </div>
                <div>
                  <label className="block mb-1">Zip</label>
                  <Input value={data.zip} onChange={e => setData('zip', e.target.value)} />
                  {errors.zip && <div className="text-red-500 text-xs">{errors.zip}</div>}
                </div>
                <div>
                  <label className="block mb-1">Country</label>
                  <Input value={data.country} onChange={e => setData('country', e.target.value)} />
                  {errors.country && <div className="text-red-500 text-xs">{errors.country}</div>}
                </div>
                <div>
                  <label className="block mb-1">Tax ID</label>
                  <Input value={data.tax_id} onChange={e => setData('tax_id', e.target.value)} />
                  {errors.tax_id && <div className="text-red-500 text-xs">{errors.tax_id}</div>}
                </div>
                <div>
                  <label className="block mb-1">Payment Terms</label>
                  <Input value={data.payment_terms} onChange={e => setData('payment_terms', e.target.value)} />
                  {errors.payment_terms && <div className="text-red-500 text-xs">{errors.payment_terms}</div>}
                </div>
                <div>
                  <label className="block mb-1">Status</label>
                  <select className="w-full border rounded px-2 py-1" value={data.status} onChange={e => setData('status', e.target.value)}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  {errors.status && <div className="text-red-500 text-xs">{errors.status}</div>}
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1">Notes</label>
                  <textarea className="w-full border rounded px-2 py-1" value={data.notes} onChange={e => setData('notes', e.target.value)} />
                  {errors.notes && <div className="text-red-500 text-xs">{errors.notes}</div>}
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1">User ID</label>
                  <Input value={data.user_id} onChange={e => setData('user_id', e.target.value)} />
                  {errors.user_id && <div className="text-red-500 text-xs">{errors.user_id}</div>}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button type="submit" disabled={processing}>Update</Button>
                <Button asChild variant="outline">
                  <Link href={route('customers.index')}>Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditCustomer;
