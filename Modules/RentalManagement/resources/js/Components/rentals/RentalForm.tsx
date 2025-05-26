import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@inertiajs/react";
import * as z from "zod";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Icons
import { CalendarIcon, Plus, Trash, Search } from "lucide-react";
import { Customer, Equipment, Rental, RentalItem } from "@/types/models";

interface RentalFormItem {
  id: number | null;
  equipment_id: number;
  equipment: Equipment | null;
  rate: number;
  days: number;
  total_price: number;
  operator_id: number | null;
  rate_type?: string;
  [key: string]: any; // Allow dynamic properties
}

export const rentalFormSchema = z.object({
  customer_id: z.coerce.number().min(1, "Customer is required"),
  rental_number: z.string().min(1, "Rental number is required"),
  start_date: z.date({ required_error: "Start date is required" }),
  expected_end_date: z.date({ required_error: "Expected end date is required" }),
  actual_end_date: z.date().optional().nullable(),
  status: z.string().min(1, "Status is required"),
  deposit_amount: z.coerce.number().min(0, "Deposit amount must be 0 or greater"),
  notes: z.string().optional().nullable(),
  tax_rate: z.coerce.number().min(0).max(100).default(15),
  rental_items: z.array(z.object({
    equipment_id: z.number(),
    rate: z.number(),
    days: z.number(),
    total_price: z.number(),
    operator_id: z.number().nullable(),
    rate_type: z.string()
  })).optional(),
  subtotal: z.number().optional(),
  tax_amount: z.number().optional(),
  total_amount: z.number().optional(),
  discount: z.number().optional(),
  payment_terms_days: z.coerce.number().min(0).max(365).optional(),
  discount_percentage: z.coerce.number().min(0).max(100).optional(),
  has_timesheet: z.boolean().optional(),
  has_operators: z.boolean().optional()
})

export type RentalFormValues = z.infer<typeof rentalFormSchema>

interface RentalFormProps {
  customers: Customer[];
  equipment: Equipment[];
  employees?: { id: number; name: string }[];
  initialData?: {
    rental?: Rental & {
      rentalItems?: RentalItem[];
      rental_items?: RentalItem[];
    };
    rentalNumber?: string;
  };
  isEditMode: boolean;
  onSubmit: (values: RentalFormValues & {
    rental_items: Array<{
      equipment_id: number;
      rate: number;
      days: number;
      total_price: number;
      operator_id: number | null;
      rate_type: string;
    }>
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    discount: number;
    tax_rate: number;
    status: string;
  }, rentalItems: RentalFormItem[], financials: {
    subtotal: number;
    taxAmount: number;
    totalAmount: number;
    discount: number;
    deletedItemIds?: number[];
  }) => void;
  isSubmitting?: boolean;
  currentStep?: number;
  formData?: Record<string, unknown>
  steps: Array<{ id: number; name: string; description: string }>
}

