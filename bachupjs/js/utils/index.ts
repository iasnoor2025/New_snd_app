// Export utility functions for easy imports
export * from './api';
export * from './error-utils';
export * from './file-utils';
export * from './format';
export * from './permission-utils';
export * from './toast-service';
export * from './logger';

// Re-export commonly used functions for backward compatibility
import { formatCurrency, formatDate, formatDateTime, formatNumber } from './format';
export { formatCurrency, formatDate, formatDateTime, formatNumber };

export {
  formatDate,
  formatCurrency,
  formatNumber,
  formatPhone,
  truncateString,
  formatFileSize
} from './format';
