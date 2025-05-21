import { route } from '@/utils/route';

export const menuItems = [
    {
        title: 'Dashboard',
        icon: 'LayoutDashboard',
        href: route('dashboard'),
    },
    {
        title: 'Employees',
        icon: 'Users',
        href: route('employees.index'),
        permission: 'employees.view',
    },
    {
        title: 'Departments',
        icon: 'Building2',
        href: route('departments.index'),
        permission: 'departments.view',
    },
    {
        title: 'Positions',
        icon: 'Briefcase',
        href: route('positions.index'),
        permission: 'positions.view',
    },
    {
        title: 'Leave Requests',
        icon: 'Calendar',
        href: route('leave-requests.index'),
        permission: 'leave-requests.view',
    },
    {
        title: 'Resignations',
        icon: 'LogOut',
        href: route('resignations.index'),
        permission: 'resignations.view',
    },
    {
        title: 'Final Settlements',
        icon: 'FileText',
        href: route('final-settlements.index'),
        permission: 'final-settlements.view',
    },
    {
        title: 'Settings',
        icon: 'Settings',
        href: route('settings.index'),
        permission: 'settings.view',
    },
];
