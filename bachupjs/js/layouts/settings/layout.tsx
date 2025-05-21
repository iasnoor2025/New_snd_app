import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { type PageProps } from '@/types';
import Heading from '@/components/heading';

interface SettingsLayoutProps {
    className?: string;
}

const settingsLinks = [;
    {
        name: 'Profile',
        href: '/settings/profile',
        description: 'Update your name and email address'
    },
    {
        name: 'Password',
        href: '/settings/password',
        description: 'Change your password'
    },
    {
        name: 'Appearance',
        href: '/settings/appearance',
        description: 'Customize the application appearance'
    },
    {
        name: 'Company',
        href: '/settings/company',
        description: 'Manage company information and branding'
    }
];

export default function SettingsLayout({ children, className }: PropsWithChildren<SettingsLayoutProps>) {
    const { url } = usePage<PageProps>();

    return (
        <div className={cn('container mx-auto py-6', className)}>
            <div className="space-y-6">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />

                <div className="grid grid-cols-1 gap-8 md:grid-cols-[250px_1fr]">
                    <aside className="flex flex-col space-y-1">
                        {settingsLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'flex flex-col rounded-lg px-3 py-2 hover:bg-gray-50',
                                    url === link.href
                                        ? 'bg-gray-50'
                                        : 'text-gray-600'
                                )}
                                <span className="font-medium text-gray-900">
                                    {link.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {link.description}
                                </span>
                            </Link>
                        ))}
                    </aside>

                    <main className="flex-1">
                        <div className="space-y-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

