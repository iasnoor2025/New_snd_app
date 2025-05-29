import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Toggle } from '@/components/ui/toggle';
import ErrorBoundary from '@/components/ErrorBoundary';
import { z } from 'zod';
import { route } from 'ziggy-js';
import { ToastService } from '@/components/shared/ToastManager';
import { DatePicker } from '@/components/ui/date-picker';

interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    full_name?: string;
    hourly_rate?: number;
    position?: string;
}

interface Equipment {
    id: number;
    name: string;
    model: string;
    door_number?: string;
    daily_rate?: number;
}

interface ResourceFormProps {
    type: 'manpower' | 'equipment' | 'material' | 'fuel' | 'expense';
    projectId: number;
    projectEndDate?: string;
    onSuccess?: () => void;
    initialData?: any;
}

interface ResourceFormData {
    project_id: number;
    employee_id?: number | null;
    worker_name?: string | null;
    job_title?: string;
    start_date?: string;
    end_date?: string;
    total_days?: number;
    daily_rate?: number;
    base_daily_rate?: number;
    notes?: string;
    total_cost?: number;
    equipment_id?: number | null;
    hourly_rate?: number;
    usage_hours?: number;
    maintenance_cost?: number;
    name?: string;
    unit?: string;
    date_used?: string;
    quantity?: number;
    unit_price?: number;
    unit_cost?: number;
    type?: string;
    date?: string;
    category?: string;
    description?: string;
    amount?: number;
    material_id?: number | null;
    status?: string;
    [key: string]: any;
}

interface RequestData {
    project_id: number;
    employee_id?: number;
    worker_name?: string;
    job_title: string;
    start_date: string;
    end_date?: string | null;
    daily_rate: number;
    total_days: number;
    total_cost: number;
    notes?: string | null;
    quantity?: number;
    unit_price?: number;
    hourly_rate?: number;
    usage_hours?: number;
    maintenance_cost?: number;
    amount?: number;
    description?: string;
}

const manpowerSchema = z.object({
    employee_id: z.number().nullable().optional(),
    worker_name: z.string().min(1, 'Worker name is required').optional(),
    job_title: z.string().min(1, 'Job title is required').max(255, 'Job title cannot exceed 255 characters'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().nullable().optional(),
    daily_rate: z.number().min(0, 'Daily rate must be positive'),
    total_days: z.number().min(0, 'Total days must be positive'),
    notes: z.string().nullable().optional(),
}).refine(data => {
    // If end_date is provided, it must be after or equal to start_date
    if (data.end_date && data.start_date) {
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);
        return endDate >= startDate;
    }
    return true;
}, {
    message: 'End date must be after or equal to start date',
    path: ['end_date']
})

// Dummy data for employees to avoid API call
const dummyEmployees: Employee[] = [
    { id: 1, first_name: 'John', last_name: 'Doe', full_name: 'John Doe', hourly_rate: 15, position: 'Operator' },
    { id: 2, first_name: 'Jane', last_name: 'Smith', full_name: 'Jane Smith', hourly_rate: 18, position: 'Manager' },
    { id: 3, first_name: 'Mike', last_name: 'Johnson', full_name: 'Mike Johnson', hourly_rate: 12, position: 'Worker' },
    { id: 4, first_name: 'Sarah', last_name: 'Williams', full_name: 'Sarah Williams', hourly_rate: 20, position: 'Supervisor' },
    { id: 5, first_name: 'David', last_name: 'Brown', full_name: 'David Brown', hourly_rate: 14, position: 'Assistant' }
];

