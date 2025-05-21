import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastService } from '@/components/shared/ToastManager';
import { DeleteButton } from './DeleteButton';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { DocumentUploadDialog } from './DocumentUploadDialog';
import { format } from 'date-fns';

interface AdditionalDocumentsListProps {
  employeeId: number;
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function AdditionalDocumentsList({
  employeeId,
  onUploadSuccess,
  onDeleteSuccess
}: AdditionalDocumentsListProps) {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }, [employeeId]);

  const handleDelete = async (documentId: number) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/employee/${employeeId}/documents/${documentId}`);
      ToastService.success('Document deleted successfully');
      onDeleteSuccess?.();
      fetchDocuments();
    } catch (error) {
      ToastService.error('Failed to delete document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (documentId: number, fileName: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/employee/${employeeId}/documents/${documentId}/download`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      ToastService.error('Failed to download document');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = (previewUrl: string) => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const renderPreview = (document: any) => {
    if (!document.preview_url && !document.url) {
      return (
        <div className="flex items-center justify-center p-8 bg-muted/30">
          <div className="text-center">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No preview available</p>
          </div>
        </div>
      );
    }

    if (document.mime_type?.includes('pdf')) {
      return (
        <div className="relative w-full aspect-video mx-auto">
          <iframe
            src={document.preview_url || document.url}
            className="w-full h-full border-0"
            title={`${document.name} preview`}
            onError={() => setError('Failed to load PDF preview')}
          />
        </div>
      );
    }

    if (document.mime_type?.includes('image')) {
      return (
        <div className="relative w-full aspect-video mx-auto">
          <img
            src={document.preview_url || document.url}
            alt={`${document.name} preview`}
            className="w-full h-full object-contain"
            onError={() => setError('Failed to load image preview')}
          />
        </div>
      );
    }

    if (document.mime_type?.includes('word') || document.mime_type?.includes('document')) {
      return (
        <div className="flex items-center justify-center p-8 bg-muted/30">
          <div className="text-center">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Word document preview not available</p>
            <Button
              variant="link"
              size="sm"
              onClick={() => handlePreview(document.preview_url || document.url)}
              className="mt-2"
              Open in new tab
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center p-8 bg-muted/30">
        <div className="text-center">
          <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">Preview not available for this file type</p>
          <Button
            variant="link"
            size="sm"
            onClick={() => handlePreview(document.preview_url || document.url)}
            className="mt-2"
            Open in new tab
          </Button>
        </div>
      </div>
    );
  };

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

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : documents.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No additional documents uploaded yet
        </div>
      ) : (
        <div className="grid gap-4">
          {documents.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium">{document.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {document.mime_type} â€¢ Uploaded {format(new Date(document.created_at), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    {renderPreview(document)}
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePreview(document.preview_url || document.url)}
                      disabled={isLoading || !document.preview_url}
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(document.id, document.name)}
                      disabled={isLoading}
                      <Download className="h-4 w-4" />
                    </Button>
                    <DeleteButton
                      onDelete={() => handleDelete(document.id)}
                      title={`Delete ${document.name}`}
                      description={`Are you sure you want to delete this ${document.name}? This action cannot be undone.`}
                      variant="ghost"
                      size="icon"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


