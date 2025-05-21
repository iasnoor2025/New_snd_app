import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { ToastService, toast as sonnerToast } from "../shared/ToastManager";

// Export toast object with consistent interface
export const toast = {
  // Custom method that accepts title and description
  custom: ({ title, description, variant, ...props }: any) => {
    // Map variants to the ones used by ToastService
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
  success: (options: any) => {
    const message = typeof options === 'string' ? options : options.description;
    const title = typeof options === 'string' ? undefined : options.title;
    return ToastService.success(message, { title })
  },

  error: (options: any) => {
    const message = typeof options === 'string' ? options : options.description;
    const title = typeof options === 'string' ? undefined : options.title;
    return ToastService.error(message, { title })
  },

  info: (options: any) => {
    const message = typeof options === 'string' ? options : options.description;
    const title = typeof options === 'string' ? undefined : options.title;
    return ToastService.info(message, { title })
  },

  warning: (options: any) => {
    const message = typeof options === 'string' ? options : options.description;
    const title = typeof options === 'string' ? undefined : options.title;
    return ToastService.warning(message, { title })
  },

  loading: (options: any) => {
    const message = typeof options === 'string' ? options : options.description;
    const title = typeof options === 'string' ? undefined : options.title;
    return ToastService.loading(message, { title })
  },

  dismiss: ToastService.dismiss,
  promise: ToastService.promise,
};

// Updated hook that returns a function directly
export function useToast() {
  return toast;
}

export { sonnerToast };
