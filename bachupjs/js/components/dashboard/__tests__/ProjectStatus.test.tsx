import { render, screen } from '@testing-library/react';
import { ProjectStatus } from '../ProjectStatus';
import { formatTimestamp } from '@/utils/dashboard';

// Mock the utility function
jest.mock('@/utils/dashboard', () => ({
    formatTimestamp: jest.fn(),
}));

describe('ProjectStatus', () => {
    const mockProjects = [;
        {
            id: 1,
            name: 'Website Redesign',
            description: 'Complete overhaul of company website',
            startDate: '2024-03-01',
            endDate: '2024-04-30',
            status: 'active' as const,
            progress: 45,
            teamSize: 5,
            budget: 50000,
            spent: 20000,
        },
        {
            id: 2,
            name: 'Mobile App',
            description: 'New mobile application development',
            startDate: '2024-02-01',
            endDate: '2024-05-31',
            status: 'completed' as const,
            progress: 100,
            teamSize: 8,
            budget: 100000,
            spent: 95000,
        },
        {
            id: 3,
            name: 'Database Migration',
            description: 'Legacy system migration',
            startDate: '2024-01-01',
            endDate: '2024-03-31',
            status: 'on_hold' as const,
            progress: 30,
            teamSize: 3,
            budget: 30000,
            spent: 25000,
        },
        {
            id: 4,
            name: 'API Integration',
            description: 'Third-party API integration',
            startDate: '2024-02-15',
            endDate: '2024-03-15',
            status: 'cancelled' as const,
            progress: 0,
            teamSize: 2,
            budget: 20000,
            spent: 25000,
        },
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Setup default mock implementation
        (formatTimestamp as jest.Mock).mockImplementation((date) => new Date(date).toLocaleDateString());
    })

    it('renders project summary cards', () => {
        render(<ProjectStatus projects={mockProjects} />);

        expect(screen.getByText('Active Projects')).toBeInTheDocument();
        expect(screen.getByText('Completed Projects')).toBeInTheDocument();
        expect(screen.getByText('On Hold')).toBeInTheDocument();
    })

    it('displays correct project counts', () => {
        render(<ProjectStatus projects={mockProjects} />);

        const activeCount = mockProjects.filter(p => p.status === 'active').length;
        const completedCount = mockProjects.filter(p => p.status === 'completed').length;
        const onHoldCount = mockProjects.filter(p => p.status === 'on_hold').length;

        // Use data-testid attributes to identify count elements
        expect(screen.getByTestId('active-count')).toHaveTextContent(activeCount.toString());
        expect(screen.getByTestId('completed-count')).toHaveTextContent(completedCount.toString());
        expect(screen.getByTestId('on-hold-count')).toHaveTextContent(onHoldCount.toString());
    })

    it('renders project table with correct headers', () => {
        render(<ProjectStatus projects={mockProjects} />);

        expect(screen.getByText('Project')).toBeInTheDocument();
        expect(screen.getByText('Timeline')).toBeInTheDocument();
        expect(screen.getByText('Team')).toBeInTheDocument();
        expect(screen.getByText('Progress')).toBeInTheDocument();
        expect(screen.getByText('Budget')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    })

    it('displays project information correctly', () => {
        render(<ProjectStatus projects={mockProjects} />);

        mockProjects.forEach(project => {
            expect(screen.getByText(project.name)).toBeInTheDocument();
            expect(screen.getByText(project.description)).toBeInTheDocument();
            expect(screen.getByText(`${project.teamSize} members`)).toBeInTheDocument();
            expect(screen.getByText(`${project.progress}%`)).toBeInTheDocument();
        })
    })

    it('applies correct status badge colors', () => {
        render(<ProjectStatus projects={mockProjects} />);

        // Use data-testid attributes to identify status badges
        expect(screen.getByTestId('status-badge-active')).toHaveClass('bg-green-500');
        expect(screen.getByTestId('status-badge-completed')).toHaveClass('bg-blue-500');
        expect(screen.getByTestId('status-badge-on_hold')).toHaveClass('bg-yellow-500');
        expect(screen.getByTestId('status-badge-cancelled')).toHaveClass('bg-red-500');
    })

    it('displays correct budget status indicators', () => {
        render(<ProjectStatus projects={mockProjects} />);

        // Use data-testid attributes to identify budget statuses
        expect(screen.getByTestId('budget-status-4')).toHaveTextContent('Over Budget');
        expect(screen.getByTestId('budget-status-4')).toHaveClass('text-red-500');

        // Find the specific budget status by test ID instead of text
        expect(screen.getByTestId('budget-status-2')).toHaveTextContent('Near Limit');
        expect(screen.getByTestId('budget-status-2')).toHaveClass('text-yellow-500');

        expect(screen.getByTestId('budget-status-1')).toHaveTextContent('Under Budget');
        expect(screen.getByTestId('budget-status-1')).toHaveClass('text-green-500');
    })

    it('displays budget amounts correctly', () => {
        render(<ProjectStatus projects={mockProjects} />);

        mockProjects.forEach(project => {
            const spentAmount = `$${project.spent.toLocaleString()}`;
            const budgetAmount = `$${project.budget.toLocaleString()}`;

            // Find the budget information by test ID
            const budgetInfo = screen.getByTestId(`budget-info-${project.id}`);
            expect(budgetInfo).toHaveTextContent(spentAmount);
            expect(budgetInfo).toHaveTextContent(budgetAmount);
        })
    })

    it('formats timestamps correctly', () => {
        render(<ProjectStatus projects={mockProjects} />);

        mockProjects.forEach(project => {
            expect(formatTimestamp).toHaveBeenCalledWith(project.startDate);
            expect(formatTimestamp).toHaveBeenCalledWith(project.endDate);
        })
    })

    it('handles empty project list', () => {
        render(<ProjectStatus projects={[]} />);

        // Check all summary cards show 0
        expect(screen.getByTestId('active-count')).toHaveTextContent('0');
        expect(screen.getByTestId('completed-count')).toHaveTextContent('0');
        expect(screen.getByTestId('on-hold-count')).toHaveTextContent('0');

        // Table header should still be present
        expect(screen.getByText('Project')).toBeInTheDocument();
    })

    it('renders progress bars with correct values', () => {
        render(<ProjectStatus projects={mockProjects} />);

        mockProjects.forEach(project => {
            // Find progress bar by test ID
            const progressBar = screen.getByTestId(`progress-bar-${project.id}`);
            // Check the child element (indicator) which has the style transform
            const indicator = progressBar.querySelector('div');
            expect(indicator).toHaveStyle(`transform: translateX(-${100 - project.progress}%)`);
        })
    })

    it('renders action buttons for each project', () => {
        render(<ProjectStatus projects={mockProjects} />);

        // Look for specific action buttons by test ID
        mockProjects.forEach(project => {
            expect(screen.getByTestId(`project-actions-${project.id}`)).toBeInTheDocument();
        })
    })

    it('renders add project button', () => {
        render(<ProjectStatus projects={mockProjects} />);

        expect(screen.getByRole('button', { name: 'Add Project' })).toBeInTheDocument();
    })
})

