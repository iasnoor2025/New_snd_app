import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApprovalRequests } from '@/Components/Dashboard/ApprovalRequests';
import { DashboardLayout } from '@/Components/Dashboard/DashboardLayout';
import { useDashboardData } from '@/hooks/useDashboardData';
import { vi } from 'vitest';

// Mock the useDashboardData hook
vi.mock('@/hooks/useDashboardData', () => ({
    useDashboardData: vi.fn()
}));

// Mock API calls
const mockApi = {
    approveRequest: vi.fn(),
    rejectRequest: vi.fn(),
    fetchRequests: vi.fn()
};

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
        status: 'pending' as const,
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
    }
];

describe('Approval Workflow Integration', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        vi.clearAllMocks();

        // Setup default mock implementations
        (useDashboardData as any).mockReturnValue({
            requests: mockRequests,
            isLoading: false,
            error: null,
            refetch: vi.fn()
        })

        mockApi.fetchRequests.mockResolvedValue(mockRequests);
        mockApi.approveRequest.mockResolvedValue({ success: true })
        mockApi.rejectRequest.mockResolvedValue({ success: true })
    })

    it('loads and displays approval requests', async () => {
        render(
            <DashboardLayout>
                <ApprovalRequests requests={mockRequests} />
            </DashboardLayout>
        );

        // Verify initial state
        expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument(); // Pending count
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    })

    it('handles approval of a timesheet request', async () => {
        const user = userEvent.setup();
        render(
            <DashboardLayout>
                <ApprovalRequests requests={mockRequests} />
            </DashboardLayout>
        );

        // Find and click the approve button for the first request
        const approveButtons = screen.getAllByRole('button', { name: /approve/i })
        await user.click(approveButtons[0]);

        // Verify API call
        await waitFor(() => {
            expect(mockApi.approveRequest).toHaveBeenCalledWith(1);
        })

        // Verify UI updates
        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument(); // Updated pending count
        })
    })

    it('handles rejection of a leave request', async () => {
        const user = userEvent.setup();
        render(
            <DashboardLayout>
                <ApprovalRequests requests={mockRequests} />
            </DashboardLayout>
        );

        // Find and click the reject button for the second request
        const rejectButtons = screen.getAllByRole('button', { name: /reject/i })
        await user.click(rejectButtons[1]);

        // Verify API call
        await waitFor(() => {
            expect(mockApi.rejectRequest).toHaveBeenCalledWith(2);
        })

        // Verify UI updates
        await waitFor(() => {
            expect(screen.getByText('1')).toBeInTheDocument(); // Updated pending count
        })
    })

    it('handles API errors gracefully', async () => {
        // Mock API error
        mockApi.approveRequest.mockRejectedValue(new Error('API Error'));

        const user = userEvent.setup();
        render(
            <DashboardLayout>
                <ApprovalRequests requests={mockRequests} />
            </DashboardLayout>
        );

        // Try to approve a request
        const approveButtons = screen.getAllByRole('button', { name: /approve/i })
        await user.click(approveButtons[0]);

        // Verify error handling
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        })
    })

    it('refreshes data after successful approval', async () => {
        const refetch = vi.fn();
        (useDashboardData as any).mockReturnValue({
            requests: mockRequests,
            isLoading: false,
            error: null,
            refetch
        })

        const user = userEvent.setup();
        render(
            <DashboardLayout>
                <ApprovalRequests requests={mockRequests} />
            </DashboardLayout>
        );

        // Approve a request
        const approveButtons = screen.getAllByRole('button', { name: /approve/i })
        await user.click(approveButtons[0]);

        // Verify data refresh
        await waitFor(() => {
            expect(refetch).toHaveBeenCalled();
        })
    })

    it('handles loading state correctly', () => {
        (useDashboardData as any).mockReturnValue({
            requests: [],
            isLoading: true,
            error: null,
            refetch: vi.fn()
        })

        render(
            <DashboardLayout>
                <ApprovalRequests requests={[]} />
            </DashboardLayout>
        );

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    })

    it('updates counts correctly after multiple actions', async () => {
        const user = userEvent.setup();
        render(
            <DashboardLayout>
                <ApprovalRequests requests={mockRequests} />
            </DashboardLayout>
        );

        // Approve first request
        const approveButtons = screen.getAllByRole('button', { name: /approve/i })
        await user.click(approveButtons[0]);

        // Reject second request
        const rejectButtons = screen.getAllByRole('button', { name: /reject/i })
        await user.click(rejectButtons[1]);

        // Verify final counts
        await waitFor(() => {
            expect(screen.getByText('0')).toBeInTheDocument(); // No pending requests
            expect(screen.getByText('1')).toBeInTheDocument(); // One approved
            expect(screen.getByText('1')).toBeInTheDocument(); // One rejected
        })
    })
})

