import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/Modules/EquipmentManagement/Resources/js/types';
import AdminLayout from '@/Modules/EquipmentManagement/Resources/js/layouts/AdminLayout';
import { Equipment, MaintenanceRecord, RentalItem, ProjectEquipment } from '@/Modules/EquipmentManagement/Resources/js/types/models';
import { formatCurrency, formatDate } from '@/Modules/EquipmentManagement/Resources/js/utils/format';
import { useToast } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/use-toast';
import { Button } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/card';
import { Badge } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/badge';
import { Separator } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/dialog';
import {
  ArrowLeft,
  Pencil,
  Trash,
  Wrench,
  Settings,
  Calendar,
  Tag,
  MapPin,
  Coins,
  FileText,
  Eye,
  Download,
  Upload,
  FileIcon,
  X,
  Loader2,
  RefreshCw,
  Printer,
  Car,
  Truck,
  Award,
  IdCard,
  Plus,
  History
} from 'lucide-react';
import { ScrollArea } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/scroll-area';
import { DocumentManager } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/DocumentManager';
import { MediaLibrary } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/media-library/MediaLibrary';
import { EquipmentDocumentCard } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/documents/EquipmentDocumentCard';
import { DocumentCard } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/documents/DocumentCard';
import { DocumentSection } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/documents/DocumentSection';
import { DocumentExpiryTracker } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/documents/DocumentExpiryTracker';
import { DocumentUploadDialog } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/documents/DocumentUploadDialog';
import { AdditionalDocumentsList } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/documents/AdditionalDocumentsList';
import axios from 'axios';
import { Input } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/input';
import { Label } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/label';
import { Progress } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/progress';
import { cn } from '@/Modules/EquipmentManagement/Resources/js/lib/utils';
import { ToastService } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/shared/ToastManager';

interface Props extends PageProps {
  equipment: Equipment;
  maintenanceRecords: {
    data: MaintenanceRecord[];
    total: number;
  };
  rentalItems: {
    data: RentalItem[];
    total: number;
  };
  projectHistory: {
    data: ProjectEquipment[];
    total: number;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: route('dashboard'),
  },
  {
    title: 'Equipment',
    href: route('equipment.index'),
  },
  {
    title: 'Equipment Details',
    href: '',
  },
];

