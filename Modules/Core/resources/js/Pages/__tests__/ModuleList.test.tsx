import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModuleList from '../ModuleList';
import { useForm } from '@inertiajs/react';
import { route } from '../../routes';

// Mock @inertiajs/react
jest.mock('@inertiajs/react', () => ({
    useForm: jest.fn(),
}));

describe('ModuleList', () => {
    const mockModules = [;
        {
            name: 'Test Module 1',
            description: 'Description 1',
            status: 'active' as const,
            config: { setting1: 'value1' },
        },
        {
            name: 'Test Module 2',
            description: 'Description 2',
            status: 'pending' as const,
        },
    ];

    const mockPost = jest.fn();

    beforeEach(() => {
        (useForm as jest.Mock).mockReturnValue({
            post: mockPost,
            processing: false,
        });
    });

    it('renders module cards for each module', () => {
        render(<ModuleList modules={mockModules} />);

        expect(screen.getByText('Test Module 1')).toBeInTheDocument();
        expect(screen.getByText('Description 1')).toBeInTheDocument();
        expect(screen.getByText('Test Module 2')).toBeInTheDocument();
        expect(screen.getByText('Description 2')).toBeInTheDocument();
    });

    it('calls initialize endpoint when initialize button is clicked', () => {
        render(<ModuleList modules={mockModules} />);

        const initializeButtons = screen.getAllByText('Initialize');
        fireEvent.click(initializeButtons[0]);

        expect(mockPost).toHaveBeenCalledWith(
            route('core.modules.initialize', { name: 'Test Module 1' }),
            expect.any(Object)
        );
    });

    it('renders correct status badges', () => {
        render(<ModuleList modules={mockModules} />);

        expect(screen.getByText('active')).toHaveClass('bg-green-100');
        expect(screen.getByText('pending')).toHaveClass('bg-yellow-100');
    });

    it('renders configuration when available', () => {
        render(<ModuleList modules={mockModules} />);

        expect(screen.getByText('Configuration')).toBeInTheDocument();
        expect(screen.getByText('setting1')).toBeInTheDocument();
        expect(screen.getByText('value1')).toBeInTheDocument();
    });

    it('renders page title and header', () => {
        render(<ModuleList modules={mockModules} />);

        expect(screen.getByText('Module Management')).toBeInTheDocument();
    });
});

