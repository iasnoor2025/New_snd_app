import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { InventoryItem } from '@/types/models';
import { Button, Card, Form, Input, InputNumber, Select, DatePicker, Radio, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useToast } from '@/components/ui/use-toast';

const { Option } = Select;
const { TextArea } = Input;

interface Props extends PageProps {
  items: InventoryItem[];
}

export default function Create({ auth, items }: Props) {
  const { toast } = useToast();
  const [transactionType, setTransactionType] = useState('addition');
  
  const { post, processing, errors, setData, data } = useForm({
    item_id: '',
    type: 'addition',
    quantity: 1,
    reference: '',
    notes: '',
    transaction_date: new Date().toISOString(),
  })

  const handleSubmit = () => {
    post(route('inventory.transactions.store'), {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Transaction created successfully"
        })
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to create transaction",
          variant: "destructive"
        })
      },
    })
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value;
    setTransactionType(type);
    setData('type', type);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Inventory Transaction</h2>}
      <Head title="Create Inventory Transaction" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="mb-4">
              <Link href={route('inventory.transactions.index')}>
                <Button icon={<ArrowLeftOutlined />}>Back to Transactions</Button>
              </Link>
            </div>

            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item 
                label="Transaction Type" 
                required
                validateStatus={errors.type ? 'error' : ''}
                help={errors.type}
                <Radio.Group value={data.type} onChange={handleTypeChange}>
                  <Radio.Button value="addition">Addition</Radio.Button>
                  <Radio.Button value="removal">Removal</Radio.Button>
                  <Radio.Button value="adjustment">Adjustment</Radio.Button>
                  <Radio.Button value="transfer">Transfer</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item 
                label="Item" 
                required
                validateStatus={errors.item_id ? 'error' : ''}
                help={errors.item_id}
                <Select
                  placeholder="Select inventory item"
                  value={data.item_id || undefined}
                  onChange={value => setData('item_id', value)}
                  showSearch
                  optionFilterProp="children"
                  {items.map(item => (
                    <Option key={item.id} value={item.id}>
                      {item.name} - {item.part_number} ({item.quantity_in_stock} in stock)
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item 
                label="Quantity" 
                required
                validateStatus={errors.quantity ? 'error' : ''}
                help={errors.quantity}
                <InputNumber
                  min={transactionType === 'removal' ? 0.01 : undefined}
                  precision={2}
                  value={data.quantity}
                  onChange={value => setData('quantity', value)}
                  style={{ width: '100%' }}
                  addonBefore={transactionType === 'addition' ? '+' : transactionType === 'removal' ? '-' : 'Â±'}
                />
              </Form.Item>

              <Form.Item 
                label="Transaction Date"
                validateStatus={errors.transaction_date ? 'error' : ''}
                help={errors.transaction_date}
                <DatePicker 
                  style={{ width: '100%' }}
                  onChange={(date, dateString) => setData('transaction_date', dateString)}
                />
              </Form.Item>

              <Form.Item 
                label="Reference"
                validateStatus={errors.reference ? 'error' : ''}
                help={errors.reference}
                <Input 
                  value={data.reference} 
                  onChange={e => setData('reference', e.target.value)} 
                  placeholder="PO number, invoice number, etc."
                />
              </Form.Item>

              <Form.Item 
                label="Notes"
                validateStatus={errors.notes ? 'error' : ''}
                help={errors.notes}
                <TextArea 
                  rows={4}
                  value={data.notes} 
                  onChange={e => setData('notes', e.target.value)} 
                  placeholder="Additional details about this transaction"
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button type="primary" htmlType="submit" loading={processing}>
                  Create Transaction
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
} 

