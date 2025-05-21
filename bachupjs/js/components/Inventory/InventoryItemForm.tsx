import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/Components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { useToast } from '@/Hooks/use-toast';

const formSchema = z.object({
    sku: z.string().min(1, 'SKU is required'),
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().optional(),
    unit: z.string().min(1, 'Unit is required'),
    unit_cost: z.number().min(0, 'Unit cost must be positive'),
    selling_price: z.number().min(0, 'Selling price must be positive'),
    reorder_point: z.number().min(0, 'Reorder point must be positive'),
    reorder_quantity: z.number().min(1, 'Reorder quantity must be at least 1'),
    current_stock: z.number().min(0, 'Current stock must be positive'),
    minimum_stock: z.number().min(0, 'Minimum stock must be positive'),
    maximum_stock: z.number().min(0, 'Maximum stock must be positive'),
    location: z.string().min(1, 'Location is required'),
    barcode: z.string().optional(),
    specifications: z.record(z.string()).optional(),
    status: z.enum(['active', 'inactive']),
})

type FormValues = z.infer<typeof formSchema>

interface InventoryItemFormProps {
    item?: {
        id: number;
        sku: string;
        name: string;
        category: string;
        description?: string;
        unit: string;
        unit_cost: number;
        selling_price: number;
        reorder_point: number;
        reorder_quantity: number;
        current_stock: number;
        minimum_stock: number;
        maximum_stock: number;
        location: string;
        barcode?: string;
        specifications?: Record<string, string>
        status: 'active' | 'inactive';
    } | null;
    onSuccess: () => void;
}

export const InventoryItemForm: FC<InventoryItemFormProps> = ({ item, onSuccess }) => {
    const { toast } = useToast();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: item || {
            status: 'active',
            current_stock: 0,
            minimum_stock: 0,
            maximum_stock: 0,
            reorder_point: 0,
            reorder_quantity: 1,
            unit_cost: 0,
            selling_price: 0,
        },
    })

    const onSubmit = async (values: FormValues) => {
        try {
            const url = item ? `/api/inventory/items/${item.id}` : '/api/inventory/items';
            const method = item ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error('Failed to save item');
            }

            toast({
                title: 'Success',
                description: `Item ${item ? 'updated' : 'created'} successfully`,
            })

            onSuccess();
        } catch (error) {
            toast({
                title: 'Error',
                description: `Failed to ${item ? 'update' : 'create'} item`,
                variant: 'destructive',
            })
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="sku"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>SKU</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="equipment">Equipment</SelectItem>
                                        <SelectItem value="parts">Parts</SelectItem>
                                        <SelectItem value="supplies">Supplies</SelectItem>
                                        <SelectItem value="tools">Tools</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="piece">Piece</SelectItem>
                                        <SelectItem value="box">Box</SelectItem>
                                        <SelectItem value="set">Set</SelectItem>
                                        <SelectItem value="kg">Kilogram</SelectItem>
                                        <SelectItem value="liter">Liter</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unit_cost"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit Cost</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="selling_price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selling Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseFloat(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="current_stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Stock</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseInt(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reorder_point"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reorder Point</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseInt(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="reorder_quantity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reorder Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(parseInt(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <Button type="submit">
                        {item ? 'Update Item' : 'Create Item'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

</Input>

