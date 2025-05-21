import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const paymentFormSchema = z.object({
    amount: z.string().min(1, 'Amount is required'),
    payment_method: z.string().min(1, 'Payment method is required'),
    reference_number: z.string().optional(),
    notes: z.string().optional(),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PaymentFormProps {
    rentalId: number;
    onSuccess?: () => void;
}

export function PaymentForm({ rentalId, onSuccess }: PaymentFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            amount: '',
            payment_method: '',
            reference_number: '',
            notes: '',
        },
    })

    const onSubmit = async (data: PaymentFormValues) => {
        try {
            setIsSubmitting(true);
            const response = await fetch(`/api/rentals/${rentalId}/payments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }

            toast({
                title: "Payment Processed",
                description: "Your payment has been processed successfully",
                variant: "success",
            })

            form.reset();
            onSuccess?.();
        } catch (error) {
            toast({
                title: "Payment Failed",
                description: error instanceof Error ? error.message : 'Failed to process payment',
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Process Payment</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter amount"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="payment_method"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Payment Method</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select payment method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="check">Check</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="reference_number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reference Number (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter reference number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter any additional notes"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                            {isSubmitting ? 'Processing...' : 'Process Payment'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
