import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { LayoutGrid, Folder, Users, Truck, FileText, DollarSign, Wrench, UserCog, Calendar,
    MapPin, BarChart, Settings, UserPlus, ClipboardList, Clock, Shield, FileCheck, Briefcase,
    History, ShoppingBag, User, FileDigit, Bell, Globe, Smartphone, FolderCheck, Network
} from 'lucide-react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Map module names to icons and routes (same as in app-sidebar.tsx)
const moduleMap: Record<string, { icon: any; route: string; description: string }> = {
    Core: {
        icon: Network,
        route: '/core',
        description: 'Core system functionality and settings'
    },
    EmployeeManagement: {
        icon: UserCog,
        route: '/employees',
        description: 'Manage employees, roles and responsibilities'
    },
    LeaveManagement: {
        icon: ClipboardList,
        route: '/leave-requests',
        description: 'Track and approve leave requests'
    },
    TimesheetManagement: {
        icon: Clock,
        route: '/timesheets',
        description: 'Monitor time entries and approvals'
    },
    Payroll: {
        icon: DollarSign,
        route: '/payrolls',
        description: 'Process payroll and manage compensation'
    },
    ProjectManagement: {
        icon: Briefcase,
        route: '/projects',
        description: 'Manage projects, tasks and milestones'
    },
    RentalManagement: {
        icon: Calendar,
        route: '/rentals',
        description: 'Track equipment rentals and availability'
    },
    EquipmentManagement: {
        icon: Truck,
        route: '/equipment',
        description: 'Manage equipment inventory and maintenance'
    },
    Settings: {
        icon: Settings,
        route: '/settings',
        description: 'Configure system preferences and options'
    },
    Notifications: {
        icon: Bell,
        route: '/notifications',
        description: 'Manage system and user notifications'
    },
    Reporting: {
        icon: BarChart,
        route: '/reports',
        description: 'Generate and view business reports'
    },
    MobileBridge: {
        icon: Smartphone,
        route: '/mobile-bridge',
        description: 'Mobile app integration and connectivity'
    },
    Localization: {
        icon: Globe,
        route: '/localization',
        description: 'Manage languages and localizations'
    },
    CustomerManagement: {
        icon: Users,
        route: '/customers',
        description: 'Manage customer accounts and data'
    },
    AuditCompliance: {
        icon: FolderCheck,
        route: '/audit',
        description: 'Track compliance and system audits'
    },
    API: {
        icon: FileDigit,
        route: '/api',
        description: 'API integrations and management'
    }
};

export default function Dashboard() {
    const { auth } = usePage<any>().props;
    const isAdmin = auth?.user?.roles?.some((role: any) => role.name === 'admin');
    const [moduleCards, setModuleCards] = useState<Array<{
        name: string;
        icon: any;
        route: string;
        description: string;
    }>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                let cards;
                if (isAdmin) {
                    // Admin: show all modules
                    cards = Object.entries(moduleMap).map(([module, mapInfo]) => ({
                        name: module.replace(/([A-Z])/g, ' $1').trim(),
                        icon: mapInfo.icon,
                        route: mapInfo.route,
                        description: mapInfo.description
                    }));
                } else {
                    // Non-admin: show only enabled modules
                    const response = await fetch('/modules_statuses.json');
                    const data = await response.json();
                    cards = Object.entries(data)
                        .filter(([_, enabled]) => enabled)
                        .map(([module, _]) => {
                            const mapInfo = moduleMap[module] || {
                                icon: Folder,
                                route: `/modules/${module.toLowerCase()}`,
                                description: `${module.replace(/([A-Z])/g, ' $1').trim()} module`
                            };
                            return {
                                name: module.replace(/([A-Z])/g, ' $1').trim(),
                                icon: mapInfo.icon,
                                route: mapInfo.route,
                                description: mapInfo.description
                            };
                        });
                }
                setModuleCards(cards);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to load modules:', error);
                setIsLoading(false);
            }
        };
        fetchModules();
    }, [isAdmin]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold tracking-tight mb-4">Welcome to the System Dashboard</h1>

                {isLoading ? (
                    // Loading placeholders
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="h-[150px] animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"></div>
                        ))}
                    </div>
                ) : moduleCards.length > 0 ? (
                    // Module cards
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {moduleCards.map((module) => (
                            <Link key={module.name} href={module.route}>
                                <Card className="border-sidebar-border/70 dark:border-sidebar-border h-full transition-all hover:shadow-md hover:border-sidebar-accent/50">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-lg font-medium">{module.name}</CardTitle>
                                        {module.icon && <module.icon className="h-5 w-5 text-muted-foreground" />}
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            {module.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                ) : (
                    // No modules found
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[40vh] flex-1 overflow-hidden rounded-xl border md:min-h-min flex items-center justify-center">
                        <div className="text-center">
                            <Folder className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-lg font-medium">No modules available</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Contact your administrator to enable modules.</p>
                        </div>
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

