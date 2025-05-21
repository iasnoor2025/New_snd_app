import { DashboardData } from '@/types/dashboard';

export const mockDashboardData: DashboardData = {
    systemData: {
        status: 'operational',
        metrics: {
            cpu: 45,
            memory: 60,
            disk: 75,
        },
        activity: [
            {
                id: 1,
                user: {
                    id: 1,
                    name: 'John Doe',
                },
                role: {
                    id: 1,
                    name: 'Admin',
                },
                action: 'User Login',
                description: 'User logged in successfully',
                metadata: {},
                created_at: '2024-03-09T12:00:00Z',
                updated_at: '2024-03-09T12:00:00Z',
            },
            {
                id: 2,
                user: {
                    id: 2,
                    name: 'Jane Smith',
                },
                role: {
                    id: 2,
                    name: 'Manager',
                },
                action: 'Role Update',
                description: 'Updated role permissions',
                metadata: {},
                created_at: '2024-03-09T11:30:00Z',
                updated_at: '2024-03-09T11:30:00Z',
            },
        ],
    },
    users: {
        total: 100,
        active: 80,
        inactive: 20,
        recent: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                created_at: '2024-03-09T12:00:00Z',
                roles: [
                    {
                        id: 1,
                        name: 'Admin',
                    },
                ],
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                created_at: '2024-03-09T11:30:00Z',
                roles: [
                    {
                        id: 2,
                        name: 'Manager',
                    },
                ],
            },
        ],
    },
    roles: {
        total: 5,
        distribution: [
            {
                name: 'Admin',
                count: 10,
            },
            {
                name: 'Manager',
                count: 20,
            },
            {
                name: 'Employee',
                count: 70,
            },
        ],
    },
    metrics: {
        system_health: {
            cpu_trend: [45, 50, 48, 52, 47, 45, 49, 51, 46, 45],
            memory_trend: [60, 62, 58, 65, 63, 60, 64, 61, 59, 60],
            disk_trend: [75, 76, 74, 77, 75, 78, 76, 75, 74, 75],
        },
        user_activity: {
            logins_today: 50,
            active_users: 80,
            recent_registrations: 5,
        },
        recent_activity: [
            {
                id: 1,
                user: {
                    id: 1,
                    name: 'John Doe',
                },
                role: {
                    id: 1,
                    name: 'Admin',
                },
                action: 'User Login',
                description: 'User logged in successfully',
                metadata: {},
                created_at: '2024-03-09T12:00:00Z',
                updated_at: '2024-03-09T12:00:00Z',
            },
            {
                id: 2,
                user: {
                    id: 2,
                    name: 'Jane Smith',
                },
                role: {
                    id: 2,
                    name: 'Manager',
                },
                action: 'Role Update',
                description: 'Updated role permissions',
                metadata: {},
                created_at: '2024-03-09T11:30:00Z',
                updated_at: '2024-03-09T11:30:00Z',
            },
        ],
    },
};
