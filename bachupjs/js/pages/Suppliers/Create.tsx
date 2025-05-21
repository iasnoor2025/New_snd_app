import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Card, Form, Input, Switch, Divider, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useToast } from '@/components/ui/use-toast';

const { TextArea } = Input;

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
  const { post, processing, errors, setData, data } = useForm({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Saudi Arabia',
    website: '',
    notes: '',
    is_active: true,
  })

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('suppliers.store'), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Supplier created successfully"
        })
        window.location.href = route('suppliers.index');
      },
      onError: (errors) => {
        toast({
          title: "Error",
          description: "Failed to create supplier. Please check the form for errors.",
          variant: "destructive"
        })
      }
    })
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Supplier</h2>}
      <Head title="Create Supplier" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="mb-4">
              <Link href={route('suppliers.index')}>
                <Button icon={<ArrowLeftOutlined />}>Back to Suppliers</Button>
              </Link>
            </div>

            <Form layout="vertical" onFinish={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Supplier Name"
                  required
                  validateStatus={errors.name ? 'error' : ''}
                  help={errors.name}
                  <Input
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    placeholder="Enter supplier name"
                  />
                </Form.Item>

                <Form.Item
                  label="Contact Person"
                  validateStatus={errors.contact_person ? 'error' : ''}
                  help={errors.contact_person}
                  <Input
                    value={data.contact_person}
                    onChange={e => setData('contact_person', e.target.value)}
                    placeholder="Enter contact person name"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email}
                  <Input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  validateStatus={errors.phone ? 'error' : ''}
                  help={errors.phone}
                  <Input
                    value={data.phone}
                    onChange={e => setData('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </Form.Item>

                <Form.Item
                  label="Website"
                  validateStatus={errors.website ? 'error' : ''}
                  help={errors.website}
                  <Input
                    value={data.website}
                    onChange={e => setData('website', e.target.value)}
                    placeholder="Enter website URL"
                  />
                </Form.Item>

                <Form.Item
                  label="Status"
                  validateStatus={errors.is_active ? 'error' : ''}
                  help={errors.is_active}
                  <Switch
                    checked={data.is_active}
                    onChange={checked => setData('is_active', checked)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                  />
                </Form.Item>
              </div>

              <Divider>Address Information</Divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  label="Address"
                  validateStatus={errors.address ? 'error' : ''}
                  help={errors.address}
                  <TextArea
                    rows={3}
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                    placeholder="Enter street address"
                  />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label="City"
                    validateStatus={errors.city ? 'error' : ''}
                    help={errors.city}
                    <Input
                      value={data.city}
                      onChange={e => setData('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </Form.Item>

                  <Form.Item
                    label="State/Province"
                    validateStatus={errors.state ? 'error' : ''}
                    help={errors.state}
                    <Input
                      value={data.state}
                      onChange={e => setData('state', e.target.value)}
                      placeholder="Enter state/province"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Postal Code"
                    validateStatus={errors.postal_code ? 'error' : ''}
                    help={errors.postal_code}
                    <Input
                      value={data.postal_code}
                      onChange={e => setData('postal_code', e.target.value)}
                      placeholder="Enter postal code"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Country"
                    validateStatus={errors.country ? 'error' : ''}
                    help={errors.country}
                    <Input
                      value={data.country}
                      onChange={e => setData('country', e.target.value)}
                      placeholder="Enter country"
                    />
                  </Form.Item>
                </div>
              </div>

              <Form.Item
                label="Notes"
                validateStatus={errors.notes ? 'error' : ''}
                help={errors.notes}
                <TextArea
                  rows={4}
                  value={data.notes}
                  onChange={e => setData('notes', e.target.value)}
                  placeholder="Enter additional notes about this supplier"
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button type="primary" htmlType="submit" loading={processing}>
                  Create Supplier
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