export default function Show({ auth, equipment, maintenanceRecords = { data: [], total: 0 }, rentalItems = { data: [], total: 0 }, projectHistory = { data: [], total: 0 } }: Props) {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [mediaItems, setMediaItems] = React.useState<Array<{ id: number; file_name: string; collection: string; original_url: string }>>([]);
  const [previewDocument, setPreviewDocument] = React.useState<{ id: number; file_name: string; collection: string; original_url: string } | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<Record<string, number>>({});
  const [files, setFiles] = React.useState<Record<string, File | null>>({
    istimara: null,
    documents: null
  });
  const [documentUploadKey, setDocumentUploadKey] = React.useState(0);

  // Define canManageDocuments based on user permissions
  const canManageDocuments = auth.permissions?.includes('equipment.edit') || auth.permissions?.includes('documents.upload');

  // Fetch media items
  React.useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await axios.get(`/api/media-library/Equipment/${equipment.id}`);
        setMediaItems(response.data.data || []);
      } catch (error) {
        console.error('Error fetching media items:', error);
      }
    };

    fetchMediaItems();
  }, [equipment.id]);

  // Process rental items to prevent undefined errors
  const processRentalItems = React.useMemo(() => {
    return {
      data: (rentalItems?.data || []).map(item => {
        // Create a safe copy with all required properties
        const safeItem = { ...item };

        // Ensure rental exists and has a customer
        if (!safeItem.rental) {
          safeItem.rental = {
            id: 0,
            customer_id: 0,
            rental_number: '',
            start_date: '',
            expected_end_date: '',
            status: 'pending' as const,
            total_amount: 0,
            created_at: '',
            updated_at: '',
            customer: {
              id: 0,
              company_name: 'Unknown',
              contact_person: '',
              email: '',
              phone: '',
              address: '',
              city: '',
              state: '',
              postal_code: '',
              country: '',
              tax_number: '',
              credit_limit: 0,
              payment_terms: '',
              notes: '',
              is_active: false,
              created_at: '',
              updated_at: ''
            }
          };
        } else if (!safeItem.rental.customer) {
          // If rental exists but customer doesn't, add a fake customer
          safeItem.rental.customer = {
            id: 0,
            company_name: 'Unknown',
            contact_person: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
            tax_number: '',
            credit_limit: 0,
            payment_terms: '',
            notes: '',
            is_active: false,
            created_at: '',
            updated_at: ''
          };
        }

        return safeItem;
      }),
      total: rentalItems?.total || 0
    };
  }, [rentalItems]);

  const handleDelete = () => {
    router.delete(route('equipment.destroy', { equipment: equipment.id }), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Equipment deleted successfully"
          });
        window.location.href = route('equipment.index');
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete equipment",
            variant: "destructive"
          });
        }
      });
  };

  const getStatusBadge = (status: string) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;

    switch (status.toLowerCase()) {
      case 'available':
        return <Badge variant="default">Available</Badge>;
      case 'rented':
        return <Badge variant="secondary">Rented</Badge>;
      case 'maintenance':
        return <Badge variant="outline">Maintenance</Badge>;
      case 'retired':
        return <Badge variant="destructive">Retired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMaintenanceStatusBadge = (status: string) => {
    if (!status) return <Badge variant="outline">Unknown</Badge>;

    switch (status.toLowerCase()) {
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      case 'in_progress':
        return <Badge variant="outline">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status.replace('_', ' ')}</Badge>;
    }
  };

  // Function to handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileKey: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [fileKey]: file
      }));
    }
  };

  // Function to remove file
  const removeFile = (fileKey: string) => {
    setFiles(prev => ({
      ...prev,
      [fileKey]: null
    }));
  };

  // Function to handle direct upload of documents
  const handleDirectUpload = async (fileKey: string) => {
    if (!files[fileKey]) {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', files[fileKey]);

    // Set document name based on fileKey
    const documentName = {
      istimara: 'Istimara',
      documents: 'Additional Document'
    }[fileKey] || '';

    formData.append('name', documentName);
    formData.append('type', fileKey);
    formData.append('is_additional', fileKey === 'documents' ? '1' : '0');

    try {
      const response = await axios.post(`/api/equipment/${equipment.id}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total;
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total);
            : 0;
          setUploadProgress(prev => ({
            ...prev,
            [fileKey]: progress
          }));
        }
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Document uploaded successfully"
        });

        // Refresh media items
        const mediaResponse = await axios.get(`/api/media-library/Equipment/${equipment.id}`);
        setMediaItems(mediaResponse.data.data || []);

        // Clear the file
        setFiles(prev => ({
          ...prev,
          [fileKey]: null
        }));
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(prev => ({
        ...prev,
        [fileKey]: 0
      }));
    }
  };

  // Document preview dialog
  const renderDocumentPreviewDialog = () => {
    if (!previewDocument) return null;

    const isPdf = previewDocument.file_name.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(previewDocument.file_name);

    return (
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{previewDocument.file_name}</DialogTitle>
            <DialogDescription>
              {previewDocument.collection === 'istimara' ? 'Istimara Document' : 'Additional Document'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex justify-center">
            {isPdf && (
              <iframe
                src={`${previewDocument.original_url}#toolbar=0`}
                className="w-full h-[500px] border rounded"
                title={previewDocument.file_name}
              ></iframe>
            )}
            {isImage && (
              <img
                src={previewDocument.original_url}
                alt={previewDocument.file_name}
                className="max-w-full max-h-[500px] object-contain"
              />
            )}
            {!isPdf && !isImage && (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <FileIcon className="h-16 w-16 text-slate-400 mb-4" />
                <p className="text-slate-600">Preview not available for this file type</p>
                <p className="text-slate-400 text-sm">({previewDocument.file_name.split('.').pop()})</p>
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => window.open(previewDocument.original_url, '_blank')}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => setShowPreviewDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <AdminLayout
      title={`Equipment: ${equipment.name}`}
      breadcrumbs={breadcrumbs}
      requiredPermission="equipment.view"
    >
      <Head title={`Equipment: ${equipment.name}`} />

      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
              <CardTitle className="text-2xl font-bold">
                {equipment.name}-{getStatusBadge(equipment.status)}
              </CardTitle>
              <CardDescription className="mt-1">
                {equipment.model} {equipment.door_number ? `- Door No: ${equipment.door_number}` : ''}
              </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link href={route('equipment.index')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Equipment List
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                <Link href={route('equipment.edit', { equipment: equipment.id })}>
                    <Pencil className="mr-2 h-4 w-4" />
                  Edit
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                <Link href={route('equipment.maintenance.create', { equipment: equipment.id })}>
                    <Wrench className="mr-2 h-4 w-4" />
                  Maintenance
                  </Link>
                </Button>
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Equipment Details</TabsTrigger>
            <TabsTrigger value="maintenance">
              Maintenance Records ({maintenanceRecords.total})
            </TabsTrigger>
            <TabsTrigger value="rentals">
              Rental History ({processRentalItems.total})
            </TabsTrigger>
            <TabsTrigger value="projects">
              Project History ({projectHistory.total})
            </TabsTrigger>
            <TabsTrigger value="documents">
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Name</div>
                    <div className="col-span-2">{equipment.name}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Model</div>
                    <div className="col-span-2">{equipment.model}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Serial Number</div>
                    <div className="col-span-2">{equipment.serial_number}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Door Number</div>
                    <div className="col-span-2">{equipment.door_number || 'â€”'}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Status</div>
                    <div className="col-span-2">{getStatusBadge(equipment.status)}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Description</div>
                    <div className="col-span-2">{equipment.description || 'â€”'}</div>
                </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="mr-2 h-5 w-5" />
                    Classification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Category</div>
                    <div className="col-span-2">{equipment.category || 'â€”'}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Location</div>
                    <div className="col-span-2">{equipment.location || 'â€”'}</div>
                </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coins className="mr-2 h-5 w-5" />
                    Financial Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Daily Rate</div>
                    <div className="col-span-2">{formatCurrency(equipment.daily_rate)}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Weekly Rate</div>
                    <div className="col-span-2">{formatCurrency(equipment.weekly_rate)}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Monthly Rate</div>
                    <div className="col-span-2">{formatCurrency(equipment.monthly_rate)}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Purchase Cost</div>
                    <div className="col-span-2">{formatCurrency(equipment.purchase_cost)}</div>
                </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Purchase Date</div>
                    <div className="col-span-2">{formatDate(equipment.purchase_date)}</div>
                </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Maintenance Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Last Maintenance</div>
                    <div className="col-span-2">{equipment.last_maintenance_date ? formatDate(equipment.last_maintenance_date) : 'â€”'}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-medium">Next Maintenance</div>
                    <div className="col-span-2">{equipment.next_maintenance_date ? formatDate(equipment.next_maintenance_date) : 'â€”'}</div>
                  </div>
                  {equipment.notes && (
                    <div className="mt-4">
                      <div className="font-medium mb-2">Notes</div>
                      <div className="whitespace-pre-line px-4 py-3 bg-muted rounded-md">
                        {equipment.notes}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

                <TabsContent value="maintenance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Maintenance History</CardTitle>
                  <CardDescription>
                    Recent maintenance activities for this equipment
                  </CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link href={route('equipment.maintenance.index', { equipment: equipment.id })}>
                    <Wrench className="mr-2 h-4 w-4" />
                    View Full Maintenance Dashboard
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Performed By</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceRecords.data.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            No maintenance records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        maintenanceRecords.data.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>{formatDate(record.maintenance_date)}</TableCell>
                            <TableCell>{record.maintenance_type}</TableCell>
                            <TableCell>{getMaintenanceStatusBadge(record.status)}</TableCell>
                            <TableCell>{formatCurrency(record.cost)}</TableCell>
                            <TableCell>{record.performed_by}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={route('equipment.maintenance.show', [equipment.id, record.id])}>
                                  View
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link href={route('equipment.maintenance.create', { equipment: equipment.id })}>
                      <Wrench className="mr-2 h-4 w-4" />
                      Schedule Maintenance
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
                </TabsContent>

          <TabsContent value="rentals">
            <Card>
              <CardHeader>
                <CardTitle>Rental History</CardTitle>
                <CardDescription>
                  History of this equipment's rentals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rental #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {processRentalItems.data.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No rental history found
                          </TableCell>
                        </TableRow>
                      ) : (
                        processRentalItems.data.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.rental?.rental_number || 'â€”'}</TableCell>
                            <TableCell>{item.rental?.customer?.company_name || 'â€”'}</TableCell>
                            <TableCell>{formatDate(item.rental?.start_date)}</TableCell>
                            <TableCell>{formatDate(item.rental?.expected_end_date)}</TableCell>
                            <TableCell>{formatCurrency(item.rate)} / {item.rate_type}</TableCell>
                            <TableCell>
                              <Badge variant={item.rental?.status === 'active' ? 'default' : 'secondary'}>
                                {item.rental?.status || 'Unknown'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              {item.rental?.id && (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={route('rentals.show', item.rental.id)}>
                                    View
                                  </Link>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                    </CardContent>
                  </Card>
                </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project History</CardTitle>
                <CardDescription>
                  History of this equipment's usage in projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Usage Hours</TableHead>
                        <TableHead>Hourly Rate</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectHistory.data.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No project history found
                          </TableCell>
                        </TableRow>
                      ) : (
                        projectHistory.data.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.project?.name || 'â€”'}</TableCell>
                            <TableCell>{formatDate(item.start_date)}</TableCell>
                            <TableCell>{formatDate(item.end_date)}</TableCell>
                            <TableCell>{item.usage_hours}</TableCell>
                            <TableCell>{formatCurrency(item.hourly_rate)}</TableCell>
                            <TableCell>{formatCurrency(item.total_cost)}</TableCell>
                            <TableCell className="text-right">
                              {item.project?.id && (
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={route('projects.show', item.project.id)}>
                                    View Project
                                  </Link>
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6 space-y-6">
            {/* Legal Documents Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Legal Documents</CardTitle>
                    <CardDescription>Official registration and legal documents</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Required Documents
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EquipmentDocumentCard
                    title="Istimara"
                    documentNumber={equipment.door_number}
                    documentType="istimara"
                    equipmentId={equipment.id}
                    icon={<IdCard className="h-4 w-4 text-muted-foreground" />}
                    previewSize="id_card"
                    documentName="Istimara"
                    onUploadSuccess={() => {
                      // Refresh media items
                      axios.get(`/api/media-library/Equipment/${equipment.id}`)
                        .then(response => {
                          setMediaItems(response.data.data || []);
                        })
                        .catch(console.error);
                    }}
                    onDeleteSuccess={() => {
                      // Refresh media items
                      axios.get(`/api/media-library/Equipment/${equipment.id}`)
                        .then(response => {
                          setMediaItems(response.data.data || []);
                        })
                        .catch(console.error);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Documents Section */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Documents</CardTitle>
                <CardDescription>
                  Upload and manage additional documents for this equipment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MediaLibrary
                  model="Equipment"
                  modelId={equipment.id}
                  collection="documents"
                  maxFileSize={10}
                  acceptedFileTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                  allowMultiple={true}
                  readOnly={!canManageDocuments}
                  title="Equipment Documents"
                  description="Upload and manage documents for this equipment"
                  onClose={() => {}}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add document preview dialog */}
        {renderDocumentPreviewDialog()}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to delete this equipment?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently remove the equipment and all associated records.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}


