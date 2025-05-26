import { FC } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/RentalManagement/Resources/js/Components/ui/card';
import { Button } from '@/Modules/RentalManagement/Resources/js/Components/ui/button';
import { Input } from '@/Modules/RentalManagement/Resources/js/Components/ui/input';
import { Select } from '@/Modules/RentalManagement/Resources/js/Components/ui/select';
import { Textarea } from '@/Modules/RentalManagement/Resources/js/Components/ui/textarea';
import { Label } from '@/Modules/RentalManagement/Resources/js/Components/ui/label';
import { Alert, AlertDescription } from '@/Modules/RentalManagement/Resources/js/Components/ui/alert';
import { ArrowLeft } from 'lucide-react';

export const Create: FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        category: '',
        daily_rate: '',
        condition: 'new',
        serial_number: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('rentals.items.store'));
    };

    return (
        <>
            <Head title="Add Rental Item" />

            <div className="container mx-auto py-6">
                <Button
                    variant="ghost"
                    className="mb-4"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Add New Rental Item</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.name}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        id="category"
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        <option value="equipment">Equipment</option>
                                        <option value="tools">Tools</option>
                                        <option value="vehicles">Vehicles</option>
                                    </Select>
                                    {errors.category && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.category}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="daily_rate">Daily Rate ($)</Label>
                                    <Input
                                        id="daily_rate"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.daily_rate}
                                        onChange={e => setData('daily_rate', e.target.value)}
                                        required
                                    />
                                    {errors.daily_rate && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.daily_rate}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="condition">Condition</Label>
                                    <Select
                                        id="condition"
                                        value={data.condition}
                                        onChange={e => setData('condition', e.target.value)}
                                        required
                                    >
                                        <option value="new">New</option>
                                        <option value="like_new">Like New</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="poor">Poor</option>
                                    </Select>
                                    {errors.condition && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.condition}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="serial_number">Serial Number</Label>
                                    <Input
                                        id="serial_number"
                                        value={data.serial_number}
                                        onChange={e => setData('serial_number', e.target.value)}
                                    />
                                    {errors.serial_number && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.serial_number}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        required
                                    />
                                    {errors.description && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.description}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={e => setData('notes', e.target.value)}
                                    />
                                    {errors.notes && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.notes}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    Create Item
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Create;
