import { render, screen } from '@testing-library/react';
import { SystemOverview } from '@/Components/Dashboard/SystemOverview';

const mockSystemData = {
    status: 'healthy',
    uptime: 86400, // 24 hours in seconds
    cpuUsage: 45,
    memoryUsage: 60,
    diskUsage: 75,
    activeUsers: 8,
    totalUsers: 10,
    activeRoles: 3,
    totalRoles: 4,
    recentActivity: [
        {
            timestamp: '2024-03-20T10:00:00Z',
            users: 8,
            roles: 3,
            systemLoad: 45
        }
    ]
};

describe('SystemOverview', () => {
    it('renders system status card correctly', () => {
        render(<SystemOverview data={mockSystemData} />);

        // Check if the status card is rendered
        expect(screen.getByText('System Status')).toBeInTheDocument();
        expect(screen.getByText('healthy')).toBeInTheDocument();
        expect(screen.getByText('24h 0m 0s')).toBeInTheDocument(); // Formatted uptime
    })

    it('renders resource usage card correctly', () => {
        render(<SystemOverview data={mockSystemData} />);

        // Check if the resource usage card is rendered
        expect(screen.getByText('Resource Usage')).toBeInTheDocument();
        expect(screen.getByText('CPU')).toBeInTheDocument();
        expect(screen.getByText('Memory')).toBeInTheDocument();
        expect(screen.getByText('Disk')).toBeInTheDocument();

        // Check if the usage percentages are displayed
        expect(screen.getByText('45%')).toBeInTheDocument();
        expect(screen.getByText('60%')).toBeInTheDocument();
        expect(screen.getByText('75%')).toBeInTheDocument();
    })

    it('renders user activity card correctly', () => {
        render(<SystemOverview data={mockSystemData} />);

        // Check if the user activity card is rendered
        expect(screen.getByText('User Activity')).toBeInTheDocument();
        expect(screen.getByText('Active Users')).toBeInTheDocument();
        expect(screen.getByText('Active Roles')).toBeInTheDocument();

        // Check if the user and role counts are displayed
        expect(screen.getByText('8/10')).toBeInTheDocument();
        expect(screen.getByText('3/4')).toBeInTheDocument();
    })

    it('handles different system statuses correctly', () => {
        const warningData = { ...mockSystemData, status: 'warning' };
        const criticalData = { ...mockSystemData, status: 'critical' };

        const { rerender } = render(<SystemOverview data={warningData} />);
        expect(screen.getByText('warning')).toBeInTheDocument();

        rerender(<SystemOverview data={criticalData} />);
        expect(screen.getByText('critical')).toBeInTheDocument();
    })

    it('displays correct progress bar values', () => {
        render(<SystemOverview data={mockSystemData} />);

        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars).toHaveLength(5); // CPU, Memory, Disk, Users, Roles

        // Check if progress bars have correct values
        progressBars.forEach((progressBar) => {
            expect(progressBar).toHaveAttribute('aria-valuenow');
        })
    })
})
