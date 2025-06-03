import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/RentalManagement/Resources/js/Components/ui/card';
import { Button } from '@/Modules/RentalManagement/Resources/js/Components/ui/button';
import { Input } from '@/Modules/RentalManagement/Resources/js/Components/ui/input';
import { Select } from '@/Modules/RentalManagement/Resources/js/Components/ui/select';
import { Textarea } from '@/Modules/RentalManagement/Resources/js/Components/ui/textarea';
import { Label } from '@/Modules/RentalManagement/Resources/js/Components/ui/label';
import { Alert, AlertDescription } from '@/Modules/RentalManagement/Resources/js/Components/ui/alert';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface ItemTemplate {
    name: string;
    description: string;
    category: string;
    daily_rate: string;
    condition: string;
    serial_number: string;
    notes: string;
}

export const BulkCreate: FC = () => {
    const [items, setItems] = useState<ItemTemplate[]>([
        {
            name: '',
            description: '',
            category: '',
            daily_rate: '',
            condition: 'new',
            serial_number: '',
            notes: ''
        }
    ]);

    const { post, processing, errors } = useForm({
        items: items
    });

    const addItem = () => {
  const { t } = useTranslation('rental');

        setItems([
            ...items,
            {
                name: '',
                description: '',
                category: '',
                daily_rate: '',
                condition: 'new',
                serial_number: '',
                notes: ''
            }
        ]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof ItemTemplate, value: string) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value
        };
        setItems(newItems);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('rentals.items.bulk-store'));
    };

    return (
        <>
            <Head title={t('ttl_bulk_add_rental_items')} />

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
                        <div className="flex items-center justify-between">
                            <CardTitle>{t('ttl_bulk_add_rental_items')}</CardTitle>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={addItem}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Another Item
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {items.map((item, index) => (
                                <Card key={index} className="relative">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Item {index + 1}</CardTitle>
                                            {items.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor={`name-${index}`}>Name</Label>
                                                <Input
                                                    id={`name-${index}`}
                                                    value={item.name}
                                                    onChange={e => updateItem(index, 'name', e.target.value)}
                                                    required
                                                />
                                                {errors[`items.${index}.name`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.name`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`category-${index}`}>Category</Label>
                                                <Select
                                                    id={`category-${index}`}
                                                    value={item.category}
                                                    onChange={e => updateItem(index, 'category', e.target.value)}
                                                    required
                                                >
                                                    <option value="">{t('select_category')}</option>
                                                    <option value="equipment">Equipment</option>
                                                    <option value="tools">Tools</option>
                                                    <option value="vehicles">Vehicles</option>
                                                </Select>
                                                {errors[`items.${index}.category`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.category`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`daily_rate-${index}`}>Daily Rate ($)</Label>
                                                <Input
                                                    id={`daily_rate-${index}`}
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={item.daily_rate}
                                                    onChange={e => updateItem(index, 'daily_rate', e.target.value)}
                                                    required
                                                />
                                                {errors[`items.${index}.daily_rate`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.daily_rate`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`condition-${index}`}>Condition</Label>
                                                <Select
                                                    id={`condition-${index}`}
                                                    value={item.condition}
                                                    onChange={e => updateItem(index, 'condition', e.target.value)}
                                                    required
                                                >
                                                    <option value="new">New</option>
                                                    <option value="like_new">{t('like_new')}</option>
                                                    <option value="good">Good</option>
                                                    <option value="fair">Fair</option>
                                                    <option value="poor">Poor</option>
                                                </Select>
                                                {errors[`items.${index}.condition`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.condition`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`serial_number-${index}`}>{t('lbl_serial_number')}</Label>
                                                <Input
                                                    id={`serial_number-${index}`}
                                                    value={item.serial_number}
                                                    onChange={e => updateItem(index, 'serial_number', e.target.value)}
                                                />
                                                {errors[`items.${index}.serial_number`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.serial_number`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor={`description-${index}`}>Description</Label>
                                                <Textarea
                                                    id={`description-${index}`}
                                                    value={item.description}
                                                    onChange={e => updateItem(index, 'description', e.target.value)}
                                                    required
                                                />
                                                {errors[`items.${index}.description`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.description`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor={`notes-${index}`}>Notes</Label>
                                                <Textarea
                                                    id={`notes-${index}`}
                                                    value={item.notes}
                                                    onChange={e => updateItem(index, 'notes', e.target.value)}
                                                />
                                                {errors[`items.${index}.notes`] && (
                                                    <Alert variant="destructive">
                                                        <AlertDescription>{errors[`items.${index}.notes`]}</AlertDescription>
                                                    </Alert>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

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
                                    Create Items
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default BulkCreate;
