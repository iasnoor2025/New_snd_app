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
    User
} from 'lucide-react';
import AppLogo from './app-logo';
import { usePermission } from '@/hooks/usePermission';
import { PageProps } from '@/types';

export function AppSidebar() {
    const { hasPermission, hasRole } = usePermission();
    const pageProps = usePage<PageProps>().props;
    const auth = pageProps?.auth || { user: null };

    // Check if user is admin directly from auth data
    const isAdmin = auth?.user && 'roles' in auth.user
        ? auth.user.roles.some(role => role.name === 'admin')
        : false;

    // Check if user is a customer
    const isCustomer = auth?.user && 'is_customer' in auth.user
        ? auth.user.is_customer
        : false;

    // Extend NavItem type for items with children
    interface NavItemWithChildren extends NavItem {
        children?: {
            title: string;
            href: string;
        }[];
    }

    const mainNavItems: NavItemWithChildren[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Projects',
            href: '/projects',
            icon: Briefcase,
            children: [
                {
                    title: 'All Projects',
                    href: '/projects',
                },
                {
                    title: 'Project Resources',
                    href: '/projects/resources',
                },
            ],
        },
        {
            title: 'Customers',
            href: '/customers',
            icon: Users,
        },
        {
            title: 'Equipment',
            href: '/equipment',
            icon: Truck,
        },
        {
            title: 'Rentals',
            href: '/rentals',
            icon: Calendar,
        },
        {
            title: 'Rental History',
            href: '/rental-history',
            icon: History,
        },
        {
            title: 'Quotations',
            href: '/quotations',
            icon: FileCheck,
        },
        {
            title: 'Invoices',
            href: '/invoices',
            icon: FileText,
        },
        {
            title: 'Payments',
            href: '/payments',
            icon: DollarSign,
        },
        {
            title: 'Payment Dashboard',
            href: '/payments/dashboard',
            icon: BarChart,
        },
        {
            title: 'Maintenance',
            href: '/maintenance',
            icon: Wrench,
        },
        {
            title: 'Employees',
            href: '/employees',
            icon: UserCog,
        },
        {
            title: 'Leave Requests',
            href: '/leave-requests',
            icon: ClipboardList,
        },
        {
            title: 'Timesheets',
            href: '/timesheets',
            icon: Clock,
        },
        {
            title: 'Payroll',
            href: '/payrolls',
            icon: DollarSign,
        },
        {
            title: 'Users',
            href: '/users',
            icon: UserPlus,
        },
        {
            title: 'Locations',
            href: '/locations',
            icon: MapPin,
        },
        {
            title: 'Reports',
            href: '/reports',
            icon: BarChart,
        },
        {
            title: 'Role Management',
            href: '/settings/roles',
            icon: Settings,
        },
        {
            title: 'Documents Test',
            href: '/test/documents',
            icon: Folder,
        },
    ];

    // Add Customer Portal link for customers
    if (isCustomer) {
        mainNavItems.push({
            title: 'Customer Portal',
            href: route('customer.dashboard'),
            icon: User,
        })
    }

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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}


