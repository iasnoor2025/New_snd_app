import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToastService } from '@/components/shared/ToastManager';
import { DeleteButton } from './DeleteButton';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { DocumentUploadDialog } from './DocumentUploadDialog';

interface DocumentCardProps {
  title: string;
  documentNumber?: string;
  documentType: string;
  employeeId: number;
  icon?: React.ReactNode;
  previewSize?: 'thumb' | 'id_card';
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
  documentName: string;
}

export function DocumentCard({
  title,
  documentNumber,
  documentType,
  employeeId,
  icon = <FileText className="h-4 w-4 text-muted-foreground" />,
  previewSize = 'thumb',
  onUploadSuccess,
  onDeleteSuccess,
  documentName
}: DocumentCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Fetch preview URL when component mounts
    const fetchPreview = async () => {
      try {
        const response = await axios.get(`/api/employee/${employeeId}/documents`);
        if (response.data && Array.isArray(response.data)) {
          // Format document type for comparison
          const formattedDocumentType = documentType.toLowerCase().replace(/[^a-z0-9]/g, '_');

          // Find the document with matching type
          const document = response.data.find(doc => {
            // For additional documents, match by name and is_additional flag
            if (documentType === 'Additional Documents') {
              return doc.is_additional === 1 && doc.name === documentName;
            }
            // Special handling for Licenses & Certifications
            if (documentType === 'Licenses & Certifications') {
              return doc.name.toLowerCase().includes('license') ||
                     doc.name.toLowerCase().includes('certification');
            }
            return doc.name.toLowerCase().replace(/[^a-z0-9]/g, '_') === formattedDocumentType;
          })

          if (document) {
            setPreviewUrl(document.preview_url || document.url);
            setDocumentId(document.id);
            setMimeType(document.mime_type);
            setPreviewError(null);
          } else {
            // If document not found, try again after a delay
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
  }, [employeeId, documentType, documentName, retryCount]);

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
      link.setAttribute('download', `${documentType}.pdf`);
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

      // Reset retry count and fetch preview
      setRetryCount(0);
      const fetchPreview = async () => {
        try {
          const response = await axios.get(`/api/employee/${employeeId}/documents`);
          if (response.data && Array.isArray(response.data)) {
            // Format document type for comparison
            const formattedDocumentType = documentType.toLowerCase().replace(/[^a-z0-9]/g, '_');

            const document = response.data.find(doc => {
              // For additional documents, match by name and is_additional flag
              if (documentType === 'Additional Documents') {
                return doc.is_additional === 1 && doc.name === documentName;
              }
              // Special handling for Licenses & Certifications
              if (documentType === 'Licenses & Certifications') {
                return doc.name.toLowerCase().includes('license') ||
                       doc.name.toLowerCase().includes('certification');
              }
              return doc.name.toLowerCase().replace(/[^a-z0-9]/g, '_') === formattedDocumentType;
            })

            if (document) {
              setPreviewUrl(document.preview_url || document.url);
              setDocumentId(document.id);
              setMimeType(document.mime_type);
              setPreviewError(null);
            }
          }
        } catch (error) {
          console.error('Failed to fetch preview URL:', error);
          setPreviewError('Failed to load preview');
        }
      };
      fetchPreview();
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
        <div className="flex items-center justify-center p-8 bg-muted/30">
          <div className="text-center">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">No preview available</p>
          </div>
        </div>
      );
    }

    if (previewError) {
      return (
        <div className="flex items-center justify-center p-8 bg-muted/30">
          <div className="text-center">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">{previewError}</p>
          </div>
        </div>
      );
    }

    // Handle different file types
    if (mimeType?.includes('pdf')) {
      return (
        <div className={`relative ${previewSize === 'id_card' ? 'w-[340px] h-[215px]' : 'w-full aspect-video'} mx-auto`}>
          <iframe
            src={previewUrl}
            className="w-full h-full border-0"
            title={`${title} preview`}
            onError={() => setPreviewError('Failed to load PDF preview')}
          />
        </div>
      );
    }

    if (mimeType?.includes('image')) {
      return (
        <div className={`relative ${previewSize === 'id_card' ? 'w-[340px] h-[215px]' : 'w-full aspect-video'} mx-auto`}>
          <img
            src={previewUrl}
            alt={`${title} preview`}
            className="w-full h-full object-contain"
            onError={() => setPreviewError('Failed to load image preview')}
          />
        </div>
      );
    }

    if (mimeType?.includes('word') || mimeType?.includes('document')) {
      return (
        <div className="flex items-center justify-center p-8 bg-muted/30">
          <div className="text-center">
            <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
            <p className="text-sm text-muted-foreground">Word document preview not available</p>
            <Button
              variant="link"
              size="sm"
              onClick={handlePreview}
              className="mt-2"
              Open in new tab
            </Button>
          </div>
        </div>
      );
    }

    // Default preview for other file types
    return (
      <div className="flex items-center justify-center p-8 bg-muted/30">
        <div className="text-center">
          <FileText className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">Preview not available for this file type</p>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-muted rounded-lg">
                {icon}
              </div>
              <div>
                <h3 className="font-medium">{title}</h3>
                {documentNumber && (
                  <p className="text-sm text-muted-foreground">
                    Number: {documentNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border rounded-lg overflow-hidden">
            {renderPreview()}
          </div>

          {/* Actions Section */}
          <div className="flex items-center justify-end gap-2">
            <DocumentUploadDialog
              employeeId={employeeId}
              buttonText=""
              buttonVariant="ghost"
              buttonSize="icon"
              buttonClassName="h-9 w-9"
              acceptedFileTypes="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              documentType={documentType}
              onSuccess={handleUpload}
              <Upload className="h-4 w-4" />
            </DocumentUploadDialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreview}
              disabled={isLoading || !previewUrl}
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              disabled={isLoading || !documentId}
              <Download className="h-4 w-4" />
            </Button>
            <DeleteButton
              onDelete={handleDelete}
              title={`Delete ${title}`}
              description={`Are you sure you want to delete this ${title.toLowerCase()}? This action cannot be undone.`}
              variant="ghost"
              size="icon"
              disabled={isLoading || !documentId}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


