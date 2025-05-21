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
import { customerSchema, defaultCustomerValues, paymentTermsOptions, CustomerFormData } from '@/schemas/customer.schema';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

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
    title: 'Create Customer',
    href: route('customers.create'),
  },
];

interface Props extends PageProps {}

export default function Create({ auth }: Props) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [optimisticData, setOptimisticData] = useState<CustomerFormData | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<CustomerFormData>({
        ...defaultCustomerValues,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate data before submission
            const validatedData = customerSchema.parse(data);

            // Set optimistic data
            setOptimisticData(validatedData);

            // Submit form
            await post(route('customers.store'), {
                onSuccess: () => {
                    toast.success('Customer created successfully');
                    reset();
                    setOptimisticData(null);
                },
                onError: (errors) => {
                    toast.error('Failed to create customer. Please check the form for errors.');
                    setOptimisticData(null);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            })
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            setIsSubmitting(false);
            setOptimisticData(null);
        }
    };

    return (
        <AdminLayout
            title="Create Customer"
            breadcrumbs={breadcrumbs}
            requiredPermission="customers.create"
            header={undefined}
            user={auth.user}
        >
            <Head title="Create Customer" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Customer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="company_name">Company Name *</Label>
                                    <Input
                                        id="company_name"
                                        value={data.company_name || ''}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        disabled={processing}
                                        className={errors.company_name ? 'border-red-500' : ''}
                                    />
                                    {errors.company_name && (
                                        <p className="text-sm text-red-500">{errors.company_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact_person">Contact Person *</Label>
                                    <Input
                                        id="contact_person"
                                        value={data.contact_person || ''}
                                        onChange={(e) => setData('contact_person', e.target.value)}
                                        disabled={processing}
                                        className={errors.contact_person ? 'border-red-500' : ''}
                                    />
                                    {errors.contact_person && (
                                        <p className="text-sm text-red-500">{errors.contact_person}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email || ''}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone || ''}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        disabled={processing}
                                        className={errors.phone ? 'border-red-500' : ''}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">{errors.phone}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address || ''}
                                        onChange={(e) => setData('address', e.target.value)}
                                        disabled={processing}
                                        className={errors.address ? 'border-red-500' : ''}
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-red-500">{errors.address}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        value={data.city || ''}
                                        onChange={(e) => setData('city', e.target.value)}
                                        disabled={processing}
                                        className={errors.city ? 'border-red-500' : ''}
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-red-500">{errors.city}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        value={data.state || ''}
                                        onChange={(e) => setData('state', e.target.value)}
                                        disabled={processing}
                                        className={errors.state ? 'border-red-500' : ''}
                                    />
                                    {errors.state && (
                                        <p className="text-sm text-red-500">{errors.state}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="postal_code">Postal Code</Label>
                                    <Input
                                        id="postal_code"
                                        value={data.postal_code || ''}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        disabled={processing}
                                        className={errors.postal_code ? 'border-red-500' : ''}
                                    />
                                    {errors.postal_code && (
                                        <p className="text-sm text-red-500">{errors.postal_code}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        value={data.country || ''}
                                        onChange={(e) => setData('country', e.target.value)}
                                        disabled={processing}
                                        className={errors.country ? 'border-red-500' : ''}
                                    />
                                    {errors.country && (
                                        <p className="text-sm text-red-500">{errors.country}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tax_number">Tax Number</Label>
                                    <Input
                                        id="tax_number"
                                        value={data.tax_number || ''}
                                        onChange={(e) => setData('tax_number', e.target.value)}
                                        disabled={processing}
                                        className={errors.tax_number ? 'border-red-500' : ''}
                                    />
                                    {errors.tax_number && (
                                        <p className="text-sm text-red-500">{errors.tax_number}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="credit_limit">Credit Limit</Label>
                                    <Input
                                        id="credit_limit"
                                        type="number"
                                        value={data.credit_limit || ''}
                                        onChange={(e) => setData('credit_limit', e.target.value)}
                                        disabled={processing}
                                        className={errors.credit_limit ? 'border-red-500' : ''}
                                    />
                                    {errors.credit_limit && (
                                        <p className="text-sm text-red-500">{errors.credit_limit}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="payment_terms">Payment Terms</Label>
                                    <Select
                                        value={data.payment_terms?.toString() || ''}
                                        onValueChange={(value) => setData('payment_terms', parseInt(value))}
                                        disabled={processing}
                                    >
                                        <SelectTrigger className={errors.payment_terms ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select payment terms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {paymentTermsOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.payment_terms && (
                                        <p className="text-sm text-red-500">{errors.payment_terms}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes || ''}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        disabled={processing}
                                        className={errors.notes ? 'border-red-500' : ''}
                                    />
                                    {errors.notes && (
                                        <p className="text-sm text-red-500">{errors.notes}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                        disabled={processing}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => reset()}
                                    disabled={processing}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Customer'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
