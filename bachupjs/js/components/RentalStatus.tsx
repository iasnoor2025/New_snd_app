import React, { useState } from "react";
import { Rental } from "@/types/models";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import axios from "axios";

// ShadCN UI Components
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons
import {
  CalendarCheck,
  CheckCircle,
  CircleDashed,
  Clock,
  FileText,
  PackageCheck,
  Receipt,
  Truck,
  AlertCircle,
  DollarSign,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

interface RentalStatusProps {
  rental: Rental;
  className?: string;
  currentStatusStep?: number;
  onGenerateQuotation?: () => void;
}

export default function RentalStatus({ rental, className = "", currentStatusStep, onGenerateQuotation }: RentalStatusProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Determine the current workflow step based on rental status and properties
  const determineCurrentStep = () => {
    // If currentStatusStep is provided, use it
    if (currentStatusStep !== undefined) return currentStatusStep;

    // First check if there's a quotation
    const hasQuotation = !!(rental?.quotation_id || (rental?.quotation && typeof rental.quotation === 'object'));
    const quotationApproved = !!(rental.quotation?.approved_at);

    switch (rental.status) {
      case "pending":
        return 0;
      case "quotation":
        return 1;
      case "quotation_approved":
        return 2;
      case "mobilization":
        return 3;
      case "mobilization_completed":
        return 4;
      case "active":
        return 5;
      case "completed":
        return 6;
      case "invoice_prepared":
        return 7;
      case "overdue":
        // If there's an actual end date, it's post-completion overdue (payment overdue)
        return rental.actual_end_date ? 7 : 5;
      case "closed":
        return 7;
      default:
        return 0;
    }
  };

  const currentStep = determineCurrentStep();

  // Define workflow steps with their properties
  const workflowSteps = [;
    {
      name: "Pending",
      icon: <Clock className="h-4 w-4" />,
      description: "Rental is created and pending quotation",
      date: rental.created_at ? format(new Date(rental.created_at), "MMM dd, yyyy") : null,
    },
    {
      name: "Quotation Created",
      icon: <FileText className="h-4 w-4" />,
      description: "Quotation generated",
      date: rental.quotation?.created_at ? format(new Date(rental.quotation.created_at), "MMM dd, yyyy") : null,
    },
    {
      name: "Quotation Approved",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "Quotation approved",
      date: rental.quotation?.approved_at ? format(new Date(rental.quotation.approved_at), "MMM dd, yyyy") : null,
    },
    {
      name: "Mobilization",
      icon: <Truck className="h-4 w-4" />,
      description: "Equipment mobilization",
      date: rental.mobilization_date ? format(new Date(rental.mobilization_date), "MMM dd, yyyy") : null,
    },
    {
      name: "Mobilization Completed",
      icon: <Truck className="h-4 w-4" />,
      description: "Mobilization completed",
      date: rental.mobilization_date ? format(new Date(rental.mobilization_date), "MMM dd, yyyy") : null,
    },
    {
      name: "Active",
      icon: <PackageCheck className="h-4 w-4" />,
      description: "Rental in progress",
      date: rental.start_date ? format(new Date(rental.start_date), "MMM dd, yyyy") : null,
    },
    {
      name: "Completed",
      icon: <CalendarCheck className="h-4 w-4" />,
      description: "Rental completed",
      date: rental.actual_end_date ? format(new Date(rental.actual_end_date), "MMM dd, yyyy") : null,
    },
    {
      name: "Invoice Prepared",
      icon: <Receipt className="h-4 w-4" />,
      description: "Invoice generated",
      date: rental.invoice_date ? format(new Date(rental.invoice_date), "MMM dd, yyyy") : null,
    }
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    return format(now, "MMMM dd, yyyy");
  };

  const handleGenerateQuotation = () => {
    // Prevent multiple clicks
    if (isGenerating) return;

    // Check if rental has items
    if (!rental.rentalItems || rental.rentalItems.length === 0) {
      toast.error("Cannot generate quotation: This rental has no items. Please add items first.");
      return;
    }

    // Set loading state
    setIsGenerating(true);

    // Show loading indicator
    toast.loading("Generating quotation, please wait...", {
      id: "generate-quotation"
    })

    try {
      // If the parent component has provided a handler, use that
      if (onGenerateQuotation) {
        onGenerateQuotation();
        return;
      }

      // Get the URL for direct quotation generation
      const quotationUrl = route("rentals.direct-generate-quotation", rental.id);

      // Log the action for debugging


      // The simplest, most direct approach - hard navigation
      window.location.href = quotationUrl;
    } catch (error) {
      console.error("Error in quotation generation:", error);
      toast.error("Failed to generate quotation. Please try again.", { id: "generate-quotation" })
      setIsGenerating(false);
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-2 flex justify-between flex-row items-center">
        <div>
          <CardTitle className="text-lg">Current progress of your rental</CardTitle>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          {rental.created_at ? format(new Date(rental.created_at), "MMM dd, yyyy HH:mm:ss a") : getCurrentDateTime()}
        </div>
      </CardHeader>
      <CardContent>
        {/* Horizontal Step Indicators */}
        <div className="flex items-center justify-between mb-6 relative">
          {/* Progress line connecting steps */}
          <div className="absolute h-[1px] bg-muted left-0 right-0 top-1/2 transform -translate-y-1/2 z-0"></div>
          <div
            className="absolute h-[1px] bg-primary left-0 top-1/2 transform -translate-y-1/2 z-0"
            style={{ width: `${Math.max(0, (currentStep / (workflowSteps.length - 1)) * 100)}%` }}
          ></div>

          {workflowSteps.map((step, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="z-10 flex flex-col items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                        index === currentStep
                          ? "border-primary bg-white text-primary"
                          : index < currentStep
                          ? "border-primary bg-primary text-white"
                          : "border-muted bg-white text-muted-foreground"
                      )}
                      {index === currentStep ? (
                        <div className="h-3 w-3 bg-primary rounded-full"></div>
                      ) : index < currentStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-3 w-3 bg-muted rounded-full"></div>
                      )}
                    </div>
                    <div className={cn(
                      "text-xs mt-1.5 font-medium",
                      index === currentStep ? "text-primary" : "text-muted-foreground"
                    )}>
                      {step.name}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{step.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Current Step Card */}
        <div className={cn(
          "border rounded-lg p-5 border-muted bg-background",
          currentStep === 0 && rental.status === "pending" ? "shadow-md border-primary/50" : ""
        )}>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 rounded-full p-1.5 bg-primary text-white">
              {workflowSteps[currentStep].icon}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2">
                  <span>{workflowSteps[currentStep].name}</span>
                </h3>
                <Badge className="bg-black">Current</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {workflowSteps[currentStep].description}
              </p>
              {workflowSteps[currentStep].date && (
                <p className="text-xs text-muted-foreground mt-2">{workflowSteps[currentStep].date}</p>
              )}
              {currentStep === 0 && rental.status === "pending" && (
                <div className="mt-4">
                  <a
                    href={route("rentals.direct-generate-quotation", rental.id)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 shadow-lg border-2 border-black h-10 px-4 py-2"
                    style={{ padding: "1.25rem", fontSize: "0.95rem" }}
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Quotation
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

