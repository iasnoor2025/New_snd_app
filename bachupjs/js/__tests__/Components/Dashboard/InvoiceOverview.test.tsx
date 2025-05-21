import { render, screen } from '@testing-library/react';
import { InvoiceOverview } from '@/Components/Dashboard/InvoiceOverview';

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
    },
    {
        id: '3',
        number: 'INV-003',
        amount: 3500,
        status: 'overdue' as const,
        dueDate: '2024-02-28',
        clientName: 'Bob Johnson'
    }
];

describe('InvoiceOverview', () => {
    it('renders total invoiced amount correctly', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        expect(screen.getByText('Total Invoiced')).toBeInTheDocument();
        expect(screen.getByText('$7,500.00')).toBeInTheDocument();
    })

    it('renders outstanding amount correctly', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        expect(screen.getByText('Outstanding Amount')).toBeInTheDocument();
        expect(screen.getByText('$6,000.00')).toBeInTheDocument();
    })

    it('renders invoice table with correct headers', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        expect(screen.getByText('Invoice #')).toBeInTheDocument();
        expect(screen.getByText('Client')).toBeInTheDocument();
        expect(screen.getByText('Due Date')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    })

    it('renders all invoices in the table', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        mockInvoices.forEach(invoice => {
            expect(screen.getByText(invoice.number)).toBeInTheDocument();
            expect(screen.getByText(invoice.clientName)).toBeInTheDocument();
            expect(screen.getByText(new Date(invoice.dueDate).toLocaleDateString())).toBeInTheDocument();
            expect(screen.getByText(`$${invoice.amount.toLocaleString()}.00`)).toBeInTheDocument();
        })
    })

    it('renders correct status badges with appropriate colors', () => {
        render(<InvoiceOverview invoices={mockInvoices} />);

        const paidBadge = screen.getByText('Paid');
        const unpaidBadge = screen.getByText('Unpaid');
        const overdueBadge = screen.getByText('Overdue');

        expect(paidBadge).toHaveClass('bg-green-500');
        expect(unpaidBadge).toHaveClass('bg-yellow-500');
        expect(overdueBadge).toHaveClass('bg-red-500');
    })

    it('handles empty invoice list correctly', () => {
        render(<InvoiceOverview invoices={[]} />);

        expect(screen.getByText('Total Invoiced')).toBeInTheDocument();
        expect(screen.getByText('Outstanding Amount')).toBeInTheDocument();
        expect(screen.getByText('$0.00')).toBeInTheDocument();
        expect(screen.getByText('Invoice #')).toBeInTheDocument();
    })

    it('formats currency values correctly', () => {
        const invoicesWithLargeAmounts = [;
            {
                ...mockInvoices[0],
                amount: 1234567.89
            }
        ];

        render(<InvoiceOverview invoices={invoicesWithLargeAmounts} />);

        expect(screen.getByText('$1,234,567.89')).toBeInTheDocument();
    })

    it('formats dates correctly', () => {
        const invoiceWithSpecificDate = [;
            {
                ...mockInvoices[0],
                dueDate: '2024-12-31'
            }
        ];

        render(<InvoiceOverview invoices={invoiceWithSpecificDate} />);

        expect(screen.getByText('12/31/2024')).toBeInTheDocument();
    })
})

