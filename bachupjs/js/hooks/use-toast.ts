// Migration adapter for legacy code using the old toast system
// This forwards all toast calls to the new ToastService

import { ToastService, toast as sonnerToast } from "@/components/shared/ToastManager";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

type CustomToastProps = ToastProps & {
  description?: string;
  title?: string;
};

// Legacy toast function that forwards to the new Toast API
export const toast: {
  custom: (props: CustomToastProps) => void;
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
  loading: (message: string) => string;
  dismiss: (toastId?: string) => void;
} = {
  // Forward to custom variant-based toast
  custom: ({ title, description, variant, duration }: CustomToastProps) => {
    // Map old variants to new ones
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

    return ToastService.show(description?.toString() || "", mappedVariant, {
      title: title?.toString(),
      duration,
    })
  },

  // Simple call forwarding functions
  error: (message: string) => ToastService.error(message),
  success: (message: string) => ToastService.success(message),
  info: (message: string) => ToastService.info(message),
  warning: (message: string) => ToastService.warning(message),
  loading: (message: string) => ToastService.loading(message),

  // Custom implementation to maintain compatibility
  dismiss: (toastId?: string) => {
    if (toastId) {
      ToastService.dismiss(toastId);
    } else {
      ToastService.dismissAll();
    }
  }
};

function genId() {
  return Date.now().toString();
}

// Legacy hook for compatibility with existing components
export function useToast() {
  return {
    toast,
    // To maintain compatibility with old code that destructures the hook
    toasts: [],
    dismiss: (toastId?: string) => {
      if (toastId) {
        ToastService.dismiss(toastId);
      } else {
        ToastService.dismissAll();
      }
    }
  };
}

// Export Sonner toast for direct usage if needed
export { sonnerToast };
