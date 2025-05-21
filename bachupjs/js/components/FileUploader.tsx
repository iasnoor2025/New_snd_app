import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  onUpload: (urls: string[]) => void;
  onRemove: (url: string) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
}

export function FileUploader({
  onUpload,
  onRemove,
  maxFiles = 5,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
}: Props) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      setIsUploading(true);
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append('files[]', file);
      })

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        onUpload(data.urls);

        toast({
          title: 'Success',
          description: 'Files uploaded successfully.',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload files.',
          variant: 'destructive',
        })
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as { [key: string]: string[] }),
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50'
        }`}
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-sm">Drop the files here...</p>
          ) : (
              <p className="text-sm">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-xs text-muted-foreground">
                Accepted file types: {acceptedTypes.join(', ')}
              </p>
              <p className="text-xs text-muted-foreground">
                Maximum {maxFiles} file{maxFiles === 1 ? '' : 's'}
              </p>
            </>
          )}
        </div>
      </div>

      {isUploading && (
        <div className="flex items-center justify-center">
          <p className="text-sm">Uploading...</p>
        </div>
      )}
    </div>
  );
}



