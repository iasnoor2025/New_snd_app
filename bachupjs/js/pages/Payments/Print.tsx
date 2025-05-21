import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Payment, customer, Invoice } from '@/types/models';
import { Typography, Divider } from 'antd';
import { formatCurrency, formatDate } from '@/utils/format';

const { Title, Text } = Typography;

interface Props extends PageProps {
  payment: Payment & {
    customer: customer;
    invoice: Invoice;
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

export default function Print({ payment, company }: Props) {
  useEffect(() => {
    // Automatically print when component loads
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  return (
      <Head title={`Payment Receipt #${payment.payment_number}`} />

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
            <Title level={2} className="m-0">PAYMENT RECEIPT</Title>
            <Title level={4} className="m-0 mt-2">#{payment.payment_number}</Title>
            <Text>Date: {formatDate(payment.payment_date)}</Text><br />
            <Text className="font-bold">
              Method: {payment.payment_method.replace('_', ' ').toUpperCase()}
            </Text>
          </div>
        </div>

        {/* customer Information */}
        <div className="mb-8">
          <Title level={5} className="mb-2">Received From:</Title>
          <Text className="font-bold">{payment.customer.company_name}</Text><br />
          <Text>Attn: {payment.customer.contact_person}</Text><br />
          <Text>{payment.customer.address}</Text><br />
          <Text>Phone: {payment.customer.phone}</Text><br />
          <Text>Email: {payment.customer.email}</Text>
        </div>

        {/* Payment Details */}
        <div className="mb-8">
          <Title level={5} className="mb-2">Payment Details:</Title>
          <div className="border p-4 rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="font-bold">Payment Number:</Text><br />
                <Text>{payment.payment_number}</Text>
              </div>
              <div>
                <Text className="font-bold">Payment Date:</Text><br />
                <Text>{formatDate(payment.payment_date)}</Text>
              </div>
              <div>
                <Text className="font-bold">Payment Method:</Text><br />
                <Text>{payment.payment_method.replace('_', ' ').toUpperCase()}</Text>
              </div>
              <div>
                <Text className="font-bold">Reference Number:</Text><br />
                <Text>{payment.reference_number || 'N/A'}</Text>
              </div>
              <div>
                <Text className="font-bold">Invoice Number:</Text><br />
                <Text>{payment.invoice.invoice_number}</Text>
              </div>
              <div>
                <Text className="font-bold">Invoice Date:</Text><br />
                <Text>{formatDate(payment.invoice.issue_date)}</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="mb-8">
          <div className="border-2 border-gray-800 p-6 rounded text-center">
            <Text className="block text-lg">Amount Paid:</Text>
            <Text className="block text-3xl font-bold mt-2">{formatCurrency(payment.amount)}</Text>
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="mb-8">
          <Title level={5} className="mb-2">Invoice Summary:</Title>
          <div className="border p-4 rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text className="font-bold">Invoice Total:</Text><br />
                <Text>{formatCurrency(payment.invoice.total_amount)}</Text>
              </div>
              <div>
                <Text className="font-bold">Amount Paid (Including This Payment):</Text><br />
                <Text>{formatCurrency(payment.invoice.paid_amount)}</Text>
              </div>
              <div>
                <Text className="font-bold">Balance Due:</Text><br />
                <Text>{formatCurrency(payment.invoice.total_amount - payment.invoice.paid_amount)}</Text>
              </div>
              <div>
                <Text className="font-bold">Invoice Status:</Text><br />
                <Text>{payment.invoice.status.replace('_', ' ').toUpperCase()}</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {payment.notes && (
          <div className="mb-8">
            <Title level={5} className="mb-2">Notes:</Title>
            <div className="border p-4 rounded">
              <Text>{payment.notes}</Text>
            </div>
          </div>
        )}

        {/* Signature */}
        <div className="mt-12 grid grid-cols-2 gap-8">
          <div>
            <div className="border-t border-gray-400 pt-2 mt-12">
              <Text className="block">Received By</Text>
            </div>
          </div>
          <div>
            <div className="border-t border-gray-400 pt-2 mt-12">
              <Text className="block">customer Signature</Text>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Divider />
          <Text>Thank you for your business!</Text><br />
          <Text>{company.website}</Text>
        </div>
      </div>

      {/* Print Styles */}
      <style>
        {`
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
        `}
      </style>
    </>
  );
} 