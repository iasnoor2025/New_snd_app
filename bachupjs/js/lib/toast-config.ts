import { toast } from "@/components/ui/use-toast";

// Default toast configuration
const defaultToastConfig = {
  duration: 5000, // 5 seconds
};

// Success toast with consistent styling
export const showSuccessToast = (message: string) => {
  toast({
    ...defaultToastConfig,
    description: message,
    className: "bg-green-50 text-green-900 border-green-200",
  })
};

// Error toast with consistent styling
export const showErrorToast = (message: string) => {
  toast({
    ...defaultToastConfig,
    description: message,
    variant: "destructive",
  })
};

// Info toast with consistent styling
export const showInfoToast = (message: string) => {
  toast({
    ...defaultToastConfig,
    description: message,
    className: "bg-blue-50 text-blue-900 border-blue-200",
  })
};

// Warning toast with consistent styling
export const showWarningToast = (message: string) => {
  toast({
    ...defaultToastConfig,
    description: message,
    className: "bg-yellow-50 text-yellow-900 border-yellow-200",
  })
}; 