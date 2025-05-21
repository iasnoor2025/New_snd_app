import { AxiosInstance } from 'axios';
import { Document } from '@/types';

export interface MergeParams {
  documentIds: number[];
  outputName: string;
}

export interface MergeResponse {
  message: string;
  document: Document;
}

export interface DocumentApiHook {
  api: AxiosInstance;
  fetchDocuments: () => Promise<Document[]>
  uploadDocument: (formData: FormData) => Promise<any>
  deleteDocument: (documentId: number) => Promise<any>
  mergeDocuments: (params: MergeParams) => Promise<MergeResponse>
  renameDocument: (documentId: number, newName: string) => Promise<any>
}

export function useDocumentApi(
  modelType: string,
  modelId: number,
  onError?: (error: string) => void
): DocumentApiHook;
