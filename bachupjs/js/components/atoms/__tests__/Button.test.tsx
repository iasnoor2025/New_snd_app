import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
    it('renders with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary-600');
    })

    it('renders with different variants', () => {
        const { rerender } = render(<Button variant="secondary">Secondary</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-gray-600');

        rerender(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole('button')).toHaveClass('border-primary-600');

        rerender(<Button variant="ghost">Ghost</Button>);
        expect(screen.getByRole('button')).toHaveClass('text-primary-600');

        rerender(<Button variant="danger">Danger</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    })

    it('renders with different sizes', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-3 py-1.5 text-sm');

        rerender(<Button size="lg">Large</Button>);
        expect(screen.getByRole('button')).toHaveClass('px-6 py-3 text-lg');
    })

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toContainElement(screen.getByRole('status'));
    })

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    })

    it('renders with icons', () => {
        const leftIcon = <span data-testid="left-icon">←</span>
        const rightIcon = <span data-testid="right-icon">→</span>

        render(
            <Button leftIcon={leftIcon} rightIcon={rightIcon}>
                With Icons
            </Button>
        );

        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    })

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    })
})
