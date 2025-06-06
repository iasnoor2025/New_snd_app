import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Modules/EquipmentManagement/Resources/js/layouts/AdminLayout';
import { type BreadcrumbItem } from '@/Modules/EquipmentManagement/Resources/js/types';
import { useState, useEffect } from 'react';
import { MaintenanceRecord, Equipment } from '@/Modules/EquipmentManagement/Resources/js/types/models';
import { formatDate, formatCurrency } from '@/Modules/EquipmentManagement/Resources/js/utils/format';
import { 
  ArrowLeft as ArrowLeftIcon, 
  Edit as EditIcon, 
  Trash as TrashIcon 
} from 'lucide-react';
import { Button } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/card';
import { Badge } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/badge';
import { Separator } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/table';
import { useToast } from '@/Modules/EquipmentManagement/Resources/js/Modules/EquipmentManagement/Resources/js/components/ui/use-toast';

interface Props {
    maintenanceRecord: MaintenanceRecord & {
        equipment: Equipment;
        performer?: {
            id: number;
            first_name: string;
            last_name: string;
        };
        maintenanceParts?: any[];
    };
}

export default function Show({ maintenanceRecord }: Props) {
    const { toast } = useToast();
    
    const getStatusBadge = (status: string) => {
        if (!status) return <Badge variant="outline">Unknown</Badge>;
        
        switch (status.toLowerCase()) {
            case 'scheduled':
                return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
            case 'in_progress':
                return <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>;
            case 'completed':
                return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
            case 'cancelled':
                return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this maintenance record?')) {
            router.delete(route('maintenance.destroy', maintenanceRecord.id), {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Maintenance record deleted successfully"
                    });
                    window.location.href = route('maintenance.index');
                },
                onError: () => {
                    toast({
                        title: "Error",
                        description: "Failed to delete maintenance record",
                        variant: "destructive"
                    });
                }
            });
        }
    };

    return (
        <AdminLayout title={`Maintenance Record #${maintenanceRecord.id}`} breadcrumbs={[
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Maintenance', href: '/maintenance' },
            { title: `Record #${maintenanceRecord.id}`, href: `/maintenance/${maintenanceRecord.id}` }
        ]}>
            <Head title="Maintenance Details" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center">
                            <Button variant="outline" size="sm" asChild className="mr-4">
                                <Link href={route('maintenance.index')}>
                                    <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </Button>
                            <CardTitle className="text-2xl font-bold">Maintenance Record Details</CardTitle>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={route('maintenance.edit', maintenanceRecord.id)}>
                                    <EditIcon className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={handleDelete}>
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Equipment</p>
                                <p>{maintenanceRecord.equipment?.name} ({maintenanceRecord.equipment?.serial_number})</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Type</p>
                                <p>{maintenanceRecord.maintenance_type ? maintenanceRecord.maintenance_type.charAt(0).toUpperCase() + maintenanceRecord.maintenance_type.slice(1) : '-'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <p>{getStatusBadge(maintenanceRecord.status)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Maintenance Date</p>
                                <p>{formatDate(maintenanceRecord.maintenance_date)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Technician</p>
                                <p>{maintenanceRecord.performer ? 
                                    `${maintenanceRecord.performer.first_name} ${maintenanceRecord.performer.last_name}` : 
                                    'Not Assigned'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Total Cost</p>
                                <p>{formatCurrency(parseFloat(maintenanceRecord.cost.toString()))}</p>
                            </div>
                            <div className="space-y-1 col-span-3">
                                <p className="text-sm font-medium text-gray-500">Description</p>
                                <p>{maintenanceRecord.description}</p>
                            </div>
                            <div className="space-y-1 col-span-3">
                                <p className="text-sm font-medium text-gray-500">Notes</p>
                                <p>{maintenanceRecord.notes || 'No notes provided'}</p>
                            </div>
                        </div>

                        <Separator className="my-6" />
                        <h3 className="text-lg font-medium mb-4">Parts Used</h3>
                        
                        {maintenanceRecord.maintenanceParts && maintenanceRecord.maintenanceParts.length > 0 ? (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Part Name</TableHead>
                                            <TableHead>Part Number</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Unit Cost</TableHead>
                                            <TableHead>Total Cost</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {maintenanceRecord.maintenanceParts.map((part) => (
                                            <TableRow key={part.id}>
                                                <TableCell>{part.part_name}</TableCell>
                                                <TableCell>{part.part_number || '-'}</TableCell>
                                                <TableCell>{part.quantity}</TableCell>
                                                <TableCell>{formatCurrency(part.unit_cost)}</TableCell>
                                                <TableCell>{formatCurrency(part.total_cost)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <p className="text-gray-500">No parts were used for this maintenance.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
