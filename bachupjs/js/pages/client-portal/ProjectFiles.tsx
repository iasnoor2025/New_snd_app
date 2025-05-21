import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  FolderOpen,
  FileText,
  Download,
  Share2,
  Upload,
  Search,
  AlertCircle,
  X,
  Check,
  File,
  Image,
  FileArchive,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import ClientPortalLayout from '@/layouts/client-portal-layout';

interface FileItem {
  id: number;
  name: string;
  type: string;
  size: number;
  uploaded_at: string;
  uploaded_by: string;
  folder: string;
}

interface Project {
  id: number;
  name: string;
}

interface Props {
  project: Project;
  files: FileItem[];
  folders: string[];
}

export default function ProjectFiles({ project, files, folders }: Props) {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm({
    file: null as File | null,
    folder: currentFolder,
    description: '',
    projectId: project.id,
  })

  const filteredFiles = files.filter(file => {
    const matchesFolder = file.folder === currentFolder;
    const matchesSearch = searchQuery === '' || 
                         file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type.includes('image')) {
      return <Image className="h-5 w-5 text-blue-500" />
    } else if (type.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500" />
    } else if (type.includes('zip') || type.includes('rar')) {
      return <FileArchive className="h-5 w-5 text-amber-500" />
    } else {
      return <File className="h-5 w-5 text-gray-500" />
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      setData('file', fileInput.files[0]);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      })
    }, 100);

    // Handle form submission after "upload" completes
    setTimeout(() => {
      post(route('client.projects.files.upload'), {
        preserveScroll: true,
        onSuccess: () => {
          reset();
          setIsUploading(false);
        }
      })
      clearInterval(interval);
    }, 2000);
  };

  const handleFolderChange = (folder: string) => {
    setCurrentFolder(folder);
    setData('folder', folder);
  };

  const getBreadcrumbs = () => {
    if (currentFolder === 'root') {
      return [{ name: 'All Files', path: 'root' }];
    }

    const parts = currentFolder.split('/');
    let path = '';

    return [
      { name: 'All Files', path: 'root' },
      ...parts.map(part => {
        path = path ? `${path}/${part}` : part;
        return { name: part, path };
      })
    ];
  };

  return (
      <Head title={`${project.name} - Files`} />

      <ClientPortalLayout>
        <div className="container mx-auto py-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Link href={route('client.projects.dashboard')} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div className="flex items-center">
              {getBreadcrumbs().map((crumb, index, array) => (
                <React.Fragment key={crumb.path}>
                  <button
                    onClick={() => handleFolderChange(crumb.path)}
                    className={`text-sm ${
                      index === array.length - 1
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    {crumb.name}
                  </button>
                  {index < array.length - 1 && (
                    <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.name} - Files</h1>
            <p className="text-muted-foreground mt-1">Access and share project documents</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                  <DialogDescription>
                    Upload a file to the project repository
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="file">Select file</Label>
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileUpload}
                    />
                    {errors.file && (
                      <p className="text-sm text-destructive">{errors.file}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="folder">Folder</Label>
                    <select
                      id="folder"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={data.folder}
                      onChange={(e) => setData('folder', e.target.value)}
                      <option value="root">Root</option>
                      {folders.map(folder => (
                        <option key={folder} value={folder}>{folder}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the file"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                    />
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>

                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    disabled={!data.file || isUploading || processing}
                    onClick={simulateUpload}
                    Upload
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="files">
            <TabsList>
              <TabsTrigger value="files">All Files</TabsTrigger>
              <TabsTrigger value="shared">Shared with Me</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="space-y-6">
              {currentFolder === 'root' && folders.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <FolderOpen className="h-5 w-5 mr-2 text-amber-500" />
                      Folders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {folders.map(folder => (
                        <button
                          key={folder}
                          onClick={() => handleFolderChange(folder)}
                          className="flex flex-col items-center justify-center p-4 border rounded-md hover:bg-muted"
                          <FolderOpen className="h-10 w-10 text-amber-500 mb-2" />
                          <span className="text-sm text-center truncate w-full">{folder}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Files
                  </CardTitle>
                  <CardDescription>
                    {filteredFiles.length} files in {currentFolder === 'root' ? 'root directory' : currentFolder}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredFiles.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead>By</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredFiles.map(file => (
                            <TableRow key={file.id}>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {getFileIcon(file.type)}
                                  <span className="font-medium">{file.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{file.type.split('/')[1]?.toUpperCase() || file.type}</TableCell>
                              <TableCell>{formatFileSize(file.size)}</TableCell>
                              <TableCell>{format(new Date(file.uploaded_at), 'MMM d, yyyy')}</TableCell>
                              <TableCell>{file.uploaded_by}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button variant="outline" size="icon">
                                    <Download className="h-4 w-4" />
                                  </Button>

                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                      <DialogHeader>
                                        <DialogTitle>Share File</DialogTitle>
                                        <DialogDescription>
                                          Share this file with other team members or external users.
                                        </DialogDescription>
                                      </DialogHeader>

                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor="share-email">Email address</Label>
                                          <Input
                                            id="share-email"
                                            placeholder="Enter email address"
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="share-permission">Permission</Label>
                                          <select
                                            id="share-permission"
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            <option value="view">View only</option>
                                            <option value="comment">Can comment</option>
                                            <option value="edit">Can edit</option>
                                          </select>
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor="share-message">Message (Optional)</Label>
                                          <Textarea
                                            id="share-message"
                                            placeholder="Add a message"
                                          />
                                        </div>
                                      </div>

                                      <DialogFooter className="sm:justify-between">
                                        <DialogClose asChild>
                                          <Button type="button" variant="outline">
                                            Cancel
                                          </Button>
                                        </DialogClose>

                                        <Button type="submit">
                                          Share
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No files found</h3>
                      <p className="text-muted-foreground mt-1">
                        {searchQuery ? 'Try a different search term' : 'Upload files to see them here'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shared" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Share2 className="h-5 w-5 mr-2 text-violet-500" />
                    Shared with Me
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <Share2 className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No shared files yet</h3>
                    <p className="text-muted-foreground mt-1">
                      Files shared with you will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-green-500" />
                    Recent Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredFiles.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Folder</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredFiles
                            .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime())
                            .slice(0, 5)
                            .map(file => (
                              <TableRow key={file.id}>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    {getFileIcon(file.type)}
                                    <span className="font-medium">{file.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{file.folder === 'root' ? 'Root' : file.folder}</TableCell>
                                <TableCell>{format(new Date(file.uploaded_at), 'MMM d, yyyy')}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No recent files</h3>
                      <p className="text-muted-foreground mt-1">
                        Your recent files will appear here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ClientPortalLayout>
    </>
  );
}

