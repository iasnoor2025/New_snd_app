import React, { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Trash2, FileText, Image, Download, Merge, Loader2, RefreshCw, Eye, AlertCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { router } from '@inertiajs/react';
import axios, { AxiosError } from 'axios';
import { Log } from '@/utils/logger';
import ActionButton from '@/components/shared/ActionButton';
import { useDocumentApi } from '@/hooks/useDocumentApi';
import { getFileIcon } from '@/utils/file-utils';
import { ErrorWithRetry, LoadingState } from '@/components/shared';
import { getErrorMessage } from '@/utils/error-utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Document } from '@/types';

interface DocumentManagerProps {
    model: string;
    modelId: number;
    onError?: (error: string) => void;
    onLoadingChange?: (isLoading: boolean) => void;
}

interface MergeResponse {
    message: string;
    document: Document;
}

interface ApiError {
    message: string;
    error?: string;
}

interface MergeParams {
    documentIds: number[];
    outputName: string;
}

interface PageProps {
    documents?: Document[];
    mergedDocument?: MergeResponse;
}

// Interface for the error event in onError handlers
interface ErrorEvent extends React.SyntheticEvent<HTMLIFrameElement | HTMLImageElement> {
    currentTarget: HTMLIFrameElement | HTMLImageElement;
}

interface PreviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    document: Document | null;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({ model, modelId, onError, onLoadingChange }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
    const [mergeOutputName, setMergeOutputName] = useState('');
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);

    // Convert model name to lowercase for API requests
    const modelType = model.toLowerCase();

    // Use the custom hook for document API operations
    const {
        api,
        fetchDocuments,
        uploadDocument,
        deleteDocument,
        mergeDocuments,
        renameDocument
    }: {
        api: any;
        fetchDocuments: () => Promise<Document[]>
        uploadDocument: (formData: FormData) => Promise<any>
        deleteDocument: (documentId: number) => Promise<any>
        mergeDocuments: (params: MergeParams) => Promise<any>
        renameDocument: (documentId: number, newName: string) => Promise<any>
    } = useDocumentApi(modelType, modelId, onError);

    const {
        data: documents = [],
        isLoading,
        error: fetchError,
        refetch
    } = useQuery<Document[], ApiError>({
        queryKey: ['documents', modelType, modelId],
        queryFn: fetchDocuments
    })

    // State for document renaming
    const [documentBeingRenamed, setDocumentBeingRenamed] = useState<number | null>(null);
    const [newDocumentName, setNewDocumentName] = useState<string>('');

    // State for document preview
    const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [previewLoadError, setPreviewLoadError] = useState<boolean>(false);

    // Function to validate if a URL is accessible
    const isValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    // Update error state when fetch error changes
    useEffect(() => {
        if (fetchError) {
            setError(getErrorMessage(fetchError));
        } else {
            setError(null);
        }
    }, [fetchError]);

    // Report loading state changes to parent component
    useEffect(() => {
        if (onLoadingChange) {
            onLoadingChange(isLoading);
        }
    }, [isLoading, onLoadingChange]);

    const uploadMutation = useMutation<any, unknown, FormData>({
        mutationFn: uploadDocument,
        onSuccess: () => {
            setSelectedFiles([]);
            setFileNames([]);
            queryClient.invalidateQueries({ queryKey: ['documents', modelType, modelId] })
            toast.success('Documents uploaded successfully');
        },
        onError: (error: unknown) => {
            const errorMessage = getErrorMessage(error);
            toast.error(`Upload failed: ${errorMessage}`);
            if (onError) onError(errorMessage);
        }
    })

    const deleteMutation = useMutation<any, unknown, number>({
        mutationFn: deleteDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents', modelType, modelId] })
            toast.success('Document deleted successfully');
        },
        onError: (error: unknown) => {
            const errorMessage = getErrorMessage(error);
            toast.error(`Delete failed: ${errorMessage}`);
            if (onError) onError(errorMessage);
        }
    })

    const mergeMutation = useMutation({
        mutationFn: (params: MergeParams) => mergeDocuments(params),
        onSuccess: () => {
            setSelectedDocuments([]);
            setMergeOutputName('');
            queryClient.invalidateQueries({ queryKey: ['documents', modelType, modelId] })
            toast.success('Documents merged successfully');
        },
        onError: (error: unknown) => {
            const errorMessage = getErrorMessage(error);
            toast.error(`Merge failed: ${errorMessage}`);
            if (onError) onError(errorMessage);
        }
    })

    const renameMutation = useMutation({
        mutationFn: ({ documentId, newName }: { documentId: number, newName: string }) =>
            renameDocument(documentId, newName),
        onSuccess: () => {
            setDocumentBeingRenamed(null);
            setNewDocumentName('');
            queryClient.invalidateQueries({ queryKey: ['documents', modelType, modelId] })
            toast.success('Document renamed successfully');
        },
        onError: (error: unknown) => {
            const errorMessage = getErrorMessage(error);
            toast.error(`Rename failed: ${errorMessage}`);
            if (onError) onError(errorMessage);
        }
    })

    const copyIstimaraMutation = useMutation({
        mutationFn: async () => {
            const response = await api.post(`/api/${modelType}/${modelId}/documents/copy-istimara`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents', modelType, modelId] })
            toast.success('Istimara copied successfully');
        },
        onError: (error: unknown) => {
            const errorMessage = getErrorMessage(error);
            toast.error(`Failed to copy Istimara: ${errorMessage}`);
            if (onError) onError(errorMessage);
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            setSelectedFiles(fileList);
            setFileNames(fileList.map(file => file.name));
        }
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            toast.error('Please select files to upload');
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('documents[]', file);
        })

        uploadMutation.mutate(formData);
    };

    const handleDelete = async (documentId: number) => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            deleteMutation.mutate(documentId);
        }
    };

    const handleMerge = async () => {
        if (selectedDocuments.length < 2) {
            toast.error('Please select at least two documents to merge');
            return;
        }

        if (!mergeOutputName) {
            toast.error('Please provide a name for the merged document');
            return;
        }

        mergeMutation.mutate({
            documentIds: selectedDocuments,
            outputName: mergeOutputName
        })
    };

    const startRename = (document: Document) => {
        setDocumentBeingRenamed(document.id);
        setNewDocumentName(document.name);
    };

    const handleRename = (documentId: number) => {
        if (!newDocumentName.trim()) {
            toast.error('Document name cannot be empty');
            return;
        }

        renameMutation.mutate({
            documentId,
            newName: newDocumentName
        })
    };

    const handlePreview = (document: Document) => {
        setPreviewDocument(document);
        setIsPreviewOpen(true);
    };

    const toggleDocumentSelection = (documentId: number) => {
        setSelectedDocuments(prev =>
            prev.includes(documentId)
                ? prev.filter(id => id !== documentId)
                : [...prev, documentId]
        );
    };

    const handleCopyIstimara = async () => {
        copyIstimaraMutation.mutate();
    };

    const PreviewDialog = ({ isOpen, onClose, document: previewDocument }: PreviewDialogProps) => {
        const [previewLoadError, setPreviewLoadError] = useState(false);
        const isPdf = previewDocument?.file_type === 'application/pdf';
        const isImage = previewDocument?.file_type?.startsWith('image/');

        const handlePreviewError = () => {
            console.error("Failed to load document preview");
            setPreviewLoadError(true);
        };

        const previewUrl = previewDocument?.url;

        if (!previewUrl) {
            return (
                <Dialog open={isOpen} onOpenChange={() => onClose()}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Preview Error</DialogTitle>
                            <DialogDescription>
                                Unable to preview this document type.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 flex justify-end">
                            <Button onClick={() => onClose()}>Close</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            );
        }

        return (
            <Dialog open={isOpen} onOpenChange={() => onClose()}>
                <DialogContent className="max-w-4xl h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>{previewDocument?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 min-h-0 w-full">
                        {previewLoadError ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-red-500 mb-4">Failed to load preview</p>
                                <Button onClick={() => window.open(previewUrl, '_blank')}>
                                    Open in New Tab
                                </Button>
                            </div>
                        ) : isPdf ? (
                            <iframe
                                src={previewUrl}
                                className="w-full h-full border-0"
                                title={previewDocument?.name}
                                onError={handlePreviewError}
                                referrerPolicy="no-referrer"
                                sandbox="allow-same-origin allow-scripts allow-popups"
                            />
                        ) : isImage ? (
                            <img
                                src={previewUrl}
                                alt={previewDocument?.name}
                                className="max-h-full max-w-full object-contain mx-auto"
                                onError={handlePreviewError}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                                <p className="text-gray-500 mb-4">Preview not available for this file type</p>
                                <Button onClick={() => window.open(previewUrl, '_blank')}>
                                    Open in New Tab
                                </Button>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button onClick={() => onClose()}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    const renderActionButtons = () => (
        <div className="flex items-center gap-2 mb-4">
            <Button;
                variant="outline";
                onClick={handleCopyIstimara}
                disabled={copyIstimaraMutation.isPending}
                className="flex items-center gap-2"
                {copyIstimaraMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
                Copy Istimara
            </Button>
            <ActionButton
                action="custom"
                resourceType="documents"
                resourceId={documents[0]?.id}
                resourceName={documents[0]?.name}
                buttonVariant="ghost"
                buttonSize="icon"
                customIcon={<Eye className="h-4 w-4" />}
                onClick={() => handlePreview(documents[0])}
                disabled={false}
            />
            <ActionButton
                action="download"
                resourceType="documents"
                resourceId={documents[0]?.id}
                resourceName={documents[0]?.name}
                buttonVariant="ghost"
                buttonSize="icon"
                onClick={() => window.open(documents[0]?.url, '_blank')}
                disabled={deleteMutation.isPending}
            />
            <ActionButton
                action="delete"
                resourceType="documents"
                resourceId={documents[0]?.id}
                resourceName={documents[0]?.name}
                buttonVariant="ghost"
                buttonSize="icon"
                onClick={() => handleDelete(documents[0]?.id)}
                disabled={deleteMutation.isPending}
                customIcon={deleteMutation.isPending ?
                    <Loader2 className="w-4 h-4 animate-spin" /> : undefined
                }
                skipConfirmation={true}
            />
        </div>
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">Loading documents...</span>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="flex flex-col items-center justify-center p-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <span className="mt-2">{getErrorMessage(fetchError)}</span>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => refetch()}
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {renderActionButtons()}
            {error && (
                <div className="p-4 rounded-md bg-red-50 text-red-600 border border-red-200">
                    {error}
                </div>
            )}
            <div className="flex items-center gap-4">
                <Input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="max-w-sm"
                    disabled={uploadMutation.isPending}
                />
                <ActionButton
                    action="upload"
                    resourceType="documents"
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || uploadMutation.isPending}
                    buttonVariant="default"
                    showText={true}
                    buttonText={uploadMutation.isPending ? 'Uploading...' : 'Upload'}
                    customIcon={uploadMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : undefined}
                />
            </div>

            {selectedFiles.length > 0 && (
                <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <Input
                                value={fileNames[index]}
                                onChange={(e) => {
                                    const newNames = [...fileNames];
                                    newNames[index] = e.target.value;
                                    setFileNames(newNames);
                                }}
                                placeholder="Document name"
                                disabled={uploadMutation.isPending}
                            />
                        </div>
                    ))}
                </div>
            )}

            {Array.isArray(documents) && documents.some((doc: Document) => doc.file_type === 'pdf') && (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Input
                            value={mergeOutputName}
                            onChange={(e) => setMergeOutputName(e.target.value)}
                            placeholder="Enter name for merged PDF"
                            className="max-w-sm"
                            disabled={mergeMutation.isPending}
                        />
                        <ActionButton
                            action="custom"
                            resourceType="documents"
                            customText={mergeMutation.isPending ? 'Merging...' : 'Merge PDFs'}
                            customIcon={mergeMutation.isPending ?
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> :
                                <Merge className="w-4 h-4 mr-2" />
                            }
                            onClick={handleMerge}
                            disabled={selectedDocuments.length < 2 || !mergeOutputName || mergeMutation.isPending}
                            buttonVariant="default"
                            showText={true}
                        />
                    </div>
                </div>
            )}

            <div className="grid gap-4">
                {!Array.isArray(documents) || documents.length === 0 ? (
                    <div className="text-center p-4 text-gray-500">
                        No documents found
                    </div>
                ) : (
                    documents.map((doc: Document) => (
                        <Card key={doc.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {doc.file_type === 'pdf' && (
                                        <Checkbox
                                            checked={selectedDocuments.includes(doc.id)}
                                            onCheckedChange={() => toggleDocumentSelection(doc.id)}
                                            disabled={mergeMutation.isPending}
                                        />
                                    )}
                                    {getFileIcon(doc.file_type)}
                                    {documentBeingRenamed === doc.id ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={newDocumentName}
                                                onChange={(e) => setNewDocumentName(e.target.value)}
                                                className="h-8 min-w-[200px]"
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        handleRename(doc.id);
                                                    } else if (e.key === 'Escape') {
                                                        setDocumentBeingRenamed(null);
                                                    }
                                                }}
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() => handleRename(doc.id)}
                                                disabled={renameMutation.isPending}
                                                {renameMutation.isPending ?
                                                    <Loader2 className="h-4 w-4 animate-spin" /> :
                                                    'Save'}
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => setDocumentBeingRenamed(null)}
                                                Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <span
                                            className="cursor-pointer hover:underline"
                                            onClick={() => startRename(doc)}
                                            {doc.name}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <ActionButton
                                        action="custom"
                                        resourceType="documents"
                                        resourceId={doc.id}
                                        resourceName={doc.name}
                                        buttonVariant="ghost"
                                        buttonSize="icon"
                                        customIcon={<Eye className="h-4 w-4" />}
                                        onClick={() => handlePreview(doc)}
                                        disabled={false}
                                    />
                                    <ActionButton
                                        action="download"
                                        resourceType="documents"
                                        resourceId={doc.id}
                                        resourceName={doc.name}
                                        buttonVariant="ghost"
                                        buttonSize="icon"
                                        onClick={() => window.open(doc.url, '_blank')}
                                        disabled={deleteMutation.isPending}
                                    />
                                    <ActionButton
                                        action="delete"
                                        resourceType="documents"
                                        resourceId={doc.id}
                                        resourceName={doc.name}
                                        buttonVariant="ghost"
                                        buttonSize="icon"
                                        onClick={() => handleDelete(doc.id)}
                                        disabled={deleteMutation.isPending}
                                        customIcon={deleteMutation.isPending ?
                                            <Loader2 className="w-4 h-4 animate-spin" /> : undefined
                                        }
                                        skipConfirmation={true}
                                    />
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            <PreviewDialog
                isOpen={isPreviewOpen}
                onClose={() => {
                    setIsPreviewOpen(false);
                    setPreviewLoadError(false);
                }}
                document={previewDocument}
            />
        </div>
    );
};



