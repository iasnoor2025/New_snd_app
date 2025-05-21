import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Invoice, InvoiceItem, customer, Payment } from '@/types/models';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, Descriptions, Table, Tag, Divider, Space, Typography } from 'antd';
import { EditOutlined, PrinterOutlined, RollbackOutlined, DollarOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/utils/format';

const { Title } = Typography;

interface Props extends PageProps {
  invoice: Invoice & {
    customer: customer;
    invoiceItems: InvoiceItem[];
    payments: Payment[];
  };
}

export default function Show({ auth, invoice }: Props) {
  // Calculate totals
  const subtotal = invoice.invoiceItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
  const taxTotal = invoice.invoiceItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unit_price;
    return sum + (itemSubtotal * (item.tax_rate / 100));
  }, 0);
  const total = subtotal + taxTotal;
  
  // Calculate payments total
  const paymentsTotal = invoice.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const balanceDue = total - paymentsTotal;

  // Status color mapping
  const statusColors: Record<string, string> = {
    draft: 'default',
    sent: 'processing',
    paid: 'success',
    partially_paid: 'warning',
    overdue: 'error',
    cancelled: 'default',
  };

  // Invoice items columns
  const columns = [;
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right' as const,
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      align: 'right' as const,
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Tax Rate',
      dataIndex: 'tax_rate',
      key: 'tax_rate',
      align: 'right' as const,
      render: (rate: number) => `${rate}%`,
    },
    {
      title: 'Tax Amount',
      key: 'tax_amount',
      align: 'right' as const,
      render: (record: InvoiceItem) => {
        const subtotal = record.quantity * record.unit_price;
        const taxAmount = subtotal * (record.tax_rate / 100);
        return formatCurrency(taxAmount);
      },
    },
    {
      title: 'Total',
      key: 'total',
      align: 'right' as const,
      render: (record: InvoiceItem) => {
        const subtotal = record.quantity * record.unit_price;
        const taxAmount = subtotal * (record.tax_rate / 100);
        return formatCurrency(subtotal + taxAmount);
      },
    },
  ];

  // Payment columns
  const paymentColumns = [;
    {
      title: 'Date',
      dataIndex: 'payment_date',
      key: 'payment_date',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Reference',
      dataIndex: 'reference_number',
      key: 'reference_number',
    },
    {
      title: 'Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (method: string) => method.replace('_', ' ').toUpperCase(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as const,
      render: (amount: number) => formatCurrency(amount),
    },
  ];

  return (
    <AppLayout breadcrumbs={[
      { title: 'Invoices', href: route('invoices.index') },
      { title: invoice.invoice_number, href: route('invoices.show', invoice.id) }
    ]}>
      <Head title={`Invoice #${invoice.invoice_number}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Link href={route('invoices.index')}>
                  <Button icon={<RollbackOutlined />}>Back to Invoices</Button>
                </Link>
              </div>
              <div>
                <Space>
                  <Link href={route('invoices.edit', invoice.id)}>
                    <Button icon={<EditOutlined />}>Edit</Button>
                  </Link>
                  <Link href={route('invoices.print', invoice.id)}>
                    <Button icon={<PrinterOutlined />}>Print</Button>
                  </Link>
                  {invoice.status !== 'paid' && (
                    <Link href={route('payments.create', { invoice_id: invoice.id })}>
                      <Button type="primary" icon={<DollarOutlined />}>Record Payment</Button>
                    </Link>
                  )}
                </Space>
              </div>
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <Title level={3}>Invoice #{invoice.invoice_number}</Title>
                <Tag color={statusColors[invoice.status]}>
                  {invoice.status.replace('_', ' ').toUpperCase()}
                </Tag>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold mb-1">
                  {formatCurrency(total)}
                </div>
                <div>
                  Balance Due: <span className="font-bold">{formatCurrency(balanceDue)}</span>
                </div>
              </div>
            </div>

            <Divider />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <Descriptions title="customer Information" bordered column={1} size="small">
                  <Descriptions.Item label="customer">{invoice.customer.company_name}</Descriptions.Item>
                  <Descriptions.Item label="Contact">{invoice.customer.contact_name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{invoice.customer.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{invoice.customer.phone}</Descriptions.Item>
                  <Descriptions.Item label="Address">{invoice.customer.address}</Descriptions.Item>
                </Descriptions>
              </div>
              <div>
                <Descriptions title="Invoice Information" bordered column={1} size="small">
                  <Descriptions.Item label="Invoice Number">{invoice.invoice_number}</Descriptions.Item>
                  <Descriptions.Item label="Invoice Date">{formatDate(invoice.invoice_date)}</Descriptions.Item>
                  <Descriptions.Item label="Due Date">{formatDate(invoice.due_date)}</Descriptions.Item>
                  {invoice.rental_id && (
                    <Descriptions.Item label="Rental">
                      <Link href={route('rentals.show', invoice.rental_id)}>
                        View Rental
                      </Link>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </div>
            </div>

            <Divider orientation="left">Invoice Items</Divider>

            <Table
              columns={columns}
              dataSource={invoice.invoiceItems}
              rowKey="id"
              pagination={false}
              bordered
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5} className="text-right font-bold">
                      Subtotal:
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} className="text-right">
                      {formatCurrency(subtotal)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5} className="text-right font-bold">
                      Tax Total:
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} className="text-right">
                      {formatCurrency(taxTotal)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={5} className="text-right font-bold">
                      Total:
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} className="text-right font-bold">
                      {formatCurrency(total)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />

            {invoice.notes && (
                <Divider orientation="left">Notes</Divider>
                <div className="mb-6 p-4 bg-gray-50 rounded">
                  {invoice.notes}
                </div>
              </>
            )}

            {invoice.payments && invoice.payments.length > 0 && (
                <Divider orientation="left">Payments</Divider>
                <Table
                  columns={paymentColumns}
                  dataSource={invoice.payments}
                  rowKey="id"
                  pagination={false}
                  bordered
                  summary={() => (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold">
                          Total Paid:
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} className="text-right">
                          {formatCurrency(paymentsTotal)}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={3} className="text-right font-bold">
                          Balance Due:
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1} className="text-right font-bold">
                          {formatCurrency(balanceDue)}
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  )}
                />
              </>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
} 
