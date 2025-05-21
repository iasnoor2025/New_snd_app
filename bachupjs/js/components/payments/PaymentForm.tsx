import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { formatCurrency } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface customer {
  id: number;
  company_name: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
  due_date: string;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
}

interface Rental {
  id: number;
  total_amount: number;
  remaining_balance?: number;
}

interface PageProps {
  props: {
    invoices?: Invoice[];
  }
}

interface PaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  type?: 'standalone' | 'rental';
  rental?: Rental;
  customers?: customer[];
  invoices?: Invoice[];
}

// Define the form schema
const formSchema = z.object({
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
  payment_date: z.date({ required_error: "Payment date is required" }),
  payment_method: z.string().min(1, "Payment method is required"),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
})

export default function PaymentForm({
  isOpen,
  onClose,
  onSubmit,
  type = 'standalone',
  rental,
  customers = [],
  invoices = []
}: PaymentFormProps) {
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>();
  const [clientInvoices, setClientInvoices] = useState<Invoice[]>(invoices);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: rental?.remaining_balance || 0,
      date: new Date(),
      status: 'completed',
      method: '',
      reference: '',
      notes: '',
    },
  })

  // Handle customer change - fetch invoices for selected customer
  const handleClientChange = (value: string) => {
    const clientId = parseInt(value);
    setSelectedClientId(clientId);

    if (type === 'standalone') {
      // Fetch invoices for selected customer
      router.get(route('payments.create'), { client_id: clientId }, {
        preserveState: true,
        replace: true,
        only: ['invoices'],
        onSuccess: (page) => {
          if (page.props.invoices && Array.isArray(page.props.invoices)) {
            // Explicit cast to Invoice[]
            const invoicesData = page.props.invoices as unknown as Invoice[];
            setClientInvoices(invoicesData);
          }
        }
      })
    }
  };

  // Handle form submission
  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      onSubmit(data);
      onClose();
    } catch (error) {
      toast.error("Failed to submit payment");

    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
          <DialogDescription>
            {type === 'rental'
              ? `Record a payment for rental #${rental?.id}`
              : 'Record a new payment'
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            {type === 'standalone' && (
                <FormField
                  control={form.control}
                  name="client_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>customer</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(parseInt(value));
                          handleClientChange(value);
                        }}
                        value={field.value?.toString()}
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id.toString()}>
                              {customer.company_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="invoice_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(parseInt(value));
                          // Update amount based on invoice balance
                          const invoice = clientInvoices.find(i => i.id === parseInt(value));
                          if (invoice) {
                            form.setValue('amount', invoice.balance_due);
                          }
                        }}
                        value={field.value?.toString()}
                        disabled={!selectedClientId}
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={selectedClientId ? "Select invoice" : "Select a customer first"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clientInvoices.map((invoice) => (
                            <SelectItem key={invoice.id} value={invoice.id.toString()}>
                              {invoice.invoice_number} ({formatCurrency(invoice.balance_due)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount"
                        type="number"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Check number, transaction ID, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about this payment"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Payment</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


