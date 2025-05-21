import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Invoice, InvoiceItem, customer, Payment } from '@/types/models';
import { Table, Typography, Divider } from 'antd';
import { formatCurrency, formatDate } from '@/utils/format';

const { Title, Text } = Typography;

interface Props extends PageProps {
  invoice: Invoice & {
    customer: customer;
    invoiceItems: InvoiceItem[];
    payments: Payment[];
  };
  company: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
    vat_number: string;
  };
}

export default function Print({ invoice, company }: Props) {
  useEffect(() => {
    // Automatically print when component loads
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

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

  return (
      <Head title={`Invoice #${invoice.invoice_number}`} />

      <div className="print-container p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            {company.logo && (
              <img 
                src={company.logo} 
                alt={company.name} 
                className="h-16 mb-2" 
              />
            )}
            <Title level={4} className="m-0">{company.name}</Title>
            <Text>{company.address}</Text><br />
            <Text>Phone: {company.phone}</Text><br />
            <Text>Email: {company.email}</Text><br />
            {company.vat_number && <Text>VAT: {company.vat_number}</Text>}
          </div>
          <div className="text-right">
            <Title level={2} className="m-0">INVOICE</Title>
            <Title level={4} className="m-0 mt-2">#{invoice.invoice_number}</Title>
            <Text>Date: {formatDate(invoice.invoice_date)}</Text><br />
            <Text>Due Date: {formatDate(invoice.due_date)}</Text><br />
            <Text className="font-bold">
              Status: {invoice.status.replace('_', ' ').toUpperCase()}
            </Text>
          </div>
        </div>

        {/* customer Information */}
        <div className="mb-8">
          <Title level={5} className="mb-2">Bill To:</Title>
          <Text className="font-bold">{invoice.customer.company_name}</Text><br />
          <Text>Attn: {invoice.customer.contact_person}</Text><br />
          <Text>{invoice.customer.address}</Text><br />
          <Text>Phone: {invoice.customer.phone}</Text><br />
          <Text>Email: {invoice.customer.email}</Text>
        </div>

        {/* Invoice Items */}
        <Table
          columns={columns}
          dataSource={invoice.invoiceItems}
          rowKey="id"
          pagination={false}
          bordered
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                  Subtotal:
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} className="text-right">
                  {formatCurrency(subtotal)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                  Tax Total:
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} className="text-right">
                  {formatCurrency(taxTotal)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                  Total:
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} className="text-right font-bold">
                  {formatCurrency(total)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              {paymentsTotal > 0 && (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                      Payments:
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} className="text-right">
                      {formatCurrency(paymentsTotal)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={4} className="text-right font-bold">
                      Balance Due:
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} className="text-right font-bold">
                      {formatCurrency(balanceDue)}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              )}
            </Table.Summary>
          )}
        />

        {/* Notes */}
        {invoice.notes && (
          <div className="mt-8">
            <Divider />
            <Title level={5}>Notes:</Title>
            <Text>{invoice.notes}</Text>
          </div>
        )}

        {/* Payment Information */}
        <div className="mt-8">
          <Divider />
          <Title level={5}>Payment Information:</Title>
          <Text>Please make payment to:</Text><br />
          <Text className="font-bold">{company.name}</Text><br />
          <Text>Bank: BANK NAME</Text><br />
          <Text>Account: ACCOUNT NUMBER</Text><br />
          <Text>Reference: INV-{invoice.invoice_number}</Text>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Divider />
          <Text>Thank you for your business!</Text><br />
          <Text>{company.website}</Text>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background-color: white;
            font-size: 12pt;
          }
          
          .ant-layout-header,
          .ant-layout-sider,
          .ant-layout-footer {
            display: none !important;
          }
          
          .ant-layout-content {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .print-container {
            padding: 0;
            max-width: 100%;
          }
          
          button {
            display: none !important;
          }
          
          a {
            text-decoration: none !important;
            color: black !important;
          }
        }
      `}</style>
    </>
  );
} 
