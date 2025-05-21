import { Head, useForm } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface Props extends PageProps {
    customer: {
        id: number;
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
        tax_id: string;
        credit_limit: string;
        payment_terms: string;
        notes: string;
        is_active: boolean;
        type: string;
        company_name: string;
        contact_person: string;
        contact_phone: string;
        contact_email: string;
        billing_address: string;
        shipping_address: string;
        preferred_payment_method: string;
        credit_rating: string;
    };
}

export default function Edit({ auth, customer }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Customers',
            href: route('customers.index'),
        },
        {
            title: 'Edit Customer',
            href: route('customers.edit', { customer: customer.id }),
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        zip_code: customer.zip_code,
        country: customer.country,
        tax_id: customer.tax_id,
        credit_limit: customer.credit_limit,
        payment_terms: customer.payment_terms,
        notes: customer.notes,
        is_active: customer.is_active,
        type: customer.type,
        company_name: customer.company_name,
        contact_person: customer.contact_person,
        contact_phone: customer.contact_phone,
        contact_email: customer.contact_email,
        billing_address: customer.billing_address,
        shipping_address: customer.shipping_address,
        preferred_payment_method: customer.preferred_payment_method,
        credit_rating: customer.credit_rating,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('customers.update', { customer: customer.id }));
    };

    return (
        <AdminLayout title="Edit Customer" breadcrumbs={breadcrumbs} requiredPermission="customers.edit">
            <Head title="Edit Customer" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="type">Type</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(value) => setData('type', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="individual">Individual</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-500">{errors.type}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) =>
                                            setData('is_active', checked)
                                        }
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Address Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Address Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-red-500">{errors.address}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                        />
                                        {errors.city && (
                                            <p className="text-sm text-red-500">{errors.city}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            value={data.state}
                                            onChange={(e) => setData('state', e.target.value)}
                                        />
                                        {errors.state && (
                                            <p className="text-sm text-red-500">{errors.state}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="zip_code">ZIP Code</Label>
                                        <Input
                                            id="zip_code"
                                            value={data.zip_code}
                                            onChange={(e) => setData('zip_code', e.target.value)}
                                        />
                                        {errors.zip_code && (
                                            <p className="text-sm text-red-500">{errors.zip_code}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                        />
                                        {errors.country && (
                                            <p className="text-sm text-red-500">{errors.country}</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Business Information (Conditional) */}
                        {data.type === 'business' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Business Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="company_name">Company Name</Label>
                                        <Input
                                            id="company_name"
                                            value={data.company_name}
                                            onChange={(e) =>
                                                setData('company_name', e.target.value)
                                            }
                                        />
                                        {errors.company_name && (
                                            <p className="text-sm text-red-500">{errors.company_name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_person">Contact Person</Label>
                                        <Input
                                            id="contact_person"
                                            value={data.contact_person}
                                            onChange={(e) =>
                                                setData('contact_person', e.target.value)
                                            }
                                        />
                                        {errors.contact_person && (
                                            <p className="text-sm text-red-500">{errors.contact_person}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_phone">Contact Phone</Label>
                                        <Input
                                            id="contact_phone"
                                            value={data.contact_phone}
                                            onChange={(e) =>
                                                setData('contact_phone', e.target.value)
                                            }
                                        />
                                        {errors.contact_phone && (
                                            <p className="text-sm text-red-500">{errors.contact_phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="contact_email">Contact Email</Label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) =>
                                                setData('contact_email', e.target.value)
                                            }
                                        />
                                        {errors.contact_email && (
                                            <p className="text-sm text-red-500">{errors.contact_email}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Financial Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Financial Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="tax_id">Tax ID</Label>
                                    <Input
                                        id="tax_id"
                                        value={data.tax_id}
                                        onChange={(e) => setData('tax_id', e.target.value)}
                                    />
                                    {errors.tax_id && (
                                        <p className="text-sm text-red-500">{errors.tax_id}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="credit_limit">Credit Limit</Label>
                                    <Input
                                        id="credit_limit"
                                        type="number"
                                        step="0.01"
                                        value={data.credit_limit}
                                        onChange={(e) =>
                                            setData('credit_limit', e.target.value)
                                        }
                                    />
                                    {errors.credit_limit && (
                                        <p className="text-sm text-red-500">{errors.credit_limit}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="payment_terms">Payment Terms</Label>
                                    <Input
                                        id="payment_terms"
                                        value={data.payment_terms}
                                        onChange={(e) =>
                                            setData('payment_terms', e.target.value)
                                        }
                                    />
                                    {errors.payment_terms && (
                                        <p className="text-sm text-red-500">{errors.payment_terms}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="preferred_payment_method">
                                        Preferred Payment Method
                                    </Label>
                                    <Select
                                        value={data.preferred_payment_method}
                                        onValueChange={(value) =>
                                            setData('preferred_payment_method', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="credit_card">Credit Card</SelectItem>
                                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.preferred_payment_method && (
                                        <p className="text-sm text-red-500">{errors.preferred_payment_method}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                    />
                                    {errors.notes && (
                                        <p className="text-sm text-red-500">{errors.notes}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Update Customer
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
