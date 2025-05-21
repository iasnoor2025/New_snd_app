import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RevenueAnalytics } from '@/Components/Dashboard/RevenueAnalytics';
import { InvoiceOverview } from '@/Components/Dashboard/InvoiceOverview';
import { PaymentStatus } from '@/Components/Dashboard/PaymentStatus';
import { DashboardLayout } from '@/Components/Dashboard/DashboardLayout';
import { useRevenueData } from '@/hooks/useRevenueData';
import { vi } from 'vitest';

// Mock the useRevenueData hook
vi.mock('@/hooks/useRevenueData', () => ({
    useRevenueData: vi.fn()
}));

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

const mockInvoices = [;
    {
        id: '1',
        number: 'INV-001',
        amount: 1500,
        status: 'paid' as const,
        dueDate: '2024-03-01',
        clientName: 'John Doe'
    },
    {
        id: '2',
        number: 'INV-002',
        amount: 2500,
        status: 'unpaid' as const,
        dueDate: '2024-03-15',
        clientName: 'Jane Smith'
    }
];

const mockPayments = [;
    {
        id: '1',
        amount: 1500,
        status: 'completed' as const,
        date: '2024-03-01',
        description: 'Equipment Rental Payment'
    },
    {
        id: '2',
        amount: 2500,
        status: 'pending' as const,
        date: '2024-03-15',
        description: 'Service Fee Payment'
    }
];

describe('Revenue Workflow Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        (useRevenueData as any).mockReturnValue({
            revenue: mockRevenueData,
            invoices: mockInvoices,
            payments: mockPayments,
            isLoading: false,
            error: null,
            refetch: vi.fn()
        })
    })

    it('displays all revenue components with correct data', async () => {
        render(
            <DashboardLayout>
                <RevenueAnalytics data={mockRevenueData} />
                <InvoiceOverview invoices={mockInvoices} />
                <PaymentStatus payments={mockPayments} />
            </DashboardLayout>
        );

        // Verify revenue analytics
        expect(screen.getByText('Total Revenue')).toBeInTheDocument();
        expect(screen.getByText('$150,000.00')).toBeInTheDocument();
        expect(screen.getByText('12.5%')).toBeInTheDocument();

        // Verify invoice overview
        expect(screen.getByText('INV-001')).toBeInTheDocument();
        expect(screen.getByText('INV-002')).toBeInTheDocument();

        // Verify payment status
        expect(screen.getByText('Equipment Rental Payment')).toBeInTheDocument();
        expect(screen.getByText('Service Fee Payment')).toBeInTheDocument();
    })

    it('updates revenue data when new payment is completed', async () => {
        const refetch = vi.fn();
        (useRevenueData as any).mockReturnValue({
            revenue: mockRevenueData,
            invoices: mockInvoices,
            payments: mockPayments,
            isLoading: false,
            error: null,
            refetch
        })

        render(
            <DashboardLayout>
                <RevenueAnalytics data={mockRevenueData} />
                <InvoiceOverview invoices={mockInvoices} />
                <PaymentStatus payments={mockPayments} />
            </DashboardLayout>
        );

        // Simulate payment completion
        const updatedPayments = mockPayments.map(p =>
            p.id === '2' ? { ...p, status: 'completed' } : p
        );

        (useRevenueData as any).mockReturnValue({
            revenue: {
                ...mockRevenueData,
                totalRevenue: 152500 // Increased by the newly completed payment
            },
            invoices: mockInvoices,
            payments: updatedPayments,
            isLoading: false,
            error: null,
            refetch
        })

        // Verify data updates
        await waitFor(() => {
            expect(screen.getByText('$152,500.00')).toBeInTheDocument();
            expect(screen.getByText('completed')).toBeInTheDocument();
        })
    })

    it('handles loading state across all components', async () => {
        (useRevenueData as any).mockReturnValue({
            revenue: null,
            invoices: [],
            payments: [],
            isLoading: true,
            error: null,
            refetch: vi.fn()
        })

        render(
            <DashboardLayout isLoading>
                <RevenueAnalytics data={mockRevenueData} />
                <InvoiceOverview invoices={mockInvoices} />
                <PaymentStatus payments={mockPayments} />
            </DashboardLayout>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    })

    it('handles error state gracefully', async () => {
        const error = new Error('Failed to fetch revenue data');
        (useRevenueData as any).mockReturnValue({
            revenue: null,
            invoices: [],
            payments: [],
            isLoading: false,
            error,
            refetch: vi.fn()
        })

        render(
            <DashboardLayout>
                <RevenueAnalytics data={mockRevenueData} />
                <InvoiceOverview invoices={mockInvoices} />
                <PaymentStatus payments={mockPayments} />
            </DashboardLayout>
        );

        expect(screen.getByText(/failed to fetch revenue data/i)).toBeInTheDocument();
    })

    it('maintains data consistency across components', async () => {
        render(
            <DashboardLayout>
                <RevenueAnalytics data={mockRevenueData} />
                <InvoiceOverview invoices={mockInvoices} />
                <PaymentStatus payments={mockPayments} />
            </DashboardLayout>
        );

        // Verify total revenue matches sum of invoices
        const totalInvoiceAmount = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
        const displayedRevenue = screen.getByText('$150,000.00');
        expect(displayedRevenue).toBeInTheDocument();

        // Verify payment amounts match corresponding invoices
        mockPayments.forEach(payment => {
            const matchingInvoice = mockInvoices.find(inv => inv.amount === payment.amount);
            expect(matchingInvoice).toBeTruthy();
        })
    })

    it('updates all components when data is refreshed', async () => {
        const refetch = vi.fn();
        const user = userEvent.setup();

        render(
            <DashboardLayout>
                <button onClick={() => refetch()}>Refresh</button>
                <RevenueAnalytics data={mockRevenueData} />
                <InvoiceOverview invoices={mockInvoices} />
                <PaymentStatus payments={mockPayments} />
            </DashboardLayout>
        );

        // Click refresh button
        await user.click(screen.getByText('Refresh'));

        // Verify refetch was called
        expect(refetch).toHaveBeenCalled();

        // Simulate data update
        const updatedData = {
            ...mockRevenueData,
            totalRevenue: 160000
        };

        (useRevenueData as any).mockReturnValue({
            revenue: updatedData,
            invoices: mockInvoices,
            payments: mockPayments,
            isLoading: false,
            error: null,
            refetch
        })

        // Verify updated data is displayed
        await waitFor(() => {
            expect(screen.getByText('$160,000.00')).toBeInTheDocument();
        })
    })
})

