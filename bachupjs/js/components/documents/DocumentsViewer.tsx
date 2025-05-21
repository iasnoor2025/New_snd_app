import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  FileImage,
  FileType,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Download,
  Upload,
  Trash,
  MoreHorizontal,
  Eye,
  Share2,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Document {
  id: number;
  name: string;
  type: string;
  url: string;
  size: number;
  uploaded_at: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_by: string;
  category: string;
  description?: string;
}

interface DocumentsViewerProps {
  documents?: Document[];
  modelType?: string;
  modelId?: number;
  canUpload?: boolean;
  onUpload?: (files: File[]) => void;
  onDelete?: (documentId: number) => void;
  onShare?: (documentId: number) => void;
  onView?: (documentId: number) => void;
}

export default function DocumentsViewer({
  documents,
  modelType,
  modelId,
  canUpload,
  onUpload,
  onDelete,
  onShare,
  onView
}: DocumentsViewerProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileType className="h-5 w-5 text-red-500" />
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImage className="h-5 w-5 text-purple-500" />
      case 'mp4':
      case 'avi':
        return <FileVideo className="h-5 w-5 text-orange-500" />
      case 'mp3':
      case 'wav':
        return <FileAudio className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <Badge variant="default" className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload?.(selectedFiles);
      setIsUploadDialogOpen(false);
      setSelectedFiles([]);
    }
  };

  const handlePreview = (document: Document) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Documents</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsUploadDialogOpen(true)}
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents?.map((doc) => (
          <Card key={doc.id} className="relative group">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getFileIcon(doc.type)}
                  <div>
                    <p className="text-sm font-medium line-clamp-1">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(doc.size)} • {format(new Date(doc.uploaded_at), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handlePreview(doc)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onShare?.(doc.id)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onDelete?.(doc.id)}
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {doc.description && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {doc.description}
                </p>
              )}

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  {getStatusBadge(doc.status)}
                  <Badge variant="outline" className="text-xs">
                    {doc.category}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  by {doc.uploaded_by}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Documents</DialogTitle>
            <DialogDescription>
              Upload documents related to this rental. Supported formats: PDF, DOC, XLS, JPG, PNG, MP4, MP3
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="col-span-4"
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Files:</p>
                <ul className="text-sm text-muted-foreground">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={selectedFiles.length === 0}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
            <DialogDescription>
              Preview document
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedDocument && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {selectedDocument.type.toLowerCase().includes('pdf') ? (
                  <iframe
                    src={selectedDocument.url}
                    className="w-full h-full rounded-lg"
                    title={selectedDocument.name}
                  />
                ) : selectedDocument.type.toLowerCase().includes('image') ? (
                  <img
                    src={selectedDocument.url}
                    alt={selectedDocument.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Preview not available for this file type
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      asChild
                      <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download to View
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
