import { render, screen } from '@testing-library/react';
import { ApprovalRequests } from '../ApprovalRequests';
import { formatTimestamp } from '@/utils/dashboard';

// Mock the utility function
jest.mock('@/utils/dashboard', () => ({
    formatTimestamp: jest.fn(),
}));

describe('ApprovalRequests', () => {
    const mockRequests = [;
        {
            id: 1,
            type: 'timesheet' as const,
            status: 'pending' as const,
            submittedBy: {
                name: 'John Doe',
                avatar: 'https://example.com/avatar1.jpg',
                position: 'Developer',
            },
            submittedAt: '2024-03-09T10:00:00Z',
            details: {
                hours: 40,
            },
        },
        {
            id: 2,
            type: 'leave' as const,
            status: 'approved' as const,
            submittedBy: {
                name: 'Jane Smith',
                position: 'Designer',
            },
            submittedAt: '2024-03-09T11:00:00Z',
            details: {
                startDate: '2024-03-15',
                endDate: '2024-03-20',
                reason: 'Family vacation',
            },
        },
        {
            id: 3,
            type: 'timesheet' as const,
            status: 'rejected' as const,
            submittedBy: {
                name: 'Bob Wilson',
                position: 'Manager',
            },
            submittedAt: '2024-03-09T12:00:00Z',
            details: {
                hours: 45,
            },
        },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementation
        (formatTimestamp as jest.Mock).mockImplementation((date) => new Date(date).toLocaleDateString());
    })

    it('renders approval summary cards', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
        expect(screen.getByText('Approved Today')).toBeInTheDocument();
        expect(screen.getByText('Rejected Today')).toBeInTheDocument();
    })

    it('displays correct approval counts', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const pendingCount = mockRequests.filter(r => r.status === 'pending').length;
        const approvedCount = mockRequests.filter(r => r.status === 'approved').length;
        const rejectedCount = mockRequests.filter(r => r.status === 'rejected').length;

        // Use data-testid attributes to identify specific count elements
        expect(screen.getByTestId('pending-count')).toHaveTextContent(pendingCount.toString());
        expect(screen.getByTestId('approved-count')).toHaveTextContent(approvedCount.toString());
        expect(screen.getByTestId('rejected-count')).toHaveTextContent(rejectedCount.toString());
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

    it('displays request type with correct icon', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        // Check for timesheet and leave types in the content rather than counting icons
        const timesheetRows = screen.getAllByText('timesheet');
        const leaveRows = screen.getAllByText('leave');

        expect(timesheetRows).toHaveLength(2);
        expect(leaveRows).toHaveLength(1);
    })

    it('displays submitter information correctly', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        mockRequests.forEach(request => {
            expect(screen.getByText(request.submittedBy.name)).toBeInTheDocument();
            expect(screen.getByText(request.submittedBy.position)).toBeInTheDocument();
        })
    })

    it('renders avatar fallback when no avatar is provided', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const janeSmith = mockRequests[1].submittedBy;
        const fallback = janeSmith.name.split(' ').map(n => n[0]).join('');

        // The fallback might be in a specific element, check for the text
        expect(screen.getByText(fallback)).toBeInTheDocument();
    })

    it('displays timesheet details correctly', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const timesheetRequest = mockRequests[0];
        expect(screen.getByText(`${timesheetRequest.details.hours} hours`)).toBeInTheDocument();
    })

    it('displays leave request details correctly', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const leaveRequest = mockRequests[1];
        expect(screen.getByText(leaveRequest.details.reason!)).toBeInTheDocument();
        expect(formatTimestamp).toHaveBeenCalledWith(leaveRequest.details.startDate);
        expect(formatTimestamp).toHaveBeenCalledWith(leaveRequest.details.endDate);
    })

    it('applies correct status badge colors', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        // Use data-testid attributes to identify status badges
        expect(screen.getByTestId('status-pending')).toHaveClass('bg-yellow-500');
        expect(screen.getByTestId('status-approved')).toHaveClass('bg-green-500');
        expect(screen.getByTestId('status-rejected')).toHaveClass('bg-red-500');
    })

    it('renders action buttons for each request', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        const approveButtons = screen.getAllByRole('button', { name: /approve/i })
        const rejectButtons = screen.getAllByRole('button', { name: /reject/i })

        expect(approveButtons).toHaveLength(mockRequests.length);
        expect(rejectButtons).toHaveLength(mockRequests.length);
    })

    it('handles empty request list', () => {
        render(<ApprovalRequests requests={[]} />);

        // Check each count area specifically by test ID
        expect(screen.getByTestId('pending-count')).toHaveTextContent('0');
        expect(screen.getByTestId('approved-count')).toHaveTextContent('0');
        expect(screen.getByTestId('rejected-count')).toHaveTextContent('0');

        expect(screen.getByText('Type')).toBeInTheDocument(); // Table header still present
    })

    it('formats timestamps correctly', () => {
        render(<ApprovalRequests requests={mockRequests} />);

        mockRequests.forEach(request => {
            expect(formatTimestamp).toHaveBeenCalledWith(request.submittedAt);
        })
    })
})

