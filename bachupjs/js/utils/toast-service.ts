import { Toast } from '@/components/shared/ToastNotification';

/**
 * ToastService provides a centralized way to display toast notifications
 * throughout the application with consistent styling and behavior.
 */
class ToastService {
  /**
   * Display a success toast notification
   *
   * @param message The success message to display
   * @param title Optional title for the toast
   */
  static success(message: string, title: string = 'Success') {
    Toast.success(message, {
      title
    })
  }

  /**
   * Display an error toast notification
   *
   * @param message The error message to display
   * @param title Optional title for the toast
   */
  static error(message: string, title: string = 'Error') {
    Toast.error(message, {
      title
    })
  }

  /**
   * Display an info toast notification
   *
   * @param message The info message to display
   * @param title Optional title for the toast
   */
  static info(message: string, title: string = 'Information') {
    Toast.info(message, {
      title
    })
  }

  /**
   * Display a warning toast notification
   *
   * @param message The warning message to display
   * @param title Optional title for the toast
   */
  static warning(message: string, title: string = 'Warning') {
    Toast.warning(message, {
      title
    })
  }

  /**
   * Display a loading toast notification, typically used during async operations
   *
   * @param message The loading message to display
   * @param title Optional title for the toast
   * @returns Toast ID for updating or dismissing later
   */
  static loading(message: string, title: string = 'Loading') {
    return Toast.loading(message, {
      title
    })
  }

  /**
   * Update an existing toast notification
   *
   * @param id ID of the toast to update
   * @param message New message to display
   * @param title New title for the toast
   */
  static update(id: string, message: string, title?: string) {
    Toast.update(id, message, {
      title
    })
  }

  /**
   * Dismiss a toast notification
   *
   * @param id ID of the toast to dismiss, dismisses all if not provided
   */
  static dismiss(id?: string) {
    if (id) {
      Toast.dismiss(id);
    } else {
      Toast.dismissAll();
    }
  }

  /**
   * Create a promise toast that shows different messages based on promise state
   *
   * @param promise Promise to track
   * @param messages Object containing loading/success/error messages
   * @param titles Optional object containing titles for each state
   */
  static promise(
    promise: Promise<any>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    titles?: {
      loading?: string;
      success?: string;
      error?: string;
    }
  ) {
    return Toast.promise(promise, messages, {
      loading: { title: titles?.loading || 'Loading' },
      success: { title: titles?.success || 'Success' },
      error: { title: titles?.error || 'Error' }
    })
  }
}

export default ToastService;



