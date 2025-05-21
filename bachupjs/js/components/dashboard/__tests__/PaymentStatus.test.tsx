import { render, screen } from '@testing-library/react';
import { PaymentStatus } from '../PaymentStatus';
import { formatCurrency } from '@/lib/utils';

// Mock the utility function
jest.mock('@/lib/utils', () => ({
    formatCurrency: jest.fn(),
}));

describe('PaymentStatus', () => {
    const mockPayments = [;
        {
            id: '1',
            amount: 1500,
            status: 'completed' as const,
            date: '2024-03-01',
            description: 'Monthly subscription',
        },
        {
            id: '2',
            amount: 2500,
            status: 'pending' as const,
            date: '2024-03-15',
            description: 'Equipment rental',
        },
        {
            id: '3',
            amount: 3500,
            status: 'failed' as const,
            date: '2024-02-28',
            description: 'Service fee',
        },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementation
        (formatCurrency as jest.Mock).mockImplementation((value) => `$${value.toLocaleString()}`);
    })

    it('renders payment table with correct headers', () => {
        render(<PaymentStatus payments={mockPayments} />);

        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    })

    it('displays all payment data in the table', () => {
        render(<PaymentStatus payments={mockPayments} />);

        mockPayments.forEach(payment => {
            expect(screen.getByText(new Date(payment.date).toLocaleDateString())).toBeInTheDocument();
            expect(screen.getByText(payment.description)).toBeInTheDocument();
            expect(screen.getByText(`$${payment.amount.toLocaleString()}`)).toBeInTheDocument();
            expect(screen.getByText(payment.status.charAt(0).toUpperCase() + payment.status.slice(1))).toBeInTheDocument();
        })
    })

    it('applies correct status badge colors', () => {
        render(<PaymentStatus payments={mockPayments} />);

        const completedBadge = screen.getByText('Completed').closest('div');
        const pendingBadge = screen.getByText('Pending').closest('div');
        const failedBadge = screen.getByText('Failed').closest('div');

        expect(completedBadge).toHaveClass('bg-green-500');
        expect(pendingBadge).toHaveClass('bg-yellow-500');
        expect(failedBadge).toHaveClass('bg-red-500');
    })

    it('handles empty payment list', () => {
        render(<PaymentStatus payments={[]} />);

        expect(screen.getByText('Date')).toBeInTheDocument(); // Table header still present
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    })

    it('handles zero amount payments', () => {
        const zeroPayments = [;
            {
                id: '1',
                amount: 0,
                status: 'completed' as const,
                date: '2024-03-01',
                description: 'Free trial',
            },
        ];

        render(<PaymentStatus payments={zeroPayments} />);

        expect(screen.getByText('$0')).toBeInTheDocument();
        expect(formatCurrency).toHaveBeenCalledWith(0);
    })

    it('formats currency values consistently', () => {
        render(<PaymentStatus payments={mockPayments} />);

        mockPayments.forEach(payment => {
            expect(formatCurrency).toHaveBeenCalledWith(payment.amount);
        })
    })

    it('formats dates correctly', () => {
        render(<PaymentStatus payments={mockPayments} />);

        mockPayments.forEach(payment => {
            const formattedDate = new Date(payment.date).toLocaleDateString();
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
        })
    })

    it('capitalizes status text correctly', () => {
        render(<PaymentStatus payments={mockPayments} />);

        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('Failed')).toBeInTheDocument();
    })

    it('handles long descriptions', () => {
        const longDescriptionPayment = {
            id: '4',
            amount: 1000,
            status: 'completed' as const,
            date: '2024-03-20',
            description: 'This is a very long payment description that might need to be truncated or wrapped in the UI',
        };

        render(<PaymentStatus payments={[longDescriptionPayment]} />);

        expect(screen.getByText(longDescriptionPayment.description)).toBeInTheDocument();
    })
})