const RentalForm = ({
  customers = [],
  equipment = [],
  employees = [],
  initialData = {},
  isEditMode,
  onSubmit,
  isSubmitting = false,
  currentStep = 1,
  formData,
  steps
}: RentalFormProps) => {
  // Extract initial data based on whether we're in edit mode or create mode
  const rental = initialData.rental;
  const nextRentalNumber = initialData.rentalNumber;

  // State for rental items
  const [rentalItems, setRentalItems] = useState<RentalFormItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deletedItemIds, setDeletedItemIds] = useState<number[]>([]);
  const [currentStepState, setCurrentStepState] = useState(1);
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(equipment);
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);

  // Update currentStepState when currentStep prop changes
  useEffect(() => {
    setCurrentStepState(currentStep);
  }, [currentStep]);

  // Make sure arrays are always arrays, even if we receive null or undefined
  const safeCustomers = Array.isArray(customers) ? customers : [];
  const safeEquipment = Array.isArray(equipment) ? equipment : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];

  // Setup react-hook-form with zod validation
  const { data, setData, post, processing, errors } = useForm({
    customer_id: safeCustomers.length > 0 ? safeCustomers[0].id : '',
    rental_number: nextRentalNumber || '',
    start_date: new Date(),
    expected_end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    deposit_amount: 0,
    notes: '',
    tax_rate: 15,
    discount: 0
  })

  // Add form state logging
  useEffect(() => {
    console.log('Form values changed:', data);
  }, [data]);

  // Initialize rental items from provided data
  useEffect(() => {
    if (isEditMode && rental) {
      const rentalItemsData = rental.rentalItems || rental.rental_items || [];
      if (rentalItemsData && rentalItemsData.length > 0) {
        const days = calculateRentalDays(rental.start_date, rental.expected_end_date);
        const mappedItems = rentalItemsData.map(item => ({
          id: item.id,
          equipment_id: item.equipment_id,
          equipment: safeEquipment.find(e => e.id === item.equipment_id) || null,
          rate: item.equipment?.daily_rate || 0,
          days: days,
          total_price: (item.equipment?.daily_rate || 0) * days,
          operator_id: item.operator_id || null
        }));

        setRentalItems(mappedItems);

        // Set initial discount if available from rental
        if (rental.discount_percentage) {
          const discountAmount = (rental.total_amount * rental.discount_percentage) / 100;
          setDiscount(discountAmount);
        }
      }
    }
  }, [isEditMode, rental, safeEquipment]);

  // Calculate days between start and end date
  function calculateRentalDays(startDate: string, endDate: string): number {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Default to 1 if calculation fails
    } catch (e) {
      return 1; // Default value
    }
  }

  // Update days calculation when dates change
  useEffect(() => {
    if (data.start_date && data.expected_end_date && rentalItems.length > 0) {
      const days = calculateDaysBetweenDates(data.start_date, data.expected_end_date);
      updateAllRentalItemsDays(days);
    }
  }, [data.start_date, data.expected_end_date, rentalItems.length]);

  // Handle adding a new rental item
  const addRentalItem = () => {
    // Calculate current days based on form start and end dates
    const startDate = data.start_date;
    const endDate = data.expected_end_date;
    const currentDays = startDate && endDate ?
      calculateDaysBetweenDates(startDate, endDate) :
      1;

    const defaultEquipment = safeEquipment.length > 0 ? safeEquipment[0] : null;

    const newItem: RentalFormItem = {
      id: null,
      equipment_id: defaultEquipment?.id || 0,
      equipment: defaultEquipment,
      rate: defaultEquipment?.daily_rate || 0,
      days: currentDays,
      total_price: 0,
      operator_id: null
    };

    setRentalItems([...rentalItems, newItem]);
  };

  // Handle removing a rental item
  const removeRentalItem = (index: number) => {
    // If item has an ID, add it to deleted list (for edit mode)
    const item = rentalItems[index];
    if (isEditMode && item.id) {
      setDeletedItemIds([...deletedItemIds, item.id]);
    }

    setRentalItems(rentalItems.filter((_, i) => i !== index));
  };

  // Handle updating a rental item
  const updateRentalItem = (index: number, field: keyof RentalFormItem, value: any) => {
    const updatedItems = [...rentalItems];
    const item = { ...updatedItems[index] };

    // Find equipment details if equipment_id is updated
    if (field === "equipment_id") {
      const selectedEquipment = safeEquipment.find(e => e.id === Number(value));
      if (selectedEquipment) {
        item.equipment_id = selectedEquipment.id;
        item.equipment = selectedEquipment;
        item.rate = Number(selectedEquipment.daily_rate) || 0;
        item.total_price = Number(item.rate) * Number(item.days);
      } else {
        item.equipment_id = 0;
        item.equipment = null;
        item.rate = 0;
        item.total_price = 0;
      }
    } else {
      item[field] = value;
    }

    // Special handling for operator_id
    if (field === "operator_id") {
      // If value is "none", set to null
      if (value === "none" || value === undefined) {
        item.operator_id = null;
      } else {
        item.operator_id = Number(value);
      }
    }

    // Ensure numeric values are treated as numbers
    if (field === "rate") {
      item.rate = Number(value) || 0; // Default to 0 if invalid
      // Recalculate total price when rate changes
      item.total_price = Number(item.rate) * Number(item.days);
    }

    if (field === "days") {
      item.days = Number(value) || 1; // Default to 1 if invalid
      // Recalculate total price when days change
      item.total_price = Number(item.rate) * Number(item.days);
    }

    updatedItems[index] = item;
    setRentalItems(updatedItems);

    // Update form totals
    calculateTotals(updatedItems, data.tax_rate);
  };

  // Calculate the totals whenever rental items change
  useEffect(() => {
    calculateTotals(rentalItems, data.tax_rate);
  }, [rentalItems]);

  // Function to calculate the totals
  const calculateTotals = (items: RentalFormItem[], taxRate: number) => {
    const calculatedSubtotal = items.reduce((sum, item) => sum + (item.total_price || 0), 0);
    const calculatedTax = (calculatedSubtotal - discount) * (taxRate / 100);
    const calculatedTotal = calculatedSubtotal - discount + calculatedTax;

    console.log('Calculating totals:', {
      items: items.map(i => ({ id: i.id, price: i.total_price, days: i.days, rate: i.rate })),
      calculatedSubtotal,
      discount,
      calculatedTax,
      calculatedTotal
    })

    setSubtotal(calculatedSubtotal);
    setTaxAmount(calculatedTax);
    setTotalAmount(calculatedTotal);
  };

  // Handle discount changes
  const handleDiscountChange = (value: string) => {
    const discountValue = Number(value) || 0;
    setDiscount(discountValue);
    calculateTotals(rentalItems, data.tax_rate);
  };

  // Handle tax rate changes
  const handleTaxRateChange = (value: number) => {
    setData('tax_rate', value);
    calculateTotals(rentalItems, value);
  };

  // Format currency display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(amount);
  };

  // Helper function to calculate days between dates (using Date objects)
  function calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    try {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    } catch (e) {
      return 1;
    }
  }

  // Add this function to update all rental items days and totals
  const updateAllRentalItemsDays = (days: number) => {
    if (rentalItems.length > 0) {
      const updatedItems = rentalItems.map(item => ({
        ...item,
        days: days,
        total_price: item.rate * days
      }));

      setRentalItems(updatedItems);
    }
  };

  // Update filtered equipment when search changes
  useEffect(() => {
    if (equipmentSearch.trim() === "") {
      setFilteredEquipment(equipment);
    } else {
      const searchTerm = equipmentSearch.toLowerCase();
      const filtered = equipment.filter(equip =>
        (equip.name?.toLowerCase() || '').includes(searchTerm) ||
        (equip.door_number?.toLowerCase() || '').includes(searchTerm) ||
        (equip.model?.toLowerCase() || '').includes(searchTerm) ||
        (equip.serial_number?.toLowerCase() || '').includes(searchTerm)
      );
      setFilteredEquipment(filtered);
    }
  }, [equipmentSearch, equipment]);

  // Initialize selected equipment from rental items
  useEffect(() => {
    if (rentalItems.length > 0) {
      const selectedIds = rentalItems.map(item => item.equipment_id);
      setSelectedEquipment(selectedIds);
    }
  }, []);

  // Handle equipment selection
  const handleEquipmentSelection = (equipmentId: number) => {
    const equipment = safeEquipment.find(e => e.id === equipmentId);
    if (!equipment) return;

    // Check if equipment is already selected
    if (selectedEquipment.includes(equipmentId)) {
      return;
    }

    const days = calculateDaysBetweenDates(data.start_date, data.expected_end_date);
    const newItem: RentalFormItem = {
      id: null,
      equipment_id: equipment.id,
      equipment: equipment,
      rate: equipment.daily_rate || 0,
      days: days,
      total_price: (equipment.daily_rate || 0) * days,
      operator_id: null
    };

    setRentalItems(prev => [...prev, newItem]);
    setSelectedEquipment(prev => [...prev, equipmentId]);
  };

  // Handle equipment deselection
  const handleEquipmentDeselection = (equipmentId: number) => {
    setRentalItems(prev => prev.filter(item => item.equipment_id !== equipmentId));
    setSelectedEquipment(prev => prev.filter(id => id !== equipmentId));
  };

  // Handle checkbox change
  const handleCheckboxChange = (equipmentId: number, checked: boolean) => {
    if (checked) {
      handleEquipmentSelection(equipmentId);
    } else {
      handleEquipmentDeselection(equipmentId);
    }
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (currentStepState === 1) {
      // Validate basic information
      if (!data.customer_id) {
        toast.error('Please select a customer');
        return;
      }
      if (!data.start_date) {
        toast.error('Please select a start date');
        return;
      }
      if (!data.expected_end_date) {
        toast.error('Please select an expected end date');
        return;
      }
      if (data.expected_end_date < data.start_date) {
        toast.error('Expected end date cannot be before start date');
        return;
      }
      setCurrentStepState(2);
    } else if (currentStepState === 2) {
      // Validate equipment selection
      if (rentalItems.length === 0) {
        toast.error('Please add at least one equipment item');
        return;
      }
      setCurrentStepState(3);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStepState === 3) {
      setCurrentStepState(2);
    } else if (currentStepState === 2) {
      setCurrentStepState(1);
    }
  };

  // Get current step title
  const getStepTitle = () => {
    switch (currentStepState) {
      case 1:
        return "Customer and rental details";
      case 2:
        return "Equipment Selection";
      case 3:
        return "Review and complete rental";
      default:
        return "";
    }
  };

  // Render different form sections based on current step
  const renderFormStep = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">{getStepTitle()}</h3>
        </div>

        {currentStepState === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer_id">Customer</Label>
                <Select
                  value={data.customer_id?.toString() || ""}
                  onValueChange={(value) => {
                    setData('customer_id', Number(value));
                  }}
                >
                  <SelectTrigger id="customer_id">
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.company_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.customer_id && (
                  <p className="text-sm text-destructive">{errors.customer_id}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rental_number">Rental Number</Label>
                <Input
                  id="rental_number"
                  value={data.rental_number}
                  disabled={true}
                  className="bg-muted"
                />
                {errors.rental_number && (
                  <p className="text-sm text-destructive">{errors.rental_number}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data.start_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.start_date ? (
                        format(data.start_date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.start_date}
                      onSelect={(date) => {
                        if (date) {
                          setData('start_date', date);
                          if (data.expected_end_date) {
                            const days = calculateDaysBetweenDates(date, data.expected_end_date);
                            updateAllRentalItemsDays(days);
                          }
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.start_date && (
                  <p className="text-sm text-destructive">{errors.start_date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Expected End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !data.expected_end_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data.expected_end_date ? (
                        format(data.expected_end_date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.expected_end_date}
                      onSelect={(date) => {
                        if (date) {
                          setData('expected_end_date', date);
                          if (data.start_date) {
                            const days = calculateDaysBetweenDates(data.start_date, date);
                            updateAllRentalItemsDays(days);
                          }
                        }
                      }}
                      initialFocus
                      disabled={(date) => {
                        return date < data.start_date;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.expected_end_date && (
                  <p className="text-sm text-destructive">{errors.expected_end_date}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={data.notes || ''}
                onChange={(e) => setData('notes', e.target.value)}
                placeholder="Add any additional notes here..."
              />
            </div>
          </div>
        )}

        {currentStepState === 2 && (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search equipment by name, door number, or model..."
                    value={equipmentSearch}
                    onChange={(e) => setEquipmentSearch(e.target.value)}
                    className="pl-8"
                  />
                </div>

                {equipmentSearch.trim() !== "" && (
                  <div className="border rounded-md">
                    <div className="max-h-[400px] overflow-y-auto">
                      {filteredEquipment.length === 0 ? (
                        <div className="p-4 text-sm text-muted-foreground text-center">
                          No equipment found matching your search
                        </div>
                      ) : (
                        <div className="divide-y">
                          {filteredEquipment.map((equip) => {
                            const isSelected = selectedEquipment.includes(equip.id);
                            return (
                              <div key={equip.id} className="flex items-center space-x-4 p-4 hover:bg-muted/50">
                                <Checkbox
                                  id={`equip-${equip.id}`}
                                  checked={isSelected}
                                  onCheckedChange={(checked) => handleCheckboxChange(equip.id, checked as boolean)}
                                />
                                <label htmlFor={`equip-${equip.id}`} className="flex-1 cursor-pointer">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">{equip.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {equip.model ? `Model: ${equip.model}` : ""}
                                        {equip.door_number ? ` • Door: ${equip.door_number}` : ""}
                                        {equip.serial_number ? ` • S/N: ${equip.serial_number}` : ""}
                                      </div>
                                    </div>
                                    <div className="text-sm font-medium">
                                      {formatCurrency(equip.daily_rate || 0)}/day
                                    </div>
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {equipmentSearch.trim() === "" && (
                  <div className="text-center py-8 text-muted-foreground">
                    Start typing to search for equipment
                  </div>
                )}
              </div>
            </Card>

            {rentalItems.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Selected Equipment</h4>
                {rentalItems.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Equipment</Label>
                        <div className="text-sm">
                          <div className="font-medium">{item.equipment?.name}</div>
                          <div className="text-muted-foreground">
                            {item.equipment?.model ? `Model: ${item.equipment.model}` : ""}
                            {item.equipment?.door_number ? ` • Door: ${item.equipment.door_number}` : ""}
                            {item.equipment?.serial_number ? ` • S/N: ${item.equipment.serial_number}` : ""}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Operator</Label>
                        <Select
                          value={item.operator_id?.toString() || "none"}
                          onValueChange={(value) => {
                            setRentalItems(prev => prev.map((item, i) =>
                              i === index
                                ? { ...item, operator_id: value === "none" ? null : Number(value) }
                                : item
                            ));
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Operator</SelectItem>
                            {safeEmployees.map((employee) => (
                              <SelectItem key={employee.id} value={employee.id.toString()}>
                                {employee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-muted-foreground">
                        Total: {formatCurrency(item.total_price)}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEquipmentDeselection(item.equipment_id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {rentalItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No equipment selected. Use the search above to find and select equipment.
              </div>
            )}
          </div>
        )}

        {currentStepState === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Rental Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Customer</div>
                    <div className="text-sm text-muted-foreground">
                      {safeCustomers.find(c => c.id === data.customer_id)?.company_name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Rental Number</div>
                    <div className="text-sm text-muted-foreground">
                      {data.rental_number}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Start Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(data.start_date, "PPP")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Expected End Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(data.expected_end_date, "PPP")}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium">Rental Items</div>
                  <div className="space-y-2">
                    {rentalItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          {item.equipment?.name} {item.equipment?.door_number ? `(Door: ${item.equipment.door_number})` : ""}
                        </div>
                        <div>{formatCurrency(item.total_price)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>Subtotal</div>
                    <div>{formatCurrency(subtotal)}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Tax ({data.tax_rate}%)</div>
                    <div>{formatCurrency(taxAmount)}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Discount</div>
                    <div>{formatCurrency(discount)}</div>
                  </div>
                  <div className="flex justify-between font-medium">
                    <div>Total</div>
                    <div>{formatCurrency(totalAmount)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!data.customer_id) {
      toast.error('Please select a customer');
      return;
    }

    if (!data.start_date) {
      toast.error('Please select a start date');
      return;
    }

    if (!data.expected_end_date) {
      toast.error('Please select an expected end date');
      return;
    }

    if (data.expected_end_date < data.start_date) {
      toast.error('Expected end date cannot be before start date');
      return;
    }

    if (rentalItems.length === 0) {
      toast.error('Please add at least one equipment item');
      return;
    }

    try {
      const rentalItemsData = rentalItems.map(item => ({
        equipment_id: item.equipment_id,
        rate: item.rate,
        rate_type: 'daily',
        days: item.days,
        operator_id: item.operator_id || null,
        total_price: item.total_price || (item.rate * item.days),
        discount_percentage: item.discount_percentage || 0,
        notes: item.notes || null
      }));

      // Format data to match Create component's expected structure
      const formData: RentalFormValues & {
        rental_items: typeof rentalItemsData;
        subtotal: number;
        tax_amount: number;
        total_amount: number;
        discount: number;
        status: string;
      } = {
        ...data,
        customer_id: Number(data.customer_id),
        status: 'pending',
        subtotal,
        tax_amount: taxAmount,
        total_amount: totalAmount,
        discount,
        rental_items: rentalItemsData,
        notes: data.notes || '',
        deposit_amount: Number(data.deposit_amount) || 0,
        tax_rate: Number(data.tax_rate) || 15,
        has_operators: rentalItems.some(item => item.operator_id !== null),
        has_timesheet: false,
        start_date: data.start_date,
        expected_end_date: data.expected_end_date,
        payment_terms_days: 0,
        discount_percentage: 0
      };

      console.log('Submitting rental data:', formData);

      // Use the onSubmit prop instead of direct post
      onSubmit(formData, rentalItems, {
        subtotal,
        taxAmount,
        totalAmount,
        discount,
        deletedItemIds
      })
    } catch (error) {
      console.error('Error creating rental:', error);
      toast.error('Failed to create rental. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Customer and Rental Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Customer and rental details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="customer_id">Customer</Label>
              <Select
                value={data.customer_id?.toString() || ""}
                onValueChange={(value) => {
                  setData('customer_id', Number(value));
                }}
              >
                <SelectTrigger id="customer_id">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {safeCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id.toString()}>
                      {customer.company_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customer_id && (
                <p className="text-sm text-destructive">{errors.customer_id}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rental_number">Rental Number</Label>
              <Input
                id="rental_number"
                value={data.rental_number}
                disabled={true}
                className="bg-muted"
              />
              {errors.rental_number && (
                <p className="text-sm text-destructive">{errors.rental_number}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data.start_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.start_date ? (
                      format(data.start_date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.start_date}
                    onSelect={(date) => {
                      if (date) {
                        setData('start_date', date);
                        if (data.expected_end_date) {
                          const days = calculateDaysBetweenDates(date, data.expected_end_date);
                          updateAllRentalItemsDays(days);
                        }
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.start_date && (
                <p className="text-sm text-destructive">{errors.start_date}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Expected End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !data.expected_end_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.expected_end_date ? (
                      format(data.expected_end_date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.expected_end_date}
                    onSelect={(date) => {
                      if (date) {
                        setData('expected_end_date', date);
                        if (data.start_date) {
                          const days = calculateDaysBetweenDates(data.start_date, date);
                          updateAllRentalItemsDays(days);
                        }
                      }
                    }}
                    initialFocus
                    disabled={(date) => {
                      return date < data.start_date;
                    }}
                  />
                </PopoverContent>
              </Popover>
              {errors.expected_end_date && (
                <p className="text-sm text-destructive">{errors.expected_end_date}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={data.notes || ''}
              onChange={(e) => setData('notes', e.target.value)}
              placeholder="Add any additional notes here..."
            />
          </div>
        </div>

        {/* Equipment Selection Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Equipment Selection</h3>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search equipment by name, door number, or model..."
                  value={equipmentSearch}
                  onChange={(e) => setEquipmentSearch(e.target.value)}
                  className="pl-8"
                />
              </div>

              {equipmentSearch.trim() !== "" && (
                <div className="border rounded-md">
                  <div className="max-h-[400px] overflow-y-auto">
                    {filteredEquipment.length === 0 ? (
                      <div className="p-4 text-sm text-muted-foreground text-center">
                        No equipment found matching your search
                      </div>
                    ) : (
                      <div className="divide-y">
                        {filteredEquipment.map((equip) => {
                          const isSelected = selectedEquipment.includes(equip.id);
                          return (
                            <div key={equip.id} className="flex items-center space-x-4 p-4 hover:bg-muted/50">
                              <Checkbox
                                id={`equip-${equip.id}`}
                                checked={isSelected}
                                onCheckedChange={(checked) => handleCheckboxChange(equip.id, checked as boolean)}
                              />
                              <label htmlFor={`equip-${equip.id}`} className="flex-1 cursor-pointer">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{equip.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                      {equip.model ? `Model: ${equip.model}` : ""}
                                      {equip.door_number ? ` • Door: ${equip.door_number}` : ""}
                                      {equip.serial_number ? ` • S/N: ${equip.serial_number}` : ""}
                                    </div>
                                  </div>
                                  <div className="text-sm font-medium">
                                    {formatCurrency(equip.daily_rate || 0)}/day
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {equipmentSearch.trim() === "" && (
                <div className="text-center py-8 text-muted-foreground">
                  Start typing to search for equipment
                </div>
              )}
            </div>
          </Card>

          {rentalItems.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Selected Equipment</h4>
              {rentalItems.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Equipment</Label>
                      <div className="text-sm">
                        <div className="font-medium">{item.equipment?.name}</div>
                        <div className="text-muted-foreground">
                          {item.equipment?.model ? `Model: ${item.equipment.model}` : ""}
                          {item.equipment?.door_number ? ` • Door: ${item.equipment.door_number}` : ""}
                          {item.equipment?.serial_number ? ` • S/N: ${item.equipment.serial_number}` : ""}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Operator</Label>
                      <Select
                        value={item.operator_id?.toString() || "none"}
                        onValueChange={(value) => {
                          setRentalItems(prev => prev.map((item, i) =>
                            i === index
                              ? { ...item, operator_id: value === "none" ? null : Number(value) }
                              : item
                          ));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Operator</SelectItem>
                          {safeEmployees.map((employee) => (
                            <SelectItem key={employee.id} value={employee.id.toString()}>
                              {employee.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      Total: {formatCurrency(item.total_price)}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEquipmentDeselection(item.equipment_id)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {rentalItems.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No equipment selected. Use the search above to find and select equipment.
            </div>
          )}
        </div>

        {/* Review Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Review and complete rental</h3>
          <Card>
            <CardHeader>
              <CardTitle>Rental Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Customer</div>
                    <div className="text-sm text-muted-foreground">
                      {safeCustomers.find(c => c.id === data.customer_id)?.company_name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Rental Number</div>
                    <div className="text-sm text-muted-foreground">
                      {data.rental_number}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Start Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(data.start_date, "PPP")}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Expected End Date</div>
                    <div className="text-sm text-muted-foreground">
                      {format(data.expected_end_date, "PPP")}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium">Rental Items</div>
                  <div className="space-y-2">
                    {rentalItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div>
                          {item.equipment?.name} {item.equipment?.door_number ? `(Door: ${item.equipment.door_number})` : ""}
                        </div>
                        <div>{formatCurrency(item.total_price)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>Subtotal</div>
                    <div>{formatCurrency(subtotal)}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Tax ({data.tax_rate}%)</div>
                    <div>{formatCurrency(taxAmount)}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>Discount</div>
                    <div>{formatCurrency(discount)}</div>
                  </div>
                  <div className="flex justify-between font-medium">
                    <div>Total</div>
                    <div>{formatCurrency(totalAmount)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={processing}
        >
          Create Rental
        </Button>
      </div>
    </form>
  );
};

export default RentalForm;



