import { CustomerFormData } from '@/schemas/customer.schema';
import HttpService from '@/services/http-service';
import ToastService from '@/utils/toast-service';

/**
 * Service for handling all customer-related API calls
 */
export default class CustomerService {
  /**
   * Fetch all customers with pagination and filters
   *
   * @param filters Optional filters to apply to the results
   * @param page The page number to fetch
   * @param onSuccess Optional callback to run on success
   * @param onError Optional callback to run on error
   */
  static fetchCustomers(
    filters: Record<string, any> = {},
    page: number = 1,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) {
    const params = { ...filters, page };
    HttpService.get('/customers', params, {
      preserveState: true,
      onSuccess,
      onError,
      errorMessage: 'Failed to fetch customers'
    })
  }

  /**
   * Create a new customer
   *
   * @param data The customer data to create
   * @param onSuccess Optional callback to run on success
   * @param onError Optional callback to run on error
   */
  static createCustomer(
    data: CustomerFormData,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) {
    HttpService.post('/customers', data, {
      successMessage: 'Customer created successfully',
      errorMessage: 'Failed to create customer',
      onSuccess,
      onError
    })
  }

  /**
   * Update an existing customer
   *
   * @param customerId The ID of the customer to update
   * @param data The updated customer data
   * @param onSuccess Optional callback to run on success
   * @param onError Optional callback to run on error
   */
  static updateCustomer(
    customerId: number,
    data: CustomerFormData,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) {
    HttpService.put(`/customers/${customerId}`, data, {
      successMessage: 'Customer updated successfully',
      errorMessage: 'Failed to update customer',
      onSuccess,
      onError
    })
  }

  /**
   * Delete a customer
   *
   * @param customerId The ID of the customer to delete
   * @param onSuccess Optional callback to run on success
   * @param onError Optional callback to run on error
   */
  static deleteCustomer(
    customerId: number,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) {
    HttpService.delete(`/customers/${customerId}`, {
      successMessage: 'Customer deleted successfully',
      errorMessage: 'Failed to delete customer',
      onSuccess,
      onError
    })
  }

  /**
   * Export customers in various formats
   *
   * @param format The export format (e.g., 'csv', 'xlsx')
   * @param filters Optional filters to apply to the export
   */
  static exportCustomers(format: 'csv' | 'xlsx', filters: Record<string, any> = {}) {
    // In a real app, this would trigger a file download
    // For now, we'll just show a toast
    ToastService.info(`Exporting customers as ${format.toUpperCase()}...`);

    // In a real implementation, we would use a direct window.location or fetch call
    // to trigger a file download, rather than an Inertia request
    //
    // Example:
    // window.location.href = `/customers/export?format=${format}&${new URLSearchParams(filters)}`;
  }

  /**
   * Import customers from a file
   *
   * @param file The file to import
   * @param onSuccess Optional callback to run on success
   * @param onError Optional callback to run on error
   */
  static importCustomers(
    file: File,
    onSuccess?: () => void,
    onError?: (error: any) => void
  ) {
    const formData = new FormData();
    formData.append('file', file);

    // In a real app, this would send the file to the server
    // For now, we'll just show a toast
    ToastService.info('Importing customers...');

    // Using fetch directly for file uploads is often better than Inertia
    // HttpService.post('/customers/import', formData, {
    //   successMessage: 'Customers imported successfully',
    //   errorMessage: 'Failed to import customers',
    //   onSuccess,
    //   onError
    // })
  }
}
