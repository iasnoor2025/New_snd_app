import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { customer, Rental, RentalItem, Equipment } from '@/types/models';
import { format, addDays } from 'date-fns';
import { formatCurrency } from '@/utils/format';
import { useToast } from '@/components/ui/use-toast';

// React Hook Form
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import AdminLayout from '@/layouts/AdminLayout';
import { CalendarIcon, Trash2, Plus, ArrowLeft } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface Props extends PageProps {
  customers: customer[];
  rentals?: Rental[];
  defaultInvoiceNumber: string;
  defaultIssueDate: string;
  defaultDueDate: string;
}

// Create a form schema for validation
const invoiceFormSchema = z.object({
  customer_id: z.string().min(1, "Customer is required"),
  rental_id: z.string().optional(),
  invoice_number: z.string().min(1, "Invoice number is required"),
  issue_date: z.date({
    required_error: "Issue date is required",
  }),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  status: z.string().min(1, "Status is required"),
  notes: z.string().optional(),
})

// Invoice item type
interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
}

export default function Create({ customers, rentals, defaultInvoiceNumber, defaultIssueDate, defaultDueDate }: Props) {
  const { toast } = useToast();
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: 1, description: '', quantity: 1, unit_price: 0, tax_rate: 0 }
  ]);
  const [nextItemId, setNextItemId] = useState(2);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [customerRentals, setCustomerRentals] = useState<Rental[]>([]);

  // Initialize form with React Hook Form
  const form = useForm<z.infer<typeof invoiceFormSchema>>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoice_number: defaultInvoiceNumber || `INV-${String(Date.now()).slice(-6)}`,
      issue_date: new Date(),
      due_date: addDays(new Date(), 30),
      status: "draft",
      notes: "",
    },
  })

  // When customer changes, filter available rentals
  useEffect(() => {
    if (selectedCustomerId && rentals) {
      const filteredRentals = rentals.filter(
        rental => rental.customer_id.toString() === selectedCustomerId;
      );
      setCustomerRentals(filteredRentals);
    } else {
      setCustomerRentals([]);
    }
  }, [selectedCustomerId, rentals]);

  // Handle customer change
  const handleCustomerChange = (value: string) => {
    setSelectedCustomerId(value);
    form.setValue("customer_id", value);
    form.setValue("rental_id", undefined);
  };

  // Handle rental selection
  const handleRentalChange = (value: string) => {
    form.setValue("rental_id", value);

    // Find the selected rental
    const selectedRental = rentals?.find(rental => rental.id.toString() === value);

    if (selectedRental?.rentalItems) {
      // Create invoice items from rental items
      const items = selectedRental.rentalItems.map((item, index) => ({
        id: index + 1,
        description: item.equipment
          ? `${item.equipment.name} - ${item.rate_type} rate`
          : `Item - ${item.rate_type} rate`,
        quantity: item.quantity || 1,
        unit_price: item.rate || 0,
        tax_rate: 0
      }));

      setInvoiceItems(items);
      setNextItemId(items.length + 1);
    }
  };

  // Handle adding a new invoice item
  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { id: nextItemId, description: '', quantity: 1, unit_price: 0, tax_rate: 0 }
    ]);
    setNextItemId(nextItemId + 1);
  };

  // Handle removing an invoice item
  const handleRemoveItem = (id: number) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    } else {
      toast({
        title: "Cannot remove item",
        description: "At least one invoice item is required.",
        variant: "destructive"
      })
    }
  };

  // Handle invoice item field changes
  const handleItemChange = (id: number, field: keyof InvoiceItem, value: any) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Calculate totals
  const calculateItemTotal = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unit_price;
    const taxAmount = subtotal * (item.tax_rate / 100);
    return subtotal + taxAmount;
  };

  const calculateSubtotal = () => {
    return invoiceItems.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
  };

  const calculateTaxTotal = () => {
    return invoiceItems.reduce((total, item) => {
      const subtotal = item.quantity * item.unit_price;
      return total + (subtotal * (item.tax_rate / 100));
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxTotal();
  };

  // Handle form submission
  const onSubmit = (data: z.infer<typeof invoiceFormSchema>) => {
    if (invoiceItems.some(item => !item.description)) {
      toast({
        title: "Validation Error",
        description: "All invoice items must have a description.",
        variant: "destructive"
      })
      return;
    }

    // Prepare data for submission
    const formData = {
      ...data,
      customer_id: parseInt(data.customer_id),
      rental_id: data.rental_id ? parseInt(data.rental_id) : null,
      issue_date: format(data.issue_date, 'yyyy-MM-dd'),
      due_date: format(data.due_date, 'yyyy-MM-dd'),
      subtotal: calculateSubtotal(),
      tax_amount: calculateTaxTotal(),
      total_amount: calculateTotal(),
      balance: calculateTotal(),
      paid_amount: 0,
      items: invoiceItems.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        tax_rate: item.tax_rate || 0,
        amount: calculateItemTotal(item)
      }))
    };

    router.post(route('invoices.store'), formData, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Invoice created successfully"
        })
      },
      onError: (errors) => {
        console.error(errors);
        toast({
          title: "Error",
          description: "Failed to create invoice. Please check the form for errors.",
          variant: "destructive"
        })
      }
    })
  };

  return (
    <AdminLayout title="Create Invoice" breadcrumbs={[
      { title: 'Invoices', href: '/invoices' },
      { title: 'Create Invoice', href: '/invoices/create' },
    ]}>
      <Head title="Create Invoice" />

      <div className="container py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
          <Link href={route('invoices.index')}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Invoices
            </Button>
          </Link>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Invoice details card */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                  <CardDescription>Enter the basic information for this invoice</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Invoice Number */}
                  <FormField
                    control={form.control}
                    name="invoice_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. INV-000123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">
                              <div className="flex items-center">
                                <Badge variant="outline" className="mr-2">Draft</Badge>
                                <span>Draft</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="sent">
                              <div className="flex items-center">
                                <Badge variant="secondary" className="mr-2">Sent</Badge>
                                <span>Sent</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="paid">
                              <div className="flex items-center">
                                <Badge variant="default" className="bg-green-600 mr-2">Paid</Badge>
                                <span>Paid</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="overdue">
                              <div className="flex items-center">
                                <Badge variant="destructive" className="mr-2">Overdue</Badge>
                                <span>Overdue</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Issue Date */}
                  <FormField
                    control={form.control}
                    name="issue_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Issue Date</FormLabel>
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

                  {/* Due Date */}
                  <FormField
                    control={form.control}
                    name="due_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
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
                </CardContent>
              </Card>

              {/* Customer details card */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer & Rental</CardTitle>
                  <CardDescription>Select the customer and optional related rental</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Customer Selection */}
                  <FormField
                    control={form.control}
                    name="customer_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer</FormLabel>
                        <Select
                          onValueChange={(value) => handleCustomerChange(value)}
                          defaultValue={field.value}
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a customer" />
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

                  {/* Related Rental */}
                  <FormField
                    control={form.control}
                    name="rental_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related Rental (Optional)</FormLabel>
                        <Select
                          onValueChange={handleRentalChange}
                          value={field.value}
                          disabled={!selectedCustomerId || customerRentals.length === 0}
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={
                                !selectedCustomerId
                                  ? "Select a customer first"
                                  : customerRentals.length === 0
                                    ? "No active rentals found"
                                    : "Select a rental"
                              } />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customerRentals.map((rental) => (
                              <SelectItem key={rental.id} value={rental.id.toString()}>
                                {rental.rental_number} - {format(new Date(rental.start_date), "MMM d, yyyy")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Notes */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes or payment instructions..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Invoice Items */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Invoice Items</CardTitle>
                  <CardDescription>Add the items to be invoiced</CardDescription>
                </div>
                <Button type="button" onClick={handleAddItem} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Description</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Unit Price</TableHead>
                        <TableHead className="text-center">Tax Rate (%)</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoiceItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input
                              value={item.description}
                              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                              placeholder="Item description"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              min={1}
                              className="max-w-[80px] mx-auto text-center"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              value={item.unit_price}
                              onChange={(e) => handleItemChange(item.id, 'unit_price', parseFloat(e.target.value) || 0)}
                              min={0}
                              step={0.01}
                              className="max-w-[100px] mx-auto text-center"
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Input
                              type="number"
                              value={item.tax_rate}
                              onChange={(e) => handleItemChange(item.id, 'tax_rate', parseFloat(e.target.value) || 0)}
                              min={0}
                              max={100}
                              className="max-w-[80px] mx-auto text-center"
                            />
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(calculateItemTotal(item))}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={invoiceItems.length === 1}
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-medium">Subtotal</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(calculateSubtotal())}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-medium">Tax</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(calculateTaxTotal())}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">{formatCurrency(calculateTotal())}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={() => router.get(route('invoices.index'))}>
                  Cancel
                </Button>
                <Button type="submit">Create Invoice</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}




