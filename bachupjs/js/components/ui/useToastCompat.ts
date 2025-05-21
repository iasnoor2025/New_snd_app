/**
 * Compatibility wrapper for the old toast system
 */

import { ToastService, toast as sonnerToast } from '../shared/ToastManager';

// Legacy toast function for compatibility
export const toast = {
  // Custom method for legacy components
  custom: ({ title, description, variant, ...props }: any) => {
    let mappedVariant: "default" | "success" | "error" | "warning" | "info" | "loading" = "default";

    switch (variant) {
      case "destructive":
        mappedVariant = "error";
        break;
      case "success":
      case "warning":
      case "info":
      case "loading":
        mappedVariant = variant;
        break;
      default:
        mappedVariant = "default";
    }

    return ToastService.show(description || "", mappedVariant, {
      title,
      ...props
    })
  },

  // Forward all common methods
  success: ToastService.success,
  error: ToastService.error,
  info: ToastService.info,
  warning: ToastService.warning,
  loading: ToastService.loading,
  dismiss: ToastService.dismiss,
  promise: ToastService.promise,
};

// Legacy hook for compatibility
export function useToast() {
  return {
    toast,
    toasts: [], // Empty array for compatibility
    dismiss: ToastService.dismiss,
  };
}

// Direct export for easy imports
export { sonnerToast };
