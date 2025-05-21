import { useState, useEffect } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminLayout from "@/layouts/AdminLayout";
import { customer, Equipment, Operator } from "@/types/models";
import { addDays, format } from "date-fns";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Icons
import {
  CalendarIcon,
  ArrowLeft,
  Home,
  ChevronRight,
  PlusCircle,
  Trash2,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props extends PageProps {
  customers: customer[];
  equipment: Equipment[];
  operators: {
    operators: Operator[];
    drivers: Operator[];
  } | Operator[]; // Support both new and old format
  taxRate: number;
}

// Define interface for quotation items
interface QuotationItem {
  id: string;
  equipment_id: string | null;
  operator_id: string | null;
  description: string;
  quantity: number;
  rate: number;
  rate_type: string;
  total_amount: number;
}

export default function Create({ auth, customers, equipment, operators, taxRate }: Props) {
  // Check if we're using the new operators structure
  const isNewOperatorsFormat = operators && typeof operators === 'object' && 'operators' in operators && 'drivers' in operators;

  // Prepare categorized operators
  const operatorsByCategory = isNewOperatorsFormat
    ? operators as { operators: Operator[], drivers: Operator[] }
    : {
        operators: (operators as Operator[]).filter(op => op.category === 'operator' || !op.category),
        drivers: (operators as Operator[]).filter(op => op.category === 'driver')
      };

  // For backward compatibility
  const allOperators = isNewOperatorsFormat
    ? [...operatorsByCategory.operators, ...operatorsByCategory.drivers];
    : operators as Operator[];

  // Default valid until date (30 days from now)
  const defaultValidUntil = addDays(new Date(), 30);

  // Track previous customer name for replacement
  const [previousCustomerName, setPreviousCustomerName] = useState<string>("Customer");

  // Form for quotation
  const { data, setData, post, processing, errors, reset } = useForm({
    customer_id: "",
    issue_date: format(new Date(), "yyyy-MM-dd"),
    valid_until: format(defaultValidUntil, "yyyy-MM-dd"),
    quotation_items: [] as QuotationItem[],
    subtotal: 0,
    tax_percentage: taxRate || 15,
    tax_amount: 0,
    discount_percentage: 0,
    discount_amount: 0,
    total_amount: 0,
    notes: "",
    terms_and_conditions: "",
    is_separate: false,
  })

  // Effect to update terms and conditions when customer changes
  useEffect(() => {
    if (data.customer_id && data.terms_and_conditions) {
      // Get the selected customer
      const selectedCustomer = customers.find(c => c.id.toString() === data.customer_id);
      if (selectedCustomer) {
        const customerName = selectedCustomer.company_name;

        // First update the specific rental terms lines for consistency
        const lines = data.terms_and_conditions.split('\n');

        // Look for lines that match the patterns we're interested in updating
        const updatedLines = lines.map(line => {
          // Line 2 (fuel provision)
          if (line.match(/^2\.\s+.*\s+to provide Fuel\(diesel\) for the Equipments\./)) {
            return `2. ${customerName} to provide Fuel(diesel) for the Equipments.`;
          }
          // Line 3 (accommodation)
          if (line.match(/^3\.\s+.*\s+shall provide a accommodation, Food and transportation for the Operators\./)) {
            return `3. ${customerName} shall provide a accommodation, Food and transportation for the Operators.`;
          }
          return line;
        })

        // Join the lines back together
        let updatedText = updatedLines.join('\n');

        // First replace the previous customer name with the new one
        if (previousCustomerName !== "Customer" && previousCustomerName !== customerName) {
          // Use regex with word boundaries to avoid partial matches
          const prevCustomerRegex = new RegExp(`\\b${previousCustomerName}\\b`, 'g');
          updatedText = updatedText.replace(prevCustomerRegex, customerName);
        }

        // Then replace any generic "Customer" references
        updatedText = updatedText.replace(/[Cc]ustomer/g, customerName);

        // Update the terms and conditions
        setData("terms_and_conditions", updatedText);

        // Update the previous customer name for future replacements
        setPreviousCustomerName(customerName);
      }
    }
  }, [data.customer_id]);

  // Generate unique ID for quotation items
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Add empty quotation item
  const addQuotationItem = () => {
    const newItem: QuotationItem = {
      id: generateId(),
      equipment_id: null,
      operator_id: null,
      description: "",
      quantity: 1,
      rate: 0,
      rate_type: "day",
      total_amount: 0,
    };

    setData("quotation_items", [...data.quotation_items, newItem]);
  };

  // Remove quotation item
  const removeQuotationItem = (id: string) => {
    setData(
      "quotation_items",
      data.quotation_items.filter((item) => item.id !== id)
    );
  };

  // Update quotation item
  const updateQuotationItem = (id: string, field: keyof QuotationItem, value: any) => {
    // Special handling for operator_id
    if (field === 'operator_id' && value === 'none') {
      value = ""; // Convert 'none' to empty string for storage
    }

    setData((prev) => ({
      ...prev,
      quotation_items: prev.quotation_items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          // Recalculate total amount whenever quantity or rate changes
          if (field === "quantity" || field === "rate") {
            updatedItem.total_amount = updatedItem.quantity * updatedItem.rate;
          }

          return updatedItem;
        }
        return item;
      }),
    }));
  };

  // Update the handleEquipmentChange function to handle 'none' value
  const handleEquipmentChange = (id: string, equipmentId: string) => {
    // Get the selected equipment if not 'none'
    const selectedEquipment = equipmentId === 'none' ? null :
      equipment.find((eq) => eq.id.toString() === equipmentId);

    // Update the item with the new equipment
    updateQuotationItem(id, "equipment_id", equipmentId === 'none' ? "" : equipmentId);

    // If equipment is selected, update with default values, otherwise clear
    if (selectedEquipment) {
      updateQuotationItem(id, "description", selectedEquipment.name);
      updateQuotationItem(id, "rate", selectedEquipment.hourly_rate || 0);
    } else {
      updateQuotationItem(id, "description", "");
      updateQuotationItem(id, "rate", 0);
    }
  };

  // Calculate totals whenever items change
  useEffect(() => {
    const subtotal = data.quotation_items.reduce(
      (sum, item) => sum + Number(item.total_amount),;
      0;
    );

    const taxAmount = (subtotal * Number(data.tax_percentage)) / 100;
    const discountAmount = (subtotal * Number(data.discount_percentage)) / 100;
    const totalAmount = subtotal + taxAmount - discountAmount;

    setData({
      ...data,
      subtotal,
      tax_amount: taxAmount,
      discount_amount: discountAmount,
      total_amount: totalAmount,
    })
  }, [data.quotation_items, data.tax_percentage, data.discount_percentage]);

  // Initialize previousCustomerName when component mounts
  useEffect(() => {
    if (data.customer_id) {
      const selectedCustomer = customers.find(c => c.id.toString() === data.customer_id);
      if (selectedCustomer) {
        setPreviousCustomerName(selectedCustomer.company_name);
      }
    }
  }, []);

  // Add function to toggle separate quotation mode
  const toggleSeparateQuotation = () => {
    setData("is_separate", !data.is_separate);
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate customer selection
    if (!data.customer_id) {
      toast.error("Please select a customer");
      return;
    }

    // Validate quotation items
    if (data.quotation_items.length === 0) {
      toast.error("Please add at least one item to the quotation");
      return;
    }

    // Submit form
    post(route("quotations.store"), {
      onSuccess: () => {
        toast.success("Quotation created successfully");
        reset();
      },
      onError: (errors) => {
        console.error("Submission errors:", errors);
        if (Object.keys(errors).length === 0) {
          toast.error("An unknown error occurred. Please try again.");
        }
      },
    })
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
  };

  return (
    <AdminLayout>
      <Head title="Create Quotation" />

      <div className="container mx-auto py-6 space-y-6">
        {/* Breadcrumbs and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground mb-4 sm:mb-0">
            <Link href={route("dashboard")} className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={route("quotations.index")} className="hover:text-primary transition-colors">
              Quotations
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground">Create</span>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={route("quotations.index")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quotations
              </Link>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quotation Details */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle>Quotation Details</CardTitle>
                <CardDescription>
                  Create a new quotation for your customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="customer_id"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          Customer
                        </label>
                        <Select
                          value={data.customer_id}
                          onValueChange={(value) => {
                            setData("customer_id", value);
                            // Get the selected customer
                            const selectedCustomer = customers.find(c => c.id.toString() === value);
                            const customerName = selectedCustomer ? selectedCustomer.company_name : "Customer";

                            // Format for the rental terms with the new customer name
                            const newRentalTerms = `1. Equipments Works 10 Hours a day for 26 days In a month.\n2. ${customerName} to provide Fuel(diesel) for the Equipments.\n3. ${customerName} shall provide a accommodation, Food and transportation for the Operators.`;

                            // If terms are empty, add the terms
                            if (!data.terms_and_conditions) {
                              setData("terms_and_conditions", newRentalTerms);
                              // Track this as the previous customer name for future replacements
                              setPreviousCustomerName(customerName);
                            } else {
                              // First update the specific rental terms lines for consistency
                              // Split the existing terms into lines
                              const lines = data.terms_and_conditions.split('\n');

                              // Look for lines that match the patterns we're interested in updating
                              const updatedLines = lines.map(line => {
                                // Line 2 (fuel provision)
                                if (line.match(/^2\.\s+.*\s+to provide Fuel\(diesel\) for the Equipments\./)) {
                                  return `2. ${customerName} to provide Fuel(diesel) for the Equipments.`;
                                }
                                // Line 3 (accommodation)
                                if (line.match(/^3\.\s+.*\s+shall provide a accommodation, Food and transportation for the Operators\./)) {
                                  return `3. ${customerName} shall provide a accommodation, Food and transportation for the Operators.`;
                                }
                                return line;
                              })

                              // Join the lines back together
                              let updatedText = updatedLines.join('\n');

                              // Now replace all remaining occurrences of "Customer" with the customer name
                              if (selectedCustomer) {
                                // First replace the previous customer name with the new one
                                if (previousCustomerName !== "Customer" && previousCustomerName !== customerName) {
                                  // Use regex with word boundaries to avoid partial matches
                                  const prevCustomerRegex = new RegExp(`\\b${previousCustomerName}\\b`, 'g');
                                  updatedText = updatedText.replace(prevCustomerRegex, customerName);
                                }

                                // Then replace any generic "Customer" references
                                updatedText = updatedText.replace(/[Cc]ustomer/g, customerName);
                              }

                              // Update the terms and conditions
                              setData("terms_and_conditions", updatedText);

                              // Update the previous customer name for future replacements
                              setPreviousCustomerName(customerName);
                            }
                          }}
                          <SelectTrigger id="customer_id">
                            <SelectValue placeholder="Select a customer" />
                          </SelectTrigger>
                          <SelectContent>
                            {customers.map((customer) => (
                              <SelectItem key={customer.id} value={customer.id.toString()}>
                                {customer.company_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.customer_id && (
                          <p className="text-sm text-red-500">{errors.customer_id}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="issue_date"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          Issue Date
                        </label>
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !data.issue_date && "text-muted-foreground"
                                )}
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.issue_date ? (
                                  format(new Date(data.issue_date), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={data.issue_date ? new Date(data.issue_date) : undefined}
                                onSelect={(date) =>
                                  setData("issue_date", date ? format(date, "yyyy-MM-dd") : "")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {errors.issue_date && (
                          <p className="text-sm text-red-500">{errors.issue_date}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="valid_until"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          Valid Until
                        </label>
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !data.valid_until && "text-muted-foreground"
                                )}
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {data.valid_until ? (
                                  format(new Date(data.valid_until), "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={data.valid_until ? new Date(data.valid_until) : undefined}
                                onSelect={(date) =>
                                  setData("valid_until", date ? format(date, "yyyy-MM-dd") : "")
                                }
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        {errors.valid_until && (
                          <p className="text-sm text-red-500">{errors.valid_until}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Summary</CardTitle>
                <CardDescription>Quotation financial summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-right font-medium">
                    {formatCurrency(data.subtotal)}
                  </span>

                  <div className="flex items-center">
                    <span className="text-muted-foreground">Tax Rate:</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={data.tax_percentage}
                      onChange={(e) => setData("tax_percentage", parseFloat(e.target.value) || 0)}
                      className="h-8 w-16 text-right"
                    />
                    <span>%</span>
                  </div>

                  <span className="text-muted-foreground">Tax Amount:</span>
                  <span className="text-right font-medium">
                    {formatCurrency(data.tax_amount)}
                  </span>

                  <div className="flex items-center">
                    <span className="text-muted-foreground">Discount:</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={data.discount_percentage}
                      onChange={(e) => setData("discount_percentage", parseFloat(e.target.value) || 0)}
                      className="h-8 w-16 text-right"
                    />
                    <span>%</span>
                  </div>

                  <span className="text-muted-foreground">Discount Amount:</span>
                  <span className="text-right font-medium text-red-600">
                    {formatCurrency(data.discount_amount)}
                  </span>

                  <Separator className="col-span-2 my-2" />

                  <span className="text-base font-medium">Total:</span>
                  <span className="text-right text-base font-bold">
                    {formatCurrency(data.total_amount)}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={processing}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Quotation
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Quotation Items and Additional Info */}
          <div className="mt-6 space-y-6">
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="items">Quotation Items</TabsTrigger>
                <TabsTrigger value="notes">Notes & Terms</TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="pt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle>Items</CardTitle>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addQuotationItem}
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Item
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Equipment</TableHead>
                          <TableHead>Operator</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Rate</TableHead>
                          <TableHead>Rate Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.quotation_items.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-6">
                              No items added yet. Click "Add Item" to begin.
                            </TableCell>
                          </TableRow>
                        ) : (
                          data.quotation_items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Select
                                  value={item.equipment_id || ""}
                                  onValueChange={(value) => handleEquipmentChange(item.id, value)}
                                  <SelectTrigger className="h-8 w-[150px] text-xs">
                                    <SelectValue placeholder="Select Equipment" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    {equipment.map((eq) => (
                                      <SelectItem key={eq.id} value={eq.id.toString()}>
                                        {eq.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={item.operator_id || ""}
                                  onValueChange={(value) =>
                                    updateQuotationItem(item.id, "operator_id", value)
                                  }
                                  <SelectTrigger className="h-8 w-[150px] text-xs">
                                    <SelectValue placeholder="Select Operator" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">None</SelectItem>

                                    {operatorsByCategory.operators.length > 0 && (
                                      <SelectGroup>
                                        <SelectLabel>Operators</SelectLabel>
                                        {operatorsByCategory.operators.map((op) => (
                                          <SelectItem key={op.id} value={op.id.toString()}>
                                            {op.name || `${op.first_name || ''} ${op.last_name || ''}`}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    )}

                                    {operatorsByCategory.drivers.length > 0 && (
                                      <SelectGroup>
                                        <SelectLabel>Drivers</SelectLabel>
                                        {operatorsByCategory.drivers.map((driver) => (
                                          <SelectItem key={driver.id} value={driver.id.toString()}>
                                            {driver.name || `${driver.first_name || ''} ${driver.last_name || ''}`}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    )}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Input
                                  placeholder="Description"
                                  value={item.description}
                                  onChange={(e) =>
                                    updateQuotationItem(item.id, "description", e.target.value)
                                  }
                                  className="h-8 text-xs"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuotationItem(
                                      item.id,
                                      "quantity",
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="h-8 w-[60px] text-xs"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={(e) =>
                                    updateQuotationItem(
                                      item.id,
                                      "rate",
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="h-8 w-[100px] text-xs"
                                />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={item.rate_type}
                                  onValueChange={(value) =>
                                    updateQuotationItem(item.id, "rate_type", value)
                                  }
                                  <SelectTrigger className="h-8 w-[100px] text-xs">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="hour">Per Hour</SelectItem>
                                    <SelectItem value="day">Per Day</SelectItem>
                                    <SelectItem value="week">Per Week</SelectItem>
                                    <SelectItem value="month">Per Month</SelectItem>
                                    <SelectItem value="flat">Flat Rate</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="font-medium text-right">
                                {formatCurrency(item.total_amount)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeQuotationItem(item.id)}
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6">
                    <div className="text-sm text-muted-foreground">
                      Total Items: {data.quotation_items.length}
                    </div>
                    <div className="text-sm font-medium">
                      Subtotal: {formatCurrency(data.subtotal)}
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notes and Terms</CardTitle>
                    <CardDescription>
                      Add additional information to your quotation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="notes"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        Notes
                      </label>
                      <Textarea
                        id="notes"
                        placeholder="Add any notes or special instructions for this quotation"
                        value={data.notes}
                        onChange={(e) => setData("notes", e.target.value)}
                        rows={4}
                      />
                      {errors.notes && (
                        <p className="text-sm text-red-500">{errors.notes}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="terms_and_conditions"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        Terms and Conditions
                      </label>
                      <Textarea
                        id="terms_and_conditions"
                        placeholder="Add terms and conditions for this quotation"
                        value={data.terms_and_conditions}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          const oldValue = data.terms_and_conditions;

                          // Get the selected customer for replacement
                          const selectedCustomer = customers.find(c => c.id.toString() === data.customer_id);
                          const customerName = selectedCustomer ? selectedCustomer.company_name : "Customer";

                          // Replace generic "Customer" with actual customer name if a customer is selected
                          let updatedValue = newValue;
                          if (selectedCustomer) {
                            // First replace the previous customer name with the new one if typed text includes it
                            if (previousCustomerName !== "Customer" && previousCustomerName !== customerName) {
                              // Use regex with word boundaries to avoid partial matches
                              const prevCustomerRegex = new RegExp(`\\b${previousCustomerName}\\b`, 'g');
                              updatedValue = updatedValue.replace(prevCustomerRegex, customerName);
                            }

                            // Then replace any generic "Customer" references
                            updatedValue = updatedValue.replace(/[Cc]ustomer/g, customerName);
                          }

                          setData("terms_and_conditions", updatedValue);

                          // Check if a new line was added at the end of content
                          if (updatedValue.length > oldValue.length && updatedValue.endsWith('\n')) {
                            const lines = updatedValue.split('\n');
                            // Check if the previous line is numbered (has a pattern like "1. ")
                            const prevLine = lines[lines.length - 2] || '';
                            const numberedLineRegex = /^(\d+)\.\s/;
                            const match = prevLine.match(numberedLineRegex);

                            if (match) {
                              const lastNum = parseInt(match[1], 10);
                              const nextNum = lastNum + 1;

                              // Create updated content with the next number
                              const updatedContent = updatedValue + `${nextNum}. `;

                              // Set the updated content
                              setTimeout(() => {
                                setData("terms_and_conditions", updatedContent);

                                // If we can access the textarea element, set the caret position
                                const textArea = document.getElementById('terms_and_conditions') as HTMLTextAreaElement;
                                if (textArea) {
                                  const newPosition = updatedContent.length;
                                  setTimeout(() => {
                                    textArea.focus();
                                    textArea.setSelectionRange(newPosition, newPosition);
                                  }, 0);
                                }
                              }, 0);
                            }
                          }
                        }}
                        rows={6}
                      />
                      {errors.terms_and_conditions && (
                        <p className="text-sm text-red-500">
                          {errors.terms_and_conditions}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}



