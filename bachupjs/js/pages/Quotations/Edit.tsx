import { useState, useEffect, useRef } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminLayout from "@/layouts/AdminLayout";
import { Customer, Equipment, Operator, Quotation } from "@/types/models";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Icons
import {
  CalendarIcon,
  ArrowLeft,
  Home,
  ChevronRight,
  PlusCircle,
  Trash2,
  Save,
  User,
  Phone,
  FileText,
  Clock,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Props extends PageProps {
  quotation: Quotation & {
    customer: Customer;
    quotationItems: Array<{
      id: number;
      quotation_id: number;
      equipment_id: number | null;
      operator_id: number | null;
      description: string;
      quantity: number;
      rate: number;
      rate_type: string;
      total_amount: number;
      equipment?: Equipment;
      operator?: Operator;
    }>
  };
  customers: Customer[];
  equipment: Equipment[];
  operators: {
    operators: Operator[];
    drivers: Operator[];
  };
  taxRate: number;
}

// Define interface for quotation items
interface QuotationItem {
  id: number;
  quotation_id: number;
  equipment_id: number | null;
  operator_id: number | null;
  description: string;
  quantity: number;
  rate: number;
  rate_type: string;
  total_amount: number;
  _method?: string;
}

// Helper functions for display
const formatCurrency = (amount: number | string | null | undefined) => {
  // Ensure we're working with a number
  const numAmount = parseFloat(amount?.toString() || "0") || 0;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return "SAR 0.00";
  }
};

const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'secondary'; // Using secondary since 'success' isn't available in the type
    case 'pending':
      return 'secondary'; // Using secondary since 'warning' isn't available in the type
    case 'rejected':
      return 'destructive';
    case 'expired':
      return 'outline';
    default:
      return 'secondary';
  }
};

