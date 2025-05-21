import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Customer, Invoice } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format } from 'date-fns';
import { formatCurrency, formatDate } from '@/utils/format';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils';

interface Props extends PageProps {
  customers: Customer[];
  invoices: {
    id: number;
    invoice_number: string;
    due_date: string;
    total_amount: number;
    paid_amount: number;
    balance_due: number;
  }[];
  selectedCustomer?: Customer;
  selectedInvoice?: Invoice;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Payments', href: '/payments' },
  { title: 'Record Payment', href: '/payments/create' }
];

// Form schema
const formSchema = z.object({
  payment_number: z.string().min(1, { message: "Payment number is required" }),
  payment_date: z.date({ required_error: "Payment date is required" }),
  customer_id: z.string().min(1, { message: "Customer is required" }),
  invoice_id: z.string().min(1, { message: "Invoice is required" }),
  amount: z.coerce.number().positive({ message: "Amount must be positive" }),
  payment_method: z.string().min(1, { message: "Payment method is required" }),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
})

export default function Create({ auth, customers, invoices = [], selectedCustomer, selectedInvoice }: Props) {
  const { toast } = useToast();
  const [customerId, setCustomerId] = useState<string | undefined>(selectedCustomer?.id?.toString());
  const [selectedInvoiceData, setSelectedInvoiceData] = useState<any>(null);

  // Set up form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment_number: `PMT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      payment_date: new Date(),
      customer_id: customerId || "",
      invoice_id: selectedInvoice?.id?.toString() || "",
      amount: selectedInvoice ? selectedInvoice.total_amount - selectedInvoice.paid_amount : undefined,
      payment_method: "",
      reference_number: "",
      notes: "",
    },
  })

  // Update invoices when customer changes
  const handleCustomerChange = (value: string) => {
    setCustomerId(value);
    form.setValue("invoice_id", "");
    form.setValue("amount", undefined);
    setSelectedInvoiceData(null);

    // Fetch invoices for the selected customer
    router.get(route('payments.create'), { customer_id: value }, {
      preserveState: true,
      replace: true,
      only: ['invoices'],
    })
  };

  // Update payment amount when invoice changes
  const handleInvoiceChange = (value: string) => {
    const invoice = invoices.find(inv => inv.id.toString() === value);
    if (invoice) {
      setSelectedInvoiceData(invoice);
      form.setValue("amount", invoice.balance_due);
    } else {
      setSelectedInvoiceData(null);
      form.setValue("amount", undefined);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.post(route('payments.store'), {
      ...values,
      payment_date: format(values.payment_date, 'yyyy-MM-dd'),
    }, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Payment recorded successfully"
        })
        router.visit(route('payments.index'));
      },
      onError: (errors) => {
        toast({
          title: "Error",
          description: "Failed to record payment. Please check the form for errors.",
          variant: "destructive"
        })
        console.error(errors);
      }
    })
  };

  return (
    <AdminLayout title="Record Payment" breadcrumbs={breadcrumbs}>
      <Head title="Record Payment" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Record New Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customer_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer</FormLabel>
                          <Select
                            disabled={!!selectedCustomer}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCustomerChange(value);
                            }}
                            value={field.value}
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a customer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers.map(customer => (
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
                            disabled={!customerId || !!selectedInvoice}
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleInvoiceChange(value);
                            }}
                            value={field.value}
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={customerId ? "Select an invoice" : "Select a customer first"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {invoices.map(invoice => (
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
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="payment_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Number</FormLabel>
                          <FormControl>
                            <Input placeholder="PMT-000001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="payment_date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Payment Date</FormLabel>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="payment_method"
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
                      name="reference_number"
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
                  </div>

                  <div className="space-y-4">
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
                              min="0.01"
                              placeholder="0.00"
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {selectedInvoiceData && (
                      <Alert>
                        <AlertDescription>
                          Balance due: {formatCurrency(selectedInvoiceData.balance_due)}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter any additional notes"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedInvoiceData && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Invoice Details</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice Number</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Total Amount</TableHead>
                            <TableHead className="text-right">Amount Paid</TableHead>
                            <TableHead className="text-right">Balance Due</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{selectedInvoiceData.invoice_number}</TableCell>
                            <TableCell>{formatDate(selectedInvoiceData.due_date)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(selectedInvoiceData.total_amount)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(selectedInvoiceData.paid_amount)}</TableCell>
                            <TableCell className="text-right">{formatCurrency(selectedInvoiceData.balance_due)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Link href={route('payments.index')}>
                    <Button variant="outline" type="button">Cancel</Button>
                  </Link>
                  <Button type="submit">Record Payment</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}


