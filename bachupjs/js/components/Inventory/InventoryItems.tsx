import { FC, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { useToast } from '@/Hooks/use-toast';
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/ui/dialog';
import { InventoryItemForm } from './InventoryItemForm';

interface InventoryItem {
    id: number;
    sku: string;
    name: string;
    category: string;
    current_stock: number;
    reorder_point: number;
    unit_cost: number;
    selling_price: number;
    location: string;
    status: 'active' | 'inactive';
}

export const InventoryItems: FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/inventory/items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to fetch inventory items',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredItems = items.filter((item) =>
        Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase());
        );
    );

    const getStockStatus = (item: InventoryItem) => {
        if (item.current_stock <= 0) {
            return { label: 'Out of Stock', variant: 'destructive' as const };
        }
        if (item.current_stock <= item.reorder_point) {
            return { label: 'Low Stock', variant: 'warning' as const };
        }
        return { label: 'In Stock', variant: 'success' as const };
    };

    const handleEdit = (item: InventoryItem) => {
        setSelectedItem(item);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) {
            return;
        }

        try {
            await fetch(`/api/inventory/items/${id}`, {
                method: 'DELETE',
            })
            toast({
                title: 'Success',
                description: 'Item deleted successfully',
            })
            fetchItems();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete item',
                variant: 'destructive',
            })
        }
    };

    if (isLoading) {
        return <InventoryItemsSkeleton />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative w-72">
                    <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusIcon className="w-4 h-4 mr-2" />
                            Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {selectedItem ? 'Edit Item' : 'Add New Item'}
                            </DialogTitle>
                        </DialogHeader>
                        <InventoryItemForm
                            item={selectedItem}
                            onSuccess={() => {
                                setIsFormOpen(false);
                                setSelectedItem(null);
                                fetchItems();
                            }}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Unit Cost</TableHead>
                            <TableHead>Selling Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredItems.map((item) => {
                            const stockStatus = getStockStatus(item);
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {item.current_stock}
                                            <Badge variant={stockStatus.variant}>
                                                {stockStatus.label}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.location}</TableCell>
                                    <TableCell>${item.unit_cost.toFixed(2)}</TableCell>
                                    <TableCell>${item.selling_price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={item.status === 'active' ? 'success' : 'secondary'}
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(item)}
                                                <EditIcon className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(item.id)}
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

const InventoryItemsSkeleton: FC = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="h-10 w-72 bg-muted animate-pulse rounded" />
                <div className="h-10 w-32 bg-muted animate-pulse rounded" />
            </div>

            <div className="rounded-md border">
                <div className="h-12 bg-muted animate-pulse" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse border-t" />
                ))}
            </div>
        </div>
    );
};



</div>
</div>

