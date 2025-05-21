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
    GroupIcon
} from 'lucide-react';

interface GroupBySelectorProps {
    columns: string[];
    value: string;
    onChange: (value: string) => void;
}

const GroupBySelector: React.FC<GroupBySelectorProps> = ({
    columns,
    value,
    onChange
}) => {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <GroupIcon className="h-4 w-4" />
                    <CardTitle>Group By</CardTitle>
                </div>
                <CardDescription>
                    Select a field to group your data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Select
                    value={value}
                    onValueChange={onChange}
                    <SelectTrigger>
                        <SelectValue placeholder="Select a field to group by" />
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
            </CardContent>
        </Card>
    );
};

export default GroupBySelector;
