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
import { Database } from 'lucide-react';

interface DataSourceSelectorProps {
    dataSources: Record<string, string>
    value: string;
    onChange: (value: string) => void;
}

const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
    dataSources,
    value,
    onChange
}) => {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <CardTitle>Data Source</CardTitle>
                </div>
                <CardDescription>
                    Select the data source for your report
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Select
                    value={value}
                    onValueChange={onChange}
                    <SelectTrigger>
                        <SelectValue placeholder="Select a data source" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(dataSources).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
};

export default DataSourceSelector;
