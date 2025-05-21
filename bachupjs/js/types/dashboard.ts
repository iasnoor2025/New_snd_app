export interface SystemData {
    status: string;
    metrics: {
        cpu: number;
        memory: number;
        disk: number;
    };
    activity: ActivityLog[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles: {
        id: number;
        name: string;
    }[];
}

export interface UserStats {
    total: number;
    active: number;
    inactive: number;
    recent: User[];
}

export interface RoleStats {
    total: number;
    distribution: {
        name: string;
        count: number;
    }[];
}

export interface SystemHealth {
    cpu_trend: number[];
    memory_trend: number[];
    disk_trend: number[];
}

export interface UserActivity {
    logins_today: number;
    active_users: number;
    recent_registrations: number;
}

export interface SystemMetrics {
    system_health: SystemHealth;
    user_activity: UserActivity;
    recent_activity: ActivityLog[];
}

export interface DashboardData {
    systemData: SystemData;
    users: UserStats;
    roles: RoleStats;
    metrics: SystemMetrics;
}

export interface ResourceUsage {
    name: string;
    value: number;
    trend: number;
    status: 'healthy' | 'warning' | 'critical';
}

export interface ActivityLog {
    id: number;
    user: {
        id: number;
        name: string;
    } | null;
    role: {
        id: number;
        name: string;
    } | null;
    action: string;
    description: string | null;
    metadata: any;
    created_at: string;
    updated_at: string;
}

export interface DashboardStats {
    totalUsers: number;
    activeUsers: number;
    totalRoles: number;
    activeRoles: number;
    systemHealth: number;
    resourceUsage: ResourceUsage[];
    recentActivity: ActivityLog[];
}

export interface DashboardFilters {
    dateRange: {
        start: string;
        end: string;
    };
    status: ('active' | 'inactive' | 'suspended')[];
    roles: string[];
    search: string;
}

export interface DashboardState {
    data: DashboardData | null;
    isLoading: boolean;
    error: Error | null;
    filters: DashboardFilters;
    selectedTimeRange: '1h' | '24h' | '7d' | '30d' | 'custom';
    refreshInterval: number;
}
