import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Edit, ArrowLeft, Building2, Phone, Mail, Map, Users, Truck } from 'lucide-react';
import { usePermission } from '@/hooks/usePermission';
import { Location } from '@/types/models';
import MapView from '@/components/maps/MapView';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Locations',
        href: '/locations',
    },
    {
        title: 'Location Details',
        href: '#',
    },
];

interface Props {
    location: Location;
    equipmentCount: number;
    employeeCount: number;
}

export default function Show({ location, equipmentCount, employeeCount }: Props) {
    const { hasPermission } = usePermission();
    const canEditLocation = hasPermission('locations.edit');

    return (
        <AdminLayout title="Location Details" breadcrumbs={breadcrumbs}>
            <Head title="Location Details" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Building2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-bold">{location.name}</CardTitle>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{location.city}, {location.state}</span>
                                    <Badge
                                        variant={location.is_active ? "default" : "secondary"}
                                        className={location.is_active ? "bg-green-500 hover:bg-green-600" : ""}
                                        {location.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {canEditLocation && (
                                <Button asChild>
                                    <Link href={route('locations.edit', location.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Location
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Location Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Location Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Map className="h-4 w-4" />
                                            <span className="font-medium">Address</span>
                                        </div>
                                        <p>{location.address}</p>
                                        <p>{location.city}, {location.state} {location.postal_code}</p>
                                        <p>{location.country}</p>
                                    </div>

                                    {location.contact_person && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Users className="h-4 w-4" />
                                                <span className="font-medium">Contact Person</span>
                                            </div>
                                            <p>{location.contact_person}</p>
                                        </div>
                                    )}

                                    {location.contact_phone && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Phone className="h-4 w-4" />
                                                <span className="font-medium">Contact Phone</span>
                                            </div>
                                            <p>{location.contact_phone}</p>
                                        </div>
                                    )}

                                    {location.contact_email && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Mail className="h-4 w-4" />
                                                <span className="font-medium">Contact Email</span>
                                            </div>
                                            <p>{location.contact_email}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Equipment Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Equipment Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <Truck className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{equipmentCount}</p>
                                            <p className="text-sm text-muted-foreground">Total Equipment</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Staff Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Staff Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                            <Users className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold">{employeeCount}</p>
                                            <p className="text-sm text-muted-foreground">Total Staff</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Map View */}
                        <div className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Location Map</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[400px] rounded-lg overflow-hidden">
                                        <MapView location={location} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Activity</TableHead>
                                                <TableHead>User</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>No recent activity</TableCell>
                                                <TableCell>-</TableCell>
                                                <TableCell>-</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}

