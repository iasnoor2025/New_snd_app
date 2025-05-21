import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import axios from 'axios';
import { ToastService } from '@/components/shared/ToastManager';
import { useQueryClient } from '@tanstack/react-query';

interface DocumentUploadDialogProps {
  employeeId: number;
  documentType: string;
  isAdditional?: boolean;
  onSuccess: (file: File) => void;
  multiple?: boolean;
  acceptedFileTypes?: string;
  buttonText?: string;
  buttonVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  buttonSize?: 'default' | 'sm' | 'lg' | 'icon';
  buttonClassName?: string;
  children?: React.ReactNode;
}

export function DocumentUploadDialog({
  employeeId,
  documentType,
  isAdditional = false,
  onSuccess,
  multiple = false,
  acceptedFileTypes = 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  buttonText = 'Upload Document',
  buttonVariant = 'outline',
  buttonSize = 'sm',
  buttonClassName = '',
  children
}: DocumentUploadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Please upload a PDF, DOC, DOCX, JPG, or PNG file.');
        return;
      }

      setSelectedFile(file);
      setError(null);
      // Only set default name for additional documents
      if (isAdditional) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setDocumentName(nameWithoutExt);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    // Only check for document name if it's an additional document
    if (isAdditional && !documentName.trim()) {
      setError('Please provide a document name');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Format document type for validation
      const formattedDocumentType = isAdditional ?
        documentName.toLowerCase().replace(/[^a-z0-9]/g, '_') :
        documentType.toLowerCase().replace(/[^a-z0-9]/g, '_');

      // First, check if there's an existing document of the same type
      const response = await axios.get(`/api/employee/${employeeId}/documents`);
      if (response.data && Array.isArray(response.data)) {
        const existingDoc = response.data.find(doc => {
          if (isAdditional) {
            return doc.name.toLowerCase() === documentName.toLowerCase();
          }
          return doc.name.toLowerCase().replace(/[^a-z0-9]/g, '_') === formattedDocumentType;
        })

        // If there's an existing document, delete it first
        if (existingDoc) {
          await axios.delete(`/api/employee/${employeeId}/documents/${existingDoc.id}`);
        }
      }

      // Upload the new document
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('document_type', formattedDocumentType);
      formData.append('is_additional', isAdditional ? '1' : '0');
      formData.append('name', isAdditional ? documentName : documentType);
      formData.append('collection_name', 'employee_documents');

      const uploadResponse = await axios.post(
        `/api/employee/${employeeId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
          }
        }
      );

      if (uploadResponse.data.success) {
        ToastService.success('Document uploaded successfully');
        setIsOpen(false);
        setSelectedFile(null);
        setDocumentName('');

        // Invalidate the documents query to trigger a refresh
        queryClient.invalidateQueries({ queryKey: ['documents', employeeId] })

        // Call the onSuccess callback with the uploaded file
        if (typeof onSuccess === 'function') {
          onSuccess(selectedFile);
        }
      } else {
        throw new Error(uploadResponse.data.message || 'Failed to upload document');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to upload document. Please try again.';
      setError(errorMessage);
      ToastService.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          className={buttonClassName}
          disabled={isUploading}
          {children || (
              <Upload className="h-4 w-4 mr-2" />
              {buttonText}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload {isAdditional ? 'Additional' : 'Required'} Document</DialogTitle>
          <DialogDescription>
            Upload a document for this employee. Supported formats: PDF, DOC, DOCX, JPG, PNG (max 5MB)
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          {/* Only show name input for additional documents */}
          {isAdditional && (
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
                disabled={isUploading}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="file">Select File</Label>
            <Input
              id="file"
              type="file"
              accept={acceptedFileTypes}
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isUploading}
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