// Create a wrapped component to handle errors
function ResourceFormContent({ type, projectId, projectEndDate, onSuccess, initialData }: ResourceFormProps): React.ReactElement {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [useEmployee, setUseEmployee] = useState(initialData?.employee_id ? true : false);
    const formRef = useRef<HTMLFormElement>(null!);
    const mounted = useRef(false);

    // Memoize the initial form data
    const initialFormData = useMemo(() => ({
        project_id: projectId,
        employee_id: initialData?.employee_id || '',
        worker_name: initialData?.worker_name || '',
        daily_rate: initialData?.daily_rate || '',
        base_daily_rate: initialData?.base_daily_rate || '',
        total_days: initialData?.total_days || '',
        quantity: initialData?.quantity || '',
        unit_price: initialData?.unit_price || '',
        unit_cost: initialData?.unit_cost || '',
        hourly_rate: initialData?.hourly_rate || '',
        usage_hours: initialData?.usage_hours || '',
        maintenance_cost: initialData?.maintenance_cost || '',
        amount: initialData?.amount || '',
        description: initialData?.description || '',
        job_title: initialData?.job_title || '',
        start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : '',
        end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().split('T')[0] : '',
        notes: initialData?.notes || '',
        equipment_id: initialData?.equipment_id || '',
        name: initialData?.name || '',
        unit: initialData?.unit || '',
        date_used: initialData?.date_used || '',
        fuel_type: initialData?.fuel_type || '',
        date: initialData?.date || '',
        category: initialData?.category || '',
        total_cost: initialData?.total_cost || '',
        material_id: initialData?.material_id || '',
        status: initialData?.status || 'pending'
    }), [projectId, initialData]);

    const { data, setData, post, put, processing, errors: formErrors, reset } = useForm(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Set mounted flag
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    // Fetch employees/equipment data
    useEffect(() => {
        const fetchData = async () => {
            if (!mounted.current) return;

            setIsLoading(true);
            try {
                if (type === 'manpower') {
                    // Using dummy data instead of API call
                    if (mounted.current) {
                        setEmployees(dummyEmployees);
                    }
                } else if (type === 'equipment' || type === 'fuel') {
                    const response = await axios.get('/api/equipment');
                    if (mounted.current) {
                        setEquipment(response.data);
                        // If we have initial data, set the hourly rate based on the equipment
                        if (initialData?.equipment_id) {
                            const selectedEquipment = response.data.find((e: Equipment) => e.id === initialData.equipment_id);
                            if (selectedEquipment) {
                                const hourlyRate = selectedEquipment.daily_rate ? (selectedEquipment.daily_rate / 8) : 0;
                                setData(prev => ({
                                    ...prev,
                                    hourly_rate: hourlyRate.toString()
                                }));
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // if (mounted.current) {
                //     ToastService.error("Failed to load required data.");
                // }
            } finally {
                if (mounted.current) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [type, initialData?.equipment_id]);

    // Add calculateTotalDays function
    const calculateTotalDays = useCallback((startDate: string, endDate?: string) => {
        if (!startDate) return 0;
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date(); // Use today's date if no end date
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }, []);

    // Add effect to update total days when start date or end date changes
    useEffect(() => {
        if (type === 'manpower' && data.start_date) {
            const days = calculateTotalDays(data.start_date, data.end_date);
            setData(prev => ({
                ...prev,
                total_days: days.toString()
            }));
        }
    }, [data.start_date, data.end_date, type, calculateTotalDays, setData]);

    // Add calculateUsageHours function
    const calculateUsageHours = useCallback((startDate: string, endDate?: string) => {
        if (!startDate) return 0;
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : new Date(); // Use today's date if no end date
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Assuming 8 hours per day
        return diffDays * 10;
    }, []);

    // Add effect to update usage hours when start date changes
    useEffect(() => {
        if (type === 'equipment' && data.start_date) {
            const hours = calculateUsageHours(data.start_date, projectEndDate);
            setData(prev => ({
                ...prev,
                usage_hours: hours.toString()
            }));
        }
    }, [data.start_date, projectEndDate, type, calculateUsageHours, setData]);

    // Update handleInputChange to properly handle employee selection
    const handleInputChange = useCallback((field: string, value: any) => {
        setData((prev: any) => {
            const newData = {
                ...prev,
                [field]: value
            };

            // Handle employee_id specifically
            if (field === 'employee_id') {
                if (value) {
                    const employeeId = Number(value);
                    if (!isNaN(employeeId)) {
                        newData.employee_id = employeeId;
                        newData.worker_name = '';
                        const selectedEmployee = employees.find(emp => emp.id === employeeId);
                        if (selectedEmployee) {
                            if (selectedEmployee.position) {
                                newData.job_title = selectedEmployee.position;
                            }
                            let calculatedDailyRate = '';
                            if (selectedEmployee.hourly_rate) {
                                calculatedDailyRate = (selectedEmployee.hourly_rate * 10).toFixed(2);
                            }
                            newData.daily_rate = calculatedDailyRate;
                        }
                    } else {
                        newData.employee_id = null;
                    }
                } else {
                    newData.employee_id = null;
                }
            }

            // Handle worker_name specifically
            if (field === 'worker_name') {
                newData.worker_name = String(value).trim();
                newData.employee_id = null;
            }

            return newData;
        })
    }, [employees, setData]);

    // Add effect to ensure status is always valid
    useEffect(() => {
        if (type === 'expense') {
            const validStatuses = ['active', 'inactive', 'pending'];
            if (!data.status || !validStatuses.includes(data.status)) {
                setData(prev => ({
                    ...prev,
                    status: 'pending'
                }));
            }
        }
    }, [type, data.status, setData]);

    // Update handleUseEmployeeChange to properly handle worker_name
    const handleUseEmployeeChange = useCallback((checked: boolean) => {
        setUseEmployee(checked);
        if (checked) {
            // Clear worker name and reset form when switching to employee mode
            setData(prev => ({
                ...prev,
                worker_name: '',
                employee_id: null,
                job_title: '',
                daily_rate: '',
                total_days: '',
                total_cost: '',
                start_date: '',
                end_date: '',
                notes: ''
            }));
        } else {
            // Clear employee_id and reset form when switching to worker name mode
            setData(prev => ({
                ...prev,
                employee_id: null,
                worker_name: '',
                job_title: '',
                daily_rate: '',
                total_days: '',
                total_cost: '',
                start_date: '',
                end_date: '',
                notes: ''
            }));
        }
    }, [setData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Ensure status is set to a valid value and include resource type
            const formData = {
                ...data,
                status: data.status || 'pending',
                resource_type: type  // renamed from 'type' to 'resource_type' to avoid confusion
            };

            // Calculate total_cost for manpower resources
            if (type === 'manpower' && formData.daily_rate && formData.total_days) {
                formData.total_cost = parseFloat(formData.daily_rate) * parseFloat(formData.total_days);
            }

            // Make sure at least employee_id or worker_name is set
            if (type === 'manpower') {
                if (useEmployee && !formData.employee_id) {
                    setErrors({worker_info: 'Please select an employee'})
                    setIsLoading(false);
                    return;
                } else if (!useEmployee && !formData.worker_name) {
                    setErrors({worker_name: 'Please enter a worker name'})
                    setIsLoading(false);
                    return;
                }
            }

            const routeName = `projects.resources.${type}.${initialData?.id ? 'update' : 'store'}`;
            const routeParams = {
                project: projectId,
                ...(initialData?.id && { [type]: initialData.id })
            };

            if (initialData?.id) {
                await put(route(routeName, routeParams), formData);
            } else {
                await post(route(routeName, routeParams), formData);
            }

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            const err = error as any;
            console.error('Form submission errors:', err);
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const renderFormFields = () => {
        switch (type) {
            case 'manpower':
                return (
                    <div className="space-y-6">
                        <div className="bg-muted/40 p-4 rounded-lg">
                            <div className="flex items-center justify-between space-y-0">
                                <div>
                                    <h4 className="font-medium">Link to Employee</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Do you want to connect this resource to an employee?
                                    </p>
                                </div>
                                <Toggle
                                    pressed={useEmployee}
                                    onPressedChange={handleUseEmployeeChange}
                                />
                            </div>
                        </div>

                        {useEmployee ? (
                            <div className="space-y-2">
                                <Label htmlFor="employee_id">Select Employee</Label>
                                <Select
                                    value={data.employee_id?.toString()}
                                    onValueChange={(value) => {
                                        const employeeId = parseInt(value);
                                        if (!isNaN(employeeId)) {
                                            handleInputChange('employee_id', employeeId);
                                        }
                                    }}
                                >
                                    <SelectTrigger className={cn(
                                        "w-full",
                                        errors.employee_id && "border-red-500"
                                    )}>
                                        <SelectValue placeholder="Select an employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees && employees.length > 0 ? (
                                            employees.map((employee) => (
                                                <SelectItem key={employee.id} value={employee.id.toString()}>
                                                    {`${employee.first_name} ${employee.last_name}`}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-employee" disabled>No employees available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.employee_id && (
                                    <p className="text-sm text-red-500">{errors.employee_id}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="worker_name">Worker Name</Label>
                                <Input
                                    id="worker_name"
                                    value={data.worker_name}
                                    onChange={(e) => handleInputChange('worker_name', e.target.value)}
                                    placeholder="Enter worker name"
                                    className={errors.worker_name ? 'border-red-500' : ''}
                                />
                                {errors.worker_name && (
                                    <p className="text-sm text-red-500">{errors.worker_name}</p>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="job_title">Job Title</Label>
                            <Input
                                id="job_title"
                                value={data.job_title}
                                onChange={(e) => handleInputChange('job_title', e.target.value)}
                                placeholder="Enter job title"
                                className={errors.job_title ? 'border-red-500' : ''}
                            />
                            {errors.job_title && (
                                <p className="text-sm text-red-500">{errors.job_title}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <DatePicker
                                    date={data.start_date ? new Date(data.start_date) : undefined}
                                    onDateChange={(date: any) => handleInputChange('start_date', date?.toISOString().split('T')[0])}
                                    label="Start Date"
                                    error={errors.start_date}
                                    fromDate={new Date(2020, 0, 1)}
                                    toDate={new Date()}
                                />
                            </div>
                            <div className="space-y-2">
                                <DatePicker
                                    date={data.end_date ? new Date(data.end_date) : undefined}
                                    onDateChange={(date: any) => handleInputChange('end_date', date?.toISOString().split('T')[0])}
                                    label="End Date (Optional)"
                                    error={errors.end_date}
                                    fromDate={new Date(2020, 0, 1)}
                                    toDate={new Date()}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="daily_rate">Daily Rate</Label>
                            <Input
                                id="daily_rate"
                                type="number"
                                value={data.daily_rate}
                                onChange={(e) => handleInputChange('daily_rate', Number(e.target.value))}
                                placeholder="Enter daily rate"
                                className={errors.daily_rate ? 'border-red-500' : ''}
                            />
                            {errors.daily_rate && (
                                <p className="text-sm text-red-500">{errors.daily_rate}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="total_days">Total Days</Label>
                            <Input
                                id="total_days"
                                type="number"
                                value={data.total_days}
                                readOnly
                                className="bg-muted"
                            />
                            {errors.total_days && (
                                <p className="text-sm text-red-500">{errors.total_days}</p>
                            )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                placeholder="Enter any additional notes"
                                className={errors.notes ? 'border-red-500' : ''}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-500">{errors.notes}</p>
                            )}
                        </div>
                    </div>
                );

            case 'equipment':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="equipment_id" className="text-sm font-medium">Equipment</Label>
                                <Select
                                    value={data.equipment_id?.toString() || ''}
                                    onValueChange={(value) => {
                                        const selectedEquipment = equipment.find(e => e.id === parseInt(value));
                                        handleInputChange('equipment_id', parseInt(value));
                                        if (selectedEquipment) {
                                            // Set hourly rate from equipment's daily rate (assuming 8-hour workday)
                                            const hourlyRate = selectedEquipment.daily_rate ? (selectedEquipment.daily_rate / 8) : 0;
                                            handleInputChange('hourly_rate', hourlyRate);
                                        }
                                    }}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select equipment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipment && equipment.length > 0 ? (
                                            equipment.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-equipment" disabled>No equipment available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.equipment_id && (
                                    <p className="text-sm text-red-500">{errors.equipment_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="usage_hours">Usage Hours</Label>
                                <Input
                                    id="usage_hours"
                                    type="number"
                                    min="1"
                                    value={data.usage_hours || ''}
                                    onChange={(e) => handleInputChange('usage_hours', Number(e.target.value))}
                                    placeholder="Enter usage hours"
                                    className={errors.usage_hours ? 'border-red-500' : ''}
                                />
                                {errors.usage_hours && (
                                    <p className="text-sm text-red-500">{errors.usage_hours}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="hourly_rate">Hourly Rate (SAR)</Label>
                                <Input
                                    id="hourly_rate"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.hourly_rate || ''}
                                    onChange={(e) => handleInputChange('hourly_rate', Number(e.target.value))}
                                    placeholder="Enter hourly rate"
                                    className={errors.hourly_rate ? 'border-red-500' : ''}
                                />
                                {errors.hourly_rate && (
                                    <p className="text-sm text-red-500">{errors.hourly_rate}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="total_cost">Total Cost (SAR)</Label>
                                <Input
                                    id="total_cost"
                                    type="number"
                                    value={data.hourly_rate && data.usage_hours ?
                                        (Number(data.hourly_rate) * Number(data.usage_hours)).toFixed(2) : ''}
                                    disabled
                                    className="w-full bg-muted"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Textarea
                                id="notes"
                                value={data.notes || ''}
                                onChange={(e) => handleInputChange('notes', e.target.value)}
                                placeholder="Enter any additional notes"
                                className={errors.notes ? 'border-red-500' : ''}
                            />
                            {errors.notes && (
                                <p className="text-sm text-red-500">{errors.notes}</p>
                            )}
                        </div>
                    </div>
                );

            case 'material':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="material_id">Material</Label>
                                <Select
                                    value={data.material_id?.toString()}
                                    onValueChange={(value) => handleInputChange('material_id', parseInt(value))}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select material" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Cement</SelectItem>
                                        <SelectItem value="2">Steel</SelectItem>
                                        <SelectItem value="3">Bricks</SelectItem>
                                        <SelectItem value="4">Sand</SelectItem>
                                        <SelectItem value="5">Gravel</SelectItem>
                                        <SelectItem value="6">Wood</SelectItem>
                                        <SelectItem value="7">Paint</SelectItem>
                                        <SelectItem value="8">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.material_id && (
                                    <p className="text-sm text-red-500">{errors.material_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit">Unit</Label>
                                <Select
                                    value={data.unit || ''}
                                    onValueChange={(value) => handleInputChange('unit', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pcs">Pieces</SelectItem>
                                        <SelectItem value="kg">Kilograms</SelectItem>
                                        <SelectItem value="m">Meters</SelectItem>
                                        <SelectItem value="m2">Square Meters</SelectItem>
                                        <SelectItem value="m3">Cubic Meters</SelectItem>
                                        <SelectItem value="l">Liters</SelectItem>
                                        <SelectItem value="box">Box</SelectItem>
                                        <SelectItem value="set">Set</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.unit && (
                                    <p className="text-sm text-red-500">{errors.unit}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={data.quantity || ''}
                                    onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value))}
                                    placeholder="Enter quantity"
                                    min="0"
                                    step="0.01"
                                    className={errors.quantity ? "border-red-500" : ""}
                                />
                                {errors.quantity && (
                                    <p className="text-sm text-red-500">{errors.quantity}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit_price">Unit Price (SAR)</Label>
                                <Input
                                    id="unit_price"
                                    type="number"
                                    value={data.unit_price || ''}
                                    onChange={(e) => handleInputChange('unit_price', parseFloat(e.target.value))}
                                    placeholder="Enter unit price"
                                    min="0"
                                    step="0.01"
                                    className={errors.unit_price ? "border-red-500" : ""}
                                />
                                {errors.unit_price && (
                                    <p className="text-sm text-red-500">{errors.unit_price}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <DatePicker
                                    date={data.date ? new Date(data.date) : undefined}
                                    onDateChange={(date: any) => handleInputChange('date', date?.toISOString().split('T')[0])}
                                    label="Date"
                                    error={errors.date}
                                    fromDate={new Date(2020, 0, 1)}
                                    toDate={new Date()}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes || ''}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    placeholder="Add any additional notes..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="total_cost">Total Cost (SAR)</Label>
                            <Input
                                id="total_cost"
                                type="number"
                                value={data.quantity && data.unit_price ? (Number(data.quantity) * Number(data.unit_price)).toFixed(2) : ''}
                                disabled
                                className="w-full bg-muted"
                            />
                        </div>
                    </div>
                );

            case 'fuel':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="equipment_id" className="text-sm font-medium">Equipment</Label>
                                <Select
                                    value={data.equipment_id?.toString()}
                                    onValueChange={(value) => handleInputChange('equipment_id', parseInt(value))}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select equipment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {equipment && equipment.length > 0 ? (
                                            equipment.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-equipment" disabled>No equipment available</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.equipment_id && (
                                    <p className="text-sm text-red-500">{errors.equipment_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fuel_type">Fuel Type</Label>
                                <Select
                                    value={data.fuel_type || ''}
                                    onValueChange={(value) => handleInputChange('fuel_type', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select fuel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="diesel">Diesel</SelectItem>
                                        <SelectItem value="petrol">Petrol</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.fuel_type && (
                                    <p className="text-sm text-red-500">{errors.fuel_type}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="quantity">Quantity (Liters)</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={data.quantity || ''}
                                    onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value))}
                                    placeholder="Enter quantity"
                                    min="0"
                                    step="0.01"
                                    className={errors.quantity ? "border-red-500" : ""}
                                />
                                {errors.quantity && (
                                    <p className="text-sm text-red-500">{errors.quantity}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="unit_price">Unit Price (SAR/Liter)</Label>
                                <Input
                                    id="unit_price"
                                    type="number"
                                    value={data.unit_price || ''}
                                    onChange={(e) => handleInputChange('unit_price', parseFloat(e.target.value))}
                                    placeholder="Enter unit price"
                                    min="0"
                                    step="0.01"
                                    className={errors.unit_price ? "border-red-500" : ""}
                                />
                                {errors.unit_price && (
                                    <p className="text-sm text-red-500">{errors.unit_price}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <DatePicker
                                    date={data.date ? new Date(data.date) : undefined}
                                    onDateChange={(date: any) => handleInputChange('date', date?.toISOString().split('T')[0])}
                                    label="Date"
                                    error={errors.date}
                                    fromDate={new Date(2020, 0, 1)}
                                    toDate={new Date()}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes || ''}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    placeholder="Add any additional notes..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="total_cost" className="text-sm font-medium">Total Cost (SAR)</Label>
                            <Input
                                id="total_cost"
                                type="number"
                                value={data.quantity && data.unit_price ? (Number(data.quantity) * Number(data.unit_price)).toFixed(2) : ''}
                                disabled
                                className="w-full bg-muted"
                            />
                        </div>
                    </div>
                );

            case 'expense':
                return (
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="bg-muted/40 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold">Add New Expense</h3>
                            <p className="text-sm text-muted-foreground">
                                Fill in the details below to add a new expense to the project.
                            </p>
                        </div>

                        {/* Main Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Category and Amount */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                                        <Select
                                            value={data.category || ''}
                                            onValueChange={(value) => handleInputChange('category', value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="accommodation">Accommodation</SelectItem>
                                                <SelectItem value="transportation">Transportation</SelectItem>
                                                <SelectItem value="meals">Meals</SelectItem>
                                                <SelectItem value="utilities">Utilities</SelectItem>
                                                <SelectItem value="office_supplies">Office Supplies</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-sm text-red-500">{errors.category}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="amount" className="text-sm font-medium">Amount (SAR)</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">SAR</span>
                                            <Input
                                                id="amount"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={data.total_cost || ''}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    handleInputChange('total_cost', value);
                                                    handleInputChange('amount', value);
                                                }}
                                                placeholder="0.00"
                                                className="pl-12"
                                                required
                                            />
                                        </div>
                                        {errors.amount && (
                                            <p className="text-sm text-red-500">{errors.amount}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Date and Status */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                                        <DatePicker
                                            date={data.date ? new Date(data.date) : undefined}
                                            onDateChange={(date: any) => handleInputChange('date', date?.toISOString().split('T')[0])}
                                            label="Date"
                                            error={errors.date}
                                            fromDate={new Date(2020, 0, 1)}
                                            toDate={new Date()}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                                        <Select
                                            value={data.status || 'pending'}
                                            onValueChange={(value) => handleInputChange('status', value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="approved">Approved</SelectItem>
                                                <SelectItem value="rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-red-500">{errors.status}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Enter a detailed description of the expense"
                                        className="min-h-[120px]"
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="text-sm font-medium">Additional Notes (Optional)</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes || ''}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                        placeholder="Add any additional notes or comments"
                                        className="min-h-[100px]"
                                    />
                                    {errors.notes && (
                                        <p className="text-sm text-red-500">{errors.notes}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="bg-muted/40 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Category</p>
                                    <p className="font-medium">{data.category || 'Not selected'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Amount</p>
                                    <p className="font-medium">SAR {data.total_cost || '0.00'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <p className="font-medium capitalize">{data.status || 'Pending'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} data-resource-type={type} className="space-y-8">
            {renderFormFields()}
            <div className="flex justify-end space-x-2">
                <Button
                    type="submit"
                    disabled={processing || isLoading}
                    className="min-w-[100px]"
                >
                    {isLoading ? 'Saving...' : initialData?.id ? 'Update' : 'Save'}
                </Button>
            </div>
        </form>
    );
}

// Export a wrapped version of the component with error boundary
export default function ResourceForm(props: ResourceFormProps) {
    return (
        <ErrorBoundary>
            <ResourceFormContent {...props} />
        </ErrorBoundary>
    );
}

