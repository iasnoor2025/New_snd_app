import { usePage } from '@inertiajs/react';
import { User } from '@/Types/user';

interface AuthProps {
    auth: {
        user: User;
    };
}

export const useAuth = () => {
    const { auth } = usePage<AuthProps>().props;
    return auth;
};



