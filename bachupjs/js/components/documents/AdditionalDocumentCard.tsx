import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToastService } from '@/components/shared/ToastManager';
import { DeleteButton } from './DeleteButton';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { DocumentUploadDialog } from './DocumentUploadDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AdditionalDocumentCardProps {
  documentName: string;
  employeeId: number;
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
}

export function AdditionalDocumentCard({
  documentName,
  employeeId,
  onUploadSuccess,
  onDeleteSuccess,
}: AdditionalDocumentCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const response = await axios.get(`/api/employee/${employeeId}/documents`);
        if (response.data && Array.isArray(response.data)) {
          const document = response.data.find(doc =>
            doc.is_additional === 1 && doc.name === documentName;
          );

          if (document) {
            setPreviewUrl(document.preview_url || document.url);
            setDocumentId(document.id);
            setMimeType(document.mime_type);
            setPreviewError(null);
          } else {
            if (retryCount < 3) {
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
              }, 2000);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch preview URL:', error);
        setPreviewError('Failed to load preview');
      }
    };

    fetchPreview();
  }, [employeeId, documentName, retryCount]);

  const handleDownload = async () => {
    if (!documentId) {
      ToastService.error('Document not found');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/employee/${employeeId}/documents/${documentId}/download`, {
        responseType: 'blob'
      })

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${documentName}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      ToastService.error('Failed to download document');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const handleDelete = async () => {
    if (!documentId) {
      ToastService.error('Document not found');
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(`/api/employee/${employeeId}/documents/${documentId}`);
      ToastService.success('Document deleted successfully');
      onDeleteSuccess?.();
      setPreviewUrl(null);
      setDocumentId(null);
      setMimeType(null);
      setPreviewError(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      ToastService.error('Failed to delete document');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setPreviewError(null);
      setRetryCount(0);
      onUploadSuccess?.();
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to upload document. Please try again.';
      setPreviewError(errorMessage);
      ToastService.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPreview = () => {
    if (!previewUrl) {
      return (
        <div className="flex items-center justify-center w-full h-48 bg-muted/30 rounded-lg">
          <div className="text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No preview available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="relative w-full h-48 bg-muted/30 rounded-lg overflow-hidden group">
        {mimeType?.includes('pdf') ? (
          <iframe
            src={previewUrl}
            className="absolute inset-0 w-full h-full border-0"
            title={`${documentName} preview`}
            onError={() => setPreviewError('Failed to load PDF preview')}
          />
        ) : mimeType?.includes('image') ? (
          <img
            src={previewUrl}
            alt={`${documentName} preview`}
            className="w-full h-full object-contain"
            onError={() => setPreviewError('Failed to load image preview')}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FileText className="h-12 w-12 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePreview}
            className="bg-white/90 hover:bg-white"
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">{documentName}</h4>
                <p className="text-sm text-muted-foreground">
                  {mimeType?.includes('pdf') ? 'PDF Document' :
                   mimeType?.includes('image') ? 'Image File' :
                   mimeType?.includes('word') ? 'Word Document' : 'Document'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handlePreview}
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDownload}
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {renderPreview()}
          </div>
          {previewError && (
            <div className="mt-2 p-2 bg-red-50 text-red-600 rounded-md text-xs">
              {previewError}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{documentName}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}


