import { router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export function LogoutButton({ className = '', variant = 'default' }: LogoutButtonProps) {
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <button
            onClick={handleLogout}
            className={className}
            type="button"
            <LogOut className="mr-2 h-4 w-4" />
            Log out
        </button>
    );
}
