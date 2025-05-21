import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Log } from '@/utils/logger';
import { apiClient, apiWithRetry } from '@/utils/api';
import { Document } from '@/types';

interface MergeParams {
  documentIds: number[];
  outputName: string;
}

interface MergeResponse {
  message: string;
  document: Document;
}

/**
 * Custom hook for document API operations
 * @param modelType The type of model (lowercase)
 * @param modelId The ID of the model
 * @param onError Optional callback for error handling
 * @returns API client and document operation functions
 */
export const useDocumentApi = (
  modelType: string,
  modelId: number,
  onError?: (error: string) => void
) => {
  /**
   * Fetch documents for the specified model
   */
  const fetchDocuments = async (): Promise<Document[]> => {
    try {
      Log.info('Fetching documents', { modelType, modelId })

      // Use enhanced retry with backoff specifically for 409 errors
      return await apiWithRetry(async () => {
        try {
          // Add timestamp to URL to prevent caching issues that might cause conflicts
          const timestamp = new Date().getTime();
          const response = await apiClient.get(`${modelType}/${modelId}/documents?t=${timestamp}`);
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError && error.response?.status === 409) {
            // This will be retried by the backoff mechanism
            Log.info('Conflict detected, will retry with backoff', { modelType, modelId })
            throw error;
          } else if (error instanceof AxiosError &&
                    error.response?.status === 500 &&
                    Array.isArray(error.response?.data?.documents)) {
            // The server returned an error, but also provided documents in the response
            Log.warn('Server error with documents in response', {
              status: error.response.status,
              documentCount: error.response.data.documents.length
            })
            return error.response.data.documents;
          } else {
            // Other errors should be handled normally
            throw error;
          }
        }
      }, 7, 2000); // 7 retries starting at 2 second delay
    } catch (error) {
      // This is reached after all retries have failed
      Log.error('All retries failed for document fetch', {
        error,
        modelType,
        modelId,
        timestamp: new Date().toISOString()
      })

      // Try to extract documents from error response if present
      if (error instanceof AxiosError &&
          error.response?.data?.documents &&
          Array.isArray(error.response.data.documents)) {
        Log.warn('Returning documents from error response after retries', {
          status: error.response.status,
          documentCount: error.response.data.documents.length
        })
        return error.response.data.documents;
      }

      if (error instanceof AxiosError && error.response?.status === 409) {
        // Set a specific error message for conflicts
        if (onError) {
          console.error('Document system conflict persisted after retries', {
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method,
            timestamp: new Date().toISOString()
          })

          onError('The document system is currently busy. Please try again in a few moments or contact support if this persists.');
        }
      } else if (onError) {
        onError(error instanceof Error ? error.message : 'An unknown error occurred');
      }

      throw error;
    }
  };

  /**
   * Upload document(s) to the specified model
   * @param formData FormData containing documents
   */
  const uploadDocument = async (formData: FormData): Promise<any> => {
    Log.info(`Uploading documents to ${modelType}/${modelId}`);

    // Get the CSRF token directly from the meta tag
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
      formData.append('_token', token);
    }

    const response = await apiClient.post(`/api/${modelType}/${modelId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  };

  /**
   * Delete a document from the specified model
   * @param documentId The ID of the document to delete
   */
  const deleteDocument = async (documentId: number): Promise<any> => {
    Log.info(`Deleting document ${documentId} from ${modelType}/${modelId}`);
    const response = await apiClient.delete(`/api/${modelType}/${modelId}/documents/${documentId}`);
    return response.data;
  };

  /**
   * Merge multiple documents into a single document
   * @param params Parameters for the merge operation
   */
  const mergeDocuments = async (params: MergeParams): Promise<MergeResponse> => {
    Log.info(`Merging documents for ${modelType}/${modelId}`, { documentIds: params.documentIds })
    const response = await apiClient.post(`/api/${modelType}/${modelId}/documents/merge`, {
      document_ids: params.documentIds,
      output_name: params.outputName,
    })
    return response.data;
  };

  /**
   * Rename a document
   * @param documentId The ID of the document to rename
   * @param newName The new name for the document
   */
  const renameDocument = async (documentId: number, newName: string): Promise<any> => {
    Log.info(`Renaming document ${documentId} from ${modelType}/${modelId}`, { newName })
    const response = await apiClient.put(`/api/${modelType}/${modelId}/documents/${documentId}/rename`, {
      name: newName
    })
    return response.data;
  };

  return {
    api: apiClient,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    mergeDocuments,
    renameDocument,
  };
};
