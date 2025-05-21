import React from 'react';
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
import {
    ArrowUpDown
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SortingSelectorProps {
    columns: string[];
    sortBy: string;
    sortDirection: 'asc' | 'desc';
    onSortByChange: (value: string) => void;
    onSortDirectionChange: (value: 'asc' | 'desc') => void;
}

const SortingSelector: React.FC<SortingSelectorProps> = ({
    columns,
    sortBy,
    sortDirection,
    onSortByChange,
    onSortDirectionChange
}) => {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <ArrowUpDown className="h-4 w-4" />
                    <CardTitle>Sorting</CardTitle>
                </div>
                <CardDescription>
                    Define how your data should be sorted
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="sort-by">Sort By</Label>
                        <Select
                            value={sortBy}
                            onValueChange={onSortByChange}
                            <SelectTrigger>
                                <SelectValue placeholder="Select a field to sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">None</SelectItem>
                                {columns.map(column => (
                                    <SelectItem key={column} value={column}>
                                        {column}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {sortBy && (
                        <div>
                            <Label>Direction</Label>
                            <RadioGroup
                                value={sortDirection}
                                onValueChange={(value) => onSortDirectionChange(value as 'asc' | 'desc')}
                                className="flex space-x-4 mt-2"
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="asc" id="asc" />
                                    <Label htmlFor="asc">Ascending</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="desc" id="desc" />
                                    <Label htmlFor="desc">Descending</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SortingSelector;
