import { render, screen } from '@testing-library/react';
import { SystemOverview } from '../SystemOverview';
import { formatUptime, getSystemStatusColor, getSystemStatusIcon } from '@/utils/dashboard';

// Mock the utility functions
jest.mock('@/utils/dashboard', () => ({
    formatUptime: jest.fn(),
    getSystemStatusColor: jest.fn(),
    getSystemStatusIcon: jest.fn(),
}));

describe('SystemOverview', () => {
    const mockData = {
        status: 'healthy',
        uptime: 3600,
        cpuUsage: 45,
        memoryUsage: 60,
        diskUsage: 75,
        activeUsers: 25,
        totalUsers: 100,
        activeRoles: 5,
        totalRoles: 10,
        recentActivity: [
            {
                timestamp: '2024-03-09T12:00:00Z',
                users: 20,
                roles: 4,
                systemLoad: 40,
            },
        ],
    };

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementations
        (formatUptime as jest.Mock).mockReturnValue('1 hour');
        (getSystemStatusColor as jest.Mock).mockReturnValue('bg-green-500');
        (getSystemStatusIcon as jest.Mock).mockReturnValue('check-circle');
    })

    it('renders all system status cards', () => {
        render(<SystemOverview data={mockData} />);

        expect(screen.getByText('System Status')).toBeInTheDocument();
        expect(screen.getByText('Resource Usage')).toBeInTheDocument();
        expect(screen.getByText('User Activity')).toBeInTheDocument();
    })

    it('displays correct system status and uptime', () => {
        render(<SystemOverview data={mockData} />);

        expect(screen.getByText('healthy')).toBeInTheDocument();
        expect(screen.getByText('1 hour')).toBeInTheDocument();
        expect(formatUptime).toHaveBeenCalledWith(mockData.uptime);
    })

    it('shows correct resource usage values', () => {
        render(<SystemOverview data={mockData} />);

        expect(screen.getByText('45%')).toBeInTheDocument();
        expect(screen.getByText('60%')).toBeInTheDocument();
        expect(screen.getByText('75%')).toBeInTheDocument();
    })

    it('displays correct user and role activity', () => {
        render(<SystemOverview data={mockData} />);

        expect(screen.getByText('25/100')).toBeInTheDocument();
        expect(screen.getByText('5/10')).toBeInTheDocument();
    })

    it('calculates correct progress values', () => {
        render(<SystemOverview data={mockData} />);

        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars).toHaveLength(5); // CPU, Memory, Disk, Users, Roles

        // Check if progress bars have correct transformation styles
        // We need to check the child div which contains the transformation style
        const progressIndicators = progressBars.map(bar => bar.firstChild);

        expect(progressIndicators[0]).toHaveStyle('transform: translateX(-55%)');
        expect(progressIndicators[1]).toHaveStyle('transform: translateX(-40%)');
        expect(progressIndicators[2]).toHaveStyle('transform: translateX(-25%)');
        expect(progressIndicators[3]).toHaveStyle('transform: translateX(-75%)');
        expect(progressIndicators[4]).toHaveStyle('transform: translateX(-50%)');
    })

    it('handles different system statuses correctly', () => {
        const warningData = { ...mockData, status: 'warning' };
        (getSystemStatusColor as jest.Mock).mockReturnValue('bg-yellow-500');

        render(<SystemOverview data={warningData} />);

        expect(getSystemStatusColor).toHaveBeenCalledWith('warning');
        expect(screen.getByText('warning')).toBeInTheDocument();
    })

    it('handles zero values correctly', () => {
        const zeroData = {
            ...mockData,
            activeUsers: 0,
            totalUsers: 0,
            activeRoles: 0,
            totalRoles: 0,
        };

        render(<SystemOverview data={zeroData} />);

        // Use getAllByText and check the first instance
        const zeroUserText = screen.getAllByText('0/0')[0];
        expect(zeroUserText).toBeInTheDocument();

        const progressBars = screen.getAllByRole('progressbar');
        const progressIndicators = progressBars.map(bar => bar.firstChild);

        // Check if the user and role progress bars show 0 progress
        expect(progressIndicators[3]).toHaveStyle('transform: translateX(-100%)');
        expect(progressIndicators[4]).toHaveStyle('transform: translateX(-100%)');
    })
})
