import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { User } from './user';
import { Permission, PermissionString } from './models';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    is_admin?: boolean;
    permissions?: PermissionString[];
    roles: {
        id: number;
        name: string;
        display_name?: string;
    }[];
    [key: string]: unknown; // This allows for additional properties...
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
    roles?: {
      id: number;
      name: string;
      display_name?: string;
    }[];
    role?: {
      id: number;
      name: string;
      display_name?: string;
    };
    permissions?: PermissionString[];
    hasPermission?: string[];
    hasRole?: string[];
  };
  flash?: {
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
  };
  ziggy: {
    location: string;
    baseUrl: string;
    url: string;
  };
};
