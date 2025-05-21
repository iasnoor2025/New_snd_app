import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InventoryItem, InventoryTransaction } from '@/types/models';
import { Button, Card, Col, Descriptions, Divider, Modal, Row, Statistic, Table, Tag, Form, InputNumber, DatePicker, Input, Select, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/utils';
import dayjs from 'dayjs';
import { useToast } from '@/components/ui/use-toast';

interface Props extends PageProps {
  inventoryItem: InventoryItem & {
    transactions: InventoryTransaction[];
  };
  statistics: {
    totalIn: number;
    totalOut: number;
    totalUsed: number;
  };
}

export default function Show({ auth, inventoryItem, statistics }: Props) {
  const { toast } = useToast();
  const [addStockModalVisible, setAddStockModalVisible] = React.useState(false);
  const [removeStockModalVisible, setRemoveStockModalVisible] = React.useState(false);
  const [addStockForm] = Form.useForm();
  const [removeStockForm] = Form.useForm();

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      router.delete(route('inventory.destroy', inventoryItem.id), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Inventory item deleted successfully"
          })
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete inventory item",
            variant: "destructive"
          })
        },
      })
    }
  };

  const handleAddStock = (values: any) => {
    router.post(route('inventory.add-stock', inventoryItem.id), values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Stock added successfully"
        })
        setAddStockModalVisible(false);
        addStockForm.resetFields();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add stock",
          variant: "destructive"
        })
      },
    })
  };

  const handleRemoveStock = (values: any) => {
    router.post(route('inventory.remove-stock', inventoryItem.id), values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Stock removed successfully"
        })
        setRemoveStockModalVisible(false);
        removeStockForm.resetFields();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to remove stock",
          variant: "destructive"
        })
      },
    })
  };

  const transactionColumns = [;
    {
      title: 'Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeColors: Record<string, string> = {
          in: 'green',
          out: 'red',
          use: 'orange',
          return: 'blue',
          adjustment: 'purple',
          initial: 'cyan',
        };
        return <Tag color={typeColors[type] || 'default'}>{type.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unit_cost',
      key: 'unit_cost',
      render: (cost: number) => formatCurrency(cost),
    },
    {
      title: 'Total Cost',
      dataIndex: 'total_cost',
      key: 'total_cost',
      render: (cost: number) => formatCurrency(cost),
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
    },
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory Item Details</h2>}
      <Head title={`Inventory Item - ${inventoryItem.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="flex justify-between items-center mb-4">
              <Link href={route('inventory.index')}>
                <Button icon={<ArrowLeftOutlined />}>Back to Inventory</Button>
              </Link>
              <div className="flex space-x-2">
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={() => setAddStockModalVisible(true)}
                  Add Stock
                </Button>
                <Button 
                  icon={<MinusOutlined />} 
                  onClick={() => setRemoveStockModalVisible(true)}
                  disabled={inventoryItem.quantity_in_stock <= 0}
                  Remove Stock
                </Button>
                <Link href={route('inventory.edit', inventoryItem.id)}>
                  <Button icon={<EditOutlined />}>Edit</Button>
                </Link>
                <Button 
                  danger 
                  icon={<DeleteOutlined />} 
                  onClick={handleDelete}
                  Delete
                </Button>
              </div>
            </div>

            <Row gutter={16} className="mb-6">
              <Col span={6}>
                <Statistic 
                  title="Current Stock" 
                  value={inventoryItem.quantity_in_stock} 
                  valueStyle={{ color: inventoryItem.quantity_in_stock <= inventoryItem.reorder_threshold ? 'red' : 'green' }}
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="Reorder Threshold" 
                  value={inventoryItem.reorder_threshold} 
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="Unit Cost" 
                  value={inventoryItem.unit_cost} 
                  prefix="$"
                />
              </Col>
              <Col span={6}>
                <Statistic 
                  title="Total Value" 
                  value={inventoryItem.quantity_in_stock * inventoryItem.unit_cost} 
                  prefix="$"
                />
              </Col>
            </Row>

            <Descriptions title="Item Information" bordered column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Name">{inventoryItem.name}</Descriptions.Item>
              <Descriptions.Item label="Part Number">{inventoryItem.part_number || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Category">{inventoryItem.category?.name || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Supplier">{inventoryItem.supplier?.name || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Location">{inventoryItem.location || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Status">
                {inventoryItem.is_active ? (
                  <Tag color="green">Active</Tag>
                ) : (
                  <Tag color="red">Inactive</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Selling Price">{formatCurrency(inventoryItem.selling_price || 0)}</Descriptions.Item>
              <Descriptions.Item label="Reorder Quantity">{inventoryItem.reorder_quantity}</Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {inventoryItem.description || 'No description provided'}
              </Descriptions.Item>
              <Descriptions.Item label="Notes" span={2}>
                {inventoryItem.notes || 'No notes provided'}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className="mb-4">
              <h3 className="text-lg font-medium">Transaction History</h3>
              <div className="flex space-x-4 mt-2 mb-4">
                <Statistic 
                  title="Total In" 
                  value={statistics.totalIn} 
                  valueStyle={{ color: 'green' }}
                />
                <Statistic 
                  title="Total Out" 
                  value={statistics.totalOut} 
                  valueStyle={{ color: 'red' }}
                />
                <Statistic 
                  title="Total Used" 
                  value={statistics.totalUsed} 
                  valueStyle={{ color: 'orange' }}
                />
              </div>
            </div>

            <Table 
              columns={transactionColumns} 
              dataSource={inventoryItem.transactions} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      </div>

      {/* Add Stock Modal */}
      <Modal
        title="Add Stock"
        open={addStockModalVisible}
        onCancel={() => setAddStockModalVisible(false)}
        footer={null}
        <Form form={addStockForm} layout="vertical" onFinish={handleAddStock}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="unit_cost"
            label="Unit Cost"
            rules={[{ required: true, message: 'Please enter unit cost' }]}
            initialValue={inventoryItem.unit_cost}
            <InputNumber min={0} step={0.01} precision={2} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="transaction_date"
            label="Transaction Date"
            rules={[{ required: true, message: 'Please select date' }]}
            initialValue={dayjs()}
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="supplier_id"
            label="Supplier"
            <Select
              placeholder="Select supplier"
              allowClear
              options={inventoryItem.supplier ? [{ value: inventoryItem.supplier.id, label: inventoryItem.supplier.name }] : []}
            />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Notes"
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setAddStockModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">Add Stock</Button>
          </div>
        </Form>
      </Modal>

      {/* Remove Stock Modal */}
      <Modal
        title="Remove Stock"
        open={removeStockModalVisible}
        onCancel={() => setRemoveStockModalVisible(false)}
        footer={null}
        <Form form={removeStockForm} layout="vertical" onFinish={handleRemoveStock}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter quantity' },
              { 
                validator: (_, value) => 
                  value > inventoryItem.quantity_in_stock 
                    ? Promise.reject('Quantity cannot exceed current stock') 
                    : Promise.resolve() 
              }
            ]}
            <InputNumber min={1} max={inventoryItem.quantity_in_stock} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="transaction_date"
            label="Transaction Date"
            rules={[{ required: true, message: 'Please select date' }]}
            initialValue={dayjs()}
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason"
            rules={[{ required: true, message: 'Please provide a reason' }]}
            <Select
              placeholder="Select reason"
              options={[
                { value: 'damaged', label: 'Damaged' },
                { value: 'expired', label: 'Expired' },
                { value: 'lost', label: 'Lost' },
                { value: 'returned', label: 'Returned to Supplier' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Notes"
            <Input.TextArea rows={4} />
          </Form.Item>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setRemoveStockModalVisible(false)}>Cancel</Button>
            <Button type="primary" danger htmlType="submit">Remove Stock</Button>
          </div>
        </Form>
      </Modal>
    </AuthenticatedLayout>
  );
} 


