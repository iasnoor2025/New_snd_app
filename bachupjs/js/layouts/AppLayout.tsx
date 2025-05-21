import React, { ReactNode, Suspense, memo } from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { FullPageLoading } from '@/components/shared/LoadingState';

interface AppLayoutProps {
    children: ReactNode;
    title?: string;
    header?: ReactNode;
}

/**
 * Main application layout with sidebar, header, and content area
 */
const AppLayout: React.FC<AppLayoutProps> = memo(function AppLayout({
    children,
    title,
    header
}: AppLayoutProps) {
    return (
            <Head title={title} />
            <div className="min-h-screen bg-background">
                <AppShell header={header}>
                    <Suspense fallback={<FullPageLoading />}>
                        {children}
                    </Suspense>
                </AppShell>
            </div>
        </>
    );
})

export default AppLayout;
