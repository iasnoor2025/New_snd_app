import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceFiltersProps {
    type: 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';
    filters: {
        search?: string;
        status?: string;
        startDate?: Date;
        endDate?: Date;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    };
    onFilterChange: (filters: any) => void;
    onReset: () => void;
}

export default function ResourceFilters({
    type,
    filters,
    onFilterChange,
    onReset
}: ResourceFiltersProps) {
    const handleDateChange = (date: Date | undefined, field: 'startDate' | 'endDate') => {
        onFilterChange({ ...filters, [field]: date })
    };

    const handleSortChange = (value: string) => {
        const [sortBy, sortOrder] = value.split('-');
        onFilterChange({ ...filters, sortBy, sortOrder })
    };

    const getSortOptions = () => {
        const commonOptions = [;
            { value: 'created_at-desc', label: 'Newest First' },
            { value: 'created_at-asc', label: 'Oldest First' },
        ];

        switch (type) {
            case 'manpower':
                return [
                    ...commonOptions,
                    { value: 'hours-desc', label: 'Most Hours' },
                    { value: 'hours-asc', label: 'Least Hours' },
                    { value: 'cost-desc', label: 'Highest Cost' },
                    { value: 'cost-asc', label: 'Lowest Cost' },
                ];
            case 'equipment':
                return [
                    ...commonOptions,
                    { value: 'hours-desc', label: 'Most Hours' },
                    { value: 'hours-asc', label: 'Least Hours' },
                    { value: 'cost-desc', label: 'Highest Cost' },
                    { value: 'cost-asc', label: 'Lowest Cost' },
                ];
            case 'material':
                return [
                    ...commonOptions,
                    { value: 'quantity-desc', label: 'Highest Quantity' },
                    { value: 'quantity-asc', label: 'Lowest Quantity' },
                    { value: 'cost-desc', label: 'Highest Cost' },
                    { value: 'cost-asc', label: 'Lowest Cost' },
                ];
            case 'fuel':
                return [
                    ...commonOptions,
                    { value: 'quantity-desc', label: 'Highest Quantity' },
                    { value: 'quantity-asc', label: 'Lowest Quantity' },
                    { value: 'cost-desc', label: 'Highest Cost' },
                    { value: 'cost-asc', label: 'Lowest Cost' },
                ];
            case 'expense':
                return [
                    ...commonOptions,
                    { value: 'amount-desc', label: 'Highest Amount' },
                    { value: 'amount-asc', label: 'Lowest Amount' },
                ];
            default:
                return commonOptions;
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg">
            {/* Search Input */}
            <Input
                placeholder="Search resources..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                className="max-w-xs"
            />

            {/* Date Range Filter */}
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !filters.startDate && "text-muted-foreground"
                            )}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filters.startDate ? (
                                format(filters.startDate, "PPP")
                            ) : (
                                <span>Start Date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={filters.startDate}
                            onSelect={(date) => handleDateChange(date, 'startDate')}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <span className="text-muted-foreground">to</span>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !filters.endDate && "text-muted-foreground"
                            )}
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filters.endDate ? (
                                format(filters.endDate, "PPP")
                            ) : (
                                <span>End Date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={filters.endDate}
                            onSelect={(date) => handleDateChange(date, 'endDate')}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Sort Select */}
            <Select
                value={`${filters.sortBy || 'created_at'}-${filters.sortOrder || 'desc'}`}
                onValueChange={handleSortChange}
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    {getSortOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button
                variant="outline"
                onClick={onReset}
                className="ml-auto"
                <X className="h-4 w-4 mr-2" />
                Reset Filters
            </Button>
        </div>
    );
}

