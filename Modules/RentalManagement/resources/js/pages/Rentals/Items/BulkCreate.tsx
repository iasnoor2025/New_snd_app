import { FC, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/Modules/RentalManagement/Resources/js/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/RentalManagement/Resources/js/Components/ui/card';
import { Input } from '@/Modules/RentalManagement/Resources/js/Components/ui/input';
import { Label } from '@/Modules/RentalManagement/Resources/js/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Modules/RentalManagement/Resources/js/Components/ui/select';
import { Textarea } from '@/Modules/RentalManagement/Resources/js/Components/ui/textarea';
import { Equipment, Employee } from '@/Modules/RentalManagement/Resources/js/types';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
    rental: {
        id: number;
    };
    equipment: Equipment[];
    operators: Employee[];
}

interface RentalItemForm {
    equipment_id: string;
    operator_id: string;
    rate: string;
    rate_type: string;
    days: string;
    discount_percentage: string;
    notes: string;
}

const BulkCreate: FC<Props> = ({ rental, equipment, operators }) => {
    const [items, setItems] = useState<RentalItemForm[]>([
        {
            equipment_id: '',
            operator_id: '',
            rate: '',
            rate_type: 'daily',
            days: '',
            discount_percentage: '0',
            notes: '',
        },
    ]);

    const { post, processing, errors } = useForm({
        items: items,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/rentals/${rental.id}/items/bulk`);
    };

    const addItem = () => {
        setItems([
            ...items,
            {
                equipment_id: '',
                operator_id: '',
                rate: '',
                rate_type: 'daily',
                days: '',
                discount_percentage: '0',
                notes: '',
            },
        ]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof RentalItemForm, value: string) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    return (
        <>
            <Head title="Bulk Add Rental Items" />

            <div className="container mx-auto py-6">
                <div className="max-w-4xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bulk Add Rental Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {items.map((item, index) => (
                                    <div key={index} className="p-4 border rounded-lg space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium">Item {index + 1}</h3>
                                            {items.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`equipment_id_${index}`}>Equipment</Label>
                                            <Select
                                                value={item.equipment_id}
                                                onValueChange={(value) => updateItem(index, 'equipment_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select equipment" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {equipment.map((equip) => (
                                                        <SelectItem key={equip.id} value={equip.id.toString()}>
                                                            {equip.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors[`items.${index}.equipment_id`] && (
                                                <p className="text-sm text-red-500">{errors[`items.${index}.equipment_id`]}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`operator_id_${index}`}>Operator</Label>
                                            <Select
                                                value={item.operator_id}
                                                onValueChange={(value) => updateItem(index, 'operator_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select operator" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {operators.map((operator) => (
                                                        <SelectItem key={operator.id} value={operator.id.toString()}>
                                                            {operator.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors[`items.${index}.operator_id`] && (
                                                <p className="text-sm text-red-500">{errors[`items.${index}.operator_id`]}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`rate_${index}`}>Rate</Label>
                                                <Input
                                                    id={`rate_${index}`}
                                                    type="number"
                                                    step="0.01"
                                                    value={item.rate}
                                                    onChange={(e) => updateItem(index, 'rate', e.target.value)}
                                                />
                                                {errors[`items.${index}.rate`] && (
                                                    <p className="text-sm text-red-500">{errors[`items.${index}.rate`]}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`rate_type_${index}`}>Rate Type</Label>
                                                <Select
                                                    value={item.rate_type}
                                                    onValueChange={(value) => updateItem(index, 'rate_type', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select rate type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="daily">Daily</SelectItem>
                                                        <SelectItem value="hourly">Hourly</SelectItem>
                                                        <SelectItem value="weekly">Weekly</SelectItem>
                                                        <SelectItem value="monthly">Monthly</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors[`items.${index}.rate_type`] && (
                                                    <p className="text-sm text-red-500">{errors[`items.${index}.rate_type`]}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor={`days_${index}`}>Days</Label>
                                                <Input
                                                    id={`days_${index}`}
                                                    type="number"
                                                    value={item.days}
                                                    onChange={(e) => updateItem(index, 'days', e.target.value)}
                                                />
                                                {errors[`items.${index}.days`] && (
                                                    <p className="text-sm text-red-500">{errors[`items.${index}.days`]}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`discount_percentage_${index}`}>Discount (%)</Label>
                                                <Input
                                                    id={`discount_percentage_${index}`}
                                                    type="number"
                                                    step="0.01"
                                                    value={item.discount_percentage}
                                                    onChange={(e) => updateItem(index, 'discount_percentage', e.target.value)}
                                                />
                                                {errors[`items.${index}.discount_percentage`] && (
                                                    <p className="text-sm text-red-500">{errors[`items.${index}.discount_percentage`]}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor={`notes_${index}`}>Notes</Label>
                                            <Textarea
                                                id={`notes_${index}`}
                                                value={item.notes}
                                                onChange={(e) => updateItem(index, 'notes', e.target.value)}
                                            />
                                            {errors[`items.${index}.notes`] && (
                                                <p className="text-sm text-red-500">{errors[`items.${index}.notes`]}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addItem}
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Another Item
                                    </Button>

                                    <div className="space-x-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            Add Items
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default BulkCreate;
