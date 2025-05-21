import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/Modules/EmployeeManagement/Resources/js/types';
import AdminLayout from '@/Modules/EmployeeManagement/Resources/js/layouts/AdminLayout';
import { Employee as BaseEmployee, Timesheet as BaseTimesheet, LeaveRequest as BaseLeaveRequest, Assignment as BaseAssignment } from '@/Modules/EmployeeManagement/Resources/js/types/models';
import { Breadcrumb } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/card';
import { Button } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/button';
import { Badge } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Modules/EmployeeManagement/Resources/js/components/ui/dialog';
import { Input } from '@/Modules/EmployeeManagement/Resources/js/components/ui/input';
import { Label } from '@/Modules/EmployeeManagement/Resources/js/components/ui/label';
import { ArrowLeft, Edit, Trash2, FileText, Calendar, Check, X, AlertCircle, RefreshCw, ExternalLink, Download, User, Briefcase, CreditCard, FileBox, Upload, Printer, Car, Truck, Award, IdCard, Plus, History, Receipt, XCircle, CheckCircle, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { usePermission } from '@/Modules/EmployeeManagement/Resources/js/hooks/usePermission';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/Modules/EmployeeManagement/Resources/js/components/ui/tooltip';
import { ToastService } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/shared/ToastManager';
import { Alert, AlertDescription } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/ui/alert';
import axios from 'axios';
import { DocumentManager } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/DocumentManager';
import { useQueryClient } from '@tanstack/react-query';
import { Separator } from '@/Modules/EmployeeManagement/Resources/js/components/ui/separator';
import { Avatar, AvatarFallback } from '@/Modules/EmployeeManagement/Resources/js/components/ui/avatar';
import { MediaLibrary } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/media-library/MediaLibrary';
import { DailyTimesheetRecords } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/timesheets/DailyTimesheetRecords';
import { Textarea } from '@/Modules/EmployeeManagement/Resources/js/components/ui/textarea';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Modules/EmployeeManagement/Resources/js/components/ui/pagination';
import { DocumentCard } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/documents/DocumentCard';
import { DocumentSection } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/documents/DocumentSection';
import { DocumentExpiryTracker } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/documents/DocumentExpiryTracker';
import { DocumentUploadDialog } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/documents/DocumentUploadDialog';
import { AdditionalDocumentsList } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/documents/AdditionalDocumentsList';
import { useToast } from '@/Modules/EmployeeManagement/Resources/js/components/ui/use-toast';
import { PaymentHistory } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/advances/PaymentHistory';
import { AssignmentHistory } from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/assignments/AssignmentHistory';
import { toast } from 'sonner';
import FinalSettlementTab from '@/Modules/EmployeeManagement/Resources/js/Modules/EmployeeManagement/Resources/js/components/employees/FinalSettlementTab';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Employees',
    href: '/employees',
  },
  {
    title: 'Employee Details',
    href: '/employees/show',
  },
];

// Extend the Employee interface with additional properties needed in this component
interface Payment {
  id: number;
  amount: number;
  payment_date: string;
  notes: string;
  recorded_by: string;
  advance_payment_id: number;
}

interface Employee extends Omit<BaseEmployee, 'nationality' | 'hourly_rate'> {
  department?: string;
  supervisor?: string;
  erp_employee_id?: string;
  file_number?: string;
  nationality: string;
  iqama_number?: string;
  iqama_expiry?: string;
  passport_number?: string;
  passport_expiry?: string;
  date_of_birth?: string;
  driving_license_number?: string;
  driving_license_expiry?: string;
  operator_license_number?: string;
  operator_license_expiry?: string;
  tuv_certification_number?: string;
  tuv_certification_expiry?: string;
  spsp_license_number?: string;
  spsp_license_expiry?: string;
  hourly_rate: number;
  monthly_deduction?: number;
  current_location?: string;
  payrolls?: {
    id: number;
    salary_month: string;
    paid_date: string | null;
    paid_amount: number;
    is_paid: boolean;
  }[];
  resignations?: {
    id: number;
    last_working_day: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
  }[];
}

// Extend the Timesheet interface with additional properties
interface Timesheet extends BaseTimesheet {
  clock_in?: string;
  clock_out?: string;
  regular_hours?: number;
  status?: string;
}

// Extend the LeaveRequest interface with additional properties
interface LeaveRequest extends BaseLeaveRequest {
  id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: string;
  return_date?: string;
  returner?: {
    id: number;
    name: string;
  };
}

interface Advance {
  id: number;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid' | 'partially_repaid';
  created_at: string;
  rejection_reason?: string;
  repayment_date?: string;
  type: 'advance' | 'advance_payment';
  monthly_deduction?: number;
  repaid_amount?: number;
  remaining_balance?: number;
}

interface MonthlyHistoryItem {
  month: string;
  total_amount: number;
  payments: Payment[];
}

interface Props extends PageProps {
  employee: Employee;
  timesheets: {
    data: any[];
  };
  leaveRequests: {
    data: LeaveRequest[];
  };
  advances: {
    data: Advance[];
  };
  assignments: any;
  finalSettlements: any;
  monthlyHistory: any;
  totalRepaid: number;
  pagination: any;
}

