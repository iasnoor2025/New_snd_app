import { render, screen } from '@testing-library/react';
import { RevenueAnalytics } from '@/Components/Dashboard/RevenueAnalytics';

const mockRevenueData = {
    totalRevenue: 150000,
    monthlyGrowth: 12.5,
    monthlyRevenue: [
        { month: 'January', amount: 25000 },
        { month: 'February', amount: 30000 },
        { month: 'March', amount: 35000 },
        { month: 'April', amount: 40000 },
        { month: 'May', amount: 50000 }
    ],
    revenueByCategory: [
        { category: 'Equipment Rental', amount: 75000 },
        { category: 'Service Fees', amount: 45000 },
        { category: 'Maintenance', amount: 30000 }
    ]
};

describe('RevenueAnalytics', () => {
    it('renders total revenue card correctly', () => {
        render(<RevenueAnalytics data={mockRevenueData} />);

        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('$150,000.00')).toBeInTheDocument();
    })

    it('renders monthly growth card correctly', () => {
        render(<RevenueAnalytics data={mockRevenueData} />);

        expect(screen.getByText('Monthly Growth')).toBeInTheDocument();
        expect(screen.getByText('12.5%')).toBeInTheDocument();
    })

    it('renders average monthly revenue card correctly', () => {
        render(<RevenueAnalytics data={mockRevenueData} />);

        expect(screen.getByText('Average Monthly Revenue')).toBeInTheDocument();
        expect(screen.getByText('$36,000.00')).toBeInTheDocument();
    })

    it('renders monthly revenue breakdown correctly', () => {
        render(<RevenueAnalytics data={mockRevenueData} />);

        expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();

        // Check if all months are displayed
        mockRevenueData.monthlyRevenue.forEach(item => {
            expect(screen.getByText(item.month)).toBeInTheDocument();
            expect(screen.getByText(`$${item.amount.toLocaleString()}.00`)).toBeInTheDocument();
        })
    })

    it('renders revenue by category breakdown correctly', () => {
        render(<RevenueAnalytics data={mockRevenueData} />);

        expect(screen.getByText('Revenue by Category')).toBeInTheDocument();

        // Check if all categories are displayed
        mockRevenueData.revenueByCategory.forEach(item => {
            expect(screen.getByText(item.category)).toBeInTheDocument();
            expect(screen.getByText(`$${item.amount.toLocaleString()}.00`)).toBeInTheDocument();
        })
    })

    it('handles empty data arrays correctly', () => {
        const emptyData = {
            ...mockRevenueData,
            monthlyRevenue: [],
            revenueByCategory: []
        };

        render(<RevenueAnalytics data={emptyData} />);

        expect(screen.getByText('Monthly Revenue')).toBeInTheDocument();
        expect(screen.getByText('Revenue by Category')).toBeInTheDocument();
        expect(screen.getByText('$0.00')).toBeInTheDocument(); // Average monthly revenue
    })

    it('handles zero values correctly', () => {
        const zeroData = {
            totalRevenue: 0,
            monthlyGrowth: 0,
            monthlyRevenue: [{ month: 'January', amount: 0 }],
            revenueByCategory: [{ category: 'Test', amount: 0 }]
        };

        render(<RevenueAnalytics data={zeroData} />);

        expect(screen.getByText('$0.00')).toBeInTheDocument();
        expect(screen.getByText('0%')).toBeInTheDocument();
    })
})
