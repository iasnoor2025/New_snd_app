import React, { useState, useEffect } from 'react';
import { AdditionalDocumentCard } from './AdditionalDocumentCard';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ToastService } from '@/components/shared/ToastManager';
import { DocumentUploadDialog } from './DocumentUploadDialog';

interface AdditionalDocumentsGridProps {
  employeeId: number;
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function AdditionalDocumentsGrid({
  employeeId,
  onUploadSuccess,
  onDeleteSuccess,
}: AdditionalDocumentsGridProps) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`/api/employee/${employeeId}/documents`);
      if (response.data && Array.isArray(response.data)) {
        const additionalDocs = response.data;
          .filter(doc => doc.is_additional === 1);
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setDocuments(additionalDocs);
      }
    } catch (error) {
      console.error('Failed to fetch additional documents:', error);
      setError('Failed to load additional documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [employeeId, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading documents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 border border-red-200">
        <div className="text-center">
          <div className="text-red-600 font-medium">Document Service Error</div>
          <div className="text-red-600 text-sm mt-1">
            {error}
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={handleRetry}
              className="bg-white"
              <RefreshCw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DocumentUploadDialog
          employeeId={employeeId}
          documentType="Additional Documents"
          isAdditional={true}
          onSuccess={() => {
            fetchDocuments();
            onUploadSuccess?.();
          }}
        />
      </div>

      {documents.length === 0 ? (
        <div className="text-center p-8 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            No additional documents uploaded yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <AdditionalDocumentCard
              key={doc.id}
              documentName={doc.name}
              employeeId={employeeId}
              onUploadSuccess={onUploadSuccess}
              onDeleteSuccess={() => {
                fetchDocuments();
                onDeleteSuccess?.();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


