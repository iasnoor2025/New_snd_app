import { render, screen } from '@testing-library/react';
import { PaymentStatus } from '@/Components/Dashboard/PaymentStatus';

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
    },
    {
        id: '3',
        amount: 3500,
        status: 'failed' as const,
        date: '2024-02-28',
        description: 'Maintenance Payment'
    }
];

describe('PaymentStatus', () => {
    it('renders payment table with correct headers', () => {
        render(<PaymentStatus payments={mockPayments} />);

        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    })

    it('renders all payments in the table', () => {
        render(<PaymentStatus payments={mockPayments} />);

        mockPayments.forEach(payment => {
            expect(screen.getByText(new Date(payment.date).toLocaleDateString())).toBeInTheDocument();
            expect(screen.getByText(payment.description)).toBeInTheDocument();
            expect(screen.getByText(`$${payment.amount.toLocaleString()}.00`)).toBeInTheDocument();
        })
    })

    it('renders correct status badges with appropriate colors', () => {
        render(<PaymentStatus payments={mockPayments} />);

        const completedBadge = screen.getByText('Completed');
        const pendingBadge = screen.getByText('Pending');
        const failedBadge = screen.getByText('Failed');

        expect(completedBadge).toHaveClass('bg-green-500');
        expect(pendingBadge).toHaveClass('bg-yellow-500');
        expect(failedBadge).toHaveClass('bg-red-500');
    })

    it('handles empty payment list correctly', () => {
        render(<PaymentStatus payments={[]} />);

        expect(screen.getByText('Date')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    })

    it('formats currency values correctly', () => {
        const paymentsWithLargeAmounts = [;
            {
                ...mockPayments[0],
                amount: 1234567.89
            }
        ];

        render(<PaymentStatus payments={paymentsWithLargeAmounts} />);

        expect(screen.getByText('$1,234,567.89')).toBeInTheDocument();
    })

    it('formats dates correctly', () => {
        const paymentWithSpecificDate = [;
            {
                ...mockPayments[0],
                date: '2024-12-31'
            }
        ];

        render(<PaymentStatus payments={paymentWithSpecificDate} />);

        expect(screen.getByText('12/31/2024')).toBeInTheDocument();
    })

    it('capitalizes status text correctly', () => {
        render(<PaymentStatus payments={mockPayments} />);

        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText('Pending')).toBeInTheDocument();
        expect(screen.getByText('Failed')).toBeInTheDocument();
    })
})

