import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { customer, Invoice, Payment } from '@/types/models';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, Form, Input, DatePicker, Select, InputNumber, Table, Space, Alert } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatCurrency, formatDate } from '@/utils/format';
import { useToast } from '@/components/ui/use-toast';

interface Props extends PageProps {
  payment: Payment & {
    customer: customer;
    invoice: Invoice;
  };
  customers: customer[];
  invoices: {
    id: number;
    invoice_number: string;
    due_date: string;
    total_amount: number;
    paid_amount: number;
    balance_due: number;
  }[];
}

export default function Edit({ auth, payment, customers, invoices }: Props) {
  const { toast } = useToast();
  const [form] = Form.useForm();
  const [clientId, setClientId] = useState<number>(payment.client_id);
  const [invoiceId, setInvoiceId] = useState<number>(payment.invoice_id);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState<any>(
    invoices.find(inv => inv.id === payment.invoice_id) || null
  );

  // Initialize form with payment data
  useEffect(() => {
    form.setFieldsValue({
      client_id: payment.client_id,
      invoice_id: payment.invoice_id,
      payment_number: payment.payment_number,
      payment_date: dayjs(payment.payment_date),
      amount: payment.amount,
      payment_method: payment.payment_method,
      reference_number: payment.reference_number,
      notes: payment.notes,
    })
  }, [payment]);

  // Update invoices when customer changes
  const handleClientChange = (value: number) => {
    if (value !== clientId) {
      setClientId(value);
      setInvoiceId(0);
      setSelectedInvoiceData(null);
      
      form.setFieldsValue({
        invoice_id: undefined,
        amount: null,
      })
      
      // Fetch invoices for the selected customer
      router.get(route('payments.edit', payment.id), { client_id: value }, {
        preserveState: true,
        replace: true,
        only: ['invoices'],
      })
    }
  };

  // Update payment amount when invoice changes
  const handleInvoiceChange = (value: number) => {
    setInvoiceId(value);
    
    const invoice = invoices.find(inv => inv.id === value);
    if (invoice) {
      setSelectedInvoiceData(invoice);
      
      // If it's a different invoice than the original, set amount to balance due
      if (value !== payment.invoice_id) {
        form.setFieldsValue({ amount: invoice.balance_due })
      }
    } else {
      setSelectedInvoiceData(null);
    }
  };

  const onFinish = (values: any) => {
    router.put(route('payments.update', payment.id), {
      ...values,
      payment_date: values.payment_date.format('YYYY-MM-DD'),
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Payment updated successfully"
        })
        window.location.href = route('payments.index');
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to update payment. Please check the form for errors.",
          variant: "destructive"
        })
      }
    })
  };

  // Columns for the invoice details table
  const columns = [;
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      align: 'right' as const,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Amount Paid',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      align: 'right' as const,
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: 'Balance Due',
      dataIndex: 'balance_due',
      key: 'balance_due',
      align: 'right' as const,
      render: (amount: number) => formatCurrency(amount),
    },
  ];

  return (
    <AppLayout breadcrumbs={[
      { title: 'Payments', href: route('payments.index') },
      { title: 'Edit Payment', href: route('payments.edit', payment.id) }
    ]}>
      <Head title="Edit Payment" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit Payment</h2>
            </div>

            <div className="mb-6">
              <Link href={route('payments.show', payment.id)}>
                <Button icon={<RollbackOutlined />}>Back to Payment</Button>
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
                      onChange={handleClientChange}
                      options={customers.map(customer => ({
                        value: customer.id,
                        label: customer.company_name,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Invoice"
                    name="invoice_id"
                    rules={[{ required: true, message: 'Please select an invoice' }]}
                    <Select
                      placeholder="Select an invoice"
                      onChange={handleInvoiceChange}
                      options={invoices.map(invoice => ({
                        value: invoice.id,
                        label: `${invoice.invoice_number} (${formatCurrency(invoice.balance_due)})`,
                      }))}
                      disabled={!clientId}
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label="Payment Number"
                    name="payment_number"
                    rules={[{ required: true, message: 'Please enter a payment number' }]}
                    <Input placeholder="PMT-000001" />
                  </Form.Item>

                  <Form.Item
                    label="Payment Date"
                    name="payment_date"
                    rules={[{ required: true, message: 'Please select a payment date' }]}
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Form.Item
                    label="Payment Method"
                    name="payment_method"
                    rules={[{ required: true, message: 'Please select a payment method' }]}
                    <Select
                      placeholder="Select payment method"
                      options={[
                        { value: 'cash', label: 'Cash' },
                        { value: 'bank_transfer', label: 'Bank Transfer' },
                        { value: 'credit_card', label: 'Credit Card' },
                        { value: 'check', label: 'Check' },
                        { value: 'paypal', label: 'PayPal' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Reference Number"
                    name="reference_number"
                    <Input placeholder="Check number, transaction ID, etc." />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                      { required: true, message: 'Please enter the payment amount' },
                      {
                        validator: (_, value) => {
                          if (value && selectedInvoiceData && invoiceId !== payment.invoice_id && value > selectedInvoiceData.balance_due) {
                            return Promise.reject('Amount cannot exceed the balance due');
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    <InputNumber
                      style={{ width: '100%' }}
                      min={0.01}
                      step={0.01}
                      precision={2}
                      formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                      parser={(value) => {
                        if (!value) return 0.01;
                        return parseFloat(value.replace(/[^\d.-]/g, ''));
                      }}
                    />
                  </Form.Item>

                  {selectedInvoiceData && invoiceId !== payment.invoice_id && (
                    <Alert
                      message={`Balance due: ${formatCurrency(selectedInvoiceData.balance_due)}`}
                      type="info"
                      showIcon
                    />
                  )}
                </div>
              </div>

              <Form.Item
                label="Notes"
                name="notes"
                className="mt-6"
                <Input.TextArea rows={4} placeholder="Enter any additional notes" />
              </Form.Item>

              {selectedInvoiceData && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Invoice Details</h3>
                  <Table
                    columns={columns}
                    dataSource={[selectedInvoiceData]}
                    rowKey="id"
                    pagination={false}
                    bordered
                  />
                </div>
              )}

              <Form.Item className="mt-6">
                <Space>
                  <Button type="primary" htmlType="submit">
                    Update Payment
                  </Button>
                  <Link href={route('payments.show', payment.id)}>
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


