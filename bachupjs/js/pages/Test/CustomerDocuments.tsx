import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { toast } from '@/Components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/Components/ui/alert-dialog';
import { FileIcon, Trash2Icon, DownloadIcon, ImageIcon, FileTextIcon, FileArchiveIcon, PencilIcon, SaveIcon, XIcon } from 'lucide-react';

interface Customer {
    id: number;
    company_name: string;
    contact_person: string;
}

interface Document {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    size: number;
    url: string;
    thumb: string | null;
    created_at: string;
}

interface CustomerDocumentsProps {
    auth: any;
    customer: Customer;
    documents: Document[];
}

export default function CustomerDocuments({ auth, customer, documents }: CustomerDocumentsProps) {
    const [editingDocId, setEditingDocId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>('');
    const { csrf_token } = usePage().props as any;

    const handleDeleteDocument = (mediaId: number) => {
        router.delete(route('test.customers.documents.delete', { customerId: customer.id, mediaId }), {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Document deleted successfully',
                })
            },
            onError: (errors) => {
                toast({
                    title: 'Error',
                    description: Object.values(errors).join('\n'),
                    variant: 'destructive',
                })
            }
        })
    };

    const startEditing = (doc: Document) => {
        setEditingDocId(doc.id);
        setEditName(doc.name);
    };

    const cancelEditing = () => {
        setEditingDocId(null);
        setEditName('');
    };

    const handleUpdateDocument = (mediaId: number) => {
        // Get the CSRF token from the meta tag
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        // Create the request data
        const formData = new FormData();
        formData.append('name', editName);

        // Use the fetch API with the POST-specific route
        fetch(route('test.customers.documents.post-update', {
            customerId: customer.id,
            mediaId: mediaId
        }), {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token || '',
                'Accept': 'application/json',
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            setEditingDocId(null);
            toast({
                title: 'Success',
                description: 'Document updated successfully',
            })
            // Reload the page to reflect changes
            window.location.reload();
        })
        .catch(error => {
            console.error('Update error:', error);
            toast({
                title: 'Error',
                description: 'Failed to update document',
                variant: 'destructive',
            })
        })
    };

    const getFileIcon = (mimeType: string | undefined) => {
        if (mimeType?.startsWith('image/')) {
            return <ImageIcon className="h-10 w-10 text-blue-500" />
        } else if (mimeType?.includes('pdf')) {
            return <FileTextIcon className="h-10 w-10 text-red-500" />
        } else if (mimeType?.includes('zip') || mimeType?.includes('archive')) {
            return <FileArchiveIcon className="h-10 w-10 text-yellow-500" />
        } else {
            return <FileIcon className="h-10 w-10 text-gray-500" />
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Customer Documents</h2>}
            <Head title={`${customer.company_name} - Documents`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-white shadow">
                        <CardHeader>
                            <CardTitle>{customer.company_name} - Documents</CardTitle>
                            <CardDescription>
                                View and manage documents for {customer.contact_person}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {documents.length === 0 ? (
                                <div className="border border-dashed rounded-md p-10 text-center text-muted-foreground">
                                    <p>No documents available for this customer.</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => window.location.href = route('test.documents')}
                                        Upload Documents
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {documents.map((document) => (
                                        <Card key={document.id} className="overflow-hidden">
                                            <div className="flex justify-center items-center p-4 h-40 bg-gray-50">
                                                {document.thumb ? (
                                                    <img
                                                        src={document.thumb}
                                                        alt={document.name}
                                                        className="max-h-full object-contain"
                                                    />
                                                ) : (
                                                    getFileIcon(document.mime_type)
                                                )}
                                            </div>
                                            <CardContent className="p-4">
                                                {editingDocId === document.id ? (
                                                    <form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            handleUpdateDocument(document.id);
                                                        }}
                                                        className="flex items-center gap-2"
                                                        <Input
                                                            value={editName}
                                                            onChange={(e) => setEditName(e.target.value)}
                                                            className="flex-1"
                                                        />
                                                        <Button
                                                            type="submit"
                                                            variant="ghost"
                                                            size="sm"
                                                            <SaveIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={cancelEditing}
                                                            <XIcon className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-lg truncate" title={document.name}>
                                                            {document.name}
                                                        </h3>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => startEditing(document)}
                                                            <PencilIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                                <p className="text-sm text-muted-foreground">
                                                    {formatSize(document.size)} • {new Date(document.created_at).toLocaleString()}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    asChild
                                                    <a href={document.url} target="_blank" rel="noreferrer">
                                                        <DownloadIcon className="h-4 w-4 mr-1" />
                                                        Download
                                                    </a>
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" size="sm">
                                                            <Trash2Icon className="h-4 w-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Document</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Are you sure you want to delete "{document.name}"? This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDeleteDocument(document.id)}
                                                                className="bg-red-600 hover:bg-red-700"
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = route('test.documents')}
                                Back to Upload
                            </Button>

                            <Button
                                onClick={() => window.location.href = route('dashboard')}
                                Dashboard
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
