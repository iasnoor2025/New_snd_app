import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format, differenceInDays, isBefore, addDays } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  CircleDashed,
  Clock,
  FileText,
  Truck,
  X
} from "lucide-react";

interface RentalInfoCardProps {
  rental: {
    id: number;
    rental_number: string;
    status: string;
    start_date: string | null;
    expected_end_date: string | null;
    actual_end_date?: string | null;
    total_amount: number;
    quotation_id?: number | null;
    approved_at?: string | null;
    completed_at?: string | null;
    customer: {
      company_name: string;
    };
  };
}

const RentalInfoCard: React.FC<RentalInfoCardProps> = ({ rental }) => {
  // Calculate rental duration progress
  const calculateProgress = () => {
    if (!rental.start_date || !rental.expected_end_date) return 0;

    const startDate = new Date(rental.start_date);
    const expectedEndDate = new Date(rental.expected_end_date);
    const today = new Date();

    // If rental hasn't started yet
    if (isBefore(today, startDate)) return 0;

    const totalDuration = differenceInDays(expectedEndDate, startDate) || 1; // Avoid division by zero
    const elapsedDuration = differenceInDays(today, startDate);

    if (elapsedDuration < 0) return 0;
    if (elapsedDuration > totalDuration) return 100;

    return Math.round((elapsedDuration / totalDuration) * 100);
  };

  // Check if rental is nearing completion (within 3 days of expected end date)
  const isNearingCompletion = () => {
    if (!rental.expected_end_date || rental.status === 'completed') return false;

    const expectedEndDate = new Date(rental.expected_end_date);
    const today = new Date();
    const daysRemaining = differenceInDays(expectedEndDate, today);

    return daysRemaining >= 0 && daysRemaining <= 3;
  };

  // Get status badge with appropriate color and icon
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>Active</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rental is currently active and equipment is in use</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "pending":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Pending</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rental is pending approval or activation</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "completed":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-green-600 border-green-400 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Completed</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rental has been successfully completed</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "cancelled":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="destructive" className="flex items-center gap-1">
                  <X className="h-3 w-3" />
                  <span>Cancelled</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rental has been cancelled</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "overdue":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="destructive" className="animate-pulse flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  <span>Overdue</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rental period has exceeded the expected end date</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "quotation":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-blue-600 border-blue-400 flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>Quotation</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quotation has been generated and awaiting customer approval</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      case "mobilization":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-orange-600 border-orange-400 flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  <span>Mobilization</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Equipment is being mobilized to the customer location</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <CircleDashed className="h-3 w-3" />
            <span>{status}</span>
          </Badge>
        );
    }
  };

  // Get warning message if rental is nearing completion or overdue
  const getRentalWarningMessage = () => {
    if (rental.status === 'overdue') {
      return (
        <Alert variant="destructive" className="mt-4 animate-pulse">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Rental Overdue</AlertTitle>
          <AlertDescription>
            This rental has exceeded its expected end date. Please take action immediately.
          </AlertDescription>
        </Alert>
      );
    } else if (isNearingCompletion()) {
      return (
        <Alert className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Rental Ending Soon</AlertTitle>
          <AlertDescription>
            This rental is scheduled to end within the next 3 days. Consider extending if needed.
          </AlertDescription>
        </Alert>
      );
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              Rental #{rental.rental_number}
              {getStatusBadge(rental.status)}
            </CardTitle>
            <CardDescription>
              {rental.customer?.company_name || 'Unknown Customer'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {rental.start_date ? format(new Date(rental.start_date), 'PPP') : 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Expected End Date</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {rental.expected_end_date ? format(new Date(rental.expected_end_date), 'PPP') : 'Not set'}
              </p>
            </div>
          </div>

          {rental.status !== 'quotation' && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Rental Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <Progress value={calculateProgress()} className="h-2" />
            </div>
          )}

          {rental.actual_end_date && (
            <div>
              <p className="text-sm font-medium">Actual End Date</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(rental.actual_end_date), 'PPP')}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium">Total Amount</p>
            <p className="text-lg font-semibold">
              {formatCurrency(rental.total_amount)}
            </p>
          </div>
        </div>

        {getRentalWarningMessage()}
      </CardContent>
    </Card>
  );
};

export default RentalInfoCard;
