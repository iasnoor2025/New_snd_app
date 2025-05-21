import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ToastService } from '@/components/shared/ToastManager';
import { DeleteButton } from './DeleteButton';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { DocumentUploadDialog } from './DocumentUploadDialog';

interface EquipmentDocumentCardProps {
  title: string;
  documentNumber?: string;
  documentType: string;
  equipmentId: number;
  icon?: React.ReactNode;
  previewSize?: 'thumb' | 'id_card';
  onUploadSuccess?: () => void;
  onDeleteSuccess?: () => void;
  documentName: string;
}

export function EquipmentDocumentCard({
  title,
  documentNumber,
  documentType,
  equipmentId,
  icon = <FileText className="h-4 w-4 text-muted-foreground" />,
  previewSize = 'thumb',
  onUploadSuccess,
  onDeleteSuccess,
  documentName
}: EquipmentDocumentCardProps) {
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
        console.log('Fetching preview for:', { equipmentId, documentType })
        const response = await axios.get(`/api/media-library/Equipment/${equipmentId}`, {
          params: { collection: documentType }
        })
        console.log('Media library response:', response.data);

        // Check if response has data property
        const documents = response.data?.data || [];

        if (documents && Array.isArray(documents)) {
          // Find the document with matching type
          const document = documents.find(doc => {
            console.log('Checking document:', {
              doc,
              name: doc.name,
              file_name: doc.file_name,
              mime_type: doc.mime_type,
              collection: doc.collection,
              collection_name: doc.collection_name,
              original_url: doc.original_url
            })

            // Check collection_name first (this is the primary identifier)
            if (doc.collection_name === documentType) {
              console.log('Found by collection_name match');
              return true;
            }

            // Then check collection property
            if (doc.collection === documentType) {
              console.log('Found by collection match');
              return true;
            }

            // Finally check if the name contains the document type
            if (doc.name && doc.name.toLowerCase().includes(documentType.toLowerCase())) {
              console.log('Found by name match');
              return true;
            }

            return false;
          })

          if (document) {
            console.log('Setting preview with document:', {
              original_url: document.original_url,
              id: document.id,
              mime_type: document.mime_type,
              collection_name: document.collection_name
            })
            setPreviewUrl(document.original_url);
            setDocumentId(document.id);
            setMimeType(document.mime_type);
            setPreviewError(null);
          } else {
            console.log('No document found for type:', documentType);
            setPreviewError('No document found');
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
  }, [equipmentId, documentType, retryCount]);

  const handleDownload = async () => {
    if (!documentId) {
      ToastService.error('Document not found');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/media-library/preview/${documentId}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
        }
      })

      // Check if the response is actually a blob
      if (response.data instanceof Blob) {
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${documentName}.pdf`);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } else {
        // If not a blob, try to parse the error message
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result as string);
            ToastService.error(errorData.message || 'Failed to download document');
          } catch (e) {
            ToastService.error('Failed to download document');
          }
        };
        reader.readAsText(response.data);
      }
    } catch (error) {
      console.error('Download error:', error);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to download document';
        ToastService.error(errorMessage);
      } else {
        ToastService.error('Failed to download document');
      }
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
      await axios.delete(`/api/media-library/${documentId}`);
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

      const formData = new FormData();
      formData.append('model', 'Equipment');
      formData.append('model_id', equipmentId.toString());
      formData.append('collection', documentType);
      formData.append('files[]', file);

      console.log('Uploading file:', { file, formData: Object.fromEntries(formData.entries()) })
      const response = await axios.post('/api/media-library/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Upload response:', response.data);

      // Check if response has data property
      if (response.data && response.data.data) {
        const uploadedFile = response.data.data[0];
        console.log('Uploaded file:', uploadedFile);

        // Update the preview immediately with the uploaded file data
        setPreviewUrl(uploadedFile.original_url);
        setDocumentId(uploadedFile.id);
        setMimeType(uploadedFile.mime_type);
        setPreviewError(null);

        ToastService.success('Document uploaded successfully');
        onUploadSuccess?.();
      } else {
        console.error('Invalid response structure:', response.data);
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Upload error:', error);
      ToastService.error('Failed to upload document');
      setPreviewError('Failed to upload document');
    } finally {
      setIsLoading(false);
    }
  };

  const renderPreview = () => {
    console.log('Rendering preview with:', { previewUrl, mimeType, previewError })

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
            src={`${previewUrl}#toolbar=0`}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*,.pdf';
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    handleUpload(file);
                  }
                };
                input.click();
              }}
              disabled={isLoading}
              <Upload className="h-4 w-4" />
            </Button>
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
