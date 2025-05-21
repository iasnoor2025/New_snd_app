import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    BarChart, LineChart, PieChart, Table
} from 'lucide-react';

interface VisualizationSelectorProps {
    visualizationTypes: string[];
    value: string;
    onChange: (value: string) => void;
}

const VisualizationSelector: React.FC<VisualizationSelectorProps> = ({
    visualizationTypes,
    value,
    onChange
}) => {
    const getIcon = (type: string) => {
        switch (type) {
            case 'bar':
                return <BarChart className="h-4 w-4" />
            case 'line':
                return <LineChart className="h-4 w-4" />
            case 'pie':
                return <PieChart className="h-4 w-4" />
            case 'table':
            default:
                return <Table className="h-4 w-4" />
        }
    };

    const getLabel = (type: string) => {
        switch (type) {
            case 'bar':
                return 'Bar Chart';
            case 'line':
                return 'Line Chart';
            case 'pie':
                return 'Pie Chart';
            case 'table':
                return 'Table';
            default:
                return type.charAt(0).toUpperCase() + type.slice(1);
        }
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                    <BarChart className="h-4 w-4" />
                    <CardTitle>Visualization</CardTitle>
                </div>
                <CardDescription>
                    Choose how to visualize your data
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    value={value}
                    onValueChange={onChange}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    {visualizationTypes.map(type => (
                        <div key={type} className="flex flex-col items-center space-y-2">
                            <div className="flex items-center justify-center h-20 w-full border rounded-md bg-muted p-2">
                                {getIcon(type)}
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={type} id={`visual-${type}`} />
                                <Label htmlFor={`visual-${type}`}>{getLabel(type)}</Label>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default VisualizationSelector;


