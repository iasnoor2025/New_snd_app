import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';
import { useState } from 'react';
import { DateTimeDisplay } from './date-time-display';
import { WebSocketProvider } from '@/components/providers/websocket-provider';
import ErrorBoundary from '@/components/ErrorBoundary';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const [isOpen, setIsOpen] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('sidebar') !== 'false' : true));

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);

        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };

    if (variant === 'header') {
        return (
            <ErrorBoundary>
                <WebSocketProvider>
                    <div className="flex min-h-screen w-full flex-col">
                        {children}
                        <DateTimeDisplay />
                        <Toaster position="top-right" />
                    </div>
                </WebSocketProvider>
            </ErrorBoundary>
        );
    }

    return (
        <ErrorBoundary>
            <WebSocketProvider>
                <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={handleSidebarChange}>
                    {children}
                    <DateTimeDisplay />
                    <Toaster position="top-right" />
                </SidebarProvider>
            </WebSocketProvider>
        </ErrorBoundary>
    );
}
