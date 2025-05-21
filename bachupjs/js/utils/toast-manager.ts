import { Toast } from '@/components/shared/ToastNotification';

/**
 * Standardized toast notification manager
 * Uses our unified Toast API under the hood for consistent interface and styling
 * @deprecated Use Toast from '@/components/shared/ToastNotification' directly
 */
class ToastManager {
  /**
   * Show a success toast notification
   * @param message Message to display
   * @param options Additional toast options
   */
  static success(message: string, options: any = {}) {
    Toast.success(message, options);
  }

  /**
   * Show an error toast notification
   * @param message Message to display
   * @param options Additional toast options
   */
  static error(message: string, options: any = {}) {
    Toast.error(message, options);
  }

  /**
   * Show an info toast notification
   * @param message Message to display
   * @param options Additional toast options
   */
  static info(message: string, options: any = {}) {
    Toast.info(message, options);
  }

  /**
   * Show a warning toast notification
   * @param message Message to display
   * @param options Additional toast options
   */
  static warning(message: string, options: any = {}) {
    Toast.warning(message, options);
  }

  /**
   * Show a loading toast notification
   * @param message Message to display
   * @param options Additional toast options
   * @returns Toast ID for updating later
   */
  static loading(message: string, options: any = {}) {
    return Toast.loading(message, options);
  }

  /**
   * Dismiss a toast by ID
   * @param id Toast ID to dismiss
   */
  static dismiss(id: string) {
    Toast.dismiss(id);
  }

  /**
   * Dismiss all toasts
   */
  static dismissAll() {
    Toast.dismissAll();
  }

  /**
   * Update an existing toast
   * @param id Toast ID to update
   * @param message New message
   * @param options New options
   */
  static update(id: string, message: string, options: any = {}) {
    Toast.update(id, message, options);
  }

  /**
   * Create a promise toast that shows different messages based on promise state
   * @param promise Promise to track
   * @param messages Object containing loading/success/error messages
   * @param options Additional toast options
   */
  static promise(
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options: any = {}
  ) {
    return Toast.promise(promise, messages, options);
  }
}

export default ToastManager;



