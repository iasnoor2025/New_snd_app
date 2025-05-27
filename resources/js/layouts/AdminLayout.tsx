import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface AdminLayoutProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  requiredPermission?: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, breadcrumbs = [], requiredPermission, children }) => {
  // Always start with Dashboard
  const dashboardCrumb = { title: 'Dashboard', href: '/dashboard' };
  let finalBreadcrumbs: BreadcrumbItem[] = [];

  if (!breadcrumbs || breadcrumbs.length === 0) {
    // Auto-generate: Dashboard > current page
    finalBreadcrumbs = [
      dashboardCrumb,
      { title: title || 'Current', href: window.location.pathname },
    ];
  } else {
    // If first is not Dashboard, prepend it
    if (breadcrumbs[0].title !== 'Dashboard') {
      finalBreadcrumbs = [dashboardCrumb, ...breadcrumbs];
    } else {
      finalBreadcrumbs = breadcrumbs;
    }
  }

  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header>
          <h1>{title}</h1>
          <Breadcrumbs breadcrumbs={finalBreadcrumbs} />
        </header>
        <main style={{ flex: 1 }}>{children}</main>
      </div>
    </AppShell>
  );
};

export default AdminLayout;
