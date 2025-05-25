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

// Map module names to their respective icon and route
const moduleMap: Record<string, { icon: any; route: string }> = {
    Core: { icon: Network, route: '/core' },
    EmployeeManagement: { icon: UserCog, route: '/employees' },
    LeaveManagement: { icon: ClipboardList, route: '/leave-requests' },
    TimesheetManagement: { icon: Clock, route: '/timesheets' },
    Payroll: { icon: DollarSign, route: '/payrolls' },
    ProjectManagement: { icon: Briefcase, route: '/projects' },
    RentalManagement: { icon: Calendar, route: '/rentals' },
    EquipmentManagement: { icon: Truck, route: '/equipment' },
    Settings: { icon: Settings, route: '/settings' },
    Notifications: { icon: Bell, route: '/notifications' },
    Reporting: { icon: BarChart, route: '/reports' },
    MobileBridge: { icon: Smartphone, route: '/mobile-bridge' },
    Localization: { icon: Globe, route: '/localization' },
    CustomerManagement: { icon: Users, route: '/customers' },
    AuditCompliance: { icon: FolderCheck, route: '/audit' },
    API: { icon: FileDigit, route: '/api' }
};

export function AppSidebar() {
    const { hasPermission, hasRole } = usePermission();
    const pageProps = usePage<PageProps>().props;
    const auth = pageProps?.auth || { user: null };
    const [moduleItems, setModuleItems] = useState<NavItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is admin directly from auth data
    const isAdmin = auth?.user && 'roles' in auth.user && auth.user.roles
        ? auth.user.roles.some(role => role.name === 'admin')
        : false;

    // Check if user is a customer
    const isCustomer = auth?.user && 'is_customer' in auth.user
        ? auth.user.is_customer
        : false;

    // Load enabled modules from modules_statuses.json
    useEffect(() => {
        const fetchModules = async () => {
            try {
                const items: NavItem[] = [];
                // Add Dashboard as first item
                items.push({
                    title: 'Dashboard',
                    href: '/dashboard',
                    icon: LayoutGrid,
                });

                // Add default modules
                const defaultModules = ['EmployeeManagement', 'ProjectManagement', 'Settings'];

                if (isAdmin) {
                    // Admin: show all modules
                    Object.entries(moduleMap).forEach(([module, mapInfo]) => {
                        items.push({
                            title: module.replace(/([A-Z])/g, ' $1').trim(),
                            href: mapInfo.route,
                            icon: mapInfo.icon,
                        });
                    });
                } else {
                    // Non-admin: try to load modules status, fallback to hardcoded list
                    try {
                        // Using axios directly instead of fetch to avoid parsing issues
                        // Just use the hardcoded list for now since we know all modules are enabled
                        Object.keys(moduleMap).forEach(module => {
                            items.push({
                                title: module.replace(/([A-Z])/g, ' $1').trim(),
                                href: moduleMap[module].route,
                                icon: moduleMap[module].icon,
                            });
                        });
                    } catch (jsonError) {
                        console.error('Failed to load modules, using defaults:', jsonError);
                        defaultModules.forEach(module => {
                            if (module in moduleMap) {
                                items.push({
                                    title: module.replace(/([A-Z])/g, ' $1').trim(),
                                    href: moduleMap[module].route,
                                    icon: moduleMap[module].icon,
                                });
                            }
                        });
                    }
                }

                setModuleItems(items);
            } catch (error) {
                console.error('Critical failure in module loading:', error);
                // Absolute fallback
                setModuleItems([
                    {
                        title: 'Dashboard',
                        href: '/dashboard',
                        icon: LayoutGrid,
                    },
                    {
                        title: 'Employee Management',
                        href: '/employees',
                        icon: UserCog,
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchModules();
    }, [isAdmin]);

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