// This component will be used within the Tabs to load documents with error handling
const DocumentTab = ({ employeeId }: { employeeId: number }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [retryCount, setRetryCount] = useState(0);

  // Direct API fetch without DocumentManager
  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setHasError(false);
      setErrorMessage(null);

      try {
        console.log(`Fetching documents for employee ${employeeId}`);
        const response = await axios.get(`/api/employee/${employeeId}/documents?t=${new Date().getTime()}`);

        // If successful, use the documents from the response
        console.log('Document response:', response.data);
        setDocuments(Array.isArray(response.data) ? response.data : []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setHasError(true);
        setErrorMessage("Failed to load documents. Please try again.");
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [employeeId, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading documents...</span>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-md bg-red-50 p-4 border border-red-200">
        <div className="text-center">
          <div className="text-red-600 font-medium">Document Service Error</div>
          <div className="text-red-600 text-sm mt-1">
            {errorMessage || "Failed to load documents. Please try again."}
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={handleRetry}
              className="bg-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If we have no documents, show empty state
  if (documents.length === 0) {
    return (
      <div className="text-center p-8 bg-muted/30 rounded-lg">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">No Documents</h3>
        <p className="text-sm text-muted-foreground mb-6">
          This employee doesn't have any documents uploaded yet.
        </p>
      </div>
    );
  }

  // Render documents list
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base truncate" title={doc.name}>
              {doc.name || 'Unnamed Document'}
            </CardTitle>
            <CardDescription className="text-xs">
              {doc.file_type ? doc.file_type.toUpperCase() : 'Unknown'} â€¢ {formatFileSize(doc.size || 0)}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`/api/employee/${employeeId}/documents/${doc.id}/download`}
                  download
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Download
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this document?')) {
                    axios.delete(`/api/employee/${employeeId}/documents/${doc.id}`)
                      .then(() => {
                        ToastService.success("Document deleted successfully");
                        setRetryCount(prev => prev + 1);
                      })
                      .catch((error) => {
                        ToastService.error("Failed to delete document");
                      });
                  }
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function Show({
  auth,
  employee,
  timesheets,
  leaveRequests,
  advances,
  assignments,
  finalSettlements,
  monthlyHistory: initialMonthlyHistory,
  totalRepaid: initialTotalRepaid,
  pagination: initialPagination
}: Props) {
  // Add console log for debugging
  console.log('Advances data:', advances);
  console.log('Show component assignments:', assignments);

  const [isDeleting, setIsDeleting] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [monthlyDeduction, setMonthlyDeduction] = useState(advances?.data?.[0]?.monthly_deduction?.toString() || '');
  const [advanceReason, setAdvanceReason] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [isAdvanceRequestDialogOpen, setIsAdvanceRequestDialogOpen] = useState(false);
  const [isRepaymentDialogOpen, setIsRepaymentDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdvance, setSelectedAdvance] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [activeTab, setActiveTab] = useState('personal-info');
  const [documentUploadKey, setDocumentUploadKey] = useState(0);
  const { hasPermission } = usePermission();
  const queryClient = useQueryClient();

  // Early return if no valid employee data
  if (!employee?.id) {
    return (
      <AdminLayout title="Employee Details" breadcrumbs={breadcrumbs} requiredPermission="employees.view">
        <Head title="Employee Not Found" />
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 p-4 md:gap-8 md:p-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Employee Not Found</h2>
            <p className="text-sm text-gray-500 mt-2">The requested employee could not be found.</p>
            <Button className="mt-4" asChild>
              <Link href={route('employees.index')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Employees
              </Link>
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const handleAdvanceRequest = () => {
    if (!advanceAmount || isNaN(Number(advanceAmount)) || Number(advanceAmount) <= 0) {
      ToastService.error("Please enter a valid amount");
      return;
    }

    if (!monthlyDeduction || isNaN(Number(monthlyDeduction)) || Number(monthlyDeduction) <= 0) {
      ToastService.error("Please enter a valid monthly deduction amount");
      return;
    }

    if (!advanceReason.trim()) {
      ToastService.error("Please enter a reason for the advance");
      return;
    }

    // Calculate estimated repayment months
    const amount = Number(advanceAmount);
    const deduction = Number(monthlyDeduction);
    const estimatedMonths = Math.ceil(amount / deduction);

    router.post(route('advances.store', { employee: employee.id }), {
      amount: amount,
      monthly_deduction: deduction,
      reason: advanceReason,
      payment_date: format(new Date(), 'yyyy-MM-dd'),
      estimated_months: estimatedMonths
    }, {
      onSuccess: () => {
        setAdvanceAmount('');
        setMonthlyDeduction('');
        setAdvanceReason('');
        setIsAdvanceRequestDialogOpen(false);
        // Force reload to get updated balances
        router.reload();
      },
      onError: (errors) => {
        console.error('Advance request error:', errors);
        ToastService.error(errors?.message || "Failed to process advance request");
      }
    });
  };

  const generatePaySlip = () => {
    router.get(route('employees.payslip', { employee: employee.id, month: selectedMonth }), {});
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setIsDeleting(true);
      router.delete(route('employees.destroy', { employee: employee.id }), {
        onSuccess: () => {
          ToastService.success("Employee deleted successfully");
          window.location.href = route('employees.index');
          setIsDeleting(false);
        },
        onError: () => {
          ToastService.error("Failed to delete employee");
          setIsDeleting(false);
        }
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      case 'on_leave':
        return <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">On Leave</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleRepayment = async (amount: number, activeAdvances: any[]) => {
    try {
      console.log('Sending repayment request:', {
        amount,
        activeAdvances,
        selectedAdvance
      });

      const response = await axios.post(;
        route('advance-payments.repay', {
          advance: selectedAdvance,
        }),
        {
          amount: amount,
          advances: activeAdvances.map(advance => ({
            id: advance.id,
            remainingBalance: advance.remaining_balance !== undefined ?
              Number(advance.remaining_balance) :
              Number(advance.amount) - Number(advance.repaid_amount || 0)
          }))
        }
      );

      console.log('Repayment response:', response.data);

      if (response.data.success) {
        ToastService.success('Repayment recorded successfully');
        setIsRepaymentDialogOpen(false);
        // Force reload to get updated balances
        router.visit(route('employees.show', { employee: employee.id }));
      } else {
        throw new Error(response.data.message || 'Failed to record repayment');
      }
    } catch (error: any) {
      console.error('Repayment error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });

      ToastService.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to record repayment. Please try again.'
      );
    }
  };

  const handleApproveAdvance = (advanceId: number, type: 'advance' | 'advance_payment', status: Advance['status']) => {
    // For advance payments, we need to check if it's not already approved or rejected
    if (type === 'advance_payment' && (status === 'paid')) {
      ToastService.error("This advance payment cannot be approved");
      return;
    }

    // For regular advances, we only check for pending status
    if (type === 'advance' && status !== 'pending') {
      ToastService.error("Only pending advances can be approved");
      return;
    }

    router.post(route('advances.approve', {
      employee: employee.id,
      advance: advanceId
    }), {}, {
      onSuccess: () => {
        ToastService.success("Advance request approved successfully");
        router.reload();
      },
      onError: (errors) => {
        console.error('Approval error:', errors);
        ToastService.error(errors?.message || "Failed to approve advance request");
      }
    });
  };

  const handleRejectAdvance = (advanceId: number, rejectionReason: string) => {
    if (!rejectionReason.trim()) {
      ToastService.error("Please provide a rejection reason");
      return;
    }

    router.post(route('advances.reject', {
      employee: employee.id,
      advance: advanceId
    }), {
      rejection_reason: rejectionReason.trim()
    }, {
      onSuccess: () => {
        ToastService.success("Advance request rejected successfully");
        setRejectionReason('');
        setIsRejectDialogOpen(false);
        router.reload();
      },
      onError: () => {
        ToastService.error("Failed to reject advance request");
      }
    });
  };

  const handleDeleteAdvance = (advanceId: number) => {
    if (!advanceId) {
      ToastService.error("Invalid advance ID");
      return;
    }

    console.log('Deleting advance:', { employeeId: employee.id, advanceId });

    // Log the route parameters
    const routeParams = {
      employee: employee.id,
      advance: advanceId
    };
    console.log('Route parameters:', routeParams);

    // Log the generated URL
    const url = route('advances.destroy', routeParams);
    console.log('Generated URL:', url);

    // Use Inertia's router.delete with the correct route
    router.delete(url, {
      onSuccess: () => {
        ToastService.success("Advance request deleted successfully");
        setIsDeleteDialogOpen(false);
        // Force reload the page to ensure all data is updated
        router.visit(route('employees.show', { employee: employee.id }));
      },
      onError: (errors) => {
        console.error('Delete error:', errors);
        ToastService.error(errors?.message || "Failed to delete advance request");
        setIsDeleteDialogOpen(false);
      }
    });
  };

  // Function to handle tab changes with document loading control
  const handleTabChange = (value: string) => {
    if (value === 'advances' && !hasPermission('advances.view')) {
      toast.error('You do not have permission to view advances');
      return;
    }
    setActiveTab(value);
  };

  // Function to handle document upload dialog
  const handleDocumentUploadSuccess = () => {
    setDocumentUploadKey(prev => prev + 1);
  };

  const getLeaveTypeName = (type: string) => {
    const leaveTypes = {
      annual: 'Annual Leave',
      sick: 'Sick Leave',
      personal: 'Personal Leave',
      unpaid: 'Unpaid Leave',
      maternity: 'Maternity Leave',
      paternity: 'Paternity Leave',
      bereavement: 'Bereavement Leave',
      other: 'Other',
    };
    return leaveTypes[type as keyof typeof leaveTypes] || type;
  };

  // Add these functions to handle view all navigation
  const handleViewAllTimesheets = () => {
    router.get(route('timesheets.index'), {
      employee_id: employee.id
    });
  };

  const handleViewAllLeaveRecords = () => {
    router.get(route('leave-requests.index'), {
      employee_id: employee.id
    });
  };

  // Add this function to handle month change
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
    router.get(route('employees.show', { employee: employee.id }), {
      month: e.target.value
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Add this function to calculate monthly summary
  const calculateMonthlySummary = (timesheets: any[]) => {
    const summary = {
      totalRegularHours: 0,
      totalOvertimeHours: 0,
      totalDays: 0,
      daysWorked: 0,
      daysAbsent: 0,
      daysOnLeave: 0,
      status: {
        approved: 0,
        pending: 0,
        rejected: 0
      } as Record<string, number>
    };

    timesheets.forEach(timesheet => {
      summary.totalRegularHours += Number(timesheet?.regular_hours || timesheet?.hours_worked || 0);
      summary.totalOvertimeHours += Number(timesheet?.overtime_hours || 0);
      summary.daysWorked++;
      if (timesheet?.status) {
        summary.status[timesheet.status] = (summary.status[timesheet.status] || 0) + 1;
      }
    });

    // Calculate total days in month
    const [year, month] = selectedMonth.split('-');
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);
    summary.totalDays = endDate.getDate();

    // Calculate absent days
    summary.daysAbsent = summary.totalDays - summary.daysWorked;

    return summary;
  };

  // Add this function to format daily records
  const formatDailyRecords = (timesheets: any[]) => {
    const [year, month] = selectedMonth.split('-');
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0);
    const daysInMonth = endDate.getDate();

    // Create an array for all days in the month
    const dailyRecords = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(Number(year), Number(month) - 1, i + 1);
      return {
        date: format(date, 'yyyy-MM-dd'),
        day: format(date, 'd'),
        dayName: format(date, 'EEE'),
        regularHours: 0,
        overtimeHours: 0,
        status: 'absent',
        isWeekend: date.getDay() === 0 || date.getDay() === 6 // 0 is Sunday, 6 is Saturday
      };
    });

    // Fill in the timesheet data
    timesheets.forEach(timesheet => {
      const date = format(new Date(timesheet.date), 'yyyy-MM-dd');
      const record = dailyRecords.find(r => r.date === date);
      if (record) {
        record.regularHours = Number(timesheet?.regular_hours || timesheet?.hours_worked || 0);
        record.overtimeHours = Number(timesheet?.overtime_hours || 0);
        record.status = timesheet?.status || 'present';
      }
    });

    return dailyRecords;
  };

  // Add this function to calculate days between dates
  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  // Add this function to get repayment status display
  const getRepaymentStatus = (advance: Advance) => {
    if (advance.status === 'paid') {
      return <Badge variant="outline" className="bg-green-100 text-green-800">Fully Repaid</Badge>;
    }

    if (advance.status === 'partially_repaid' || (advance.status === 'approved' && advance.repaid_amount && Number(advance.repaid_amount) > 0)) {
      const repaidPercent = Math.round((Number(advance.repaid_amount) / Number(advance.amount)) * 100);
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Partially Repaid ({repaidPercent}%)</Badge>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-yellow-500 h-1.5 rounded-full"
              style={{ width: `${repaidPercent}%` }}
            ></div>
          </div>
        </div>
      );
    }

    return <Badge variant={getBadgeVariant(advance.status)}>{advance.status}</Badge>;
  };

  // Helper to get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch(status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'paid':
        return 'default';
      case 'partially_repaid':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleApproveSettlement = (id: number) => {
    if (confirm('Are you sure you want to approve this settlement?')) {
      router.post(route('final-settlements.approve', { settlement: id }), {}, {
        onSuccess: () => {
          ToastService.success('Settlement approved successfully');
        },
        onError: () => {
          ToastService.error('Failed to approve settlement');
        }
      });
    }
  };

  const handleRejectSettlement = (id: number) => {
    if (confirm('Are you sure you want to reject this settlement?')) {
      router.post(route('final-settlements.reject', { settlement: id }), {}, {
        onSuccess: () => {
          ToastService.success('Settlement rejected successfully');
        },
        onError: () => {
          ToastService.error('Failed to reject settlement');
        }
      });
    }
  };

  return (
    <AdminLayout title="Employee Details" breadcrumbs={breadcrumbs} requiredPermission="employees.view">
      <Head title="Employee Details" />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {employee.first_name?.[0]}{employee.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {employee.first_name} {employee.middle_name ? `${employee.middle_name} ` : ''}{employee.last_name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{typeof employee.position === 'object' && employee.position !== null ? employee.position.name : employee.position}</span>
                <span className="text-xs">â€¢</span>
                <span>ID: {employee.employee_id}</span>
                {getStatusBadge(employee.status)}
                <span className="text-xs">â€¢</span>
                <Badge
                  variant="outline"
                  className={
                    !employee.current_location
                      ? 'bg-gray-50 text-gray-500 border-gray-200'
                      : employee.current_location === 'Available'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : employee.current_location === 'Inactive'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : employee.current_location.startsWith('On Leave')
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }
                >
                  {employee.current_location || 'Not Assigned'}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={route('employees.index')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            {hasPermission('employees.edit') && (
              <Button size="sm" asChild>
                <Link href={route('employees.edit', { employee: employee.id })}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
            )}
            {hasPermission('employees.delete') && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
            <Button size="sm" asChild>
              <Link href={route('advances.index', { employee: employee.id })}>
                <CreditCard className="mr-2 h-4 w-4" />
                View Advances
              </Link>
            </Button>
            {hasPermission('resignations.create') && (
              <Button size="sm" asChild>
                <Link href={route('resignations.create', { employee: employee.id })}>
                  <FileText className="mr-2 h-4 w-4" />
                  Submit Resignation
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="personal-info" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="flex w-full justify-between bg-muted/30 p-1 rounded-lg border shadow-sm">
            <TabsTrigger
              value="personal-info"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Personal Info</span>
            </TabsTrigger>
            <TabsTrigger
              value="employment"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Employment</span>
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <FileBox className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Documents</span>
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Assignments</span>
            </TabsTrigger>
            <TabsTrigger
              value="timesheets"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Timesheets</span>
            </TabsTrigger>
            <TabsTrigger
              value="leaves"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Leaves</span>
            </TabsTrigger>
            <TabsTrigger
              value="advances"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Advances</span>
            </TabsTrigger>
            <TabsTrigger
              value="resignations"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Resignations</span>
            </TabsTrigger>
            <TabsTrigger
              value="final-settlements"
              className="flex items-center gap-2 whitespace-nowrap px-3 py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary transition-all duration-200"
            >
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Final Settlement</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Employee's personal and identification details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Full Name</dt>
                          <dd className="text-sm">
                            {employee.first_name} {employee.middle_name ? `${employee.middle_name} ` : ''}{employee.last_name}
                          </dd>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Email</dt>
                          <dd className="text-sm">{employee.user?.email || 'Not set'}</dd>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Phone</dt>
                          <dd className="text-sm">{employee.phone || 'Not set'}</dd>
                        </div>
                        {employee.nationality && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Nationality</dt>
                            <dd className="text-sm">{employee.nationality}</dd>
                          </div>
                        )}
                        {employee.date_of_birth && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Date of Birth</dt>
                            <dd className="text-sm">{format(new Date(employee.date_of_birth), 'PPP')}</dd>
                          </div>
                        )}
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Emergency Contact</h3>
                      {(employee.emergency_contact_name || employee.emergency_contact_phone) ? (
                        <dl className="space-y-2">
                          {employee.emergency_contact_name && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">Name</dt>
                              <dd className="text-sm">{employee.emergency_contact_name}</dd>
                            </div>
                          )}
                          {employee.emergency_contact_phone && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">Phone</dt>
                              <dd className="text-sm">{employee.emergency_contact_phone}</dd>
                            </div>
                          )}
                        </dl>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No emergency contact information</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Identification</h3>
                      <dl className="space-y-2">
                        {employee.iqama_number && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Iqama Number</dt>
                            <dd className="text-sm">{employee.iqama_number}</dd>
                          </div>
                        )}
                        {employee.iqama_expiry && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Iqama Expiry</dt>
                            <dd className="text-sm">{format(new Date(employee.iqama_expiry), 'PPP')}</dd>
                          </div>
                        )}
                        {employee.passport_number && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Passport Number</dt>
                            <dd className="text-sm">{employee.passport_number}</dd>
                          </div>
                        )}
                        {employee.passport_expiry && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Passport Expiry</dt>
                            <dd className="text-sm">{format(new Date(employee.passport_expiry), 'PPP')}</dd>
                          </div>
                        )}
                        {!employee.iqama_number && !employee.passport_number && !employee.date_of_birth && (
                          <p className="text-sm text-muted-foreground italic">No identification information available</p>
                        )}
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Licenses & Certifications</h3>
                      {(employee.driving_license_number ||
                        employee.operator_license_number ||
                        employee.tuv_certification_number ||
                        employee.spsp_license_number) ? (
                        <dl className="space-y-2">
                          {employee.driving_license_number && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">Driving License</dt>
                              <dd className="text-sm">{employee.driving_license_number}</dd>
                            </div>
                          )}
                          {employee.driving_license_expiry && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">License Expiry</dt>
                              <dd className="text-sm">{format(new Date(employee.driving_license_expiry), 'PPP')}</dd>
                            </div>
                          )}
                          {employee.operator_license_number && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">Operator License</dt>
                              <dd className="text-sm">{employee.operator_license_number}</dd>
                            </div>
                          )}
                          {employee.operator_license_expiry && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">Operator License Expiry</dt>
                              <dd className="text-sm">{format(new Date(employee.operator_license_expiry), 'PPP')}</dd>
                            </div>
                          )}
                          {employee.tuv_certification_number && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">TÃœV Certification</dt>
                              <dd className="text-sm">{employee.tuv_certification_number}</dd>
                            </div>
                          )}
                          {employee.tuv_certification_expiry && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">TÃœV Certification Expiry</dt>
                              <dd className="text-sm">{format(new Date(employee.tuv_certification_expiry), 'PPP')}</dd>
                            </div>
                          )}
                          {employee.spsp_license_number && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">SPSP License</dt>
                              <dd className="text-sm">{employee.spsp_license_number}</dd>
                            </div>
                          )}
                          {employee.spsp_license_expiry && (
                            <div className="flex justify-between border-b pb-2">
                              <dt className="text-sm font-medium">SPSP License Expiry</dt>
                              <dd className="text-sm">{format(new Date(employee.spsp_license_expiry), 'PPP')}</dd>
                            </div>
                          )}
                        </dl>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No licenses or certifications available</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employment Details</CardTitle>
                <CardDescription>Work-related information and position details</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Position Information</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Employee ID</dt>
                          <dd className="text-sm">{employee.employee_id}</dd>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">File Number</dt>
                          <dd className="text-sm">{employee.file_number || "Not assigned"}</dd>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Position</dt>
                          <dd className="text-sm">{typeof employee.position === 'object' && employee.position !== null ? employee.position.name : employee.position}</dd>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Department</dt>
                          <dd className="text-sm">{employee.department || 'Not assigned'}</dd>
                        </div>
                        {employee.supervisor && (
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Supervisor</dt>
                            <dd className="text-sm">{employee.supervisor}</dd>
                          </div>
                        )}
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Status</dt>
                          <dd className="text-sm">{getStatusBadge(employee.status)}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Employment Timeline</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Hire Date</dt>
                          <dd className="text-sm">{format(new Date(employee.hire_date), 'PPP')}</dd>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Service Period</dt>
                          <dd className="text-sm">
                            {(() => {
                              const hireDate = new Date(employee.hire_date);
                              const today = new Date();

                              let years = today.getFullYear() - hireDate.getFullYear();
                              let months = today.getMonth() - hireDate.getMonth();
                              let days = today.getDate() - hireDate.getDate();

                              // Adjust for negative months or days
                              if (days < 0) {
                                months--;
                                const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                                days += lastMonth.getDate();
                              }
                              if (months < 0) {
                                years--;
                                months += 12;
                              }

                              const parts = [];
                              if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
                              if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
                              if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);

                              return parts.join(', ') || 'Less than a day';
                            })()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Salary & Benefits</h3>
                    <div className="bg-muted/30 rounded-lg p-5 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Basic Salary</span>
                        <span className="text-base font-semibold">SAR {Number(employee.basic_salary).toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-muted h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <dl className="space-y-2">
                      <div className="flex justify-between border-b pb-2">
                        <dt className="text-sm font-medium">Hourly Rate</dt>
                        <dd className="text-sm">SAR {Number(employee.hourly_rate).toFixed(2)}</dd>
                      </div>
                      {Number(employee.food_allowance) > 0 && (
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Food Allowance</dt>
                          <dd className="text-sm">SAR {Number(employee.food_allowance).toFixed(2)}</dd>
                        </div>
                      )}
                      {Number(employee.housing_allowance) > 0 && (
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Housing Allowance</dt>
                          <dd className="text-sm">SAR {Number(employee.housing_allowance).toFixed(2)}</dd>
                        </div>
                      )}
                      {Number(employee.transport_allowance) > 0 && (
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Transport Allowance</dt>
                          <dd className="text-sm">SAR {Number(employee.transport_allowance).toFixed(2)}</dd>
                        </div>
                      )}
                      {Number(employee.absent_deduction_rate) > 0 && (
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Absent Deduction Rate</dt>
                          <dd className="text-sm">{Number(employee.absent_deduction_rate).toFixed(2)}%</dd>
                        </div>
                      )}
                      {(employee.overtime_rate_multiplier || employee.overtime_fixed_rate) && (
                        <div className="flex justify-between border-b pb-2">
                          <dt className="text-sm font-medium">Overtime Rate</dt>
                          <dd className="text-sm">
                            {employee.overtime_rate_multiplier
                              ? `${Number(employee.overtime_rate_multiplier).toFixed(2)}x regular rate`
                              : employee.overtime_fixed_rate
                                ? `SAR ${Number(employee.overtime_fixed_rate).toFixed(2)}/hour`
                                : 'Not set'}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Payroll History</h3>
                      <div className="space-y-4">
                        {employee.payrolls && employee.payrolls.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Paid Date</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {employee.payrolls.map((payroll) => (
                                <TableRow key={payroll.id}>
                                  <TableCell>{format(new Date(payroll.salary_month), 'MMMM yyyy')}</TableCell>
                                  <TableCell>SAR {Number(payroll.paid_amount).toFixed(2)}</TableCell>
                                  <TableCell>
                                    {payroll.paid_date
                                      ? format(new Date(payroll.paid_date), 'PPP')
                                      : 'Pending'
                                    }
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={payroll.is_paid ? "success" : "secondary"}
                                      className={
                                        payroll.is_paid
                                          ? 'bg-green-50 text-green-700 border-green-200'
                                          : 'bg-gray-50 text-gray-500 border-gray-200'
                                      }
                                    >
                                      {payroll.is_paid ? 'Paid' : 'Pending'}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No payroll records found</p>
                        )}
                      </div>
                    </div>

                    {Number(employee.advance_payment) > 0 && (
                      <div className="mt-4 p-3 bg-destructive/10 rounded-md border border-destructive/20">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-destructive">Advance Payment Balance</p>
                          <p className="text-base font-semibold text-destructive">SAR {Number(employee.advance_payment).toFixed(2)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-6">
            {/* Document Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Document Overview</CardTitle>
                    <CardDescription>Employee's document status and expiry tracking</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {employee.status === 'active' ? 'Active Employee' : 'Inactive Employee'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Document Status Summary */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Document Status</h3>
                    </div>
                    <div className="space-y-2">
                      {(() => {
                        // Calculate document statistics
                        const documents = [;
                          { name: 'Iqama', expiry: employee.iqama_expiry, number: employee.iqama_number },
                          { name: 'Passport', expiry: employee.passport_expiry, number: employee.passport_number },
                          { name: 'Driving License', expiry: employee.driving_license_expiry, number: employee.driving_license_number },
                          { name: 'Operator License', expiry: employee.operator_license_expiry, number: employee.operator_license_number },
                          { name: 'TÃœV Certification', expiry: employee.tuv_certification_expiry, number: employee.tuv_certification_number },
                          { name: 'SPSP License', expiry: employee.spsp_license_expiry, number: employee.spsp_license_number },
                        ].filter(doc => doc.number); // Only count documents that have a number

                        const now = new Date();
                        const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));

                        const validDocuments = documents.filter(doc => {
                          if (!doc.expiry) return false;
                          const expiryDate = new Date(doc.expiry);
                          return expiryDate > now;
                        });

                        const expiringSoon = documents.filter(doc => {
                          if (!doc.expiry) return false;
                          const expiryDate = new Date(doc.expiry);
                          return expiryDate > now && expiryDate <= thirtyDaysFromNow;
                        });

                        const expiredDocuments = documents.filter(doc => {
                          if (!doc.expiry) return false;
                          const expiryDate = new Date(doc.expiry);
                          return expiryDate <= now;
                        });

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Total Documents</span>
                              <span className="text-sm font-medium">{documents.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Valid Documents</span>
                              <span className="text-sm font-medium text-green-600">{validDocuments.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Expiring Soon</span>
                              <span className="text-sm font-medium text-amber-600">{expiringSoon.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Expired</span>
                              <span className="text-sm font-medium text-destructive">{expiredDocuments.length}</span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Next Expiry */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Next Expiry</h3>
                    </div>
                    <div className="space-y-2">
                      {(() => {
                        const documents = [;
                          { name: 'Iqama', expiry: employee.iqama_expiry, number: employee.iqama_number },
                          { name: 'Passport', expiry: employee.passport_expiry, number: employee.passport_number },
                          { name: 'Driving License', expiry: employee.driving_license_expiry, number: employee.driving_license_number },
                          { name: 'Operator License', expiry: employee.operator_license_expiry, number: employee.operator_license_number },
                          { name: 'TÃœV Certification', expiry: employee.tuv_certification_expiry, number: employee.tuv_certification_number },
                          { name: 'SPSP License', expiry: employee.spsp_license_expiry, number: employee.spsp_license_number },
                        ].filter(doc => doc.number && doc.expiry); // Only consider documents with both number and expiry

                        if (documents.length === 0) {
                          return (
                            <div className="text-center py-2">
                              <p className="text-sm text-muted-foreground">No documents with expiry dates</p>
                            </div>
                          );
                        }

                        // Find the next expiring document
                        const now = new Date();
                        const nextExpiring = documents;
                          .filter(doc => new Date(doc.expiry!) > now);
                          .sort((a, b) => new Date(a.expiry!).getTime() - new Date(b.expiry!).getTime())[0];

                        if (!nextExpiring) {
                          return (
                            <div className="text-center py-2">
                              <p className="text-sm text-muted-foreground">All documents expired</p>
                            </div>
                          );
                        }

                        const expiryDate = new Date(nextExpiring.expiry!);
                        const daysRemaining = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                        return (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Document</span>
                              <span className="text-sm font-medium">{nextExpiring.name}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Expiry Date</span>
                              <span className={`text-sm font-medium ${daysRemaining <= 30 ? 'text-amber-600' : 'text-green-600'}`}>
                                {daysRemaining} days remaining
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Document Actions */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium">Quick Actions</h3>
                    </div>
                    <div className="space-y-2">
                      <DocumentUploadDialog
                        employeeId={employee.id}
                        documentType="additional"
                        isAdditional={true}
                        buttonText="Upload Additional Document"
                        acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                        onSuccess={() => {
                          setDocumentUploadKey(prev => prev + 1);
                          queryClient.invalidateQueries({ queryKey: ['employee-documents', employee.id] });
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          window.location.href = `/api/employee/${employee.id}/documents/download-all`;
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download All Documents
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={async () => {
                          try {
                            const response = await axios.get(`/api/employee/${employee.id}/documents/print-summary`, {
                              responseType: 'blob',
                              headers: {
                                'Accept': 'application/pdf'
                              }
                            });

                            // Create a blob from the response data
                            const blob = new Blob([response.data], { type: 'application/pdf' });

                            // Create a URL for the blob
                            const url = window.URL.createObjectURL(blob);

                            // Open the PDF in a new tab
                            window.open(url, '_blank');

                            // Clean up the URL after a delay
                            setTimeout(() => {
                              window.URL.revokeObjectURL(url);
                            }, 1000);
                          } catch (error) {
                            console.error('Error generating document summary:', error);
                            ToastService.error('Failed to generate document summary');
                          }
                        }}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Print Document Summary
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Documents Section */}
            <DocumentSection
              title="Legal Documents"
              description="Official identification and legal documents"
              badgeText="Required Documents"
              badgeClassName="bg-blue-50 text-blue-700 border-blue-200"
            >
              <DocumentCard
                title="Iqama"
                documentNumber={employee.iqama_number}
                documentType="iqama"
                employeeId={employee.id}
                icon={<IdCard className="h-4 w-4 text-muted-foreground" />}
                previewSize="id_card"
                documentName="IQAMA"
              />
              <DocumentCard
                title="Passport"
                documentNumber={employee.passport_number}
                documentType="passport"
                employeeId={employee.id}
                icon={<IdCard className="h-4 w-4 text-muted-foreground" />}
                previewSize="id_card"
                documentName="Passport"
              />
            </DocumentSection>

            {/* Licenses Section */}
            <DocumentSection
              title="Licenses & Certifications"
              description="Professional licenses and certifications"
              badgeText="Professional Documents"
              badgeClassName="bg-purple-50 text-purple-700 border-purple-200"
            >
              <DocumentCard
                title="Driving License"
                documentNumber={employee.driving_license_number}
                documentType="driving_license"
                employeeId={employee.id}
                icon={<Car className="h-4 w-4" />}
                previewSize="id_card"
                documentName="Driving License"
              />
              <DocumentCard
                title="Operator License"
                documentNumber={employee.operator_license_number}
                documentType="operator_license"
                employeeId={employee.id}
                icon={<Truck className="h-4 w-4" />}
                previewSize="id_card"
                documentName="Operator License"
              />
              <DocumentCard
                title="TUV Certification"
                documentNumber={employee.tuv_certification_number}
                documentType="tuv_certification"
                employeeId={employee.id}
                icon={<Award className="h-4 w-4" />}
                previewSize="id_card"
                documentName="TUV Certification"
              />
              <DocumentCard
                title="SPSP License"
                documentNumber={employee.spsp_license_number}
                documentType="spsp_license"
                employeeId={employee.id}
                icon={<Award className="h-4 w-4" />}
                previewSize="id_card"
                documentName="SPSP License"
              />
            </DocumentSection>

            {/* Additional Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Documents</CardTitle>
                <CardDescription>
                  Upload and manage additional documents for this employee.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdditionalDocumentsList
                  employeeId={employee.id}
                  onUploadSuccess={() => {
                    // Refresh the page data if needed
                    router.reload();
                  }}
                  onDeleteSuccess={() => {
                    // Refresh the page data if needed
                    router.reload();
                  }}
                />
              </CardContent>
            </Card>

            {/* Document Expiry Tracker */}
            <DocumentExpiryTracker
              documents={[
                { name: 'Iqama', expiry: employee.iqama_expiry, number: employee.iqama_number },
                { name: 'Passport', expiry: employee.passport_expiry, number: employee.passport_number },
                { name: 'Driving License', expiry: employee.driving_license_expiry, number: employee.driving_license_number },
                { name: 'Operator License', expiry: employee.operator_license_expiry, number: employee.operator_license_number },
                { name: 'TÃœV Certification', expiry: employee.tuv_certification_expiry, number: employee.tuv_certification_number },
                { name: 'SPSP License', expiry: employee.spsp_license_expiry, number: employee.spsp_license_number },
              ]}
            />
          </TabsContent>

          <TabsContent value="assignments" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>View and manage employee assignments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Search assignments..."
                      className="w-64"
                    />
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Assignment List */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {assignments?.data?.map((assignment) => (
                      <Card key={assignment.id}>
                        <CardHeader>
                          <CardTitle>{assignment.title}</CardTitle>
                          <CardDescription>{assignment.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-blue-500 text-white">{assignment.status}</Badge>
                              <span className="text-sm">{assignment.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <Link href={route('assignments.show', { assignment: assignment.id })}>
                                  View Details
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timesheets" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Timesheet Records</CardTitle>
                    <CardDescription>View and manage employee timesheet records</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      className="w-40"
                    />
                    <Button variant="outline" onClick={handleViewAllTimesheets}>
                      <History className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Monthly Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Total Regular Hours</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {calculateMonthlySummary(timesheets.data).totalRegularHours.toFixed(1)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Total Overtime Hours</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {calculateMonthlySummary(timesheets.data).totalOvertimeHours.toFixed(1)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Days Worked</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {calculateMonthlySummary(timesheets.data).daysWorked}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Days Absent</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {calculateMonthlySummary(timesheets.data).daysAbsent}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Daily Records */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Records</CardTitle>
                      <CardDescription>
                        Timesheet entries for {format(new Date(selectedMonth), 'MMMM yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DailyTimesheetRecords
                        timesheets={formatDailyRecords(timesheets.data)}
                        selectedMonth={selectedMonth}
                        showSummary={true}
                      />
                    </CardContent>
                  </Card>

                  {/* Status Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Status Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(calculateMonthlySummary(timesheets.data).status).map(([status, count]) => (
                          <div key={status} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <span className="text-sm font-medium capitalize">{status}</span>
                            <Badge variant="outline" className="ml-2">
                              {count}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaves" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Leave History</CardTitle>
                    <CardDescription>View and manage employee leave records</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleViewAllLeaveRecords}>
                      <History className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Leave Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Total Leaves</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {leaveRequests.data.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Approved Leaves</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {leaveRequests.data.filter(req => req.status === 'approved').length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Pending Leaves</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {leaveRequests.data.filter(req => req.status === 'pending').length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Rejected Leaves</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold">
                          {leaveRequests.data.filter(req => req.status === 'rejected').length}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Leave Records */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Leave Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaveRequests.data.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="capitalize">{getLeaveTypeName(request.leave_type)}</TableCell>
                              <TableCell>{format(new Date(request.start_date), 'PP')}</TableCell>
                              <TableCell>{format(new Date(request.end_date), 'PP')}</TableCell>
                              <TableCell>{calculateDays(request.start_date, request.end_date)} days</TableCell>
                              <TableCell>
                                <Badge variant={
                                  request.status === 'approved' ? 'default' :
                                  request.status === 'rejected' ? 'destructive' :
                                  'secondary'
                                }>
                                  {request.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={route('leave-requests.show', { leaveRequest: request.id })}>
                                    View Details
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          {leaveRequests.data.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center text-muted-foreground">
                                No leave requests found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advances" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Advance Payment Management</CardTitle>
                    <CardDescription>Track and manage employee advance payments and deductions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAdvanceRequestDialogOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      New Advance
                    </Button>
                    <Dialog open={isRepaymentDialogOpen} onOpenChange={setIsRepaymentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className="flex items-center gap-2"
                          onClick={() => {
                            // Get all active advances
                            const activeAdvances = advances?.data?.filter(;
                              (advance: Advance) => advance.status === 'approved' || advance.status === 'partially_repaid';
                            );

                            if (activeAdvances && activeAdvances.length > 0) {
                              // Calculate total remaining balance and monthly deduction
                              const totalRemainingBalance = activeAdvances.reduce((total: number, advance: Advance) => {
                                const remainingBalance = advance.remaining_balance !== undefined ?;
                                  Number(advance.remaining_balance) :;
                                  Number(advance.amount) - Number(advance.repaid_amount || 0);
                                return total + remainingBalance;
                              }, 0);

                              const totalMonthlyDeduction = activeAdvances.reduce((total: number, advance: Advance) => {
                                return total + Number(advance.monthly_deduction || 0);
                              }, 0);

                              // Set the initial repayment amount to total monthly deduction
                              setRepaymentAmount(totalMonthlyDeduction.toString());

                              // Store all active advances for repayment
                              setSelectedAdvance(activeAdvances[0].id); // We'll use the first advance ID as a reference
                            } else {
                              toast.error("No active advances available for repayment");
                              return;
                            }
                          }}
                        >
                          <CreditCard className="h-4 w-4" />
                          Make Repayment
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Record Repayment</DialogTitle>
                          <DialogDescription>
                            Enter the repayment amount. For partial repayments, the amount must be at least the total monthly deduction.
                          </DialogDescription>
                        </DialogHeader>
                        {selectedAdvance && (
                          <div className="space-y-4">
                            {(() => {
                              // Get all active advances
                              const activeAdvances = advances?.data?.filter(;
                                (advance: Advance) => advance.status === 'approved' || advance.status === 'partially_repaid';
                              );

                              if (!activeAdvances || activeAdvances.length === 0) {
                                return (
                                  <div className="text-center p-6">
                                    <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No Active Advances</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      There are no active advances available for repayment.
                                    </p>
                                    <Button variant="outline" onClick={() => setIsRepaymentDialogOpen(false)}>
                                      Close
                                    </Button>
                                  </div>
                                );
                              }

                              // Calculate total remaining balance and monthly deduction
                              const totalRemainingBalance = activeAdvances.reduce((total: number, advance: Advance) => {
                                const remainingBalance = advance.remaining_balance !== undefined ?;
                                  Number(advance.remaining_balance) :;
                                  Number(advance.amount) - Number(advance.repaid_amount || 0);
                                return total + remainingBalance;
                              }, 0);

                              const totalMonthlyDeduction = activeAdvances.reduce((total: number, advance: Advance) => {
                                return total + Number(advance.monthly_deduction || 0);
                              }, 0);

                              return (
                                <>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="font-medium">Total Remaining Balance:</span>
                                      <p>SAR {totalRemainingBalance.toFixed(2)}</p>
                                    </div>
                                    <div>
                                      <span className="font-medium">Total Monthly Deduction:</span>
                                      <p>SAR {totalMonthlyDeduction.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="repayment-amount">Repayment Amount</Label>
                                    <Input
                                      id="repayment-amount"
                                      type="number"
                                      value={repaymentAmount}
                                      onChange={(e) => setRepaymentAmount(e.target.value)}
                                      min={totalMonthlyDeduction}
                                      max={totalRemainingBalance}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                      Minimum: SAR {totalMonthlyDeduction.toFixed(2)}
                                      <br />
                                      Maximum: SAR {totalRemainingBalance.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline" onClick={() => setIsRepaymentDialogOpen(false)}>
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        if (!repaymentAmount) {
                                          ToastService.error('Please enter a repayment amount');
                                          return;
                                        }

                                        const amount = Number(repaymentAmount);
                                        if (amount < totalMonthlyDeduction) {
                                          ToastService.error(`Repayment amount must be at least the total monthly deduction of SAR ${totalMonthlyDeduction.toFixed(2)}`);
                                          return;
                                        }

                                        if (amount > totalRemainingBalance) {
                                          ToastService.error(`Repayment amount cannot exceed the total remaining balance of SAR ${totalRemainingBalance.toFixed(2)}`);
                                          return;
                                        }

                                        // Log the data being sent
                                        console.log('Sending repayment data:', {
                                          employeeId: employee.id,
                                          amount: amount,
                                          totalRemainingBalance,
                                          totalMonthlyDeduction,
                                          activeAdvances: activeAdvances.map(advance => ({
                                            id: advance.id,
                                            remainingBalance: advance.remaining_balance !== undefined ?
                                              Number(advance.remaining_balance) :
                                              Number(advance.amount) - Number(advance.repaid_amount || 0)
                                          }))
                                        });

                                        handleRepayment(amount, activeAdvances);
                                      }}
                                    >
                                      Record Repayment
                                    </Button>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Current Balance Card */}
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
                      <Badge variant="outline" className="bg-muted/50">
                        {Number(employee.advance_payment) > 0 ? 'Active' : 'No Balance'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold text-destructive">
                        SAR {Number(employee.advance_payment).toFixed(2)}
                      </p>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-destructive h-2 rounded-full transition-all duration-500"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Monthly Deduction Card */}
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Monthly Deduction</h3>
                      <Badge variant="outline" className="bg-muted/50">Configurable</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="1.00"
                          min="0"
                          value={monthlyDeduction}
                          onChange={(e) => {
                            const value = e.target.value;
                            setMonthlyDeduction(value);

                            // Only send request if value is valid
                            if (value && !isNaN(Number(value)) && Number(value) >= 0) {
                              // Calculate estimated repayment months
                              const amount = Number(advanceAmount) || 0;
                              const deduction = Number(value);
                              const estimatedMonths = deduction > 0 ? Math.ceil(amount / deduction) : 0;

                              router.patch(route('advances.monthly-deduction', { employee: employee.id }), {
                                monthly_deduction: Number(value),
                                estimated_months: estimatedMonths
                              }, {
                                preserveScroll: true,
                                preserveState: true,
                                onSuccess: () => {
                                  // Update the advances data to reflect the new monthly deduction
                                  const updatedAdvances = {
                                    ...advances,
                                    data: advances.data.map((advance, index) => {
                                      if (index === 0) {
                                        return {
                                          ...advance,
                                          monthly_deduction: Number(value)
                                        };
                                      }
                                      return advance;
                                    })
                                  };
                                  // Force reload to ensure all data is updated
                                  router.reload();
                                },
                                onError: (errors) => {
                                  // Revert the value if there's an error
                                  setMonthlyDeduction(advances?.data?.[0]?.monthly_deduction?.toString() || '');
                                  ToastService.error(errors?.message || "Failed to update monthly deduction");
                                },
                                onCancel: () => {
                                  // Revert the value if request is cancelled
                                  setMonthlyDeduction(advances?.data?.[0]?.monthly_deduction?.toString() || '');
                                }
                              });
                            }
                          }}
                          onBlur={(e) => {
                            // Validate on blur
                            const value = e.target.value;
                            if (!value || isNaN(Number(value)) || Number(value) < 0) {
                              setMonthlyDeduction(advances?.data?.[0]?.monthly_deduction?.toString() || '');
                              ToastService.error("Please enter a valid monthly deduction amount");
                            }
                          }}
                          className="text-2xl font-bold text-primary w-32"
                          placeholder="0.00"
                        />
                        <span className="text-2xl font-bold text-primary">SAR</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Current Monthly Deduction:</span>
                        <span className="font-medium">
                          SAR {Number(advances?.data?.[0]?.monthly_deduction || 0).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Company will decide the monthly deduction amount
                      </p>
                    </div>
                  </div>

                  {/* Estimated Repayment Card */}
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Estimated Repayment</h3>
                      <Badge variant="outline" className="bg-muted/50">Projected</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <p className="text-2xl font-bold text-primary">
                          {monthlyDeduction ? Math.ceil(Number(employee.advance_payment) / Number(monthlyDeduction)) : 0}
                          <span className="text-sm font-normal text-muted-foreground ml-1">months</span>
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on current balance and monthly deduction
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advance History Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Advance History</h3>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Search advances..."
                        className="w-64"
                      />
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Amount</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {advances?.data && advances.data.length > 0 ? (
                          advances.data
                            .sort((a: Advance, b: Advance) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                            .map((advance: Advance) => (
                              <TableRow key={`${advance.type}-${advance.id}`}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    {advance.type === 'advance_payment' && advance.amount < 0 ? (
                                      <span className="text-red-600">SAR {Math.abs(Number(advance.amount)).toFixed(2)}</span>
                                    ) : (
                                      <span>SAR {Number(advance.amount).toFixed(2)}</span>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{advance.reason}</TableCell>
                                <TableCell>{format(new Date(advance.created_at), 'PP')}</TableCell>
                                <TableCell>
                                  {getRepaymentStatus(advance)}
                                </TableCell>
                                <TableCell className="capitalize">
                                  {advance.type === 'advance' ? 'Request' :
                                   advance.amount < 0 ? 'Repayment' : 'Payment'}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    {advance.status === 'pending' && (
                                      <>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                                onClick={() => handleApproveAdvance(advance.id, advance.type, advance.status)}
                                              >
                                                <Check className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Approve</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => {
                                                  setSelectedAdvance(advance.id);
                                                  setIsRejectDialogOpen(true);
                                                }}
                                              >
                                                <X className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>Reject</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </>
                                    )}
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => {
                                              setSelectedAdvance(advance.id);
                                              setIsDeleteDialogOpen(true);
                                            }}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Delete</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <div className="flex flex-col items-center gap-2">
                                <CreditCard className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">No advance records found</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Payment History Section */}
                <div className="mt-8 space-y-4">
                  {/* <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Payment History</h3>
                  </div> */}

                  <PaymentHistory
                    employeeId={employee.id}
                    initialMonthlyHistory={initialMonthlyHistory}
                    initialTotalRepaid={initialTotalRepaid}
                    initialPagination={initialPagination}
                    showOnlyLast={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="final-settlements" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Final Settlement</CardTitle>
                <CardDescription>Manage employee's final settlement and clearance</CardDescription>
              </CardHeader>
              <CardContent>
                {employee.hasApprovedResignation ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Settlement Details</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Last Working Day</dt>
                            <dd className="text-sm">
                              {employee.resignations?.find(r => r.status === 'approved')?.last_working_day || 'Not set'}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Leave Balance</dt>
                            <dd className="text-sm">
                              {employee.leave_balance || 0} days
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Leave Encashment</dt>
                            <dd className="text-sm">
                              SAR {employee.leave_balance * (employee.basic_salary / 30) || 0}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Unpaid Salary</dt>
                            <dd className="text-sm">
                              SAR {employee.unpaid_salary || 0}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Unpaid Overtime</dt>
                            <dd className="text-sm">
                              SAR {employee.unpaid_overtime || 0}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Deductions</dt>
                            <dd className="text-sm">
                              SAR {employee.deductions || 0}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <dt className="text-sm font-medium">Gratuity</dt>
                            <dd className="text-sm">
                              SAR {employee.gratuity || 0}
                            </dd>
                          </div>
                          <div className="flex justify-between border-b pb-2 font-semibold">
                            <dt className="text-sm">Total Payable</dt>
                            <dd className="text-sm">
                              SAR {employee.total_payable || 0}
                            </dd>
                          </div>
                        </dl>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">Settlement Status</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Status</span>
                            <Badge variant={employee.settlement_status === 'completed' ? 'default' : 'secondary'}>
                              {employee.settlement_status || 'Pending'}
                            </Badge>
                          </div>
                          {employee.settlement_notes && (
                            <div className="text-sm text-muted-foreground">
                              <p className="font-medium mb-1">Notes:</p>
                              <p>{employee.settlement_notes}</p>
                            </div>
                          )}
                          {employee.settlement_agreement_terms && (
                            <div className="text-sm text-muted-foreground">
                              <p className="font-medium mb-1">Agreement Terms:</p>
                              <p>{employee.settlement_agreement_terms}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Settlement
                      </Button>
                      {hasPermission('final-settlements.approve') && (
                        <Button onClick={handleApproveSettlement}>
                          <Check className="mr-2 h-4 w-4" />
                          Approve Settlement
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Final settlement is only available for employees with approved resignations.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resignations" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resignation History</CardTitle>
                <CardDescription>View and manage resignation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Last Working Day</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.resignations?.map((resignation) => (
                      <TableRow key={resignation.id}>
                        <TableCell>
                          {format(new Date(resignation.last_working_day), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="max-w-md truncate">
                          {resignation.reason}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(resignation.status)}
                        </TableCell>
                        <TableCell>
                          {format(new Date(resignation.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <Link href={route('resignations.show', { resignation: resignation.id })}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!employee.resignations || employee.resignations.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No resignation requests found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Advance Request Dialog */}
        <Dialog open={isAdvanceRequestDialogOpen} onOpenChange={setIsAdvanceRequestDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Advance</DialogTitle>
              <DialogDescription>
                Enter the advance payment details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (SAR)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="monthlyDeduction">Monthly Deduction (SAR)</Label>
                <Input
                  id="monthlyDeduction"
                  type="number"
                  step="0.01"
                  min="0"
                  value={monthlyDeduction}
                  onChange={(e) => setMonthlyDeduction(e.target.value)}
                  placeholder="Enter monthly deduction amount"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={advanceReason}
                  onChange={(e) => setAdvanceReason(e.target.value)}
                  placeholder="Enter reason for advance"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdvanceRequestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdvanceRequest}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Advance Request</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this advance request.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              selectedAdvance && handleRejectAdvance(selectedAdvance, rejectionReason);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="rejectionReason">Rejection Reason</Label>
                  <Input
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection"
                    required
                  />
                </div>
              </div>
              <DialogFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!rejectionReason.trim()}
                >
                  Confirm Rejection
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Advance Record</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this advance record? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedAdvance) {
                    handleDeleteAdvance(selectedAdvance);
                  } else {
                    ToastService.error("No advance selected for deletion");
                  }
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}


