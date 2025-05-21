import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Payment } from '@/types/models';
import AppLayout from '@/layouts/app-layout';
import { Button, Card, Col, Descriptions, Popconfirm, Row, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PrinterOutlined, RollbackOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/utils/format';

interface Props extends PageProps {
  payment: Payment & {
    customer: {
      id: number;
      company_name: string;
      contact_name: string;
      email: string;
      phone: string;
      address: string;
    };
    invoice: {
      id: number;
      invoice_number: string;
      total_amount: number;
      paid_amount: number;
      status: string;
    };
  };
}

export default function Show({ auth, payment }: Props) {
  const handleDelete = () => {
    router.delete(route('payments.destroy', payment.id), {
      onSuccess: () => {
        // Success message is handled by the backend
      },
    })
  };

  return (
    <AppLayout breadcrumbs={[
      { title: 'Payments', href: route('payments.index') },
      { title: 'Payment Details', href: route('payments.show', payment.id) }
    ]}>
      <Head title="Payment Details" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Payment #{payment.payment_number}</h2>
            <div>
              <Space>
                <Link href={route('payments.edit', payment.id)}>
                  <Button type="primary" icon={<EditOutlined />}>Edit</Button>
                </Link>
                <Link href={route('payments.print', payment.id)} target="_blank">
                  <Button icon={<PrinterOutlined />}>Print Receipt</Button>
                </Link>
                <Popconfirm
                  title="Delete this payment?"
                  description="Are you sure you want to delete this payment? This will also update the invoice balance."
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                  <Button danger icon={<DeleteOutlined />}>Delete</Button>
                </Popconfirm>
              </Space>
            </div>
          </div>

          <Row gutter={16}>
            <Col span={24}>
              <Card title="Payment Information" className="mb-6">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Descriptions column={1} bordered size="small">
                      <Descriptions.Item label="Payment Number">{payment.payment_number}</Descriptions.Item>
                      <Descriptions.Item label="Payment Date">{formatDate(payment.payment_date)}</Descriptions.Item>
                      <Descriptions.Item label="Amount">{formatCurrency(payment.amount)}</Descriptions.Item>
                      <Descriptions.Item label="Payment Method">{payment.payment_method}</Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col xs={24} md={12}>
                    <Descriptions column={1} bordered size="small">
                      <Descriptions.Item label="Reference Number">{payment.reference_number || '-'}</Descriptions.Item>
                      <Descriptions.Item label="Invoice">
                        <Link href={route('invoices.show', payment.invoice.id)}>
                          {payment.invoice.invoice_number}
                        </Link>
                      </Descriptions.Item>
                      <Descriptions.Item label="Invoice Status">{payment.invoice.status}</Descriptions.Item>
                      <Descriptions.Item label="Invoice Balance">
                        {formatCurrency(payment.invoice.total_amount - payment.invoice.paid_amount)}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card title="customer Information" className="mb-6">
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="Company Name">
                    <Link href={route('customers.show', { customer: payment.customer.id })}>
                      {payment.customer.company_name}
                    </Link>
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact Person">{payment.customer.contact_name}</Descriptions.Item>
                  <Descriptions.Item label="Email">{payment.customer.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{payment.customer.phone}</Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>

          {payment.notes && (
            <Card title="Notes" className="mt-6">
              <p>{payment.notes}</p>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
}