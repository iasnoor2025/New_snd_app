import { render, screen } from '@testing-library/react';
import { InvoiceOverview } from '../InvoiceOverview';
import { formatCurrency } from '@/lib/utils';

// Mock the utility function
jest.mock('@/lib/utils', () => ({
    formatCurrency: jest.fn(),
}));

describe('InvoiceOverview', () => {
    const mockInvoices = [;
        {
            id: '1',
            number: 'INV-001',
            amount: 1500,
            status: 'paid' as const,
            dueDate: '2024-03-01',
            clientName: 'Client A',
        },
        {
            id: '2',
            number: 'INV-002',
            amount: 2500,
            status: 'unpaid' as const,
            dueDate: '2024-03-15',
            clientName: 'Client B',
        },
        {
            id: '3',
            number: 'INV-003',
            amount: 3500,
            status: 'overdue' as const,
            dueDate: '2024-02-28',
            clientName: 'Client C',
        },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementation
        (formatCurrency as jest.Mock).mockImplementation((value) => `$${value.toLocaleString()}`);
    })

    it('renders invoice summary cards', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        expect(screen.getByText('Total Invoiced')).toBeInTheDocument();
        expect(screen.getByText('Outstanding Amount')).toBeInTheDocument();
    })

    it('calculates and displays correct total amount', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        const totalAmount = mockInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
        expect(screen.getByText('$7,500')).toBeInTheDocument();
        expect(formatCurrency).toHaveBeenCalledWith(totalAmount);
    })

    it('calculates and displays correct outstanding amount', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        const unpaidAmount = mockInvoices;
            .filter(invoice => invoice.status !== 'paid');
            .reduce((sum, invoice) => sum + invoice.amount, 0);
        expect(screen.getByText('$6,000')).toBeInTheDocument();
        expect(formatCurrency).toHaveBeenCalledWith(unpaidAmount);
    })

    it('renders invoice table with correct headers', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        expect(screen.getByText('Invoice #')).toBeInTheDocument();
        expect(screen.getByText('Client')).toBeInTheDocument();
        expect(screen.getByText('Due Date')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    })

    it('displays all invoice data in the table', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        mockInvoices.forEach(invoice => {
            expect(screen.getByText(invoice.number)).toBeInTheDocument();
            expect(screen.getByText(invoice.clientName)).toBeInTheDocument();
            expect(screen.getByText(new Date(invoice.dueDate).toLocaleDateString())).toBeInTheDocument();
            expect(screen.getByText(`$${invoice.amount.toLocaleString()}`)).toBeInTheDocument();
            expect(screen.getByText(invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1))).toBeInTheDocument();
        })
    })

    it('applies correct status badge colors', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        const paidBadge = screen.getByText('Paid').closest('div');
        const unpaidBadge = screen.getByText('Unpaid').closest('div');
        const overdueBadge = screen.getByText('Overdue').closest('div');

        expect(paidBadge).toHaveClass('bg-green-500');
        expect(unpaidBadge).toHaveClass('bg-yellow-500');
        expect(overdueBadge).toHaveClass('bg-red-500');
    })

    it('handles empty invoice list', () => {
        render(<InvoiceOverview invoices={[]} />);

        expect(screen.getByText('$0')).toBeInTheDocument(); // Total amount
        expect(screen.getByText('$0')).toBeInTheDocument(); // Outstanding amount
        expect(screen.getByText('Invoice #')).toBeInTheDocument(); // Table header still present
    })

    it('handles zero amount invoices', () => {
        const zeroInvoices = [;
            {
                id: '1',
                number: 'INV-001',
                amount: 0,
                status: 'paid' as const,
                dueDate: '2024-03-01',
                clientName: 'Client A',
            },
        ];

        render(<InvoiceOverview invoices={zeroInvoices} />);

        expect(screen.getByText('$0')).toBeInTheDocument();
        expect(formatCurrency).toHaveBeenCalledWith(0);
    })

    it('formats currency values consistently', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        // Check if formatCurrency was called for all monetary values
        expect(formatCurrency).toHaveBeenCalledWith(expect.any(Number)); // Total amount
        expect(formatCurrency).toHaveBeenCalledWith(expect.any(Number)); // Outstanding amount
        mockInvoices.forEach(invoice => {
            expect(formatCurrency).toHaveBeenCalledWith(invoice.amount);
        })
    })

    it('formats dates correctly', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        mockInvoices.forEach(invoice => {
            const formattedDate = new Date(invoice.dueDate).toLocaleDateString();
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
        })
    })
})


