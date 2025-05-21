import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Trash,
  Upload,
  FileText,
  Image as ImageIcon,
  Download,
  Eye,
  RefreshCw,
  Printer,
  Loader2,
  Check,
  AlertCircle,
  File,
  XIcon,
  ExclamationCircleIcon,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { FileUpload } from '@/components/FileUpload';
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MediaItem } from './MediaItem';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePage } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { FileIcon, TrashIcon, DownloadIcon, EyeIcon } from '@radix-ui/react-icons';

interface MediaLibraryProps {
  model: string;
  modelId: number;
  collection?: string;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
  readOnly?: boolean;
  onUploadComplete?: (media: MediaItem[]) => void;
  title?: string;
  description?: string;
  documentName?: string;
  onClose: () => void;
}

interface ErrorResponse {
    error: string;
    code?: string;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  model,
  modelId,
  collection = 'documents',
  maxFileSize = 10, // Default 10MB
  acceptedFileTypes = ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  allowMultiple = true,
  readOnly = false,
  onUploadComplete,
  title = 'Documents',
  description = 'Upload and manage documents for this record',
  documentName,
  onClose
}) => {
  const { auth } = usePage().props;
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<MediaItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const { toast } = useToast();

  const getErrorMessage = (error: ErrorResponse): string => {
    switch (error.code) {
      case 'MODEL_NOT_FOUND':
        return `The requested ${model} was not found`;
      case 'PERMISSION_DENIED':
        return 'You do not have permission to access these documents. Please contact your administrator to request access.';
      case 'SERVER_ERROR':
        return 'An unexpected error occurred. Please try again later.';
      default:
        return error.error || 'An error occurred';
    }
  };

  // Fetch media items on component mount
  useEffect(() => {
    if (!auth.user) {
      setError('You must be logged in to access the media library');
      return;
    }
    fetchMediaItems();
  }, [model, modelId, collection]);

  const fetchMediaItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = model === 'Employee';
        ? `/api/employee/${modelId}/documents`
        : `/api/media-library/${model}/${modelId}`;

      const response = await axios.get(endpoint, {
        params: { collection },
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        withCredentials: true
      })

      setMediaItems(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (err) {
      console.error('Media library error:', err);
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        if (err.response?.status === 401) {
          setError('Please log in to access documents.');
        } else if (err.response?.status === 403) {
          setError('You do not have permission to access these documents.');
        } else if (err.response?.status === 404) {
          setError(`The requested ${model} was not found.`);
        } else if (err.response?.status === 500) {
          setError(`Server error: ${errorData?.message || 'An unexpected error occurred'}`);
        } else {
          setError(errorData?.message || 'Failed to load documents. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setMediaItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    if (!auth.user) {
      setError('You must be logged in to upload files');
      return;
    }

    setError(null);
    setUploadProgress(0);

    const formData = new FormData();
    // Add required fields
    formData.append('model', model);
    formData.append('model_id', modelId.toString());
    formData.append('collection', collection);

    // Add files array
    Array.from(files).forEach(file => {
      formData.append('files[]', file);
    })

    try {
      const endpoint = model === 'Employee';
        ? `/api/employee/${modelId}/documents/upload`
        : `/api/media-library/upload`;

      const response = await axios.post(
        endpoint,;
        formData,;
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
          },
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(progress);
          },
        }
      );

      if (response.data.success) {
        setMediaItems(prev => [...prev, ...response.data.data]);
        toast({
          title: 'Success',
          description: 'File(s) uploaded successfully',
        })
      } else {
        setError(response.data.message || 'Failed to upload file');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        setError(errorData?.message || 'Failed to upload file. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setUploadProgress(null);
      event.target.value = ''; // Reset file input
    }
  };

  const handleDelete = async (id: number) => {
    if (!auth.user) {
      setError('You must be logged in to delete files');
      return;
    }

    setError(null);
    try {
      const endpoint = model === 'Employee';
        ? `/api/employee/${modelId}/documents/${id}`
        : `/api/media-library/${id}`;

      await axios.delete(endpoint, {
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
          'Accept': 'application/json',
        },
      })

      setMediaItems(prev => prev.filter(item => item.id !== id));
      setDeleteItem(null);
      toast({
        title: 'Success',
        description: 'File deleted successfully',
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        setError(errorData?.message || 'Failed to delete file. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      handleDelete(deleteItem.id);
    }
  };

  const handleDownload = async (item: MediaItem) => {
    if (!auth.user) {
      setError('You must be logged in to download files');
      return;
    }

    try {
      const response = await axios.get(`/api/documents/${model}/${modelId}/${item.id}/download`, {
        responseType: 'blob',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
          'Accept': 'application/json',
        }
      })
      const blob = new Blob([response.data], { type: response.headers['content-type'] })
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.file_name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      toast.error('Failed to download file');
    }
  };

  const handlePreview = (item: MediaItem) => {
    setPreviewItem(item);
  };

  const canPreview = (mimeType: string) => {
    return mimeType.startsWith('image/') || mimeType === 'application/pdf';
  };

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const printFiles = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select at least one file to print');
      return;
    }

    setIsPrinting(true);

    try {
      const response = await axios.post('/api/media-library/generate-pdf', {
        media_ids: selectedItems,
        filename: `${model.toLowerCase()}_${modelId}_files.pdf`
      }, {
        responseType: 'blob'
      })

      // Create a blob URL and open in new window for printing
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob);
      const printWindow = window.open(url, '_blank');

      printWindow?.addEventListener('load', () => {
        printWindow.print();
      })

      toast.success('Generated PDF for printing');
    } catch (err) {
      console.error('Print error:', err);
      toast.error('Failed to generate printable PDF');
    } finally {
      setIsPrinting(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="h-6 w-6 text-blue-500" />
    if (mimeType.includes('pdf')) return <FileText className="h-6 w-6 text-red-500" />
    if (mimeType.includes('word')) return <FileText className="h-6 w-6 text-blue-700" />
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return <FileText className="h-6 w-6 text-green-600" />
    return <File className="h-6 w-6 text-gray-500" />
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={!auth.user}
          <Upload className="h-4 w-4 mr-2" />
          {uploadProgress !== null ? (
            <span>Uploading... {uploadProgress}%</span>
          ) : (
            <span>Upload Documents</span>
          )}
        </Button>
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
        />
        {uploadProgress !== null && (
          <Progress value={uploadProgress} className="mt-2" />
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No documents available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map(item => (
            <MediaItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
};



