import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

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
        title: 'Create Location',
        href: '/locations/create',
    },
];

export default function Create() {
    const { toast } = useToast();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'Saudi Arabia',
        contact_person: '',
        contact_phone: '',
        contact_email: '',
        notes: '',
        is_active: true,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('locations.store'), {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Location created successfully',
                })
            },
            onError: (errors) => {
                toast({
                    title: 'Error',
                    description: 'Failed to create location',
                    variant: 'destructive',
                })
            },
        })
    };

    return (
        <AdminLayout title="Create Location" breadcrumbs={breadcrumbs}>
            <Head title="Create Location" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Create Location</CardTitle>
                        <Button variant="outline" asChild>
                            <Link href={route('locations.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Locations
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Basic Information</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Location Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address *</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            required
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-500">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City *</Label>
                                            <Input
                                                id="city"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                required
                                            />
                                            {errors.city && (
                                                <p className="text-sm text-red-500">{errors.city}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="state">State *</Label>
                                            <Input
                                                id="state"
                                                value={data.state}
                                                onChange={(e) => setData('state', e.target.value)}
                                                required
                                            />
                                            {errors.state && (
                                                <p className="text-sm text-red-500">{errors.state}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="postal_code">Postal Code *</Label>
                                            <Input
                                                id="postal_code"
                                                value={data.postal_code}
                                                onChange={(e) => setData('postal_code', e.target.value)}
                                                required
                                            />
                                            {errors.postal_code && (
                                                <p className="text-sm text-red-500">{errors.postal_code}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country *</Label>
                                            <Input
                                                id="country"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                required
                                            />
                                            {errors.country && (
                                                <p className="text-sm text-red-500">{errors.country}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Contact Information</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact_person">Contact Person</Label>
                                        <Input
                                            id="contact_person"
                                            value={data.contact_person}
                                            onChange={(e) => setData('contact_person', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact_phone">Contact Phone</Label>
                                        <Input
                                            id="contact_phone"
                                            value={data.contact_phone}
                                            onChange={(e) => setData('contact_phone', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="contact_email">Contact Email</Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Input
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Active Location</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    asChild
                                    <Link href={route('locations.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Create Location
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
