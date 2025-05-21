import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { toast } from '@/Components/ui/use-toast';
import { XIcon, FileIcon, PlusIcon } from 'lucide-react';

interface Customer {
    id: number;
    company_name: string;
    contact_person: string;
}

interface DocumentUploadProps {
    auth: any;
    customers: Customer[];
}

export default function DocumentUpload({ auth, customers }: DocumentUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [documentNames, setDocumentNames] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: '',
        documents: [] as File[],
        document_names: [] as string[],
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles([...selectedFiles, ...newFiles]);

            // Initialize document names with file names
            const newNames = newFiles.map(file => file.name);
            setDocumentNames([...documentNames, ...newNames]);

            // Update form data
            setData({
                ...data,
                documents: [...selectedFiles, ...newFiles],
                document_names: [...documentNames, ...newNames],
            })
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = [...selectedFiles];
        const updatedNames = [...documentNames];

        updatedFiles.splice(index, 1);
        updatedNames.splice(index, 1);

        setSelectedFiles(updatedFiles);
        setDocumentNames(updatedNames);

        setData({
            ...data,
            documents: updatedFiles,
            document_names: updatedNames,
        })
    };

    const handleNameChange = (index: number, value: string) => {
        const updatedNames = [...documentNames];
        updatedNames[index] = value;
        setDocumentNames(updatedNames);

        setData({
            ...data,
            document_names: updatedNames,
        })
    };

    const handleCustomerChange = (value: string) => {
        setData('customer_id', value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('customer_id', data.customer_id);

        selectedFiles.forEach((file, index) => {
            formData.append(`documents[${index}]`, file);
            formData.append(`document_names[${index}]`, documentNames[index]);
        })

        // Submit the form
        post(route('test.documents.upload'), formData, {
            onSuccess: () => {
                // Reset form after successful upload
                setSelectedFiles([]);
                setDocumentNames([]);
                reset();
                toast({
                    title: 'Success',
                    description: 'Documents uploaded successfully',
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

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Document Upload Test</h2>}
            <Head title="Document Upload Test" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Card className="bg-white shadow">
                        <CardHeader>
                            <CardTitle>Test Document Upload</CardTitle>
                            <CardDescription>
                                This page demonstrates document uploads using the MediaLibrary integration
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="customer">Select Customer</Label>
                                    <Select
                                        value={data.customer_id}
                                        onValueChange={handleCustomerChange}
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map(customer => (
                                                <SelectItem
                                                    key={customer.id}
                                                    value={customer.id.toString()}
                                                    {customer.company_name} ({customer.contact_person})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.customer_id && (
                                        <p className="text-sm text-red-500">{errors.customer_id}</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Documents</Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={triggerFileInput}
                                            <PlusIcon className="h-4 w-4 mr-2" />
                                            Add Files
                                        </Button>
                                        <Input
                                            type="file"
                                            multiple
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    {selectedFiles.length === 0 ? (
                                        <div className="border border-dashed rounded-md p-10 text-center text-muted-foreground">
                                            <p>No files selected. Click "Add Files" to upload documents.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {selectedFiles.map((file, index) => (
                                                <div key={index} className="flex items-center gap-3 border rounded-md p-3">
                                                    <FileIcon className="h-5 w-5 text-blue-500" />
                                                    <div className="flex-1 grid gap-0.5">
                                                        <Input
                                                            value={documentNames[index]}
                                                            onChange={(e) => handleNameChange(index, e.target.value)}
                                                            placeholder="Document name"
                                                            className="w-full"
                                                        />
                                                        <p className="text-xs text-muted-foreground">
                                                            {file.name} ({Math.round(file.size / 1024)} KB)
                                                        </p>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleRemoveFile(index)}
                                                        <XIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {errors.documents && (
                                        <p className="text-sm text-red-500">{errors.documents}</p>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.location.href = route('dashboard')}
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing || selectedFiles.length === 0 || !data.customer_id}
                                onClick={handleSubmit}
                                Upload Documents
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
