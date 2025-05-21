import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeft, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface Customer {
    id: number;
    company_name: string;
}

interface Location {
    id: number;
    name: string;
    city: string;
    state: string;
}

interface Props {
    customers: Customer[];
    locations: Location[];
}

export default function Create({ customers, locations }: Props) {
    console.log('Received locations:', locations);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        customer_id: '',
        location_id: '',
        start_date: new Date(),
        end_date: null as Date | null,
        status: 'active',
        budget: '',
        notes: '',
    })

    // Deduplicate locations based on name, city, and state
    const uniqueLocations = React.useMemo(() => {
        const seen = new Set();
        return locations.filter(location => {
            const key = `${location.name}-${location.city}-${location.state}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        })
    }, [locations]);

    console.log('Unique locations:', uniqueLocations);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    const statusOptions = [;
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'on_hold', label: 'On Hold' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    return (
            <Head title="Create Project" />

            <AppLayout>
                <div className="container mx-auto py-6 space-y-6">
                    <div className="flex flex-col space-y-2">
                        <Link href={route('projects.index')} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back to Projects
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
                        <p className="text-muted-foreground">Enter the details for your new project</p>
                    </div>

                    <Separator />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Project Details</CardTitle>
                            <CardDescription>Fill in the information below to create a new project</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Project Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter project name"
                                            className="w-full"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="customer_id">Customer</Label>
                                        <Select
                                            value={data.customer_id}
                                            onValueChange={(value) => setData('customer_id', value)}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select customer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {customers.map((customer) => (
                                                    <SelectItem key={customer.id} value={customer.id.toString()}>
                                                        {customer.company_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.customer_id && (
                                            <p className="text-sm text-destructive">{errors.customer_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location_id">Location</Label>
                                        <Select
                                            value={data.location_id}
                                            onValueChange={(value) => setData('location_id', value)}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select location" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {uniqueLocations.map((location) => (
                                                    <SelectItem
                                                        key={location.id}
                                                        value={location.id.toString()}
                                                        {`${location.name} - ${location.city}, ${location.state}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.location_id && (
                                            <p className="text-sm text-destructive">{errors.location_id}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="start_date"
                                                    variant="outline"
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !data.start_date && 'text-muted-foreground'
                                                    )}
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.start_date ? (
                                                        format(data.start_date, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.start_date || undefined}
                                                    onSelect={(date) => setData('start_date', date || new Date())}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.start_date && (
                                            <p className="text-sm text-destructive">{errors.start_date}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">End Date (Optional)</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="end_date"
                                                    variant="outline"
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !data.end_date && 'text-muted-foreground'
                                                    )}
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {data.end_date ? (
                                                        format(data.end_date, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.end_date || undefined}
                                                    onSelect={(date) => setData('end_date', date || null)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        {errors.end_date && (
                                            <p className="text-sm text-destructive">{errors.end_date}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => setData('status', value)}
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statusOptions.map((status) => (
                                                    <SelectItem key={status.value} value={status.value}>
                                                        {status.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-destructive">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="budget">Budget</Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                            placeholder="Enter project budget"
                                            className="w-full"
                                            required
                                        />
                                        {errors.budget && (
                                            <p className="text-sm text-destructive">{errors.budget}</p>
                                        )}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Enter project description"
                                            rows={4}
                                            className="resize-none"
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-destructive">{errors.description}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Enter any additional notes"
                                            rows={3}
                                            className="resize-none"
                                        />
                                        {errors.notes && (
                                            <p className="text-sm text-destructive">{errors.notes}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center"
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create Project
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </>
    );
}

