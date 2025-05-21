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
import { Label } from '@/components/ui/label';
import {
    BarChart3,
    Plus,
    X
} from 'lucide-react';

interface Aggregation {
    field: string;
    function: string;
    alias?: string;
}

interface AggregationBuilderProps {
    columns: string[];
    functions: Record<string, string>
    aggregations: Aggregation[];
    onChange: (aggregations: Aggregation[]) => void;
}

const AggregationBuilder: React.FC<AggregationBuilderProps> = ({
    columns,
    functions,
    aggregations,
    onChange
}) => {
    const [newAggregation, setNewAggregation] = useState<Aggregation>({
        field: '',
        function: '',
        alias: ''
    })

    const addAggregation = () => {
        if (newAggregation.field && newAggregation.function) {
            onChange([...aggregations, { ...newAggregation }]);
            setNewAggregation({ field: '', function: '', alias: '' })
        }
    };

    const removeAggregation = (index: number) => {
        const updatedAggregations = [...aggregations];
        updatedAggregations.splice(index, 1);
        onChange(updatedAggregations);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <CardTitle>Aggregations</CardTitle>
                </div>
                <CardDescription>
                    Apply aggregation functions to your data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* New aggregation form */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                            <Label htmlFor="function">Function</Label>
                            <Select
                                value={newAggregation.function}
                                onValueChange={(value) => setNewAggregation({...newAggregation, function: value})}
                                <SelectTrigger>
                                    <SelectValue placeholder="Select function" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(functions).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="field">Field</Label>
                            <Select
                                value={newAggregation.field}
                                onValueChange={(value) => setNewAggregation({...newAggregation, field: value})}
                                <SelectTrigger>
                                    <SelectValue placeholder="Select field" />
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

                        <div>
                            <Label htmlFor="alias">Display As (Optional)</Label>
                            <Input
                                id="alias"
                                type="text"
                                placeholder="Custom name"
                                value={newAggregation.alias || ''}
                                onChange={(e) => setNewAggregation({...newAggregation, alias: e.target.value})}
                            />
                        </div>

                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                onClick={addAggregation}
                                disabled={!newAggregation.field || !newAggregation.function}
                                <Plus className="h-4 w-4 mr-2" /> Add
                            </Button>
                        </div>
                    </div>

                    {/* Applied aggregations */}
                    {aggregations.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium">Applied Aggregations</h4>
                            <div className="space-y-2">
                                {aggregations.map((agg, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-muted p-2 rounded-md"
                                        <span className="text-sm">
                                            {functions[agg.function]}({agg.field})
                                            {agg.alias && ` as ${agg.alias}`}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeAggregation(index)}
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

export default AggregationBuilder;
