import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CustomerFormData, paymentTermsOptions } from '@/schemas/customer.schema';
import FormField from '@/components/shared/FormField';

interface CustomerFormProps {
  form: UseFormReturn<CustomerFormData>
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  isSubmitting?: boolean;
  onSubmit?: (data: CustomerFormData) => void;
}

/**
 * A form component for creating and editing customers
 * Uses react-hook-form for form management and validation
 */
const CustomerForm: React.FC<CustomerFormProps> = ({
  form,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onCancel,
  isSubmitting = false,
  onSubmit,
}) => {
  const { formState } = form;

  const handleSubmit = (data: CustomerFormData) => {
    // Convert payment_terms to a number if it's a string
    const formattedData = {
      ...data,
      payment_terms: typeof data.payment_terms === 'string'
        ? parseInt(data.payment_terms, 10)
        : data.payment_terms,
      // Ensure credit_limit is a number
      credit_limit: data.credit_limit ? Number(data.credit_limit) : null,
    };

    if (onSubmit) {
      onSubmit(formattedData);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Company Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          form={form}
          name="company_name"
          label="Company Name"
          placeholder="Enter company name"
          required
        />

        <FormField
          form={form}
          name="contact_person"
          label="Contact Person"
          placeholder="Enter contact person name"
        />

        <FormField
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter email address"
        />

        <FormField
          form={form}
          name="phone"
          label="Phone"
          placeholder="Enter phone number"
        />

        {/* Address Fields */}
        <FormField
          form={form}
          name="address"
          label="Address"
          placeholder="Enter address"
          multiline
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            form={form}
            name="city"
            label="City"
            placeholder="Enter city"
          />

          <FormField
            form={form}
            name="state"
            label="State/Province"
            placeholder="Enter state"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            form={form}
            name="postal_code"
            label="Postal Code"
            placeholder="Enter postal code"
          />

          <FormField
            form={form}
            name="country"
            label="Country"
            placeholder="Enter country"
          />
        </div>

        {/* Financial Information */}
        <FormField
          form={form}
          name="tax_number"
          label="Tax Number"
          placeholder="Enter tax ID or VAT number"
        />

        <FormField
          form={form}
          name="credit_limit"
          label="Credit Limit"
          type="number"
          placeholder="Enter credit limit"
        />

        <FormField
          form={form}
          name="payment_terms"
          label="Payment Terms"
          type="select"
          options={paymentTermsOptions}
        />

        <FormField
          form={form}
          name="is_active"
          label="Active Customer"
          type="checkbox"
          description="Mark if this is an active customer"
        />
      </div>

      {/* Additional Information */}
      <FormField
        form={form}
        name="notes"
        label="Notes"
        placeholder="Enter any additional information about this customer"
        multiline
        rows={4}
      />

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 mt-6">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            {cancelText}
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting || !formState.isDirty}
          {isSubmitting ? 'Saving...' : submitText}
        </Button>
      </div>
    </form>
  );
};

export default CustomerForm;
