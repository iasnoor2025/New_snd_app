import { render, screen, waitFor } from '@/utils/test-utils';
import { Dashboard } from '@/pages/Dashboard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { mockDashboardData } from '@/mocks/dashboard';

// Mock the useDashboardData hook
jest.mock('@/hooks/useDashboardData');

describe('Dashboard', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
    })

    it('renders loading state', () => {
        (useDashboardData as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
            refetch: jest.fn(),
        })

        render(<Dashboard />);

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    })

    it('renders error state', () => {
        const error = new Error('Failed to fetch dashboard data');
        (useDashboardData as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error,
            refetch: jest.fn(),
        })

        render(<Dashboard />);

        expect(screen.getByText(/Failed to fetch dashboard data/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    })

    it('renders dashboard data', async () => {
        (useDashboardData as jest.Mock).mockReturnValue({
            data: mockDashboardData,
            isLoading: false,
            error: null,
            refetch: jest.fn(),
        })

        render(<Dashboard />);

        // Wait for all components to render
        await waitFor(() => {
            // Check if UserStats component is rendered
            expect(screen.getByText(/Total Users/i)).toBeInTheDocument();
            expect(screen.getByText(mockDashboardData.users.total.toString())).toBeInTheDocument();

            // Check if RoleStats component is rendered
            expect(screen.getByText(/Total Roles/i)).toBeInTheDocument();
            expect(screen.getByText(mockDashboardData.roles.total.toString())).toBeInTheDocument();

            // Check if SystemMetrics component is rendered
            expect(screen.getByText(/System Metrics/i)).toBeInTheDocument();

            // Check if RecentActivity component is rendered
            expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();
        })
    })

    it('handles retry action', () => {
        const refetch = jest.fn();
        const error = new Error('Failed to fetch dashboard data');
        (useDashboardData as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            error,
            refetch,
        })

        render(<Dashboard />);

        const retryButton = screen.getByRole('button', { name: /retry/i })
        retryButton.click();

        expect(refetch).toHaveBeenCalledTimes(1);
    })
})
