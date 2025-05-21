import dayjs from 'dayjs';
import 'dayjs/locale/ar-sa'; // Import Arabic (Saudi Arabia) locale
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Initialize plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Set default locale to Arabic (Saudi Arabia)
dayjs.locale('en-US');

/**
 * Format a date string to a localized format
 * @param date - Date string in any format that dayjs can parse
 * @param format - Optional format string (default: 'DD/MM/YYYY')
 * @param useHijri - Whether to use Hijri calendar (default: false)
 * @returns Formatted date string
 */
export const formatDate = (date: string | null | undefined, format: string = 'DD/MM/YYYY', useHijri: boolean = false): string => {
  if (!date) return '-';
  
  // For Saudi Arabia, we use the Gregorian calendar by default
  // If Hijri calendar is requested, we would need a Hijri calendar plugin
  // This is a placeholder for future implementation
  if (useHijri) {
    // TODO: Implement Hijri calendar conversion
    return dayjs(date).format(format);
  }
  
  return dayjs(date).format(format);
};

/**
 * Format a number as currency (SAR)
 * @param amount - Number to format
 * @param currency - Optional currency code (default: 'SAR')
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number | null | undefined, currency: string = 'SAR'): string => {
  if (amount === null || amount === undefined) return '-';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number with commas as thousands separators
 * @param num - Number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return '-';
  
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format a phone number to a readable format
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) return '-';
  
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
  
  // Return as is if we can't format it
  return phone;
};

/**
 * Truncate a string to a maximum length and add ellipsis
 * @param str - String to truncate
 * @param maxLength - Maximum length (default: 50)
 * @returns Truncated string
 */
export const truncateString = (str: string | null | undefined, maxLength: number = 50): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Format a file size in bytes to a human-readable format
 * @param bytes - File size in bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number | null | undefined, decimals: number = 2): string => {
  if (bytes === null || bytes === undefined || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}; 