import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
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
import { toast } from 'sonner';
import RiskManagement from './Risk/Management';
import { t } from '../../../../../../resources/js/lib/i18n';

interface Equipment {
  id: number;
  name: string;
  model: string;
  serial_number: string;
  door_number: string;
  status: string;
  category: any;
  unit: string;
  location: any;
  is_active: boolean;
  description?: string;
  notes?: string;
  daily_rate?: number;
  weekly_rate?: number;
  monthly_rate?: number;
  default_unit_cost?: number;
  purchase_cost?: number;
  purchase_date?: string;
  lifetime_maintenance_cost?: number;
  avg_operating_cost_per_hour?: number;
  avg_operating_cost_per_mile?: number;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  next_performance_review?: string;
  efficiency_rating?: number;
  current_operating_hours?: number;
  current_mileage?: number;
  current_cycle_count?: number;
  initial_operating_hours?: number;
  initial_mileage?: number;
  initial_cycle_count?: number;
  avg_daily_usage_hours?: number;
  avg_daily_usage_miles?: number;
  last_metric_update?: string;
}

interface MaintenanceRecord {
  id: number;
  equipment_id: number;
  type: string;
  description: string;
  cost: number;
  date: string;
  technician: string;
  status: string;
}

interface RentalItem {
  id: number;
  equipment_id: number;
  customer_name?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  rental_rate?: number;
  total_cost?: number;
}

