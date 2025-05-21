import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { ResourceType } from '@/types/projectResources';

interface ResourceTableProps<T> {
    resources: T[];
    columns: {
        key: keyof T;
        header: string;
        render?: (value: any, resource: T) => React.ReactNode;
    }[];
    onEdit: (resource: T) => void;
    onDelete: (resource: T) => void;
    type: ResourceType;
}

export function ResourceTable<T extends { id: number }>({
    resources,
    columns,
    onEdit,
    onDelete,
    type,
}: ResourceTableProps<T>) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead key={String(column.key)}>{column.header}</TableHead>
                        ))}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {resources.map((resource) => (
                        <TableRow key={resource.id}>
                            {columns.map((column) => (
                                <TableCell key={String(column.key)}>
                                    {column.render
                                        ? column.render(resource[column.key], resource)
                                        : resource[column.key]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(resource)}
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(resource)}
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
