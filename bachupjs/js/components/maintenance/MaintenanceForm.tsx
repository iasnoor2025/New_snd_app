import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const maintenanceFormSchema = z.object({
    maintenance_type: z.string().min(1, 'Maintenance type is required'),
    frequency: z.string().min(1, 'Frequency is required'),
    interval: z.string().min(1, 'Interval is required'),
    description: z.string().optional(),
    checklist: z.string().optional(),
})

type MaintenanceFormValues = z.infer<typeof maintenanceFormSchema>

interface MaintenanceFormProps {
    equipmentId: number;
    onSuccess?: () => void;
}

export function MaintenanceForm({ equipmentId, onSuccess }: MaintenanceFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<MaintenanceFormValues>({
        resolver: zodResolver(maintenanceFormSchema),
        defaultValues: {
            maintenance_type: '',
            frequency: '',
            interval: '',
            description: '',
            checklist: '',
        },
    })

    const onSubmit = async (data: MaintenanceFormValues) => {
        try {
            setIsSubmitting(true);
            const response = await fetch(`/api/equipment/${equipmentId}/maintenance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    interval: parseInt(data.interval),
                    checklist: data.checklist ? JSON.parse(data.checklist) : null,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to schedule maintenance');
            }

            toast({
                title: "Maintenance Scheduled",
                description: "Maintenance has been scheduled successfully",
                variant: "success",
            })

            form.reset();
            onSuccess?.();
        } catch (error) {
            toast({
                title: "Scheduling Failed",
                description: error instanceof Error ? error.message : 'Failed to schedule maintenance',
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="maintenance_type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maintenance Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select maintenance type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="preventive">Preventive</SelectItem>
                                            <SelectItem value="corrective">Corrective</SelectItem>
                                            <SelectItem value="inspection">Inspection</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select frequency" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="interval"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Interval</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="1"
                                            placeholder="Enter interval"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter maintenance description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="checklist"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Checklist (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter checklist items as JSON array"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                            {isSubmitting ? 'Scheduling...' : 'Schedule Maintenance'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
