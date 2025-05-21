import React, { useEffect } from 'react';
import { Quotation, QuotationItem } from '@/types/models';
import { formatCurrency, formatDate } from '@/utils';
import { Head } from '@inertiajs/react';

interface QuotationPrintProps {
  quotation: Quotation;
  quotationItems: {
    data: QuotationItem[];
    total: number;
  };
  company: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    email: string;
    website: string;
    tax_id: string;
  };
}

const QuotationPrint: React.FC<QuotationPrintProps> = ({ quotation, quotationItems, company }) => {
  // Trigger print dialog when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatRateWithType = (item: QuotationItem) => {
    const formattedRate = formatCurrency(item.rate);

    switch (item.rate_type) {
      case 'hour':
        return `${formattedRate}/hr`;
      case 'day':
        return `${formattedRate}/day`;
      case 'week':
        return `${formattedRate}/week`;
      case 'month':
        return `${formattedRate}/month`;
      case 'flat':
      default:
        return formattedRate;
    }
  };

  const getStatusClass = () => {
    switch (quotation.status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Safe access to customer data
  const customer = (quotation as any).customer;

  return (
      <Head title={`Quotation #${quotation.quotation_number} - ${quotation.status}`} />
      <div className="bg-white p-6 max-w-4xl mx-auto my-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            {company.address && <p className="text-gray-600">{company.address}</p>}
            {(company.city || company.state || company.zip) && (
              <p className="text-gray-600">
                {company.city}{company.city && (company.state || company.zip) ? ', ' : ''}
                {company.state}{company.state && company.zip ? ' ' : ''}
                {company.zip}
              </p>
            )}
            {company.phone && <p className="text-gray-600">Phone: {company.phone}</p>}
            {company.email && <p className="text-gray-600">Email: {company.email}</p>}
            {company.website && <p className="text-gray-600">Website: {company.website}</p>}
            {company.tax_id && <p className="text-gray-600">Tax ID: {company.tax_id}</p>}
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-900">QUOTATION</h2>
            <p className="text-gray-600">#{quotation.quotation_number}</p>
            <div className="mt-2">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusClass()}`}>
                {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* customer & Dates */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Customer</h3>
            {customer ? (
                <p className="font-bold">{customer.company_name}</p>
                {customer.contact_person && <p>{customer.contact_person}</p>}
                {customer.address && <p>{customer.address}</p>}
                {customer.city && (
                  <p>
                    {customer.city}
                    {customer.state && `, ${customer.state}`}
                    {customer.zip_code && ` ${customer.zip_code}`}
                  </p>
                )}
                {customer.country && <p>{customer.country}</p>}
                {customer.email && <p>Email: {customer.email}</p>}
                {customer.phone && <p>Phone: {customer.phone}</p>}
              </>
            ) : (
              <p className="text-gray-500 italic">Customer information not available</p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Issue Date</h3>
                <p>{formatDate(quotation.issue_date)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Valid Until</h3>
                <p>{formatDate(quotation.valid_until)}</p>
              </div>
            </div>

            {(quotation as any).rental && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Associated Rental</h3>
                <p>#{(quotation as any).rental.rental_number}</p>
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-8">
          <h3 className="font-semibold text-gray-700 mb-2">Quotation Items</h3>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Qty</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Rate</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quotationItems.data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="font-medium text-gray-900">{item.description}</div>
                    {item.equipment && (
                      <div className="text-sm text-gray-600">Equipment: {item.equipment.name}</div>
                    )}
                    {item.operator && (
                      <div className="text-sm text-gray-600">Operator: {item.operator.name}</div>
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatRateWithType(item)}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.total_amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-8 flex justify-end">
          <div className="w-64">
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between py-1">
                <span className="font-medium">Subtotal:</span>
                <span>{formatCurrency(quotation.subtotal)}</span>
              </div>

              {quotation.discount_percentage > 0 && (
                <div className="flex justify-between py-1">
                  <span className="font-medium">Discount ({quotation.discount_percentage}%):</span>
                  <span>-{formatCurrency(quotation.discount_amount)}</span>
                </div>
              )}

              <div className="flex justify-between py-1">
                <span className="font-medium">Tax ({quotation.tax_percentage}%):</span>
                <span>{formatCurrency(quotation.tax_amount)}</span>
              </div>

              <div className="flex justify-between py-1 border-t border-gray-300 mt-2 pt-2">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{formatCurrency(quotation.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Terms */}
        {(quotation.notes || quotation.terms_and_conditions) && (
          <div className="mt-8 grid grid-cols-1 gap-8">
            {quotation.notes && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
                <p className="text-gray-600 whitespace-pre-line">{quotation.notes}</p>
              </div>
            )}

            {quotation.terms_and_conditions && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Terms and Conditions</h3>
                <p className="text-gray-600 whitespace-pre-line">{quotation.terms_and_conditions}</p>
              </div>
            )}
          </div>
        )}

        {/* Approval/Rejection Information */}
        {quotation.approved_at && (
          <div className="mt-8 border-t border-gray-300 pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Approval Information</h3>
            <div className="space-y-1">
              <h4 className="font-medium text-sm text-gray-700">Approved</h4>
              <p>{formatDate(quotation.approved_at)}</p>
              {(quotation as any).approved_by && (
                <p className="text-sm text-gray-600">By: {(quotation as any).approved_by}</p>
              )}
            </div>
          </div>
        )}

        {(quotation as any).rejected_at && (
          <div className="mt-8 border-t border-gray-300 pt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Rejection Information</h3>
            <div className="space-y-1">
              <h4 className="font-medium text-sm text-gray-700">Rejected</h4>
              <p>{formatDate((quotation as any).rejected_at)}</p>
              {(quotation as any).rejected_by && (
                <p className="text-sm text-gray-600">By: {(quotation as any).rejected_by}</p>
              )}
            </div>
          </div>
        )}

        {/* Signature Section */}
        {quotation.status !== 'approved' && quotation.status !== 'rejected' && (
          <div className="mt-16 grid grid-cols-2 gap-8">
            <div>
              <div className="border-t border-gray-400 pt-2">
                <p className="font-medium">customer Signature</p>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-400 pt-2">
                <p className="font-medium">Date</p>
              </div>
            </div>
          </div>
        )}

        {/* Print styles */}
        <style>
          {`
            @media print {
              body {
                background-color: white;
                padding: 0;
                margin: 0;
              }

              .my-8 {
                margin-top: 0 !important;
                margin-bottom: 0 !important;
              }
            }
          `}
        </style>
      </div>
    </>
  );
};

export default QuotationPrint;