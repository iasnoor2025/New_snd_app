import { router } from '@inertiajs/react';
import ToastService from '@/utils/toast-service';

/**
 * HttpService provides a centralized way to make HTTP requests
 * with standardized error handling and success messages
 */
export default class HttpService {
  /**
   * Make a GET request
   *
   * @param route The route to request
   * @param params Optional query parameters
   * @param options Optional configuration options
   */
  static get(
    route: string,
    params: Record<string, any> = {},
    options: {
      preserveState?: boolean;
      preserveScroll?: boolean;
      only?: string[];
      onSuccess?: () => void;
      onError?: (error: any) => void;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ) {
    const {
      preserveState = true,
      preserveScroll = false,
      only = [],
      onSuccess,
      onError,
      successMessage,
      errorMessage = 'An error occurred while fetching data'
    } = options;

    router.get(route, params, {
      preserveState,
      preserveScroll,
      only,
      onSuccess: () => {
        if (successMessage) {
          ToastService.success(successMessage);
        }
        if (onSuccess) onSuccess();
      },
      onError: (errors) => {
        ToastService.error(errorMessage);
        if (onError) onError(errors);
      },
    })
  }

  /**
   * Make a POST request
   *
   * @param route The route to post to
   * @param data The data to send
   * @param options Optional configuration options
   */
  static post(
    route: string,
    data: Record<string, any> = {},
    options: {
      preserveState?: boolean;
      preserveScroll?: boolean;
      onSuccess?: () => void;
      onError?: (error: any) => void;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ) {
    const {
      preserveState = false,
      preserveScroll = false,
      onSuccess,
      onError,
      successMessage = 'Operation completed successfully',
      errorMessage = 'An error occurred during submission'
    } = options;

    router.post(route, data, {
      preserveState,
      preserveScroll,
      onSuccess: () => {
        ToastService.success(successMessage);
        if (onSuccess) onSuccess();
      },
      onError: (errors) => {
        ToastService.error(errorMessage);
        if (onError) onError(errors);
      },
    })
  }

  /**
   * Make a PUT request
   *
   * @param route The route to put to
   * @param data The data to send
   * @param options Optional configuration options
   */
  static put(
    route: string,
    data: Record<string, any> = {},
    options: {
      preserveState?: boolean;
      preserveScroll?: boolean;
      onSuccess?: () => void;
      onError?: (error: any) => void;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ) {
    const {
      preserveState = false,
      preserveScroll = false,
      onSuccess,
      onError,
      successMessage = 'Operation completed successfully',
      errorMessage = 'An error occurred during submission'
    } = options;

    router.put(route, data, {
      preserveState,
      preserveScroll,
      onSuccess: () => {
        ToastService.success(successMessage);
        if (onSuccess) onSuccess();
      },
      onError: (errors) => {
        ToastService.error(errorMessage);
        if (onError) onError(errors);
      },
    })
  }

  /**
   * Make a PATCH request
   *
   * @param route The route to patch
   * @param data The data to send
   * @param options Optional configuration options
   */
  static patch(
    route: string,
    data: Record<string, any> = {},
    options: {
      preserveState?: boolean;
      preserveScroll?: boolean;
      onSuccess?: () => void;
      onError?: (error: any) => void;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ) {
    const {
      preserveState = false,
      preserveScroll = false,
      onSuccess,
      onError,
      successMessage = 'Operation completed successfully',
      errorMessage = 'An error occurred during submission'
    } = options;

    router.patch(route, data, {
      preserveState,
      preserveScroll,
      onSuccess: () => {
        ToastService.success(successMessage);
        if (onSuccess) onSuccess();
      },
      onError: (errors) => {
        ToastService.error(errorMessage);
        if (onError) onError(errors);
      },
    })
  }

  /**
   * Make a DELETE request
   *
   * @param route The route to delete
   * @param options Optional configuration options
   */
  static delete(
    route: string,
    options: {
      preserveState?: boolean;
      preserveScroll?: boolean;
      onSuccess?: () => void;
      onError?: (error: any) => void;
      successMessage?: string;
      errorMessage?: string;
    } = {}
  ) {
    const {
      preserveState = false,
      preserveScroll = false,
      onSuccess,
      onError,
      successMessage = 'Item deleted successfully',
      errorMessage = 'An error occurred during deletion'
    } = options;

    router.delete(route, {
      preserveState,
      preserveScroll,
      onSuccess: () => {
        ToastService.success(successMessage);
        if (onSuccess) onSuccess();
      },
      onError: (errors) => {
        ToastService.error(errorMessage);
        if (onError) onError(errors);
      },
    })
  }
}
