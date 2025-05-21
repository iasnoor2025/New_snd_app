import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button, Card, Form, Input, ColorPicker, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { Color } from 'antd/es/color-picker';
import { InventoryCategory } from '@/types/models';

interface Props extends PageProps {
  category: InventoryCategory;
}

export default function Edit({ auth, category }: Props) {
  const { put, processing, errors, setData, data } = useForm({
    name: category.name,
    description: category.description || '',
    color: category.color || '',
  })

  const handleSubmit = () => {
    put(route('inventory.categories.update', category.id), {
      onSuccess: () => {
        message.success('Category updated successfully');
      },
    })
  };

  const handleColorChange = (color: Color) => {
    setData('color', color.toHexString());
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Inventory Category</h2>}
    >
      <Head title="Edit Inventory Category" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="mb-4">
              <Link href={route('inventory.categories.index')}>
                <Button icon={<ArrowLeftOutlined />}>Back to Categories</Button>
              </Link>
            </div>

            <Form layout="vertical" onFinish={handleSubmit} initialValues={data}>
              <Form.Item
                label="Name"
                required
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name}
              >
                <Input
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  placeholder="Enter category name"
                />
              </Form.Item>

              <Form.Item
                label="Description"
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description}
              >
                <Input.TextArea
                  rows={4}
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  placeholder="Enter category description (optional)"
                />
              </Form.Item>

              <Form.Item
                label="Color"
                validateStatus={errors.color ? 'error' : ''}
                help={errors.color}
              >
                <ColorPicker
                  value={data.color}
                  onChange={handleColorChange}
                  showText
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button type="primary" htmlType="submit" loading={processing}>
                  Update Category
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

