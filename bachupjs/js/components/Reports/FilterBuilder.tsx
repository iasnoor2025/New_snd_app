import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Plus,
    Filter,
    X
} from 'lucide-react';

interface FilterCondition {
    column: string;
    operator: string;
    value: string;
}

interface FilterBuilderProps {
    columns: string[];
    operators: Record<string, string>
    filters: FilterCondition[];
    onChange: (filters: FilterCondition[]) => void;
}

const FilterBuilder: React.FC<FilterBuilderProps> = ({
    columns,
    operators,
    filters,
    onChange
}) => {
    const [newFilter, setNewFilter] = useState<FilterCondition>({
        column: '',
        operator: '',
        value: ''
    })

    const addFilter = () => {
        if (newFilter.column && newFilter.operator && newFilter.value) {
            onChange([...filters, { ...newFilter }]);
            setNewFilter({ column: '', operator: '', value: '' })
        }
    };

    const removeFilter = (index: number) => {
        const updatedFilters = [...filters];
        updatedFilters.splice(index, 1);
        onChange(updatedFilters);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <CardTitle>Filters</CardTitle>
                </div>
                <CardDescription>
                    Add conditions to filter your report data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* New filter form */}
                    <div className="flex flex-wrap items-end gap-2">
                        <div className="flex-grow min-w-[150px]">
                            <Select
                                value={newFilter.column}
                                onValueChange={(value) => setNewFilter({...newFilter, column: value})}
                                <SelectTrigger>
                                    <SelectValue placeholder="Select column" />
                                </SelectTrigger>
                                <SelectContent>
                                    {columns.map(column => (
                                        <SelectItem key={column} value={column}>
                                            {column}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-[180px]">
                            <Select
                                value={newFilter.operator}
                                onValueChange={(value) => setNewFilter({...newFilter, operator: value})}
                                <SelectTrigger>
                                    <SelectValue placeholder="Operator" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(operators).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-grow min-w-[150px]">
                            <Input
                                type="text"
                                placeholder="Value"
                                value={newFilter.value}
                                onChange={(e) => setNewFilter({...newFilter, value: e.target.value})}
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={addFilter}
                            disabled={!newFilter.column || !newFilter.operator || !newFilter.value}
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Applied filters */}
                    {filters.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Applied Filters</h4>
                            <div className="space-y-2">
                                {filters.map((filter, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-muted p-2 rounded-md"
                                        <span className="text-sm">
                                            {filter.column} {operators[filter.operator]} {filter.value}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeFilter(index)}
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default FilterBuilder;
