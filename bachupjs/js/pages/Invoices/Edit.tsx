import React, { useState, useEffect } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { customer, Invoice, InvoiceItem } from '@/types/models';
import { Button, Card, Form, Input, DatePicker, Select, InputNumber, Table, Space, Divider } from 'antd';
import { DeleteOutlined, PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatCurrency } from '@/utils/format';
import { useToast } from '@/components/ui/use-toast';

interface Props extends PageProps {
  invoice: Invoice & {
    customer: customer;
    invoiceItems: InvoiceItem[];
  };
  customers: customer[];
}

export default function Edit({ auth, invoice, customers }: Props) {
  const { toast } = useToast();
  const [form] = Form.useForm();
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [nextItemId, setNextItemId] = useState(1);

  useEffect(() => {
    // Populate form with invoice data
    form.setFieldsValue({
      client_id: invoice.client_id,
      rental_id: invoice.rental_id,
      invoice_number: invoice.invoice_number,
      invoice_date: dayjs(invoice.invoice_date),
      due_date: dayjs(invoice.due_date),
      status: invoice.status,
      notes: invoice.notes,
    })
    
    // Create invoice items from existing items
    if (invoice.invoiceItems && invoice.invoiceItems.length > 0) {
      const items = invoice.invoiceItems.map((item, index) => {
        return {
          id: index + 1,
          db_id: item.id, // Store the database ID for updates
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          tax_rate: item.tax_rate,
        };
      })
      
      setInvoiceItems(items);
      setNextItemId(items.length + 1);
    }
  }, [invoice]);

  const handleAddItem = () => {
    const newItem = {
      id: nextItemId,
      description: '',
      quantity: 1,
      unit_price: 0,
      tax_rate: 0,
    };
    
    setInvoiceItems([...invoiceItems, newItem]);
    setNextItemId(nextItemId + 1);
  };

  const handleRemoveItem = (id: number) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: string, value: any) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.unit_price;
    const taxAmount = subtotal * (item.tax_rate / 100);
    return subtotal + taxAmount;
  };

  const calculateTotal = () => {
    return invoiceItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const onFinish = (values: any) => {
    // Add calculated total and invoice items to form data
    const formData = {
      ...values,
      invoice_date: values.invoice_date.format('YYYY-MM-DD'),
      due_date: values.due_date.format('YYYY-MM-DD'),
      total_amount: calculateTotal(),
      invoice_items: invoiceItems.map(item => ({
        id: item.db_id || undefined, // Include ID only if it exists
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        tax_rate: item.tax_rate,
      })),
    };
    
    router.put(route('invoices.update', invoice.id), formData, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Invoice updated successfully"
        })
        window.location.href = route('invoices.index');
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update invoice. Please check the form for errors.",
          variant: "destructive"
        })
      }
    })
  };

  const columns = [;
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: any) => (
        <Input
          value={text}
          onChange={(e) => handleItemChange(record.id, 'description', e.target.value)}
          placeholder="Enter description"
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
      render: (value: number, record: any) => (
        <InputNumber
          min={1}
          value={value}
          onChange={(value) => handleItemChange(record.id, 'quantity', value)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      width: 150,
      render: (value: number, record: any) => (
        <InputNumber
          min={0}
          step={0.01}
          value={value}
          onChange={(value) => handleItemChange(record.id, 'unit_price', value)}
          style={{ width: '100%' }}
          formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}
          parser={(value) => {
            if (!value) return 0;
            return Number(value.replace(/[^\d.-]/g, ''));
          }}
        />
      ),
    },
    {
      title: 'Tax Rate (%)',
      dataIndex: 'tax_rate',
      key: 'tax_rate',
      width: 120,
      render: (value: number, record: any) => (
        <InputNumber
          min={0}
          max={100}
          value={value}
          onChange={(value) => handleItemChange(record.id, 'tax_rate', value)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      width: 150,
      render: (record: any) => formatCurrency(calculateItemTotal(record)),
    },
    {
      title: 'Action',
      key: 'action',
      width: 80,
      render: (record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={[
      { title: 'Invoices', href: route('invoices.index') },
      { title: invoice.invoice_number, href: route('invoices.show', invoice.id) },
      { title: 'Edit', href: route('invoices.edit', invoice.id) }
    ]}>
      <Head title={`Edit Invoice #${invoice.invoice_number}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="mb-6">
              <Link href={route('invoices.show', invoice.id)}>
                <Button icon={<RollbackOutlined />}>Back to Invoice</Button>
              </Link>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Form.Item
                    label="customer"
                    name="client_id"
                    rules={[{ required: true, message: 'Please select a customer' }]}
                    <Select
                      placeholder="Select a customer"
                      options={customers.map(customer => ({
                        value: customer.id,
                        label: customer.company_name,
                      }))}
                    />
                  </Form.Item>

                  {invoice.rental_id && (
                    <Form.Item
                      label="Rental"
                      name="rental_id"
                      hidden
                      <Input type="hidden" />
                    </Form.Item>
                  )}

                  <Form.Item
                    label="Invoice Number"
                    name="invoice_number"
                    rules={[{ required: true, message: 'Please enter an invoice number' }]}
                    <Input placeholder="INV-00001" />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label="Invoice Date"
                    name="invoice_date"
                    rules={[{ required: true, message: 'Please select an invoice date' }]}
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Due Date"
                    name="due_date"
                    rules={[{ required: true, message: 'Please select a due date' }]}
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select a status' }]}
                    <Select
                      placeholder="Select a status"
                      options={[
                        { value: 'draft', label: 'Draft' },
                        { value: 'sent', label: 'Sent' },
                        { value: 'paid', label: 'Paid' },
                        { value: 'partially_paid', label: 'Partially Paid' },
                        { value: 'overdue', label: 'Overdue' },
                        { value: 'cancelled', label: 'Cancelled' },
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>

              <Divider orientation="left">Invoice Items</Divider>

              <div className="mb-4">
                <Button
                  type="dashed"
                  onClick={handleAddItem}
                  icon={<PlusOutlined />}
                  Add Item
                </Button>
              </div>

              <Table
                columns={columns}
                dataSource={invoiceItems}
                rowKey="id"
                pagination={false}
                bordered
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                        Total:
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1} className="font-bold">
                        {formatCurrency(calculateTotal())}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2} />
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />

              <Form.Item
                label="Notes"
                name="notes"
                className="mt-6"
                <Input.TextArea rows={4} placeholder="Enter any additional notes" />
              </Form.Item>

              <Form.Item className="mt-6">
                <Space>
                  <Button type="primary" htmlType="submit">
                    Update Invoice
                  </Button>
                  <Link href={route('invoices.show', invoice.id)}>
                    <Button>Cancel</Button>
                  </Link>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 


