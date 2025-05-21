import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InventoryCategory } from '@/types/models';
import { Button, Card, Table, Tag, Tooltip, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, TagOutlined } from '@ant-design/icons';

interface Props extends PageProps {
  categories: InventoryCategory[];
}

export default function Index({ auth, categories }: Props) {
  
  const { hasPermission } = usePermission();
  const canCreateInventorycategories = hasPermission('inventory-categories.create');
const handleDelete = (id: number) => {
    router.delete(route('inventory.categories.destroy', id), {
      onSuccess: () => message.success('Category deleted successfully'),
      onError: (errors) => {
        if (errors.message) {
          message.error(errors.message);
        } else {
          message.error('Failed to delete category');
        }
      },
    })
  };

  const columns = [;
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: InventoryCategory) => (
        <Link href={route('inventory.categories.show', record.id)}>
          <div className="flex items-center">
            {record.color && (
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: record.color }}
              />
            )}
            {text}
          </div>
        </Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Items Count',
      dataIndex: 'inventory_items_count',
      key: 'inventory_items_count',
      render: (count: number) => (
        <Tag color={count > 0 ? 'blue' : 'default'}>
          {count}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: InventoryCategory) => (
        <div className="flex space-x-2">
          <Link href={route('inventory.categories.edit', record.id)}>
            <Button type="default" icon={<EditOutlined />} size="small" />
          </Link>
          <Popconfirm
            title="Delete category"
            description="Are you sure you want to delete this category?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.inventory_items_count > 0}
            <Tooltip 
              title={record.inventory_items_count > 0 ? 'Cannot delete category with items' : 'Delete category'}
              <Button 
                type="default" 
                danger 
                icon={<DeleteOutlined />} 
                size="small" 
                disabled={record.inventory_items_count > 0}
              />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory Categories</h2>}
      <Head title="Inventory Categories" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold flex items-center">
                <TagOutlined className="mr-2" /> Inventory Categories
              </div>
              <Link href={route('inventory.categories.create')}>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add New Category
                </Button>
              </Link>
            </div>

            <Table
              columns={columns}
              dataSource={categories}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 

</div>