interface ProjectEquipment {
  id: number;
  equipment_id: number;
  project_name?: string;
  assigned_date?: string;
  return_date?: string;
  status?: string;
  usage_hours?: number;
}

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
  const { auth } = usePage<any>().props;
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
                {t('equipment_details')}
              </CardTitle>
              <CardDescription className="mt-1">
                {/* Add more details as needed */}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href={window.route('equipment.index')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('back_to_equipment_list')}
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
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="risk">Risk Management</TabsTrigger>
                <TabsTrigger value="projects">Projects/Rentals</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('equipment_name')}</Label>
                    <p className="text-sm">{equipment.name || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('model')}</Label>
                    <p className="text-sm">{equipment.model || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('serial_number')}</Label>
                    <p className="text-sm">{equipment.serial_number || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('door_number')}</Label>
                    <p className="text-sm">{equipment.door_number || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('status')}</Label>
                    <div>{getStatusBadge(equipment.status)}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('category')}</Label>
                    <p className="text-sm">{equipment.category?.name || equipment.category || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('unit')}</Label>
                    <p className="text-sm">{equipment.unit || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('location')}</Label>
                    <p className="text-sm">{equipment.location?.name || equipment.location || '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('active_status')}</Label>
                    <Badge variant={equipment.is_active ? 'default' : 'secondary'}>
                      {equipment.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                {equipment.description && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('description')}</Label>
                    <p className="text-sm">{equipment.description}</p>
                  </div>
                )}
                {equipment.notes && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('notes')}</Label>
                    <p className="text-sm">{equipment.notes}</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('daily_rate')}</Label>
                    <p className="text-sm font-semibold">{formatCurrency(equipment.daily_rate || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('weekly_rate')}</Label>
                    <p className="text-sm font-semibold">{formatCurrency(equipment.weekly_rate || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('monthly_rate')}</Label>
                    <p className="text-sm font-semibold">{formatCurrency(equipment.monthly_rate || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('default_unit_cost')}</Label>
                    <p className="text-sm">{formatCurrency(equipment.default_unit_cost || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('purchase_cost')}</Label>
                    <p className="text-sm">{formatCurrency(equipment.purchase_cost || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('purchase_date')}</Label>
                    <p className="text-sm">{equipment.purchase_date ? new Date(equipment.purchase_date).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('lifetime_maintenance_cost')}</Label>
                    <p className="text-sm">{formatCurrency(equipment.lifetime_maintenance_cost || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('avg_cost_per_hour')}</Label>
                    <p className="text-sm">{formatCurrency(equipment.avg_operating_cost_per_hour || 0)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('avg_cost_per_mile')}</Label>
                    <p className="text-sm">{formatCurrency(equipment.avg_operating_cost_per_mile || 0)}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('last_maintenance')}</Label>
                    <p className="text-sm">{equipment.last_maintenance_date ? new Date(equipment.last_maintenance_date).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('next_maintenance')}</Label>
                    <p className="text-sm">{equipment.next_maintenance_date ? new Date(equipment.next_maintenance_date).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('next_performance_review')}</Label>
                    <p className="text-sm">{equipment.next_performance_review ? new Date(equipment.next_performance_review).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('efficiency_rating')}</Label>
                    <p className="text-sm">{equipment.efficiency_rating ? `${equipment.efficiency_rating}%` : '—'}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('current_operating_hours')}</Label>
                    <p className="text-sm">{equipment.current_operating_hours || '0'} hrs</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('current_mileage')}</Label>
                    <p className="text-sm">{equipment.current_mileage || '0'} miles</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('current_cycle_count')}</Label>
                    <p className="text-sm">{equipment.current_cycle_count || '0'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('initial_operating_hours')}</Label>
                    <p className="text-sm">{equipment.initial_operating_hours || '0'} hrs</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('initial_mileage')}</Label>
                    <p className="text-sm">{equipment.initial_mileage || '0'} miles</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('initial_cycle_count')}</Label>
                    <p className="text-sm">{equipment.initial_cycle_count || '0'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('avg_daily_usage_hours')}</Label>
                    <p className="text-sm">{equipment.avg_daily_usage_hours || '0'} hrs/day</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('avg_daily_usage_miles')}</Label>
                    <p className="text-sm">{equipment.avg_daily_usage_miles || '0'} miles/day</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{t('last_metric_update')}</Label>
                    <p className="text-sm">{equipment.last_metric_update ? new Date(equipment.last_metric_update).toLocaleDateString() : '—'}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="risk" className="space-y-4">
                <RiskManagement equipmentId={equipment.id} />
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <div className="grid gap-6">
                  {/* Current Projects/Rentals */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        {t('current_projects_rentals')}
                      </CardTitle>
                      <CardDescription>
                        {t('equipment_currently_assigned_projects_rentals')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {rentalItems.data.length > 0 || projectHistory.data.length > 0 ? (
                        <div className="space-y-4">
                          {/* Rental Items */}
                          {rentalItems.data.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 text-sm text-muted-foreground">{t('active_rentals')}</h4>
                              <div className="space-y-2">
                                {rentalItems.data.map((rental) => (
                                  <div key={rental.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <Truck className="h-4 w-4 text-blue-500" />
                                      <div>
                                        <p className="font-medium text-sm">{rental.customer_name || 'Unknown Customer'}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {rental.start_date ? new Date(rental.start_date).toLocaleDateString() : 'No start date'} -
                                          {rental.end_date ? new Date(rental.end_date).toLocaleDateString() : 'Ongoing'}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge variant="outline">
                                      {rental.status || 'Active'}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Project History */}
                          {projectHistory.data.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-3 text-sm text-muted-foreground">{t('project_assignments')}</h4>
                              <div className="space-y-2">
                                {projectHistory.data.map((project) => (
                                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <Settings className="h-4 w-4 text-green-500" />
                                      <div>
                                        <p className="font-medium text-sm">{project.project_name || 'Unknown Project'}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {t('assigned')}: {project.assigned_date ? new Date(project.assigned_date).toLocaleDateString() : 'Unknown'}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge variant="secondary">
                                      {project.status || 'Active'}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>{t('no_current_projects_rentals_assigned')}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Usage History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        {t('usage_history')}
                      </CardTitle>
                      <CardDescription>
                        {t('historical_usage_across_projects_rentals')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{rentalItems.total}</div>
                            <div className="text-sm text-muted-foreground">{t('total_rentals')}</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{projectHistory.total}</div>
                            <div className="text-sm text-muted-foreground">{t('total_projects')}</div>
                          </div>
                          <div className="text-center p-4 border rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{equipment.current_operating_hours || 0}</div>
                            <div className="text-sm text-muted-foreground">{t('operating_hours')}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="grid gap-6">
                  {/* Document Upload Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {t('equipment_documents')}
                      </CardTitle>
                      <CardDescription>
                        {t('rc_registration_certificate_insurance_important_documents')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {canManageDocuments && (
                        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">{t('upload_equipment_documents')}</p>
                            <div className="flex gap-2 justify-center">
                              <Button size="sm" variant="outline">
                                <Plus className="h-4 w-4 mr-1" />
                                {t('upload_rc')}
                              </Button>
                              <Button size="sm" variant="outline">
                                <Plus className="h-4 w-4 mr-1" />
                                {t('upload_insurance')}
                              </Button>
                              <Button size="sm" variant="outline">
                                <Plus className="h-4 w-4 mr-1" />
                                {t('upload_other')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Documents List */}
                      <div className="space-y-4">
                        {mediaItems.length > 0 ? (
                          <div className="grid gap-3">
                            {mediaItems.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-blue-100 rounded">
                                    {item.collection === 'istimara' ? (
                                      <IdCard className="h-4 w-4 text-blue-600" />
                                    ) : (
                                      <FileIcon className="h-4 w-4 text-blue-600" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{item.file_name}</p>
                                    <p className="text-xs text-muted-foreground capitalize">
                                      {item.collection === 'istimara' ? 'Registration Certificate (RC)' : 'Document'}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      setPreviewDocument(item);
                                      setShowPreviewDialog(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => window.open(item.original_url, '_blank')}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  {canManageDocuments && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>{t('no_documents_uploaded_yet')}</p>
                            <p className="text-sm">{t('upload_rc_insurance_important_documents')}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Document Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        {t('document_categories')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                          <IdCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="font-medium text-sm">{t('registration_certificate')}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {mediaItems.filter(item => item.collection === 'istimara').length} files
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <Award className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="font-medium text-sm">{t('insurance_documents')}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {mediaItems.filter(item => item.collection === 'insurance').length} files
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="font-medium text-sm">{t('maintenance_records')}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {mediaItems.filter(item => item.collection === 'maintenance').length} files
                          </div>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                          <FileIcon className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                          <div className="font-medium text-sm">{t('other_documents')}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {mediaItems.filter(item => !['istimara', 'insurance', 'maintenance'].includes(item.collection)).length} files
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}


