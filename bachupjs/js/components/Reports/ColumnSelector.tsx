import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Columns } from 'lucide-react';

interface ColumnSelectorProps {
    columns: string[];
    selectedColumns: string[];
    onChange: (columns: string[]) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
    columns,
    selectedColumns,
    onChange
}) => {
    const handleColumnToggle = (column: string, checked: boolean) => {
        if (checked) {
            onChange([...selectedColumns, column]);
        } else {
            onChange(selectedColumns.filter(c => c !== column));
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <Columns className="h-4 w-4" />
                    <CardTitle>Columns</CardTitle>
                </div>
                <CardDescription>
                    Select the columns to include in your report
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {columns.map(column => (
                        <div key={column} className="flex items-center space-x-2">
                            <Checkbox
                                id={`column-${column}`}
                                checked={selectedColumns.includes(column)}
                                onCheckedChange={(checked) =>
                                    handleColumnToggle(column, checked === true)
                                }
                            />
                            <Label
                                htmlFor={`column-${column}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                {column}
                            </Label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ColumnSelector;
