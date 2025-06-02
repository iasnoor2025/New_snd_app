import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Users,
    Truck,
    FileText,
    DollarSign,
    Wrench,
    UserCog,
    Calendar,
    MapPin,
    BarChart,
    Settings,
    UserPlus,
    ClipboardList,
    Clock,
    Shield,
    FileCheck,
    Briefcase,
    History,
    ShoppingBag,
    User,
    FileDigit,
    Bell,
    Globe,
    Smartphone,
    FolderCheck,
    Network
} from 'lucide-react';
import AppLogo from './app-logo';
import { usePermission } from '../hooks/usePermission';
import type { PageProps } from '../types';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Map module names to their respective icon, route, and required permission
const moduleMap: Record<string, { icon: any; route: string; permission: string; subItems?: Array<{ title: string; route: string; permission: string }> }> = {
    Core: { icon: Network, route: '/core', permission: 'core.view' },
    EmployeeManagement: {
        icon: UserCog,
        route: '/employees',
        permission: 'employees.view',
        subItems: [
            { title: 'Employees', route: '/employees', permission: 'employees.view' },
            { title: 'Salary Increments', route: '/salary-increments', permission: 'salary-increments.view' }
        ]
    },
    LeaveManagement: { icon: ClipboardList, route: '/leave-requests', permission: 'leave-requests.view' },
    TimesheetManagement: { icon: Clock, route: '/timesheets', permission: 'timesheets.view' },
    Payroll: { icon: DollarSign, route: '/payrolls', permission: 'payrolls.view' },
    ProjectManagement: { icon: Briefcase, route: '/projects', permission: 'projects.view' },
    RentalManagement: { icon: Calendar, route: '/rentals', permission: 'rentals.view' },
    EquipmentManagement: { icon: Truck, route: '/equipment', permission: 'equipment.view' },
    Settings: { icon: Settings, route: '/settings', permission: 'settings.view' },
    Notifications: { icon: Bell, route: '/notifications', permission: 'notifications.view' },
    Reporting: { icon: BarChart, route: '/reports', permission: 'reports.view' },
    MobileBridge: { icon: Smartphone, route: '/mobile-bridge', permission: 'mobile-bridge.view' },
    Localization: { icon: Globe, route: '/localization', permission: 'localization.view' },
    CustomerManagement: { icon: Users, route: '/customers', permission: 'customers.view' },
    AuditCompliance: { icon: FolderCheck, route: '/audit', permission: 'audit.view' },
    API: { icon: FileDigit, route: '/api', permission: 'api.view' }
};

// Map module keys to human-friendly display names
const moduleDisplayNames: Record<string, string> = {
    Core: 'Core',
    EmployeeManagement: 'Employee Management',
    LeaveManagement: 'Leave Management',
    TimesheetManagement: 'Timesheet Management',
    Payroll: 'Payroll',
    ProjectManagement: 'Project Management',
    RentalManagement: 'Rental Management',
    EquipmentManagement: 'Equipment Management',
    Settings: 'Settings',
    Notifications: 'Notifications',
    Reporting: 'Reporting',
    MobileBridge: 'Mobile Bridge',
    Localization: 'Localization',
    CustomerManagement: 'Customer Management',
    AuditCompliance: 'Audit & Compliance',
    API: 'API',
};

export function AppSidebar() {
    const { hasPermission, hasRole } = usePermission();
    const pageProps = usePage<PageProps>().props;
    const auth = pageProps?.auth || { user: null };
    const [moduleItems, setModuleItems] = useState<NavItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is admin directly from auth data
    const isAdmin = auth?.user && 'roles' in auth.user && auth.user.roles
        ? auth.user.roles.some((role: any) =>
            (typeof role === 'string' && role === 'admin') ||
            (typeof role === 'object' && role.name === 'admin')
        )
        : false;

    // Check if user is a customer
    const isCustomer = auth?.user && 'is_customer' in auth.user
        ? auth.user.is_customer
        : false;

    // Permission-based sidebar logic
    useEffect(() => {
        const items: NavItem[] = [];
        // Add Dashboard as first item
        items.push({
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        });
        // Add Users and Roles for admins
        if (isAdmin) {
            items.push({
                title: 'Users',
                href: '/users',
                icon: Users,
            });
            items.push({
                title: 'Roles',
                href: '/roles',
                icon: Shield,
            });
        }
        // Get permissions from auth
        const permissions: string[] = (auth?.permissions || []);
        // Admins see all modules
        if (isAdmin) {
            Object.entries(moduleMap).forEach(([module, mapInfo]) => {
                const navItem: NavItem = {
                    title: moduleDisplayNames[module] || module,
                    href: mapInfo.route,
                    icon: mapInfo.icon,
                };

                // Add sub-items if they exist
                if (mapInfo.subItems) {
                    navItem.items = mapInfo.subItems.map(subItem => ({
                        title: subItem.title,
                        href: subItem.route,
                    }));
                }

                items.push(navItem);
            });
        } else {
            Object.entries(moduleMap).forEach(([module, mapInfo]) => {
                if (permissions.includes(mapInfo.permission)) {
                    const navItem: NavItem = {
                        title: moduleDisplayNames[module] || module,
                        href: mapInfo.route,
                        icon: mapInfo.icon,
                    };

                    // Add sub-items if they exist and user has permission
                    if (mapInfo.subItems) {
                        const allowedSubItems = mapInfo.subItems.filter(subItem =>
                            isAdmin || permissions.includes(subItem.permission)
                        );
                        if (allowedSubItems.length > 0) {
                            navItem.items = allowedSubItems.map(subItem => ({
                                title: subItem.title,
                                href: subItem.route,
                            }));
                        }
                    }

                    items.push(navItem);
                }
            });
        }
        setModuleItems(items);
        setIsLoading(false);
    }, [isAdmin, auth?.permissions]);

    // Add Customer Portal link for customers
    useEffect(() => {
        if (isCustomer && !isLoading) {
            setModuleItems(prev => [
                ...prev,
                {
                    title: 'Customer Portal',
                    href: route('customer.dashboard'),
                    icon: User,
                }
            ]);
        }
    }, [isCustomer, isLoading]);

    // Add PWA Management link for all users
    useEffect(() => {
        if (!isLoading) {
            setModuleItems(prev => [
                ...prev,
                {
                    title: 'PWA Management',
                    href: '/pwa',
                    icon: Smartphone,
                }
            ]);
        }
    }, [isLoading]);

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isLoading ? (
                    // Show loading state
                    <div className="px-3 py-2">
                        <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700 mb-4"></div>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-10 w-full animate-pulse rounded bg-gray-100 dark:bg-gray-800 mb-2"></div>
                        ))}
                    </div>
                ) : (
                    <NavMain items={moduleItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
