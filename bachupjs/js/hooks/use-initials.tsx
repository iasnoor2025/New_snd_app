import { useCallback } from 'react';

export function useInitials() {
    const getInitials = useCallback((fullName: string): string => {
        if (!fullName) return '';
        const names = fullName.trim().split(' ').filter(Boolean);

        if (names.length === 0) return '';
        if (names.length === 1) return names[0].charAt(0).toUpperCase();

        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);

    return getInitials;
}
