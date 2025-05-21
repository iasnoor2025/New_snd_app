import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InventoryCategory, InventoryItem, Supplier } from '@/types/models';
import { Button, Card, Form, Input, InputNumber, Select, Switch, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useToast } from '@/components/ui/use-toast';

interface Props extends PageProps {
  inventoryItem: InventoryItem;
  categories: InventoryCategory[];
  suppliers: Supplier[];
}

export default function Edit({ auth, inventoryItem, categories, suppliers }: Props) {
  const { toast } = useToast();
  const { put, processing, errors, setData, data } = useForm({
    name: inventoryItem.name || '',
    part_number: inventoryItem.part_number || '',
    category_id: inventoryItem.category_id || undefined,
    supplier_id: inventoryItem.supplier_id || undefined,
    description: inventoryItem.description || '',
    unit_cost: inventoryItem.unit_cost || 0,
    selling_price: inventoryItem.selling_price || 0,
    reorder_threshold: inventoryItem.reorder_threshold || 0,
    reorder_quantity: inventoryItem.reorder_quantity || 0,
    location: inventoryItem.location || '',
    notes: inventoryItem.notes || '',
    is_active: inventoryItem.is_active,
  })

  const handleSubmit = () => {
    put(route('inventory.update', inventoryItem.id), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Inventory item updated successfully"
        })
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update inventory item",
          variant: "destructive"
        })
      },
    })
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Inventory Item</h2>}
      <Head title="Edit Inventory Item" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="mb-4">
              <Link href={route('inventory.show', inventoryItem.id)}>
                <Button icon={<ArrowLeftOutlined />}>Back to Item Details</Button>
              </Link>
            </div>

            <Form layout="vertical" onFinish={handleSubmit} initialValues={data}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item 
                  label="Name" 
                  required 
                  validateStatus={errors.name ? 'error' : ''}
                  help={errors.name}
                  <Input 
                    value={data.name} 
                    onChange={e => setData('name', e.target.value)} 
                  />
                </Form.Item>

                <Form.Item 
                  label="Part Number"
                  validateStatus={errors.part_number ? 'error' : ''}
                  help={errors.part_number}
                  <Input 
                    value={data.part_number} 
                    onChange={e => setData('part_number', e.target.value)} 
                  />
                </Form.Item>

                <Form.Item 
                  label="Category" 
                  required
                  validateStatus={errors.category_id ? 'error' : ''}
                  help={errors.category_id}
                  <Select
                    placeholder="Select a category"
                    value={data.category_id}
                    onChange={value => setData('category_id', value)}
                    options={categories.map(category => ({
                      value: category.id,
                      label: category.name,
                    }))}
                  />
                </Form.Item>

                <Form.Item 
                  label="Supplier"
                  validateStatus={errors.supplier_id ? 'error' : ''}
                  help={errors.supplier_id}
                  <Select
                    placeholder="Select a supplier"
                    value={data.supplier_id}
                    onChange={value => setData('supplier_id', value)}
                    allowClear
                    options={suppliers.map(supplier => ({
                      value: supplier.id,
                      label: supplier.name,
                    }))}
                  />
                </Form.Item>

                <Form.Item 
                  label="Unit Cost" 
                  required
                  validateStatus={errors.unit_cost ? 'error' : ''}
                  help={errors.unit_cost}
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01}
                    precision={2}
                    value={data.unit_cost}
                    onChange={value => setData('unit_cost', value)}
                  />
                </Form.Item>

                <Form.Item 
                  label="Selling Price"
                  validateStatus={errors.selling_price ? 'error' : ''}
                  help={errors.selling_price}
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    step={0.01}
                    precision={2}
                    value={data.selling_price}
                    onChange={value => setData('selling_price', value)}
                  />
                </Form.Item>

                <Form.Item 
                  label="Reorder Threshold" 
                  required
                  validateStatus={errors.reorder_threshold ? 'error' : ''}
                  help={errors.reorder_threshold}
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    value={data.reorder_threshold}
                    onChange={value => setData('reorder_threshold', value)}
                  />
                </Form.Item>

                <Form.Item 
                  label="Reorder Quantity" 
                  required
                  validateStatus={errors.reorder_quantity ? 'error' : ''}
                  help={errors.reorder_quantity}
                  <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    value={data.reorder_quantity}
                    onChange={value => setData('reorder_quantity', value)}
                  />
                </Form.Item>

                <Form.Item 
                  label="Location"
                  validateStatus={errors.location ? 'error' : ''}
                  help={errors.location}
                  <Input 
                    value={data.location} 
                    onChange={e => setData('location', e.target.value)} 
                  />
                </Form.Item>
              </div>

              <Form.Item 
                label="Description"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description}
                <Input.TextArea 
                  rows={4}
                  value={data.description} 
                  onChange={e => setData('description', e.target.value)} 
                />
              </Form.Item>

              <Form.Item 
                label="Notes"
                validateStatus={errors.notes ? 'error' : ''}
                help={errors.notes}
                <Input.TextArea 
                  rows={4}
                  value={data.notes} 
                  onChange={e => setData('notes', e.target.value)} 
                />
              </Form.Item>

              <Form.Item 
                label="Active"
                validateStatus={errors.is_active ? 'error' : ''}
                help={errors.is_active}
                <Switch 
                  checked={data.is_active} 
                  onChange={checked => setData('is_active', checked)} 
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button type="primary" htmlType="submit" loading={processing}>
                  Update Inventory Item
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 
</Input>

