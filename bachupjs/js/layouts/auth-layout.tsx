import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    [key: string]: any;
}

export default function AuthLayout({ children, title = "Authentication", description = "Sign in to your account", ...props }: AuthLayoutProps) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}

