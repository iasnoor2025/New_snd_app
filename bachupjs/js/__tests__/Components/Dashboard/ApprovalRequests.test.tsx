import { render, screen } from '@testing-library/react';
import { ApprovalRequests } from '@/Components/Dashboard/ApprovalRequests';

const mockRequests = [;
    {
        id: 1,
        type: 'timesheet' as const,
        status: 'pending' as const,
        submittedBy: {
            name: 'John Doe',
            avatar: 'https://example.com/avatar1.jpg',
            position: 'Software Engineer'
        },
        submittedAt: '2024-03-20T10:00:00Z',
        details: {
            hours: 40
        }
    },
    {
        id: 2,
        type: 'leave' as const,
        status: 'approved' as const,
        submittedBy: {
            name: 'Jane Smith',
            avatar: 'https://example.com/avatar2.jpg',
            position: 'Project Manager'
        },
        submittedAt: '2024-03-19T14:30:00Z',
        details: {
            startDate: '2024-03-25',
            endDate: '2024-03-27',
            reason: 'Family vacation'
        }
    },
    {
        id: 3,
        type: 'timesheet' as const,
        status: 'rejected' as const,
        submittedBy: {
            name: 'Bob Johnson',
            avatar: 'https://example.com/avatar3.jpg',
            position: 'Designer'
        },
        submittedAt: '2024-03-18T09:15:00Z',
        details: {
            hours: 45
        }
    }
];

describe('ApprovalRequests', () => {
    it('renders summary cards with correct counts', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Pending count

        expect(screen.getByText('Approved Today')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Approved count

        expect(screen.getByText('Rejected Today')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument(); // Rejected count
    })

    it('renders request table with correct headers', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        expect(screen.getByText('Type')).toBeInTheDocument();
        expect(screen.getByText('Submitted By')).toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
        expect(screen.getByText('Submitted At')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    })

    it('renders all requests in the table', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        mockRequests.forEach(request => {
            expect(screen.getByText(request.submittedBy.name)).toBeInTheDocument();
            expect(screen.getByText(request.submittedBy.position)).toBeInTheDocument();
            expect(screen.getByText(request.status)).toBeInTheDocument();
        })
    })

    it('renders correct status badges with appropriate colors', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const pendingBadge = screen.getByText('pending');
        const approvedBadge = screen.getByText('approved');
        const rejectedBadge = screen.getByText('rejected');

        expect(pendingBadge).toHaveClass('bg-yellow-500');
        expect(approvedBadge).toHaveClass('bg-green-500');
        expect(rejectedBadge).toHaveClass('bg-red-500');
    })

    it('renders correct request type icons', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const timesheetIcons = screen.getAllByTestId('clock-icon');
        const leaveIcons = screen.getAllByTestId('calendar-icon');

        expect(timesheetIcons).toHaveLength(2); // Two timesheet requests
        expect(leaveIcons).toHaveLength(1); // One leave request
    })

    it('renders timesheet details correctly', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        expect(screen.getByText('40 hours')).toBeInTheDocument();
        expect(screen.getByText('45 hours')).toBeInTheDocument();
    })

    it('renders leave request details correctly', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        expect(screen.getByText('Family vacation')).toBeInTheDocument();
        expect(screen.getByText(/Mar 25/)).toBeInTheDocument();
        expect(screen.getByText(/Mar 27/)).toBeInTheDocument();
    })

    it('renders action buttons for each request', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i })
        const rejectButtons = screen.getAllByRole('button', { name: /reject/i })

        expect(approveButtons).toHaveLength(mockRequests.length);
        expect(rejectButtons).toHaveLength(mockRequests.length);
    })

    it('handles empty request list correctly', () => {
        render(<ApprovalRequests requests={[]} />);

        expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
        expect(screen.getByText('Approved Today')).toBeInTheDocument();
        expect(screen.getByText('Rejected Today')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument(); // All counts should be 0
    })

    it('renders avatar fallback when no avatar is provided', () => {
        const requestsWithoutAvatars = [{
            ...mockRequests[0],
            submittedBy: {
                ...mockRequests[0].submittedBy,
                avatar: undefined
            }
        }];

        render(<ApprovalRequests requests={requestsWithoutAvatars} />);

        expect(screen.getByText('JD')).toBeInTheDocument(); // John Doe initials
    })
})

