import '@testing-library/jest-dom';

// Mock Inertia.js
jest.mock('@inertiajs/react', () => ({
    useForm: () => ({
        data: {},
        setData: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        reset: jest.fn(),
    }),
    Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})



