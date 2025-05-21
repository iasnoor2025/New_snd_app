import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface ReportData {
    report_name: string;
    data_source: string;
    columns: string[];
    filters: any[];
    group_by: string;
    aggregations: any[];
    sort_by: string;
    sort_direction: string;
    visualization_type: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface ScheduleReportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    reportData: ReportData;
    frequencies: Record<string, string>
    daysOfWeek: Record<number, string>
    daysOfMonth: Record<number, string>
    times: Record<string, string>
    formats: Record<string, string>
    recipients: User[];
}

const ScheduleReportModal: React.FC<ScheduleReportModalProps> = ({
    open,
    onOpenChange,
    reportData,
    frequencies,
    daysOfWeek,
    daysOfMonth,
    times,
    formats,
    recipients
}) => {
    const { toast } = useToast();
    const [name, setName] = useState<string>('');
    const [frequency, setFrequency] = useState<string>('');
    const [dayOfWeek, setDayOfWeek] = useState<string>('');
    const [dayOfMonth, setDayOfMonth] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [format, setFormat] = useState<string>('pdf');
    const [selectedRecipients, setSelectedRecipients] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (open && reportData) {
            setName(`${reportData.report_name} Schedule`);
        }
    }, [open, reportData]);

    const handleRecipientToggle = (recipientId: number, checked: boolean) => {
        if (checked) {
            setSelectedRecipients(prev => [...prev, recipientId]);
        } else {
            setSelectedRecipients(prev => prev.filter(id => id !== recipientId));
        }
    };

    const handleSubmit = async () => {
        if (!name || !frequency || !time || !format || selectedRecipients.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please fill in all required fields'
            })
            return;
        }

        if (frequency === 'weekly' && !dayOfWeek) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a day of the week'
            })
            return;
        }

        if (frequency === 'monthly' && !dayOfMonth) {
            toast({
                variant: 'destructive',
                title: 'Missing Information',
                description: 'Please select a day of the month'
            })
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(route('reports.schedule.store'), {
                name,
                frequency,
                day_of_week: frequency === 'weekly' ? dayOfWeek : null,
                day_of_month: frequency === 'monthly' ? dayOfMonth : null,
                time,
                format,
                recipients: selectedRecipients,
                report_parameters: {
                    data_source: reportData.data_source,
                    columns: reportData.columns,
                    filters: reportData.filters,
                    group_by: reportData.group_by,
                    aggregations: reportData.aggregations,
                    sort_by: reportData.sort_by,
                    sort_direction: reportData.sort_direction,
                    visualization_type: reportData.visualization_type,
                    report_name: reportData.report_name
                }
            })

            toast({
                title: 'Report Scheduled',
                description: 'Your report has been scheduled successfully'
            })

            setName('');
            setFrequency('');
            setDayOfWeek('');
            setDayOfMonth('');
            setTime('');
            setFormat('pdf');
            setSelectedRecipients([]);
            onOpenChange(false);
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || 'Failed to schedule report'
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <DialogTitle>Schedule Report</DialogTitle>
                    </div>
                    <DialogDescription>
                        Set up automated generation and delivery of this report
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="schedule-name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="schedule-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="Schedule name"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="frequency" className="text-right">
                            Frequency
                        </Label>
                        <Select
                            value={frequency}
                            onValueChange={setFrequency}
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(frequencies).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {frequency === 'weekly' && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="day-of-week" className="text-right">
                                Day of Week
                            </Label>
                            <Select
                                value={dayOfWeek}
                                onValueChange={setDayOfWeek}
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(daysOfWeek).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {frequency === 'monthly' && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="day-of-month" className="text-right">
                                Day of Month
                            </Label>
                            <Select
                                value={dayOfMonth}
                                onValueChange={setDayOfMonth}
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(daysOfMonth).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                            Time
                        </Label>
                        <Select
                            value={time}
                            onValueChange={setTime}
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(times).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="format" className="text-right">
                            Format
                        </Label>
                        <Select
                            value={format}
                            onValueChange={setFormat}
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(formats).map(([key, label]) => (
                                    <SelectItem key={key} value={key}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <Label className="text-right pt-2">
                            Recipients
                        </Label>
                        <div className="col-span-3 flex flex-col space-y-2 max-h-[150px] overflow-y-auto">
                            {recipients.map(recipient => (
                                <div key={recipient.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`recipient-${recipient.id}`}
                                        checked={selectedRecipients.includes(recipient.id)}
                                        onCheckedChange={(checked) =>
                                            handleRecipientToggle(recipient.id, checked === true)
                                        }
                                    />
                                    <Label htmlFor={`recipient-${recipient.id}`} className="text-sm">
                                        {recipient.name} ({recipient.email})
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        {isLoading ? 'Scheduling...' : 'Schedule Report'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleReportModal;
