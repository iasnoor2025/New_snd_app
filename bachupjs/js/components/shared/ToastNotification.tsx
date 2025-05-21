import React from 'react';
import { Toaster as SonnerToaster, toast } from 'sonner';

// Theme variants for toast notifications
type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

// Toast notification component props
interface ToastNotificationProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  theme?: 'light' | 'dark' | 'system';
  className?: string;
  closeButton?: boolean;
  offset?: string | number;
  duration?: number;
  gap?: number;
}

/**
 * ToastNotification Component
 *
 * Provides a Sonner Toaster component with customizable options.
 * This is the component to be included in your app layout.
 */
export function ToastNotification({
  position = 'top-right',
  theme = 'system',
  className = '',
  closeButton = true,
  offset = '16px',
  duration = 4000,
  gap = 8,
}: ToastNotificationProps) {
  return (
    <SonnerToaster
      position={position}
      theme={theme}
      className={className}
      closeButton={closeButton}
      offset={offset}
      duration={duration}
      gap={gap}
      richColors
      expand
      visibleToasts={5}
    />
  );
}

/**
 * Toast API for showing various types of notifications
 *
 * This object provides methods for displaying different types of toast notifications
 * using the Sonner toast library with standardized configuration.
 */
export const Toast = {
  /**
   * Show a success toast notification
   * @param message Message to display
   * @param options Additional Sonner toast options
   */
  success: (message: string, options?: any) => {
    toast.success(message, {
      duration: 4000,
      ...options,
    })
  },

  /**
   * Show an error toast notification
   * @param message Message to display
   * @param options Additional Sonner toast options
   */
  error: (message: string, options?: any) => {
    toast.error(message, {
      duration: 5000,
      ...options,
    })
  },

  /**
   * Show an info toast notification
   * @param message Message to display
   * @param options Additional Sonner toast options
   */
  info: (message: string, options?: any) => {
    toast.info(message, {
      duration: 3000,
      ...options,
    })
  },

  /**
   * Show a warning toast notification
   * @param message Message to display
   * @param options Additional Sonner toast options
   */
  warning: (message: string, options?: any) => {
    toast.warning(message, {
      duration: 4000,
      ...options,
    })
  },

  /**
   * Show a loading toast notification, typically used during async operations
   * @param message Message to display
   * @param options Additional Sonner toast options
   * @returns Toast ID that can be used for updating the toast later
   */
  loading: (message: string, options?: any) => {
    const id = options?.id || `loading-${Date.now()}`;
    toast.loading(message, {
      duration: Infinity, // Loading toasts don't auto-dismiss
      id,
      ...options,
    })
    return id;
  },

  /**
   * Show a custom toast notification with specified variant
   * @param message Message to display
   * @param variant Toast variant (default, success, error, etc.)
   * @param options Additional Sonner toast options
   */
  show: (message: string, variant: ToastVariant = 'default', options?: any) => {
    switch (variant) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning':
        toast.warning(message, options);
        break;
      case 'info':
        toast.info(message, options);
        break;
      case 'loading':
        toast.loading(message, options);
        break;
      default:
        toast(message, options);
    }
  },

  /**
   * Update an existing toast by ID
   * @param id Toast ID to update
   * @param message New message to display
   * @param options Additional options for the updated toast
   */
  update: (id: string, message: string, options?: any) => {
    toast.update(id, {
      ...options,
      content: message,
    })
  },

  /**
   * Dismiss a toast notification by ID
   * @param id Toast ID to dismiss
   */
  dismiss: (id: string) => {
    toast.dismiss(id);
  },

  /**
   * Dismiss all toast notifications
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Create a promise toast that shows different messages based on promise state
   * @param promise Promise to track
   * @param messages Object containing loading/success/error messages
   * @param options Additional Sonner toast options
   */
  promise: (
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: any
  ) => {
    return toast.promise(promise, messages, options);
  },
};

// Default export for convenience
export default ToastNotification;
