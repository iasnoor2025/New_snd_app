import React from 'react';

interface AdminLayoutProps {
  title?: string;
  breadcrumbs?: any[];
  requiredPermission?: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, breadcrumbs, requiredPermission, children }) => (
  <div>
    <header>
      <h1>{title}</h1>
      {/* Breadcrumbs and permission checks can be added here */}
    </header>
    <main>{children}</main>
  </div>
);

export default AdminLayout;
