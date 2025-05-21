import { Permission } from './models';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    is_admin: boolean;
    permissions: Permission[];
    roles: {
        id: number;
        name: string;
        display_name?: string;
    }[];
}
