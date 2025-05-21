import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Supplier, InventoryItem } from '@/types/models';
import { Card, Descriptions, Table, Button, Tag, Divider, Typography, Space, Popconfirm } from 'antd';
import { ArrowLeftOutlined, EditOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HomeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useToast } from '@/components/ui/use-toast';

const { Title, Text } = Typography;

interface Props extends PageProps {
  supplier: Supplier;
  items: {
    data: InventoryItem[];
    total: number;
  };
}

export default function Show({ auth, supplier, items }: Props) {
  const { toast } = useToast();

  const handleDelete = () => {
    router.delete(route('suppliers.destroy', supplier.id), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Supplier deleted successfully"
        })
        window.location.href = route('suppliers.index');
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to delete supplier",
          variant: "destructive"
        })
      }
    })
  };

  const columns = [;
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: InventoryItem) => (
        <Link href={route('inventory.show', record.id)}>
          {text || '-'}
        </Link>
      ),
    },
    {
      title: 'Part Number',
      dataIndex: 'part_number',
      key: 'part_number',
      render: (text: string) => text || '-',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: any) => category?.name || '-',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity_in_stock',
      key: 'quantity_in_stock',
      render: (quantity: number) => quantity?.toString() || '0',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unit_cost',
      key: 'unit_cost',
      render: (cost: number) => cost ? `$${cost.toFixed(2)}` : '-',
    },
    {
      title: 'Total Value',
      key: 'total_value',
      render: (_, record: InventoryItem) =>
        record.unit_cost && record.quantity_in_stock ?
          `$${(record.unit_cost * record.quantity_in_stock).toFixed(2)}` :
          '-',
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Supplier Details</h2>}
      <Head title={`Supplier: ${supplier.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-4 flex justify-between">
            <Link href={route('suppliers.index')}>
              <Button icon={<ArrowLeftOutlined />}>Back to Suppliers</Button>
            </Link>

            <Space>
              <Link href={route('suppliers.edit', supplier.id)}>
                <Button type="primary" icon={<EditOutlined />}>Edit Supplier</Button>
              </Link>
              <Popconfirm
                title="Are you sure you want to delete this supplier?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                <Button danger icon={<DeleteOutlined />}>Delete Supplier</Button>
              </Popconfirm>
            </Space>
          </div>

          <Card>
            <div className="flex justify-between items-start mb-4">
              <div>
                <Title level={3}>{supplier.name || '-'}</Title>
                <Text type="secondary">{supplier.is_active ?
                  <Tag color="green">Active</Tag> :
                  <Tag color="red">Inactive</Tag>
                }</Text>
              </div>

              <div className="text-right">
                {supplier.contact_person && (
                  <div className="mb-2">
                    <Text strong>Contact Person:</Text> {supplier.contact_person || '-'}
                  </div>
                )}

                {supplier.email && (
                  <div className="mb-2">
                    <a href={`mailto:${supplier.email}`}>
                      <Space>
                        <MailOutlined />
                        {supplier.email || '-'}
                      </Space>
                    </a>
                  </div>
                )}

                {supplier.phone && (
                  <div className="mb-2">
                    <a href={`tel:${supplier.phone}`}>
                      <Space>
                        <PhoneOutlined />
                        {supplier.phone || '-'}
                      </Space>
                    </a>
                  </div>
                )}

                {supplier.website && (
                  <div>
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                      <Space>
                        <GlobalOutlined />
                        Visit Website
                      </Space>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Divider />

            <Descriptions title="Address Information" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
              {supplier.address && (
                <Descriptions.Item label="Address" span={2}>
                  <Space>
                    <HomeOutlined />
                    {supplier.address}
                  </Space>
                </Descriptions.Item>
              )}

              {supplier.city && (
                <Descriptions.Item label="City">
                  {supplier.city}
                </Descriptions.Item>
              )}

              {supplier.state && (
                <Descriptions.Item label="State/Province">
                  {supplier.state}
                </Descriptions.Item>
              )}

              {supplier.postal_code && (
                <Descriptions.Item label="Postal Code">
                  {supplier.postal_code}
                </Descriptions.Item>
              )}

              {supplier.country && (
                <Descriptions.Item label="Country">
                  {supplier.country}
                </Descriptions.Item>
              )}
            </Descriptions>

            {supplier.notes && (
                <Divider />
                <div>
                  <Title level={5}>Notes</Title>
                  <p>{supplier.notes}</p>
                </div>
              </>
            )}
          </Card>

          <div className="mt-6">
            <Card title="Inventory Items Supplied">
              <Table
                columns={columns}
                dataSource={items.data}
                rowKey="id"
                pagination={{
                  total: items.total,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
              />
            </Card>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

