import { ExternalToast } from 'sonner';

// Add missing variant property to the sonner ExternalToast interface
declare module 'sonner' {
  interface ExternalToast {
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  }
}

// Add missing AuthLayout interface
declare module '@/layouts/auth-layout' {
  interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
  }

  const AuthLayout: React.FC<AuthLayoutProps>
  export default AuthLayout;
}
 