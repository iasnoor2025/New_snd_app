import { SystemData, SystemMetrics } from '@/types/dashboard';

export const calculateHealthScore = (metrics: SystemMetrics): number => {
    const weights = {
        cpu: 0.4,
        memory: 0.3,
        disk: 0.3
    };

    const cpuScore = 100 - (metrics.system_health.cpu_trend[metrics.system_health.cpu_trend.length - 1] || 0);
    const memoryScore = 100 - (metrics.system_health.memory_trend[metrics.system_health.memory_trend.length - 1] || 0);
    const diskScore = 100 - (metrics.system_health.disk_trend[metrics.system_health.disk_trend.length - 1] || 0);

    return Math.round(
        (cpuScore * weights.cpu) +
        (memoryScore * weights.memory) +
        (diskScore * weights.disk)
    );
};

export const formatUptime = (uptime: number): string => {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    return parts.join(' ') || '0m';
};

export const getSystemStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'operational':
            return 'text-green-500';
        case 'warning':
            return 'text-yellow-500';
        case 'critical':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
};

export const formatResourceUsage = (usage: number): string => {
    return `${Math.round(usage)}%`;
};

export const getResourceStatusColor = (usage: number): string => {
    if (usage >= 90) return 'text-red-500';
    if (usage >= 70) return 'text-yellow-500';
    return 'text-green-500';
};

export const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'short' })
    const day = date.getDate();
    return `${month} ${day}`;
};

export const calculateTrend = (values: number[]): number => {
    if (values.length < 2) return 0;

    const first = values[0];
    const last = values[values.length - 1];
    return ((last - first) / first) * 100;
};

export const getTrendColor = (trend: number): string => {
    if (trend > 0) return 'text-green-500';
    if (trend < 0) return 'text-red-500';
    return 'text-gray-500';
};

export const formatTrend = (trend: number): string => {
    const sign = trend > 0 ? '+' : '';
    return `${sign}${trend.toFixed(1)}%`;
};

export const getSystemStatusIcon = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'operational':
            return 'check-circle';
        case 'warning':
            return 'exclamation-triangle';
        case 'critical':
            return 'x-circle';
        default:
            return 'question-circle';
    }
};

export const getResourceIcon = (resource: string): string => {
    switch (resource.toLowerCase()) {
        case 'cpu':
            return 'cpu';
        case 'memory':
            return 'memory';
        case 'disk':
            return 'hard-drive';
        default:
            return 'circle';
    }
};
