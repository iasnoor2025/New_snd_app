import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import ActionButton from '@/components/shared/ActionButton';

interface FileUploadProps {
  onUpload: (files: File[]) => Promise<void>
  accept?: string[];
  maxSize?: number;
  multiple?: boolean;
  className?: string;
}

export function FileUpload({
  onUpload,
  accept = ['image/*', 'application/pdf'],
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = true,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Array.isArray(accept) ? accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}) : {},
    maxSize,
    multiple,
  })

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      await onUpload(files);
      setFiles([]);
      setProgress(100);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
              isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
            )}
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragActive
                ? 'Drop the files here'
                : 'Drag and drop files here, or click to select files'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: {Array.isArray(accept) ? accept.join(', ') : accept}
            </p>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-lg"
              <span className="text-sm truncate">{file.name}</span>
              <ActionButton
                action="custom"
                resourceType="files"
                customIcon={<X className="h-4 w-4" />}
                onClick={() => removeFile(index)}
                disabled={uploading}
                buttonVariant="ghost"
                buttonSize="icon"
                showTooltip={true}
                tooltipText="Remove file"
              />
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}

      {files.length > 0 && !uploading && (
        <ActionButton
          action="upload"
          resourceType="files"
          onClick={handleUpload}
          disabled={uploading}
          buttonVariant="default"
          className="w-full"
          showText={true}
          buttonText={`Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
        />
      )}
    </div>
  );
}


