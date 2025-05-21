import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Plus, Search, Filter, Trash2 } from 'lucide-react';
import { usePermission } from '@/hooks/usePermission';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Location } from '@/types/models';
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
} from "@/components/ui/alert-dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Locations',
        href: '/locations',
    },
];

interface Props {
    locations: {
        data: Location[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        status?: string;
    };
}

export default function LocationsIndex({ locations, filters }: Props) {
    const { hasPermission } = usePermission();
    const canCreateLocation = hasPermission('locations.create');
    const canEditLocation = hasPermission('locations.edit');
    const canDeleteLocation = hasPermission('locations.delete');
    const canViewLocation = hasPermission('locations.view');

    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "all");

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        router.get(
            route('locations.index'),
            { search: value, status: statusFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        router.get(
            route('locations.index'),
            { search: searchTerm, status: value === "all" ? undefined : value },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AdminLayout title="Locations Management" breadcrumbs={breadcrumbs}>
            <Head title="Locations" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Locations</CardTitle>
                        <div className="flex items-center space-x-2">
                            {canCreateLocation && (
                                <Button asChild>
                                    <Link href={route('locations.create')}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Location
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search locations..."
                                            value={searchTerm}
                                            onChange={(e) => handleSearch(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-[200px]">
                                    <Select
                                        value={statusFilter}
                                        onValueChange={handleStatusChange}
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Status</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Locations Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>City</TableHead>
                                            <TableHead>Country</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {locations.data.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <MapPin className="h-8 w-8 text-muted-foreground" />
                                                        <p className="text-sm text-muted-foreground">No locations found</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            locations.data.map((location) => (
                                                <TableRow key={location.id}>
                                                    <TableCell className="font-medium">
                                                        <Link
                                                            href={route('locations.show', location.id)}
                                                            className="hover:underline"
                                                            onClick={(e) => {
                                                                if (!location.id || isNaN(Number(location.id))) {
                                                                    e.preventDefault();
                                                                    return;
                                                                }
                                                            }}
                                                            {location.name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{location.address}</TableCell>
                                                    <TableCell>{location.city}</TableCell>
                                                    <TableCell>{location.country}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={location.is_active ? "default" : "secondary"}
                                                            className={location.is_active ? "bg-green-500 hover:bg-green-600" : ""}
                                                            {location.is_active ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            {canViewLocation && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                    <Link href={route('locations.show', location.id)}>
                                                                        View
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                            {canEditLocation && (
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    asChild
                                                                    <Link href={route('locations.edit', location.id)}>
                                                                        Edit
                                                                    </Link>
                                                                </Button>
                                                            )}
                                                            {canDeleteLocation && (
                                                                <AlertDialog>
                                                                    <AlertDialogTrigger asChild>
                                                                        <Button
                                                                            variant="destructive"
                                                                            size="sm"
                                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                                            Delete
                                                                        </Button>
                                                                    </AlertDialogTrigger>
                                                                    <AlertDialogContent>
                                                                        <AlertDialogHeader>
                                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                            <AlertDialogDescription>
                                                                                This action cannot be undone. This will permanently delete the location
                                                                                and remove all associated data.
                                                                            </AlertDialogDescription>
                                                                        </AlertDialogHeader>
                                                                        <AlertDialogFooter>
                                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                            <AlertDialogAction
                                                                                onClick={() => {
                                                                                    router.delete(route('locations.destroy', location.id));
                                                                                }}
                                                                                Delete
                                                                            </AlertDialogAction>
                                                                        </AlertDialogFooter>
                                                                    </AlertDialogContent>
                                                                </AlertDialog>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
