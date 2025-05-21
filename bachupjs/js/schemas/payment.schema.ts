import { z } from 'zod';
import { commonSchemas } from './common.schema';

export const paymentMethods = [
  { id: 'cash', name: 'Cash' },
  { id: 'bank_transfer', name: 'Bank Transfer' },
  { id: 'credit_card', name: 'Credit Card' },
  { id: 'check', name: 'Check' },
  { id: 'other', name: 'Other' },
] as const;

export const paymentMethodIds = paymentMethods.map(method => method.id);

/**
 * Schema for payment validation
 */
export const paymentSchema = z.object({
  rental_id: z.number().min(1, "Rental is required"),
  amount: z.coerce.number()
    .min(0.01, "Amount must be greater than 0")
    .refine((amount) => {
      const rental = rentals.find(r => r.id === rental_id);
      if (!rental) return true;
      const remainingBalance = rental.total_amount - rental.paid_amount;
      return amount <= remainingBalance;
    }, {
      message: "Payment amount cannot exceed remaining balance"
    }),
  payment_date: commonSchemas.date,
  payment_method: z.enum(paymentMethodIds, {
    errorMap: () => ({ message: "Payment method is required" }),
  }),
  reference_number: z.string().max(50, "Reference number must be less than 50 characters").optional(),
  notes: commonSchemas.notes,
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).default('completed'),
})

export type PaymentFormData = z.infer<typeof paymentSchema>



