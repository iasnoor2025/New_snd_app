import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AdminLayout from '@/layouts/AdminLayout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
    Customer,
    Equipment,
    Rental,
    Invoice,
    Payment,
    Employee,
    MaintenanceRecord,
    User,
    Role,
    LeaveRequest,
    Timesheet,
    Project
} from '@/types/models';
import { formatCurrency, formatDate } from '@/utils/format';
import { Button } from '@/components/ui/button';
import { usePermission } from '@/hooks/usePermission';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Users,
    Building2,
    Wrench,
    FileText,
    CreditCard,
    UserCheck,
    ClipboardList,
    CalendarDays,
    Clock,
    Calendar,
    TrendingUp,
    DollarSign,
    Activity,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Bell,
    MoreVertical,
    Filter,
    Download,
    RefreshCw,
    Settings,
    ZoomIn,
    ZoomOut,
    Maximize2,
    Minimize2,
    MapPin,
    Eye,
    Check,
    X,
    ChevronLeft,
    Plus,
    Briefcase
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import { useState, useEffect } from 'react';
import { AdvancedAnalytics } from '@/components/dashboard/AdvancedAnalytics';
import { RealTimeNotifications } from '@/components/dashboard/RealTimeNotifications';
import { useDebounce } from '@/hooks/useDebounce';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, parseISO, getWeek } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    stats: {
        clients: number;
        equipment: number;
        rentals: number;
        invoices: number;
        payments: number;
        maintenance: number;
        employees: number;
        users: number;
        locations?: number;
        roles?: number;
        leaveRequests?: number;
        timesheets?: number;
        projects?: number;
    };
    recentRentals: {
        id: number;
        rental_number: string;
        customer_name: string;
        start_date: string;
        status: string;
        total_amount: number;
    }[];
    recentInvoices: {
        id: number;
        invoice_number: string;
        customer_name: string;
        invoice_date: string;
        status: string;
        total_amount: number;
    }[];
    recentPayments: {
        id: number;
        payment_number: string;
        customer_name: string;
        invoice_number: string;
        payment_date: string;
        amount: number;
    }[];
    recentLeaveRequests?: {
        id: number;
        employee_name: string;
        start_date: string;
        end_date: string;
        status: string;
        type: string;
    }[];
    recentTimesheets?: {
        id: number;
        employee_name: string;
        date: string;
        hours: number;
        status: string;
    }[];
    monthlyRevenue: {
        month: string;
        total: number;
    }[];
    equipmentStatus: {
        status: string;
        count: number;
    }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const VacationCalendar = ({ leaveRequests }: { leaveRequests: any[] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    })

    const getLeaveRequestsForDate = (date: Date) => {
        return leaveRequests.filter(leave => {
            const startDate = new Date(leave.start_date);
            const endDate = new Date(leave.end_date);
            return date >= startDate && date <= endDate;
        })
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Vacation Calendar</CardTitle>
                    <CardDescription>View employee leave requests</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium p-2">
                            {day}
                        </div>
                    ))}
                    {days.map(day => {
                        const leaveRequestsForDay = getLeaveRequestsForDate(day);
                        return (
                            <div
                                key={day.toISOString()}
                                className={`p-2 min-h-[80px] border rounded-lg ${
                                    day.getMonth() === currentMonth.getMonth()
                                        ? 'bg-background'
                                        : 'bg-muted/50'
                                }`}
                            >
                                <div className="text-sm font-medium mb-1">
                                    {format(day, 'd')}
                                </div>
                                <div className="space-y-1">
                                    {leaveRequestsForDay.map(leave => (
                                        <div
                                            key={leave.id}
                                            className={`text-xs p-1 rounded ${getStatusColor(leave.status)}`}
                                        >
                                            {leave.employee_name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default function Dashboard({
    stats = {
        clients: 0,
        equipment: 0,
        rentals: 0,
        invoices: 0,
        payments: 0,
        maintenance: 0,
        employees: 0,
        users: 0,
        locations: 0,
        roles: 0,
        leaveRequests: 0,
        timesheets: 0,
        projects: 0
    },
    recentRentals = [],
    recentInvoices = [],
    recentPayments = [],
    recentLeaveRequests = [],
    recentTimesheets = [],
    monthlyRevenue = [],
    equipmentStatus = []
}: Props) {
    const { hasPermission } = usePermission();
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState('all');
    const [activeTab, setActiveTab] = useState('rentals');
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New Rental', message: 'A new rental agreement has been created', time: '5 minutes ago', type: 'info' },
        { id: 2, title: 'Payment Received', message: 'Payment received for invoice #1234', time: '1 hour ago', type: 'success' },
    ]);

    // Add new state for quick actions
    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
    const [showNewEquipmentModal, setShowNewEquipmentModal] = useState(false);
    const [showNewRentalModal, setShowNewRentalModal] = useState(false);
    const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);

    // Add new state for chart interactivity
    const [chartZoom, setChartZoom] = useState(1);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Add new state for advanced analytics
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);

    // Add new state for vacation calendar
    const [showVacationCalendar, setShowVacationCalendar] = useState(false);

    // Add new handlers for quick actions
    const handleCreateCustomer = () => {
        router.visit(route('customers.create'));
    };

    const handleNewEquipment = () => {
        router.visit(route('equipment.create'));
    };

    const handleNewRental = () => {
        router.visit(route('rentals.create'));
    };

    const handleNewInvoice = () => {
        router.visit(route('invoices.create'));
    };

    const handleNewEmployee = () => {
        router.visit(route('employees.create'));
    };

    const handleNewLeaveRequest = () => {
        router.visit(route('leave-requests.create'));
    };

    const handleNewTimesheet = () => {
        router.visit(route('timesheets.create'));
    };

    const handleNewLocation = () => {
        router.visit(route('locations.create'));
    };

    const handleNewProject = () => {
        router.visit(route('projects.create'));
    };

    // Add new handlers for notifications
    const handleViewAllNotifications = () => {
        router.visit(route('notifications.index'));
    };

    const handleClearNotifications = () => {
        setNotifications([]);
    };

    // Add new handler for settings
    const handleSettings = () => {
        router.visit('/settings/profile');
    };

    // Add new handler for export
    const handleExport = () => {
        const format = 'csv'; // You can make this configurable
        const date = new Date().toISOString().split('T')[0];
        const filename = `dashboard-export-${date}.${format}`;

        // Create CSV content
        const csvContent = [
            ['Type', 'Number', 'Customer', 'Date', 'Status', 'Amount'],
            ...recentRentals.map(rental => [
                'Rental',
                rental.rental_number,
                rental.customer_name,
                rental.start_date,
                rental.status,
                rental.total_amount
            ]),
            ...recentInvoices.map(invoice => [
                'Invoice',
                invoice.invoice_number,
                invoice.customer_name,
                invoice.invoice_date,
                invoice.status,
                invoice.total_amount
            ])
        ].map(row => row.join(',')).join('\n');

        // Create and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Helper function to get status badge
    const getStatusBadge = (status: string) => {
        if (!status) return <Badge variant="secondary">Unknown</Badge>

        switch (status.toLowerCase()) {
            case 'active':
                return <Badge variant="default">{status}</Badge>
            case 'pending':
                return <Badge variant="secondary">{status}</Badge>
            case 'completed':
                return <Badge variant="outline">{status}</Badge>
            case 'cancelled':
                return <Badge variant="destructive">{status}</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    // Helper function to get invoice status badge
    const getInvoiceStatusBadge = (status: string) => {
        if (!status) return <Badge variant="secondary">Unknown</Badge>

        switch (status.toLowerCase()) {
            case 'paid':
                return <Badge variant="default">{status}</Badge>
            case 'sent':
                return <Badge variant="outline">{status}</Badge>
            case 'overdue':
                return <Badge variant="destructive">{status}</Badge>
            case 'draft':
                return <Badge variant="secondary">{status}</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    };

    // Get current date in Saudi Arabia format
    const currentDate = formatDate(new Date().toISOString(), 'dddd, DD MMMM YYYY');

    // Helper function to refresh data
    const refreshData = () => {
        setIsLoading(true);
        router.reload({ preserveUrl: true })
    };

    // Add chart zoom handlers
    const handleZoomIn = () => {
        setChartZoom(prev => Math.min(prev + 0.1, 2));
    };

    const handleZoomOut = () => {
        setChartZoom(prev => Math.max(prev - 0.1, 0.5));
    };

    // Add full-screen handler
    const handleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    // Add notification handler
    const handleNewNotification = (notification: any) => {
        setNotifications(prev => [notification, ...prev]);
    };

    // Add notification clear handler
    const handleClearNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // Add notification mark as read handler
    const handleMarkAsRead = (id: number) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    // Add notification badge color based on type
    const getNotificationBadgeColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    const { user } = useAuth();

    return (
        <AdminLayout
            title="Dashboard"
            breadcrumbs={breadcrumbs}
            header={undefined}
            user={user}
        >
            <Head title="Dashboard" />
            <div className="flex-1 space-y-4 p-8 pt-6 overflow-auto">
                {/* Welcome Section */}
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here's what's happening with your business today.
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 w-[200px]"
                            />
                        </div>
                        <RealTimeNotifications />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={refreshData}>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Refresh
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExport}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setShowAdvancedAnalytics(!showAdvancedAnalytics)}>
                                    <TrendingUp className="mr-2 h-4 w-4" />
                                    {showAdvancedAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setShowVacationCalendar(!showVacationCalendar)}>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {showVacationCalendar ? 'Hide Calendar' : 'Show Calendar'}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSettings}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                {/* Customer & Sales */}
                                <div className="flex items-center gap-1.5 pr-4 border-r border-border/40">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleCreateCustomer}
                                    >
                                        <Users className="h-4 w-4 mr-1.5" />
                                        Customer
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewInvoice}
                                    >
                                        <DollarSign className="h-4 w-4 mr-1.5" />
                                        Invoice
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewRental}
                                    >
                                        <FileText className="h-4 w-4 mr-1.5" />
                                        Rental
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                </div>

                                {/* Equipment & Location */}
                                <div className="flex items-center gap-1.5 px-4 border-r border-border/40">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewEquipment}
                                    >
                                        <Wrench className="h-4 w-4 mr-1.5" />
                                        Equipment
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewLocation}
                                    >
                                        <MapPin className="h-4 w-4 mr-1.5" />
                                        Location
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                </div>

                                {/* HR & Employee Management */}
                                <div className="flex items-center gap-1.5 px-4 border-r border-border/40">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewEmployee}
                                    >
                                        <Users className="h-4 w-4 mr-1.5" />
                                        Employee
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewLeaveRequest}
                                    >
                                        <Calendar className="h-4 w-4 mr-1.5" />
                                        Leave
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewTimesheet}
                                    >
                                        <Clock className="h-4 w-4 mr-1.5" />
                                        Timesheet
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                </div>

                                {/* Project Management */}
                                <div className="flex items-center gap-1.5 pl-4">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 px-3 bg-black hover:bg-black/80 text-white border-border/40"
                                        onClick={handleNewProject}
                                    >
                                        <Briefcase className="h-4 w-4 mr-1.5" />
                                        Project
                                        <Plus className="h-4 w-4 ml-1.5" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Stats Overview */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">{stats.clients || 0}</div>
                                <p className="text-xs text-muted-foreground">Active customers</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">{stats.projects || 0}</div>
                                <p className="text-xs text-muted-foreground">Active projects</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">{stats.rentals || 0}</div>
                                <p className="text-xs text-muted-foreground">Current rentals</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(monthlyRevenue.reduce((acc, curr) => acc + curr.total, 0))}
                                </div>
                                <p className="text-xs text-muted-foreground">Total revenue</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">{stats.employees || 0}</div>
                                <p className="text-xs text-muted-foreground">Active employees</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Currently on Vacation</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">
                                    {recentLeaveRequests?.filter(leave => {
                                        const today = new Date();
                                        const startDate = new Date(leave.start_date);
                                        const endDate = new Date(leave.end_date);
                                        return leave.status === 'approved' && today >= startDate && today <= endDate;
                                    }).length || 0}
                                </div>
                                <p className="text-xs text-muted-foreground">Active vacations</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Timesheets</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">{stats.timesheets || 0}</div>
                                <p className="text-xs text-muted-foreground">Submitted timesheets</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Locations</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-2xl font-bold">{stats.locations || 0}</div>
                                <p className="text-xs text-muted-foreground">Active locations</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Breakdown</CardTitle>
                        <CardDescription>Revenue by projects and rentals</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyRevenue}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="month"
                                        className="text-sm"
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <YAxis
                                        className="text-sm"
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <Tooltip
                                        formatter={(value) => formatCurrency(Number(value))}
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '0.5rem',
                                        }}
                                        labelStyle={{
                                            color: 'hsl(var(--foreground))',
                                        }}
                                    />
                                    <Bar
                                        dataKey="project_revenue"
                                        name="Project Revenue"
                                        fill="hsl(var(--primary))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="rental_revenue"
                                        name="Rental Revenue"
                                        fill="hsl(var(--secondary))"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value) => (
                                            <span className="text-sm text-muted-foreground">{value}</span>
                                        )}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Advanced Analytics */}
                {showAdvancedAnalytics && (
                    <AdvancedAnalytics
                        data={{
                            revenue: monthlyRevenue.map(item => ({
                                date: item.month,
                                amount: item.total,
                                growth: 0, // You'll need to calculate this
                            })),
                            equipment: equipmentStatus.map(item => ({
                                category: item.status,
                                count: item.count,
                                utilization: 0, // You'll need to calculate this
                            })),
                            customers: [], // You'll need to provide this data
                            maintenance: [], // You'll need to provide this data
                        }}
                        isLoading={isLoading}
                    />
                )}

                {/* Charts Section */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className={isFullScreen ? 'fixed inset-0 z-50 m-0 h-screen w-screen' : ''}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Monthly Revenue</CardTitle>
                                <CardDescription>Revenue trends over the past months</CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Select value={dateRange} onValueChange={setDateRange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select time range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Time</SelectItem>
                                        <SelectItem value="month">This Month</SelectItem>
                                        <SelectItem value="quarter">This Quarter</SelectItem>
                                        <SelectItem value="year">This Year</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                                    <ZoomIn className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                                    <ZoomOut className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleFullScreen}>
                                    {isFullScreen ? (
                                        <Minimize2 className="h-4 w-4" />
                                    ) : (
                                        <Maximize2 className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <Skeleton className="h-[300px] w-full" />
                                </div>
                            ) : (
                                <div
                                    className="h-[300px]"
                                    style={{
                                        transform: `scale(${chartZoom})`,
                                        transformOrigin: 'center center'
                                    }}
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={monthlyRevenue}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="month"
                                                className="text-sm"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <YAxis
                                                className="text-sm"
                                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            />
                                            <Tooltip
                                                formatter={(value) => formatCurrency(Number(value))}
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '0.5rem',
                                                }}
                                                labelStyle={{
                                                    color: 'hsl(var(--foreground))',
                                                }}
                                            />
                                            <Bar
                                                dataKey="total"
                                                fill="hsl(var(--primary))"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Equipment Status</CardTitle>
                            <CardDescription>Current status of all equipment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="h-[300px] flex items-center justify-center">
                                    <Skeleton className="h-[300px] w-full" />
                                </div>
                            ) : (
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={equipmentStatus}
                                                dataKey="count"
                                                nameKey="status"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {equipmentStatus.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={COLORS[index % COLORS.length]}
                                                    />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                labelStyle={{
                                                    color: 'hsl(var(--foreground))',
                                                }}
                                                itemStyle={{
                                                    color: 'hsl(var(--foreground))',
                                                }}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                formatter={(value) => (
                                                    <span className="text-sm text-muted-foreground">{value}</span>
                                                )}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Vacation Calendar */}
                {showVacationCalendar && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Vacation Calendar</CardTitle>
                            <CardDescription>View employee leave requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <VacationCalendar leaveRequests={recentLeaveRequests || []} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </AdminLayout>
    );
}
