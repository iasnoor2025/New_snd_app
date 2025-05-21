import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash, Upload, FileText, Image, Download, Eye, RefreshCw, Loader2, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface MediaItem {
  id: number;
  file_name: string;
  mime_type: string;
  size: number;
  original_url: string;
  preview_url?: string;
  created_at: string;
}

interface SpatieMediaLibraryProps {
  model: string;
  modelId: number;
  collection?: string;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
  readOnly?: boolean;
  onUploadComplete?: (media: MediaItem[]) => void;
}

export const SpatieMediaLibrary: React.FC<SpatieMediaLibraryProps> = ({
  model,
  modelId,
  collection = 'default',
  maxFileSize = 5, // Default 5MB
  acceptedFileTypes = ['*/*'],
  allowMultiple = false,
  readOnly = false,
  onUploadComplete,
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch media items on component mount
  useEffect(() => {
    fetchMediaItems();
  }, [model, modelId, collection]);

  const fetchMediaItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/media-library/${model}/${modelId}`, {
        params: { collection }
      })

      setMediaItems(response.data.data || []);
    } catch (err) {
      console.error('Error fetching media items:', err);
      setError('Failed to load files. Please try refreshing.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('model', model);
    formData.append('model_id', modelId.toString());
    formData.append('collection', collection);

    // Add all files to formData
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        toast.error(`File "${file.name}" exceeds the maximum size of ${maxFileSize}MB`);
        setIsUploading(false);
        return;
      }

      formData.append('files[]', file);
    }

    try {
      const response = await axios.post('/api/media-library/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      })

      // Update media items
      setMediaItems(prev => [...prev, ...response.data.data]);
      toast.success(`${files.length} file${files.length !== 1 ? 's' : ''} uploaded successfully`);

      if (onUploadComplete) {
        onUploadComplete(response.data.data);
      }

      // Reset file input
      event.target.value = '';
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error(err.response?.data?.message || 'Failed to upload files');
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;

    try {
      await axios.delete(`/api/media-library/${deleteItem.id}`);
      setMediaItems(prev => prev.filter(item => item.id !== deleteItem.id));
      toast.success('File deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete file');
    } finally {
      setDeleteItem(null);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-6 w-6 text-blue-500" />
    if (mimeType.includes('pdf')) return <FileText className="h-6 w-6 text-red-500" />
    return <FileText className="h-6 w-6 text-gray-500" />
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload button and info */}
      {!readOnly && (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="relative inline-block">
              <Button
                variant="outline"
                className="gap-2"
                disabled={isUploading}
                onClick={() => document.getElementById('fileUpload')?.click()}
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {isUploading ? 'Uploading...' : 'Upload Files'}
              </Button>
              <input
                id="fileUpload"
                type="file"
                multiple={allowMultiple}
                accept={acceptedFileTypes.join(',')}
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              Max: {maxFileSize}MB {allowMultiple ? '(multiple files allowed)' : ''}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={fetchMediaItems}
            disabled={isLoading}
            className="text-xs"
            <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      )}

      {/* Upload progress */}
      {isUploading && (
        <div className="mt-2 space-y-1">
          <div className="flex justify-between text-xs">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-1" />
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Media items list */}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary/80" />
        </div>
      ) : mediaItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {mediaItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  {getFileIcon(item.mime_type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" title={item.file_name}>
                      {item.file_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(item.size)} • {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.mime_type.startsWith('image/') && (
                      <Button variant="ghost" size="icon" onClick={() => setPreviewItem(item)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" asChild>
                      <a href={item.original_url} download target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    {!readOnly && (
                      <Button variant="ghost" size="icon" onClick={() => setDeleteItem(item)}>
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-lg bg-muted/40">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No files uploaded yet</p>
          {!readOnly && (
            <Button
              variant="link"
              size="sm"
              onClick={() => document.getElementById('fileUpload')?.click()}
              className="mt-1"
              Upload your first file
            </Button>
          )}
        </div>
      )}

      {/* Preview dialog */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewItem?.file_name}</DialogTitle>
            <DialogDescription>
              {previewItem && (
                <span className="text-xs">
                  {formatFileSize(previewItem.size)} • Uploaded on{' '}
                  {new Date(previewItem.created_at).toLocaleDateString()}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-auto p-1 flex items-center justify-center">
            {previewItem?.mime_type.startsWith('image/') ? (
              <img
                src={previewItem?.original_url}
                alt={previewItem?.file_name}
                className="max-w-full object-contain rounded-md"
              />
            ) : (
              <div className="p-10 text-center">
                <FileText className="h-20 w-20 mx-auto mb-4 text-muted-foreground" />
                <p>This file type cannot be previewed</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button asChild>
              <a href={previewItem?.original_url} download target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteItem?.file_name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
