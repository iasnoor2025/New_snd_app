import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../../../../resources/js/layouts/AdminLayout';
import { formatCurrency } from '../../../../../../resources/js/utils/format';
import { Button } from '../../../../../../resources/js/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../../../../resources/js/components/ui/card';
import { Badge } from '../../../../../../resources/js/components/ui/badge';
import { Separator } from '../../../../../../resources/js/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../resources/js/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../resources/js/components/ui/table';
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
import { Input } from '../../../../../../resources/js/components/ui/input';
import { Label } from '../../../../../../resources/js/components/ui/label';
import { cn } from '../../../../../../resources/js/lib/utils';

interface Props {
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

const breadcrumbs = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Equipment', href: '/equipment' },
  { title: 'Equipment Details', href: window.location.pathname },
];

export default function Show({ equipment, maintenanceRecords = { data: [], total: 0 }, rentalItems = { data: [], total: 0 }, projectHistory = { data: [], total: 0 } }: Props) {
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
    router.delete(window.route('equipment.destroy', { equipment: equipment.id }), {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Equipment deleted successfully"
          });
        window.location.href = window.route('equipment.index');
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
      const response = await axios.post(window.route('equipment.documents.upload', { equipment: equipment.id }), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0;
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
        const mediaResponse = await axios.get(window.route('equipment.media-library', { equipment: equipment.id }));
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
      title="Equipment Details"
      breadcrumbs={breadcrumbs}
      requiredPermission="equipment.view"
    >
      <Head title="Equipment Details" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold">
                Equipment Details
              </CardTitle>
              <CardDescription className="mt-1">
                {/* Add more details as needed */}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href={window.route('equipment.index')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Equipment List
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={window.route('equipment.edit', { equipment: equipment.id })}>
                  Edit
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Name:</strong> {equipment.name}
              </div>
              <div>
                <strong>Model:</strong> {equipment.model}
              </div>
              <div>
                <strong>Serial Number:</strong> {equipment.serial_number}
              </div>
              <div>
                <strong>Door Number:</strong> {equipment.door_number || '—'}
              </div>
              <div>
                <strong>Status:</strong> {equipment.status}
              </div>
              <div>
                <strong>Category:</strong> {equipment.category || '—'}
              </div>
              <div>
                <strong>Daily Rate:</strong> {formatCurrency(equipment.daily_rate)}
              </div>
              {/* Add more fields as needed */}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}