const getClientInitials = (name: string): string => {
  if (!name) return 'CU';

  const parts = name.split(' ');
  if (parts.length === 1) return name.substring(0, 2).toUpperCase();

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Generate unique ID for quotation items
const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const Edit = ({ auth, quotation, customers, equipment, operators, taxRate }: Props) => {
  // Create a reference for the form
  const formRef = useRef<HTMLFormElement>(null);

  // Track previous customer name for replacement
  const [previousCustomerName, setPreviousCustomerName] = useState<string>("Customer");

  // Check if we have the required data structures - make more permissive
  const hasValidData = quotation && quotation.id;

  if (!hasValidData) {
    console.error("Missing required data:", {
      hasQuotation: !!quotation,
      quotationId: quotation?.id,
      hasClients: !!customers,
      clientsIsArray: !!customers && Array.isArray(customers),
      hasEquipment: !!equipment,
      equipmentIsArray: !!equipment && Array.isArray(equipment),
      hasOperators: !!operators,
      operatorsHasOperatorsProp: !!operators && !!operators.operators,
      operatorsIsArray: !!operators && !!operators.operators && Array.isArray(operators.operators),
    })

    return (
      <AdminLayout>
        <Head title="Quotation Data Loading" />
        <div className="container mx-auto py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Quotation {quotation?.quotation_number ? `#${quotation.quotation_number}` : "Details"}
            </h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.visit(route("quotations.index"))}
                Back to List
              </Button>
              <Button
                variant="outline"
                onClick={() => router.reload()}
                Refresh
              </Button>
            </div>
          </div>

          {/* Warning notice for data loading */}
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded mb-6 flex items-start">
            <div className="shrink-0 mr-3 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Edit form is preparing...</p>
              <p className="text-sm mt-1">
                The complete quotation editing form is still loading. You can view the details below while waiting.
                If it takes too long, try refreshing the page.
              </p>
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 border-yellow-300"
                  onClick={() => router.reload()}
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>

          {/* Display quotation in read-only format while the edit form is loading */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Header Card */}
            <Card className="lg:col-span-12 border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-6">
                    <div className="flex items-center gap-2">
                      <h1 className="text-xl font-medium tracking-tight">
                        Quotation #{quotation?.quotation_number || "Loading..."}
                      </h1>
                      <Badge variant={getStatusVariant(quotation?.status || "draft")}>
                        {quotation?.status || "draft"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs mt-1">
                      {quotation?.created_at
                        ? `Created on ${format(new Date(quotation.created_at), "MMMM dd, yyyy")}`
                        : "Created on: Loading date..."}
                    </p>
                  </div>

                  <div className="md:col-span-6 flex flex-col items-end justify-center">
                    <div className="text-xl font-medium">
                      {formatCurrency(quotation?.total_amount || 0)}
                    </div>
                    <p className="text-muted-foreground text-xs">
                      {quotation?.valid_until
                        ? `Valid until ${format(new Date(quotation.valid_until), "MMMM dd, yyyy")}`
                        : "Valid until: Loading date..."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quotation?.customer && quotation.customer.company_name ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 bg-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getClientInitials(quotation.customer.company_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-medium">{quotation.customer.company_name}</h3>
                        <p className="text-muted-foreground text-xs">{quotation.customer.contact_person}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-[1fr_auto] gap-2 text-xs">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="text-right">{quotation.customer.email || 'Not provided'}</span>

                      <span className="text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-1" />Phone:
                      </span>
                      <span className="text-right">{quotation.customer.phone || 'Not provided'}</span>

                      <span className="text-muted-foreground">Address:</span>
                      <span className="text-right">{quotation.customer.address || 'Not provided'}</span>
                    </div>
                  </>
                ) : (
                  <div className="text-muted-foreground italic text-center py-4">
                    No customer information available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quotation Details */}
            <Card className="lg:col-span-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  Quotation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Issue Date
                    </h4>
                    <p className="text-sm">
                      {quotation?.issue_date
                        ? format(new Date(quotation.issue_date), "MMMM dd, yyyy")
                        : "Loading..."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      Valid Until
                    </h4>
                    <p className="text-sm">
                      {quotation?.valid_until
                        ? format(new Date(quotation.valid_until), "MMMM dd, yyyy")
                        : "Loading..."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Tax Rate
                    </h4>
                    <p className="text-sm">
                      {quotation?.tax_percentage
                        ? `${parseFloat(quotation.tax_percentage.toString())}%`
                        : "15%"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <Coins className="h-3 w-3 mr-1" />
                      Discount
                    </h4>
                    <p className="text-sm">
                      {quotation?.discount_percentage
                        ? `${parseFloat(quotation.discount_percentage.toString())}%`
                        : "0%"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quotation Items */}
            <Card className="lg:col-span-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Quotation Items
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Item Description</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Rate Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotation?.quotationItems && quotation.quotationItems.length > 0 ? (
                      quotation.quotationItems.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {item.description || (item.equipment ? item.equipment.name : 'No description')}
                          </TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                          <TableCell className="text-right capitalize">{item.rate_type}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(item.total_amount)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Loading quotation items...
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-muted-foreground">Subtotal:</span>
                    <span className="text-right font-medium">
                      {formatCurrency(quotation?.subtotal || 0)}
                    </span>

                    <span className="text-sm text-muted-foreground">Tax Rate:</span>
                    <span className="text-right">
                      {quotation?.tax_percentage ? `${quotation.tax_percentage}%` : "15%"}
                    </span>

                    <span className="text-sm text-muted-foreground">Tax Amount:</span>
                    <span className="text-right font-medium">
                      {formatCurrency(quotation?.tax_amount || 0)}
                    </span>

                    <span className="text-sm text-muted-foreground">Discount:</span>
                    <span className="text-right">
                      {quotation?.discount_percentage ? `${quotation.discount_percentage}%` : "0%"}
                    </span>

                    <span className="text-sm text-muted-foreground">Discount Amount:</span>
                    <span className="text-right font-medium text-red-600">
                      -{formatCurrency(quotation?.discount_amount || 0)}
                    </span>

                    <hr className="col-span-2 my-2" />

                    <span className="text-base font-medium">Total:</span>
                    <span className="text-right text-base font-bold">
                      {formatCurrency(quotation?.total_amount || 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes & Terms */}
            <Card className="lg:col-span-8">
              <CardHeader>
                <CardTitle className="text-base">Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Notes</h3>
                  {quotation?.notes ? (
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{quotation.notes}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">No notes available for this quotation.</p>
                  )}
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Terms and Conditions</h3>
                  {quotation?.terms_and_conditions ? (
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line">{quotation.terms_and_conditions}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">No terms and conditions specified.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => router.reload()}
              className="w-full md:w-auto"
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Reload Page
              </div>
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Form for quotation
  const { data, setData, put, processing, errors, reset } = useForm({
    customer_id: quotation?.customer_id || "",
    quotation_number: quotation?.quotation_number || "",
    issue_date: quotation?.issue_date || format(new Date(), "yyyy-MM-dd"),
    valid_until: quotation?.valid_until || format(addDays(new Date(), 30), "yyyy-MM-dd"),
    status: quotation?.status || "draft",
    subtotal: quotation?.subtotal || 0,
    tax_percentage: quotation?.tax_percentage || taxRate || 15,
    discount_percentage: quotation?.discount_percentage || 0,
    tax_amount: quotation?.tax_amount || 0,
    discount_amount: quotation?.discount_amount || 0,
    total_amount: quotation?.total_amount || 0,
    notes: quotation?.notes || "",
    terms_and_conditions: quotation?.terms_and_conditions || "",
    quotation_items: quotation?.quotationItems?.map(item => ({
      id: item.id,
      quotation_id: item.quotation_id,
      equipment_id: item.equipment_id,
      operator_id: item.operator_id,
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
      rate_type: item.rate_type,
      total_amount: item.total_amount
    })) || [],
  })

  // Initialize data on component mount
  useEffect(() => {
    console.log("Initializing quotation data on mount", quotation);

    try {
      if (!quotation || !quotation.id) {
        console.error("Invalid quotation data:", quotation);
        toast.error("Could not load quotation data");
        return;
      }

      // Initialize previousCustomerName if customer is selected
      if (data.customer_id) {
        if (!customers || !Array.isArray(customers)) {
          console.warn("Clients array is undefined or not an array during initialization");
        } else {
          const selectedCustomer = customers.find(c => c.id === Number(data.customer_id));
          if (selectedCustomer) {
            setPreviousCustomerName(selectedCustomer.company_name);
          }
        }
      }

      // If no quotation items were loaded, add a default one
      if (!data.quotation_items || data.quotation_items.length === 0) {
        console.log("No quotation items found, adding default item");
        const defaultItem = {
          id: Date.now(),
          quotation_id: quotation.id,
          equipment_id: null,
          operator_id: null,
          description: "Equipment rental",
          quantity: 1,
          rate: 0,
          rate_type: "day",
          total_amount: 0
        };

        setData(prevState => ({
          ...prevState,
          quotation_items: [defaultItem]
        }));
      }

      // Calculate totals after a short delay
      setTimeout(calculateTotals, 100);

    } catch (error) {
      console.error("Error initializing data:", error);
      toast.error("Error loading quotation data");
    }
  }, []);

  // Calculate quotation totals - enhanced for reliability
  const calculateTotals = () => {
    console.log("Calculating totals with current data:", data.quotation_items);

    // Ensure data exists before proceeding
    if (!data || !data.quotation_items) {
      console.warn("Cannot calculate totals - data is not initialized");
      return;
    }

    // Filter out deleted items
    const activeItems = data.quotation_items.filter((item: any) => !item._method);

    // If no active items, set everything to zero
    if (activeItems.length === 0) {
      console.warn("No active items to calculate totals");
      setData({
        ...data,
        subtotal: 0,
        discount_amount: 0,
        tax_amount: 0,
        total_amount: 0,
      })
      return;
    }

    try {
      // Calculate subtotal - ensure all values are treated as numbers
      const subtotal = activeItems.reduce((sum: number, item: any) => {
        // Ensure we have a number by applying multiple fallbacks
        let itemAmount = parseFloat(item.total_amount?.toString() || "0");

        // If itemAmount is NaN, calculate from quantity and rate
        if (isNaN(itemAmount)) {
          const quantity = parseFloat(item.quantity?.toString() || "0") || 0;
          const rate = parseFloat(item.rate?.toString() || "0") || 0;
          itemAmount = quantity * rate;
        }

        // If still NaN, use 0
        if (isNaN(itemAmount)) {
          itemAmount = 0;
        }

        return sum + itemAmount;
      }, 0);

      // Calculate discount amount - ensure percentage is a number
      const discountPercentage = parseFloat(data.discount_percentage?.toString() || "0") || 0;
      const discountAmount = (subtotal * discountPercentage) / 100;

      // Calculate tax amount - ensure percentage is a number
      const taxPercentage = parseFloat(data.tax_percentage?.toString() || "15") || 15;
      const taxableAmount = subtotal - discountAmount;
      const taxAmount = (taxableAmount * taxPercentage) / 100;

      // Calculate total amount
      const totalAmount = taxableAmount + taxAmount;

      console.log("Calculated totals:", {
        subtotal: subtotal.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      })

      // Update the data with calculated values as numbers
      setData({
        ...data,
        subtotal: Number(subtotal.toFixed(2)),
        discount_amount: Number(discountAmount.toFixed(2)),
        tax_amount: Number(taxAmount.toFixed(2)),
        total_amount: Number(totalAmount.toFixed(2)),
      })
    } catch (err) {
      console.error("Error calculating totals:", err);
      // Set safe default values
      setData({
        ...data,
        subtotal: 0,
        discount_amount: 0,
        tax_amount: 0,
        total_amount: 0,
      })
    }
  };

  // Add empty quotation item
  const addQuotationItem = () => {
    const newItem: QuotationItem = {
      id: Date.now(), // Temporary ID for new items
      quotation_id: quotation.id,
      equipment_id: null,
      operator_id: null,
      description: "",
      quantity: 1,
      rate: 0,
      rate_type: "day",
      total_amount: 0,
    };

    // Ensure we have a valid array to add to
    const currentItems = Array.isArray(data.quotation_items) ? data.quotation_items : [];
    setData("quotation_items", [...currentItems, newItem]);

    // Recalculate totals after a short delay
    setTimeout(calculateTotals, 100);
  };

  // Remove quotation item
  const removeQuotationItem = (id: number) => {
    setData(
      "quotation_items",
      (data.quotation_items || []).map(item =>
        item.id === id ? { ...item, _method: 'DELETE' } : item
      )
    );
  };

  // Update quotation item
  const updateQuotationItem = (id: number, field: keyof QuotationItem, value: any) => {
    setData((prev) => ({
      ...prev,
      quotation_items: (prev.quotation_items || []).map((item) => {
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
    put(route("quotations.update", quotation.id), {
      onSuccess: () => {
        toast.success("Quotation updated successfully");
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

  return (
    <AdminLayout>
      <Head title={`Edit Quotation #${quotation.quotation_number}`} />

      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Edit Quotation #{quotation.quotation_number}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.visit(route("quotations.show", quotation.id))}
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={processing}
              Save Changes
            </Button>
          </div>
        </div>

        {/* Warning notice for incomplete data */}
        {(data.quotation_items.length === 0 || !data.customer_id) && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded mb-6 flex items-start">
            <div className="shrink-0 mr-3 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Data appears incomplete</p>
              <p className="text-sm mt-1">
                {!data.customer_id && "No customer selected. "}
                {data.quotation_items.length === 0 && "No quotation items loaded. "}
                Please complete these fields before submitting.
              </p>
            </div>
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Client & Dates */}
            <Card className="lg:col-span-8">
              <CardHeader>
                <CardTitle>Quotation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Customer
                    </label>

                    {/* Normal customer selection */}
                    <Select
                      value={data.customer_id?.toString() || ""}
                      onValueChange={(value) => {
                        console.log("Customer selected:", value);
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
                          const updatedLines = lines.map((line: string) => {
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
                      }}
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers && Array.isArray(customers) && customers.length > 0 ? (
                          customers.map((client) => (
                            <SelectItem key={client.id} value={client.id.toString()}>
                              {client.company_name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no_customers" disabled>
                            No customers available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.customer_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.customer_id}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Issue Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !data.issue_date && "text-muted-foreground"
                            )}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.issue_date ? format(new Date(data.issue_date), "PP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={data.issue_date ? new Date(data.issue_date) : undefined}
                            onSelect={(date) => {
                              const formattedDate = date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd");
                              setData("issue_date", formattedDate);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.issue_date && (
                        <p className="text-sm text-red-500 mt-1">{errors.issue_date}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Valid Until
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !data.valid_until && "text-muted-foreground"
                            )}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.valid_until ? format(new Date(data.valid_until), "PP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={data.valid_until ? new Date(data.valid_until) : undefined}
                            onSelect={(date) => {
                              const formattedDate = date ? format(date, "yyyy-MM-dd") : format(new Date(Date.now() + 30*24*60*60*1000), "yyyy-MM-dd");
                              setData("valid_until", formattedDate);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.valid_until && (
                        <p className="text-sm text-red-500 mt-1">{errors.valid_until}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-muted-foreground">Subtotal:</span>
                    <span className="text-right font-medium">
                      {formatCurrency(data.subtotal)}
                    </span>

                    {/* Tax Rate */}
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">Tax Rate:</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={data.tax_percentage}
                        onChange={(e) => {
                          const taxValue = parseFloat(e.target.value) || 0;
                          setData("tax_percentage", taxValue);
                          // Recalculate after a short delay
                          setTimeout(calculateTotals, 50);
                        }}
                        className="h-8 w-16 text-right"
                      />
                      <span>%</span>
                    </div>

                    <span className="text-sm text-muted-foreground">Tax Amount:</span>
                    <span className="text-right font-medium">
                      {formatCurrency(data.tax_amount)}
                    </span>

                    {/* Discount */}
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">Discount:</span>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={data.discount_percentage}
                        onChange={(e) => {
                          const discountValue = parseFloat(e.target.value) || 0;
                          setData("discount_percentage", discountValue);
                          // Recalculate after a short delay
                          setTimeout(calculateTotals, 50);
                        }}
                        className="h-8 w-16 text-right"
                      />
                      <span>%</span>
                    </div>

                    <span className="text-sm text-muted-foreground">Discount Amount:</span>
                    <span className="text-right font-medium text-red-600">
                      -{formatCurrency(data.discount_amount)}
                    </span>

                    <hr className="col-span-2 my-2" />

                    <span className="text-base font-medium">Total:</span>
                    <span className="text-right text-base font-bold">
                      {formatCurrency(data.total_amount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quotation Items */}
            <Card className="lg:col-span-12">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Quotation Items</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addQuotationItem}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Equipment</TableHead>
                        <TableHead>Operator</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead>Rate Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.quotation_items
                        .map((item, index) => (
                        <TableRow key={item.id.toString()}>
                          <TableCell>
                            <Input
                              value={item.description}
                              onChange={(e) => updateQuotationItem(item.id, 'description', e.target.value)}
                              placeholder="Item description"
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.equipment_id?.toString() || ""}
                              onValueChange={(value) => updateQuotationItem(item.id, 'equipment_id', value === "none" ? null : value)}
                              <SelectTrigger>
                                <SelectValue placeholder="Select equipment" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {equipment && Array.isArray(equipment) && equipment.length > 0 ? (
                                  equipment.map((eq) => (
                                    <SelectItem key={eq.id} value={eq.id.toString()}>
                                      {eq.name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="no_equipment" disabled>
                                    No equipment available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.operator_id?.toString() || ""}
                              onValueChange={(value) => updateQuotationItem(item.id, 'operator_id', value === "none" ? null : value)}
                              <SelectTrigger>
                                <SelectValue placeholder="Select operator" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>

                                {operators && operators.operators && Array.isArray(operators.operators) && operators.operators.length > 0 ? (
                                  <SelectGroup>
                                    <SelectLabel>Operators</SelectLabel>
                                    {operators.operators.map((op) => (
                                      <SelectItem key={`op-${op.id}`} value={op.id.toString()}>
                                        {op.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                ) : null}

                                {operators && operators.drivers && Array.isArray(operators.drivers) && operators.drivers.length > 0 ? (
                                  <SelectGroup>
                                    <SelectLabel>Drivers</SelectLabel>
                                    {operators.drivers.map((driver) => (
                                      <SelectItem key={`driver-${driver.id}`} value={driver.id.toString()}>
                                        {driver.name}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                ) : null}

                                {(!operators ||
                                  (!operators.operators || !Array.isArray(operators.operators) || !operators.operators.length) &&
                                  (!operators.drivers || !Array.isArray(operators.drivers) || !operators.drivers.length)) && (
                                  <SelectItem value="no_operators" disabled>
                                    No operators available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuotationItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="w-16 text-right"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.rate}
                              onChange={(e) => updateQuotationItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                              className="w-24 text-right"
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.rate_type}
                              onValueChange={(value) => updateQuotationItem(item.id, 'rate_type', value)}
                              <SelectTrigger>
                                <SelectValue />
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
                          <TableCell className="text-right font-medium">
                            {formatCurrency(item.total_amount)}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeQuotationItem(item.id)}
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}

                      {data.quotation_items.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                            No items added. Click "Add Item" to get started.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Notes & Terms */}
            <Card className="lg:col-span-12">
              <CardHeader>
                <CardTitle>Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes
                  </label>
                  <Textarea
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    rows={3}
                    placeholder="Enter any notes about this quotation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Terms and Conditions
                  </label>
                  <Textarea
                    value={data.terms_and_conditions}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const oldValue = data.terms_and_conditions;

                      // Get the selected customer for replacement
                      if (!customers || !Array.isArray(customers)) {
                        setData("terms_and_conditions", newValue);
                        return;
                      }

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
                            const textArea = document.querySelector('textarea[name="terms_and_conditions"]') as HTMLTextAreaElement;
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
                    rows={3}
                    placeholder="Enter terms and conditions..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.visit(route("quotations.show", quotation.id))}
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={processing}
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

export default Edit;
