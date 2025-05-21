import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { Ziggy } from './ziggy'; // Added this import

/**
 * Combines class names with Tailwind's merge function
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency with specified currency code
 * @param value - The amount to format
 * @param currency - Currency code (defaults to SAR)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number | null | undefined, currency: string = 'SAR'): string {
  if (value === null || value === undefined) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a date using date-fns
 * @param date - The date to format
 * @param formatString - Format string (defaults to dd MMM yyyy)
 * @returns Formatted date string
 */
export function formatDate(date: string | Date | null | undefined, formatString: string = 'dd MMM yyyy'): string {
  if (!date) return '';

  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatString);
}

/**
 * Format a date and time string
 * @param dateString - The date string to format
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Generate a random hex color
 * @returns Random hex color string
 */
export function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Generate a unique ID string for temporary client-side identifiers
 * @returns Random string ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Generate route URLs using Ziggy
 * @param name - Route name
 * @param params - Route parameters
 * @param absolute - Whether to return absolute URL
 * @returns Generated route URL
 */
export function route(name: string, params?: Record<string, any> | number | string, absolute?: boolean): string {
  // Make sure Ziggy is available
  if (typeof window.Ziggy === 'undefined') {
    console.error('Ziggy is not available. Route function cannot proceed.');
    return '/';
  }

  // Debug params for routes with missing parameters
  const debugRoutes: string[] = []; // Removed 'rentals.show' from debug routes

  // Get route details from Ziggy
  const route = window.Ziggy.routes[name];
  if (!route) {
    console.error(`Route [${name}] not found in Ziggy routes.`);
    return '/';
  }

  // Get base URL
  const url = window.Ziggy.url;

  // Start with route URI
  let path = route.uri;

  // Special case for rentals.show which is causing issues
  if (name === 'rentals.show') {
    console.debug(`Route generation for rentals.show with params:`, params);

    // If passed directly as a number/string, convert to {rental: value}
    if (typeof params === 'number' || typeof params === 'string') {
      params = { rental: String(params) }; // Ensure parameter is a string
      console.debug(`Converted to object:`, params);
    }
    // If it's an object but doesn't have a rental property, try to extract id
    else if (params && typeof params === 'object') {
      if (!('rental' in params)) {
        if ('id' in params) {
          params = { rental: String((params as any).id) }; // Ensure parameter is a string
          console.debug(`Extracted ID from object:`, params);
        } else {
          console.error(`Route [${name}]: Missing required 'rental' parameter`);
          console.debug('Direct URL fallback: /rentals/' + (typeof params === 'object' ? JSON.stringify(params) : params));
          // Try to get any numeric property that might be the ID
          const possibleIds = Object.entries(params as Record<string, any>)
            .filter(([_, v]) => typeof v === 'number' || (typeof v === 'string' && !isNaN(Number(v))))
            .map(([_, v]) => v);

          if (possibleIds.length > 0) {
            return `/rentals/${possibleIds[0]}`;
          }

          return '/rentals'; // Fallback to index if parameter is missing
        }
      } else {
        // Ensure the rental parameter is a string
        params = { rental: String((params as any).rental) };
        console.debug(`Using existing rental property:`, params);
      }
    } else if (!params) {
      console.error(`Route [${name}]: Missing required parameter`);
      return '/rentals'; // Fallback to index if parameter is missing
    }

    // Final check - log what params we're using
    console.debug(`Final params for rentals.show:`, params);
  }
  // For other routes with a single parameter that's passed directly
  else if (params !== undefined && (typeof params === 'number' || typeof params === 'string')) {
    // Extract the first parameter name from the route URI
    const paramMatch = route.uri.match(/\{([^}?]+)\}/);
    const paramName = paramMatch ? paramMatch[1] : 'id';
    params = { [paramName]: params };
  }

  // Type assertion for TypeScript
  const standardizedParams = params as Record<string, any> | undefined;

  // Replace parameters in the URI
  if (standardizedParams) {
    // First replace named parameters
    Object.keys(standardizedParams).forEach(key => {
      const paramValue = standardizedParams[key] === null || standardizedParams[key] === undefined
        ? ''
        : encodeURIComponent(String(standardizedParams[key]));

      // Log helpful warning about potentially problematic resource IDs
      if (key.match(/^(customer|client|equipment|rental|invoice|user)$/) && !paramValue) {
        console.warn(`Route [${name}]: Parameter '${key}' has an empty value. This may cause route resolution issues.`);
      }

      // Replace {parameter} format
      path = path.replace(new RegExp(`\\{${key}\\}`, 'g'), paramValue);
      // Replace {parameter?} optional format
      path = path.replace(new RegExp(`\\{${key}\\?\\}`, 'g'), paramValue);
    });
  }

  // Remove any remaining optional parameters
  path = path.replace(/\{[^}]+\?\}/g, '');

  // Check if there are any remaining required parameters (ignoring 'request')
  const remainingRequiredParams = path.match(/\{[^}?]+\}/g)?.filter((param: string) => !param.includes('request'));

  if (remainingRequiredParams && remainingRequiredParams.length > 0) {
    console.error(`Route [${name}] is missing required parameters: ${remainingRequiredParams.join(', ')}`);
    return '/';
  }

  // Ensure leading slash
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  // Return absolute or relative URL
  return absolute ? `${url}${path}` : path;
}


