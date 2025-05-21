import { render, screen } from '@testing-library/react';
import { RevenueAnalytics } from '../RevenueAnalytics';
import { formatCurrency } from '@/lib/utils';

// Mock the utility function
jest.mock('@/lib/utils', () => ({
    formatCurrency: jest.fn(),
}));

describe('RevenueAnalytics', () => {
    const mockData = {
        totalRevenue: 150000,
        monthlyGrowth: 12.5,
        monthlyRevenue: [
            { month: 'Jan', amount: 25000 },
            { month: 'Feb', amount: 30000 },
            { month: 'Mar', amount: 35000 },
            { month: 'Apr', amount: 40000 },
            { month: 'May', amount: 50000 },
        ],
        revenueByCategory: [
            { category: 'Equipment', amount: 75000 },
            { category: 'Services', amount: 45000 },
            { category: 'Maintenance', amount: 30000 },
        ],
    };

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementation
        (formatCurrency as jest.Mock).mockImplementation((value) => `$${value.toLocaleString()}`);
    })

    it('renders all revenue cards', () => {
        render(<RevenueAnalytics data={mockData} />);

        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('Monthly Growth')).toBeInTheDocument();
        expect(screen.getByText('Average Monthly Revenue')).toBeInTheDocument();
    })

    it('displays correct total revenue', () => {
        render(<RevenueAnalytics data={mockData} />);

        expect(screen.getByText('$150,000')).toBeInTheDocument();
        expect(formatCurrency).toHaveBeenCalledWith(mockData.totalRevenue);
    })

    it('shows correct monthly growth percentage', () => {
        render(<RevenueAnalytics data={mockData} />);

        expect(screen.getByText('12.5%')).toBeInTheDocument();
    })

    it('calculates and displays correct average monthly revenue', () => {
        render(<RevenueAnalytics data={mockData} />);

        const average = mockData.monthlyRevenue.reduce((sum, item) => sum + item.amount, 0) /;
                       mockData.monthlyRevenue.length;
        expect(screen.getByText('$36,000')).toBeInTheDocument();
        expect(formatCurrency).toHaveBeenCalledWith(average);
    })

    it('displays monthly revenue breakdown', () => {
        render(<RevenueAnalytics data={mockData} />);

        mockData.monthlyRevenue.forEach(item => {
            expect(screen.getByText(item.month)).toBeInTheDocument();
            expect(screen.getByText(`$${item.amount.toLocaleString()}`)).toBeInTheDocument();
        })
    })

    it('displays revenue by category', () => {
        render(<RevenueAnalytics data={mockData} />);

        mockData.revenueByCategory.forEach(item => {
            expect(screen.getByText(item.category)).toBeInTheDocument();
            expect(screen.getByText(`$${item.amount.toLocaleString()}`)).toBeInTheDocument();
        })
    })

    it('handles empty monthly revenue data', () => {
        const emptyData = {
            ...mockData,
            monthlyRevenue: [],
        };

        render(<RevenueAnalytics data={emptyData} />);

        // Find the average monthly revenue card and check its value
        const averageRevenueCard = screen.getByText('Average Monthly Revenue').closest('.rounded-lg');
        expect(averageRevenueCard).toBeInTheDocument();
        expect(averageRevenueCard?.querySelector('.text-2xl')?.textContent).toBe('$0');
    })

    it('handles empty category data', () => {
        const emptyData = {
            ...mockData,
            revenueByCategory: [],
        };

        render(<RevenueAnalytics data={emptyData} />);

        expect(screen.getByText('Revenue by Category')).toBeInTheDocument();
        // Should render without errors
    })

    it('handles zero values correctly', () => {
        const zeroData = {
            totalRevenue: 0,
            monthlyGrowth: 0,
            monthlyRevenue: [
                { month: 'Jan', amount: 0 },
                { month: 'Feb', amount: 0 },
            ],
            revenueByCategory: [
                { category: 'Equipment', amount: 0 },
            ],
        };

        render(<RevenueAnalytics data={zeroData} />);

        // Find the total revenue card and check its value
        const totalRevenueCard = screen.getByText('Total Revenue').closest('.rounded-lg');
        expect(totalRevenueCard).toBeInTheDocument();
        expect(totalRevenueCard?.querySelector('.text-2xl')?.textContent).toBe('$0');
        expect(screen.getByText('0%')).toBeInTheDocument();
    })

    it('formats currency values consistently', () => {
        render(<RevenueAnalytics data={mockData} />);

        // Check if formatCurrency was called for all monetary values
        expect(formatCurrency).toHaveBeenCalledWith(mockData.totalRevenue);
        expect(formatCurrency).toHaveBeenCalledWith(expect.any(Number)); // Average monthly revenue
        mockData.monthlyRevenue.forEach(item => {
            expect(formatCurrency).toHaveBeenCalledWith(item.amount);
        })
        mockData.revenueByCategory.forEach(item => {
            expect(formatCurrency).toHaveBeenCalledWith(item.amount);
        })
    })
})

