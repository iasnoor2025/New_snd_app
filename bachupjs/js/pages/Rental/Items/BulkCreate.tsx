import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Copy, FileUp, Save, Printer, Download, X, AlertTriangle, FilterX } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { router } from '@inertiajs/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast, Toaster } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props extends PageProps {
    rentalId: number;
    equipment: Array<{
        id: number;
        name: string;
    }>
    operators: Array<{
        id: number;
        name: string;
    }>
}

interface RentalItem {
    equipment_id: string;
    operator_id: string;
    rate: string;
    rate_type: 'daily' | 'hourly' | 'weekly' | 'monthly';
    days: string;
    discount_percentage: string;
    notes: string;
}

interface Template {
    id: string;
    name: string;
    items: RentalItem[];
    created_at: string;
    description?: string;
}

interface PdfOptions {
    orientation: 'portrait' | 'landscape';
    unit: 'mm' | 'pt';
    format: 'a4' | 'letter';
}

interface ImportedData {
    content: string;
    file: File;
}

interface ImportError {
    row: number;
    message: string;
    field?: string;
}

interface ImportResult {
    success: boolean;
    items?: RentalItem[];
    errors?: ImportError[];
    warnings?: ImportError[];
}

interface DuplicateGroup {
    equipmentId: string;
    equipmentName: string;
    indices: number[];
    totalAmount: number;
}

interface SummaryStats {
    totalItems: number;
    totalAmount: number;
    averageRate: number;
    averageDays: number;
    equipmentCount: number;
    operatorCount: number;
}

const rateTypeEnum = z.enum(['daily', 'hourly', 'weekly', 'monthly']);

const rentalItemSchema = z.object({
    equipment_id: z.string().min(1, 'Equipment is required'),
    operator_id: z.string().min(1, 'Operator is required'),
    rate: z.string()
        .min(1, 'Rate is required')
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
            message: 'Rate must be a positive number',
        }),
    rate_type: rateTypeEnum,
    days: z.string()
        .min(1, 'Days is required')
        .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
            message: 'Days must be a positive number',
        }),
    discount_percentage: z.string()
        .refine((val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 100), {
            message: 'Discount must be between 0 and 100',
        }),
    notes: z.string().optional(),
})

const formSchema = z.object({
    items: z.array(rentalItemSchema).min(1, 'At least one item is required'),
})

type FormData = z.infer<typeof formSchema>

export default function BulkCreate({ auth, rentalId, equipment, operators }: Props) {
    const [templateName, setTemplateName] = useState<string>('');
    const [showTemplateDialog, setShowTemplateDialog] = useState<boolean>(false);
    const [importedData, setImportedData] = useState<ImportedData | null>(null);
    const [showTemplates, setShowTemplates] = useState<boolean>(false);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);
    const [pdfUrl, setPdfUrl] = useState<string>('');
    const [duplicateWarnings, setDuplicateWarnings] = useState<Array<{ index: number; equipmentName: string }>>([]);
    const [showPdfOptions, setShowPdfOptions] = useState<boolean>(false);
    const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    })
    const [templateSearch, setTemplateSearch] = useState<string>('');
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [showTemplatePreview, setShowTemplatePreview] = useState<boolean>(false);
    const [importErrors, setImportErrors] = useState<ImportError[]>([]);
    const [importWarnings, setImportWarnings] = useState<ImportError[]>([]);
    const [showImportSummary, setShowImportSummary] = useState<boolean>(false);
    const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
    const [showDuplicateDialog, setShowDuplicateDialog] = useState<boolean>(false);
    const [selectedDuplicateGroup, setSelectedDuplicateGroup] = useState<DuplicateGroup | null>(null);
    const [showQuickActions, setShowQuickActions] = useState<boolean>(false);

    // Load templates from localStorage on component mount
    useEffect(() => {
        const savedTemplates = localStorage.getItem('rentalItemTemplates');
        if (savedTemplates) {
            try {
                const parsedTemplates = JSON.parse(savedTemplates) as Template[];
                setTemplates(parsedTemplates);
            } catch (error) {
                console.error('Error loading templates:', error);
            }
        }
    }, []);

    const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            items: [{
                equipment_id: '',
                operator_id: '',
                rate: '',
                rate_type: 'daily',
                days: '',
                discount_percentage: '',
                notes: '',
            }],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'items',
    })

    const calculateItemTotal = (item: RentalItem): number => {
        const rate = parseFloat(item.rate) || 0;
        const days = parseInt(item.days) || 0;
        const discount = parseFloat(item.discount_percentage) || 0;
        const total = rate * days;
        return total - (total * (discount / 100));
    };

    const calculateTotal = (): number => {
        return watch('items').reduce((sum, item) => sum + calculateItemTotal(item), 0);
    };

    const addItem = () => {
        append({
            equipment_id: '',
            operator_id: '',
            rate: '',
            rate_type: 'daily',
            days: '',
            discount_percentage: '',
            notes: '',
        })
    };

    const copyItem = (index: number) => {
        const itemToCopy = watch('items')[index];
        append({ ...itemToCopy })
    };

    const clearAll = () => {
        setValue('items', [{
            equipment_id: '',
            operator_id: '',
            rate: '',
            rate_type: 'daily',
            days: '',
            discount_percentage: '',
            notes: '',
        }]);
    };

    const validateImportData = (items: RentalItem[]): ImportResult => {
        const errors: ImportError[] = [];
        const warnings: ImportError[] = [];

        items.forEach((item, index) => {
            // Required fields validation
            if (!item.equipment_id) {
                errors.push({ row: index + 2, message: 'Equipment is required', field: 'equipment_id' })
            }
            if (!item.operator_id) {
                errors.push({ row: index + 2, message: 'Operator is required', field: 'operator_id' })
            }
            if (!item.rate) {
                errors.push({ row: index + 2, message: 'Rate is required', field: 'rate' })
            }
            if (!item.days) {
                errors.push({ row: index + 2, message: 'Days is required', field: 'days' })
            }

            // Rate validation
            if (item.rate && (isNaN(parseFloat(item.rate)) || parseFloat(item.rate) <= 0)) {
                errors.push({ row: index + 2, message: 'Rate must be a positive number', field: 'rate' })
            }

            // Days validation
            if (item.days && (isNaN(parseInt(item.days)) || parseInt(item.days) <= 0)) {
                errors.push({ row: index + 2, message: 'Days must be a positive number', field: 'days' })
            }

            // Discount validation
            if (item.discount_percentage && (isNaN(parseFloat(item.discount_percentage)) || parseFloat(item.discount_percentage) < 0 || parseFloat(item.discount_percentage) > 100)) {
                errors.push({ row: index + 2, message: 'Discount must be between 0 and 100', field: 'discount_percentage' })
            }

            // Check for duplicate equipment in the import
            const duplicateIndex = items.findIndex((otherItem, otherIndex) =>
                otherIndex < index && otherItem.equipment_id === item.equipment_id;
            );
            if (duplicateIndex !== -1) {
                warnings.push({
                    row: index + 2,
                    message: `Duplicate equipment found (also in row ${duplicateIndex + 2})`,
                    field: 'equipment_id'
                })
            }

            // Check for duplicate equipment with existing items
            const existingDuplicate = watch('items').some(existingItem =>
                existingItem.equipment_id === item.equipment_id;
            );
            if (existingDuplicate) {
                warnings.push({
                    row: index + 2,
                    message: 'Equipment already exists in current form',
                    field: 'equipment_id'
                })
            }
        })

        return {
            success: errors.length === 0,
            items: errors.length === 0 ? items : undefined,
            errors: errors.length > 0 ? errors : undefined,
            warnings: warnings.length > 0 ? warnings : undefined,
        };
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset states
        setImportErrors([]);
        setImportWarnings([]);
        setShowImportSummary(false);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setImportedData({ content, file })

            try {
                // Parse CSV content
                const rows = content.split('\n');
                    .map(row => row.split(',').map(cell => cell.trim()));
                    .filter(row => row.length > 1); // Skip empty rows

                if (rows.length < 2) {
                    throw new Error('File must contain at least a header row and one data row');
                }

                // Validate headers
                const headers = rows[0];
                const requiredHeaders = ['Equipment', 'Operator', 'Rate', 'Rate Type', 'Days', 'Discount', 'Notes'];
                const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));

                if (missingHeaders.length > 0) {
                    throw new Error(`Missing required columns: ${missingHeaders.join(', ')}`);
                }

                // Map CSV data to form data
                const items = rows.slice(1).map((row, index) => {
                    const equipmentName = row[headers.indexOf('Equipment')];
                    const operatorName = row[headers.indexOf('Operator')];

                    // Find equipment and operator IDs
                    const equipmentMatch = equipment.find(eq => eq.name === equipmentName);
                    const operatorMatch = operators.find(op => op.name === operatorName);

                    if (!equipmentMatch) {
                        throw new Error(`Invalid equipment name at row ${index + 2}: ${equipmentName}`);
                    }
                    if (!operatorMatch) {
                        throw new Error(`Invalid operator name at row ${index + 2}: ${operatorName}`);
                    }

                    const rateType = row[headers.indexOf('Rate Type')].toLowerCase();
                    if (!['daily', 'hourly', 'weekly', 'monthly'].includes(rateType)) {
                        throw new Error(`Invalid rate type at row ${index + 2}: ${rateType}`);
                    }

                    return {
                        equipment_id: equipmentMatch.id.toString(),
                        operator_id: operatorMatch.id.toString(),
                        rate: row[headers.indexOf('Rate')],
                        rate_type: rateType as 'daily' | 'hourly' | 'weekly' | 'monthly',
                        days: row[headers.indexOf('Days')],
                        discount_percentage: row[headers.indexOf('Discount')] || '0',
                        notes: row[headers.indexOf('Notes')] || '',
                    };
                })

                // Validate data
                const validationResult = validateImportData(items);

                if (!validationResult.success) {
                    setImportErrors(validationResult.errors || []);
                    setImportWarnings(validationResult.warnings || []);
                    setShowImportSummary(true);
                    toast.error('Import validation failed');
                    return;
                }

                if (validationResult.warnings?.length) {
                    setImportWarnings(validationResult.warnings);
                    setShowImportSummary(true);
                }

                setValue('items', items);
                toast.success(`Successfully imported ${items.length} items`);
            } catch (error) {
                console.error('Error parsing imported data:', error);
                toast.error(error instanceof Error ? error.message : 'Error importing data');
                // Reset file input
                event.target.value = '';
            }
        };

        reader.onerror = () => {
            toast.error('Error reading file');
            event.target.value = '';
        };

        reader.readAsText(file);
    };

    const saveAsTemplate = () => {
        try {
            if (!templateName.trim()) {
                toast.error('Template name is required');
                return;
            }

            const items = watch('items');
            if (items.length === 0) {
                toast.error('Cannot save empty template');
                return;
            }

            const newTemplate: Template = {
                id: Date.now().toString(),
                name: templateName.trim(),
                items: items,
                created_at: new Date().toISOString(),
                description: `Contains ${items.length} items with total amount of ${formatCurrency(calculateTotal())}`,
            };

            const updatedTemplates = [...templates, newTemplate];
            setTemplates(updatedTemplates);
            localStorage.setItem('rentalItemTemplates', JSON.stringify(updatedTemplates));
            setShowTemplateDialog(false);
            setTemplateName('');
            toast.success('Template saved successfully');
        } catch (error) {
            console.error('Error saving template:', error);
            toast.error('Failed to save template');
        }
    };

    const deleteTemplate = (templateId: string) => {
        try {
            const updatedTemplates = templates.filter(t => t.id !== templateId);
            setTemplates(updatedTemplates);
            localStorage.setItem('rentalItemTemplates', JSON.stringify(updatedTemplates));
            toast.success('Template deleted successfully');
        } catch (error) {
            console.error('Error deleting template:', error);
            toast.error('Failed to delete template');
        }
    };

    const loadTemplate = (template: Template) => {
        try {
            setValue('items', template.items);
            setShowTemplates(false);
            toast.success('Template loaded successfully');
        } catch (error) {
            console.error('Error loading template:', error);
            toast.error('Failed to load template');
        }
    };

    const isDuplicateItem = (index: number): boolean => {
        const items = watch('items');
        const currentItem = items[index];
        return items.some((item, idx) =>
            idx !== index &&
            item.equipment_id === currentItem.equipment_id
        );
    };

    const checkForDuplicates = () => {
        const items = watch('items');
        const duplicates = items.reduce<Array<{ index: number; equipmentName: string }>>((acc, item, index) => {
            if (isDuplicateItem(index)) {
                const equipment = equipment.find(eq => eq.id.toString() === item.equipment_id);
                acc.push({ index, equipmentName: equipment?.name || 'Unknown' })
            }
            return acc;
        }, []);

        setDuplicateWarnings(duplicates);
        return duplicates.length > 0;
    };

    const removeDuplicates = () => {
        try {
            const items = watch('items');
            const uniqueItems = items.filter((item, index) => !isDuplicateItem(index));
            setValue('items', uniqueItems);
            setDuplicateWarnings([]);
            toast.success('Duplicate items removed');
        } catch (error) {
            console.error('Error removing duplicates:', error);
            toast.error('Failed to remove duplicates');
        }
    };

    const onSubmit = (data: FormData) => {
        try {
            if (checkForDuplicates()) {
                toast.error('Please remove duplicate equipment before submitting');
                return;
            }

            router.post(route('rental.items.bulk-store', rentalId), data, {
                onSuccess: () => {
                    toast.success('Rental items created successfully');
                },
                onError: (errors) => {
                    console.error('Error creating rental items:', errors);
                    toast.error('Failed to create rental items');
                },
            })
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit form');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const generatePDF = (options: PdfOptions): string => {
        const doc = new jsPDF({
            orientation: options.orientation,
            unit: options.unit,
            format: options.format,
        })

        const items = watch('items');
        const headers = [['Equipment', 'Operator', 'Rate', 'Rate Type', 'Days', 'Discount', 'Total', 'Notes']];
        const data = items.map(item => {
            const equipmentName = equipment.find(eq => eq.id.toString() === item.equipment_id)?.name || '';
            const operatorName = operators.find(op => op.id.toString() === item.operator_id)?.name || '';
            const total = calculateItemTotal(item);

            return [
                equipmentName,
                operatorName,
                formatCurrency(parseFloat(item.rate)),
                item.rate_type.charAt(0).toUpperCase() + item.rate_type.slice(1),
                item.days,
                `${item.discount_percentage}%`,
                formatCurrency(total),
                item.notes || '',
            ];
        })

        // Add total row
        data.push(['', '', '', '', '', 'Total:', formatCurrency(calculateTotal()), '']);

        autoTable(doc, {
            head: headers,
            body: data,
            startY: 20,
            theme: 'grid',
            styles: {
                fontSize: 8,
                cellPadding: 2,
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontSize: 10,
                fontStyle: 'bold',
            },
        })

        return doc.output('datauristring');
    };

    const handleExportPDF = () => {
        try {
            setShowPdfOptions(true);
        } catch (error) {
            console.error('Error preparing PDF export:', error);
            toast.error('Failed to prepare PDF export');
        }
    };

    const handlePdfOptionsConfirm = () => {
        try {
            const pdfData = generatePDF(pdfOptions);
            setPdfUrl(pdfData);
            setShowPdfPreview(true);
            setShowPdfOptions(false);
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF');
        }
    };

    const downloadPDF = () => {
        try {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `rental-items-${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast.error('Failed to download PDF');
        }
    };

    const filteredTemplates = templates.filter(template =>
        template.name.toLowerCase().includes(templateSearch.toLowerCase()) ||
        template.description?.toLowerCase().includes(templateSearch.toLowerCase());
    );

    const previewTemplate = (template: Template) => {
        setSelectedTemplate(template);
        setShowTemplatePreview(true);
    };

    // Watch for changes in items to detect duplicates in real-time
    useEffect(() => {
        const items = watch('items');
        const groups = new Map<string, DuplicateGroup>();

        items.forEach((item, index) => {
            if (!item.equipment_id) return;

            const equipmentName = equipment.find(eq => eq.id.toString() === item.equipment_id)?.name || 'Unknown';
            const total = calculateItemTotal(item);

            if (!groups.has(item.equipment_id)) {
                groups.set(item.equipment_id, {
                    equipmentId: item.equipment_id,
                    equipmentName,
                    indices: [index],
                    totalAmount: total,
                })
            } else {
                const group = groups.get(item.equipment_id)!;
                group.indices.push(index);
                group.totalAmount += total;
            }
        })

        // Filter out non-duplicates
        const duplicateGroups = Array.from(groups.values());
            .filter(group => group.indices.length > 1);

        setDuplicateGroups(duplicateGroups);
    }, [watch('items')]);

    const handleDuplicateAction = (action: 'keep-first' | 'keep-last' | 'merge' | 'keep-all') => {
        if (!selectedDuplicateGroup) return;

        const items = watch('items');
        let newItems: RentalItem[];

        switch (action) {
            case 'keep-first':
                newItems = items.filter((_, index) =>
                    !selectedDuplicateGroup.indices.slice(1).includes(index)
                );
                break;
            case 'keep-last':
                newItems = items.filter((_, index) =>
                    !selectedDuplicateGroup.indices.slice(0, -1).includes(index)
                );
                break;
            case 'merge':
                const firstItem = items[selectedDuplicateGroup.indices[0]];
                const mergedItem: RentalItem = {
                    ...firstItem,
                    rate: (selectedDuplicateGroup.totalAmount / selectedDuplicateGroup.indices.length).toString(),
                    days: selectedDuplicateGroup.indices.length.toString(),
                    notes: selectedDuplicateGroup.indices
                        .map(idx => items[idx].notes)
                        .filter(Boolean)
                        .join('; '),
                };
                newItems = items.filter((_, index) =>
                    !selectedDuplicateGroup.indices.includes(index)
                );
                newItems.push(mergedItem);
                break;
            case 'keep-all':
                // No action needed, just close the dialog
                setShowDuplicateDialog(false);
                return;
            default:
                return;
        }

        setValue('items', newItems);
        setShowDuplicateDialog(false);
        toast.success('Duplicate items processed successfully');
    };

    const getDuplicateItems = (group: DuplicateGroup) => {
        return group.indices.map(index => {
            const item = watch('items')[index];
            const total = calculateItemTotal(item);
            return {
                index,
                item,
                total,
                operator: operators.find(op => op.id.toString() === item.operator_id)?.name || 'Unknown',
            };
        })
    };

    // Calculate summary statistics
    const calculateSummaryStats = (): SummaryStats => {
        const items = watch('items');
        const totalAmount = calculateTotal();
        const totalItems = items.length;
        const averageRate = items.reduce((sum, item) => sum + (parseFloat(item.rate) || 0), 0) / totalItems;
        const averageDays = items.reduce((sum, item) => sum + (parseInt(item.days) || 0), 0) / totalItems;
        const uniqueEquipment = new Set(items.map(item => item.equipment_id));
        const uniqueOperators = new Set(items.map(item => item.operator_id));

        return {
            totalItems,
            totalAmount,
            averageRate,
            averageDays,
            equipmentCount: uniqueEquipment.size,
            operatorCount: uniqueOperators.size,
        };
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Only handle shortcuts when not in an input field
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 's':
                        e.preventDefault();
                        setShowTemplateDialog(true);
                        break;
                    case 'n':
                        e.preventDefault();
                        addItem();
                        break;
                    case 'p':
                        e.preventDefault();
                        handlePrint();
                        break;
                    case 'd':
                        e.preventDefault();
                        handleExportPDF();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bulk Create Rental Items</h2>}
            <Head title="Bulk Create Rental Items" />
            <Toaster position="top-right" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Summary Panel */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {(() => {
                                        const stats = calculateSummaryStats();
                                        return (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-500">Total Items</p>
                                                        <p className="text-2xl font-semibold">{stats.totalItems}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm text-gray-500">Total Amount</p>
                                                        <p className="text-2xl font-semibold">{formatCurrency(stats.totalAmount)}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-500">Average Rate</span>
                                                        <span className="text-sm font-medium">{formatCurrency(stats.averageRate)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-500">Average Days</span>
                                                        <span className="text-sm font-medium">{stats.averageDays.toFixed(1)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-500">Unique Equipment</span>
                                                        <span className="text-sm font-medium">{stats.equipmentCount}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-sm text-gray-500">Unique Operators</span>
                                                        <span className="text-sm font-medium">{stats.operatorCount}</span>
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t">
                                                    <p className="text-xs text-gray-500">
                                                        Keyboard Shortcuts:
                                                        <br />Ctrl/Cmd + S: Save Template
                                                        <br />Ctrl/Cmd + N: Add Item
                                                        <br />Ctrl/Cmd + P: Print
                                                        <br />Ctrl/Cmd + D: Export PDF
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Form */}
                        <div className="lg:col-span-3">
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <CardTitle>Bulk Add Rental Items</CardTitle>
                                        <div className="space-x-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowQuickActions(true)}
                                                Quick Actions
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowTemplates(true)}
                                                <Save className="h-4 w-4 mr-2" />
                                                Load Template
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowTemplateDialog(true)}
                                                <Save className="h-4 w-4 mr-2" />
                                                Save as Template
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handlePrint}
                                                <Printer className="h-4 w-4 mr-2" />
                                                Print Preview
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleExportPDF}
                                                <Download className="h-4 w-4 mr-2" />
                                                Export PDF
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {duplicateGroups.length > 0 && (
                                        <Alert className="mb-4 border-yellow-500 bg-yellow-50">
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                            <AlertDescription className="text-yellow-700">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        Duplicate equipment detected:
                                                        {duplicateGroups.map((group, i) => (
                                                            <div key={i} className="flex items-center space-x-2">
                                                                <span>- {group.equipmentName} ({group.indices.length} items)</span>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setSelectedDuplicateGroup(group);
                                                                        setShowDuplicateDialog(true);
                                                                    }}
                                                                    className="text-yellow-700 border-yellow-500 hover:bg-yellow-100"
                                                                    Manage
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </AlertDescription>
                                        </Alert>
                                    )}

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div className="space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={addItem}
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Another Item
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={clearAll}
                                                    <X className="h-4 w-4 mr-2" />
                                                    Clear All
                                                </Button>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <Label htmlFor="import" className="cursor-pointer">
                                                    <FileUp className="h-4 w-4 mr-2 inline" />
                                                    Import CSV/Excel
                                                </Label>
                                                <input
                                                    id="import"
                                                    type="file"
                                                    accept=".csv,.xlsx"
                                                    className="hidden"
                                                    onChange={handleImport}
                                                />
                                            </div>
                                        </div>

                                        {fields.map((field, index) => (
                                            <div
                                                key={field.id}
                                                className={`p-4 border rounded-lg space-y-4 ${
                                                    isDuplicateItem(index) ? 'border-yellow-500 bg-yellow-50' : ''
                                                }`}
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-medium">Item {index + 1}</h3>
                                                    <div className="space-x-2">
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => copyItem(index)}
                                                            <Copy className="h-4 w-4 mr-2" />
                                                            Copy
                                                        </Button>
                                                        {index > 0 && (
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => remove(index)}
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`equipment_id_${index}`}>Equipment</Label>
                                                        <Select
                                                            value={watch(`items.${index}.equipment_id`)}
                                                            onValueChange={(value) => setValue(`items.${index}.equipment_id`, value)}
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select equipment" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {equipment.map((eq) => (
                                                                    <SelectItem key={eq.id} value={eq.id.toString()}>
                                                                        {eq.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.items?.[index]?.equipment_id && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.items[index]?.equipment_id?.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`operator_id_${index}`}>Operator</Label>
                                                        <Select
                                                            value={watch(`items.${index}.operator_id`)}
                                                            onValueChange={(value) => setValue(`items.${index}.operator_id`, value)}
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select operator" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {operators.map((op) => (
                                                                    <SelectItem key={op.id} value={op.id.toString()}>
                                                                        {op.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.items?.[index]?.operator_id && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.items[index]?.operator_id?.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`rate_${index}`}>Rate</Label>
                                                        <Input
                                                            id={`rate_${index}`}
                                                            type="number"
                                                            step="0.01"
                                                            value={watch(`items.${index}.rate`)}
                                                            onChange={(e) => setValue(`items.${index}.rate`, e.target.value)}
                                                        />
                                                        {errors.items?.[index]?.rate && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.items[index]?.rate?.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`rate_type_${index}`}>Rate Type</Label>
                                                        <Select
                                                            value={watch(`items.${index}.rate_type`)}
                                                            onValueChange={(value) => setValue(`items.${index}.rate_type`, value as 'daily' | 'hourly' | 'weekly' | 'monthly')}
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select rate type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="daily">Daily</SelectItem>
                                                                <SelectItem value="weekly">Weekly</SelectItem>
                                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.items?.[index]?.rate_type && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.items[index]?.rate_type?.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`days_${index}`}>Days</Label>
                                                        <Input
                                                            id={`days_${index}`}
                                                            type="number"
                                                            value={watch(`items.${index}.days`)}
                                                            onChange={(e) => setValue(`items.${index}.days`, e.target.value)}
                                                        />
                                                        {errors.items?.[index]?.days && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.items[index]?.days?.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor={`discount_percentage_${index}`}>Discount Percentage</Label>
                                                        <Input
                                                            id={`discount_percentage_${index}`}
                                                            type="number"
                                                            step="0.01"
                                                            value={watch(`items.${index}.discount_percentage`)}
                                                            onChange={(e) => setValue(`items.${index}.discount_percentage`, e.target.value)}
                                                        />
                                                        {errors.items?.[index]?.discount_percentage && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.items[index]?.discount_percentage?.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`notes_${index}`}>Notes</Label>
                                                    <Textarea
                                                        id={`notes_${index}`}
                                                        value={watch(`items.${index}.notes`)}
                                                        onChange={(e) => setValue(`items.${index}.notes`, e.target.value)}
                                                    />
                                                    {errors.items?.[index]?.notes && (
                                                        <p className="text-sm text-red-500">
                                                            {errors.items[index]?.notes?.message}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-gray-600">
                                                        Item Total: {formatCurrency(calculateItemTotal(watch('items')[index]))}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="flex justify-between items-center border-t pt-4">
                                            <div className="text-lg font-semibold">
                                                Total Amount: {formatCurrency(calculateTotal())}
                                            </div>
                                            <div className="space-x-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => window.history.back()}
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={isSubmitting}>
                                                    Create Rental Items
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Dialog */}
            <Dialog open={showQuickActions} onOpenChange={setShowQuickActions}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Quick Actions</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                addItem();
                                setShowQuickActions(false);
                            }}
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                clearAll();
                                setShowQuickActions(false);
                            }}
                            <X className="h-4 w-4 mr-2" />
                            Clear All
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowTemplates(true);
                                setShowQuickActions(false);
                            }}
                            <Save className="h-4 w-4 mr-2" />
                            Load Template
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowTemplateDialog(true);
                                setShowQuickActions(false);
                            }}
                            <Save className="h-4 w-4 mr-2" />
                            Save Template
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                handlePrint();
                                setShowQuickActions(false);
                            }}
                            <Printer className="h-4 w-4 mr-2" />
                            Print Preview
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                handleExportPDF();
                                setShowQuickActions(false);
                            }}
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Template Dialog */}
            <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save as Template</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="templateName">Template Name</Label>
                            <Input
                                id="templateName"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Enter template name"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={saveAsTemplate} disabled={!templateName.trim()}>
                            Save Template
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Templates List Dialog */}
            <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Saved Templates</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Search templates..."
                                value={templateSearch}
                                onChange={(e) => setTemplateSearch(e.target.value)}
                                className="w-full"
                            />
                        </div>
                        {filteredTemplates.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                {templates.length === 0 ? 'No templates saved yet.' : 'No templates match your search.'}
                            </p>
                        ) : (
                            <div className="space-y-2 max-h-[400px] overflow-y-auto">
                                {filteredTemplates.map((template) => (
                                    <div key={template.id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                                        <div className="space-y-1">
                                            <div className="font-medium">{template.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {template.description}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                Created: {new Date(template.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => previewTemplate(template)}
                                                Preview
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => loadTemplate(template)}
                                                Load
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deleteTemplate(template.id)}
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Template Preview Dialog */}
            <Dialog open={showTemplatePreview} onOpenChange={setShowTemplatePreview}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Template Preview</DialogTitle>
                    </DialogHeader>
                    {selectedTemplate && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium">Template Details</h3>
                                    <p className="text-sm text-gray-500">{selectedTemplate.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Created: {new Date(selectedTemplate.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">Total Items: {selectedTemplate.items.length}</p>
                                    <p className="font-medium">
                                        Total Amount: {formatCurrency(
                                            selectedTemplate.items.reduce((sum, item) => {
                                                const rate = parseFloat(item.rate) || 0;
                                                const days = parseInt(item.days) || 0;
                                                const discount = parseFloat(item.discount_percentage) || 0;
                                                const total = rate * days;
                                                return sum + (total - (total * (discount / 100)));
                                            }, 0)
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operator</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedTemplate.items.map((item, index) => {
                                            const equipmentName = equipment.find(eq => eq.id.toString() === item.equipment_id)?.name || '';
                                            const operatorName = operators.find(op => op.id.toString() === item.operator_id)?.name || '';
                                            const total = (parseFloat(item.rate) || 0) * (parseInt(item.days) || 0);
                                            const discountedTotal = total - (total * ((parseFloat(item.discount_percentage) || 0) / 100));

                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{equipmentName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{operatorName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatCurrency(parseFloat(item.rate))} ({item.rate_type})
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.days}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(discountedTotal)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowTemplatePreview(false)}>
                                    Close
                                </Button>
                                <Button onClick={() => {
                                    loadTemplate(selectedTemplate);
                                    setShowTemplatePreview(false);
                                }}>
                                    Load Template
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* PDF Options Dialog */}
            <Dialog open={showPdfOptions} onOpenChange={setShowPdfOptions}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>PDF Export Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label>Orientation</Label>
                            <RadioGroup
                                value={pdfOptions.orientation}
                                onValueChange={(value) => setPdfOptions(prev => ({ ...prev, orientation: value as 'portrait' | 'landscape' }))}
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="portrait" id="portrait" />
                                    <Label htmlFor="portrait">Portrait</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="landscape" id="landscape" />
                                    <Label htmlFor="landscape">Landscape</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label>Page Size</Label>
                            <RadioGroup
                                value={pdfOptions.format}
                                onValueChange={(value) => setPdfOptions(prev => ({ ...prev, format: value as 'a4' | 'letter' }))}
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="a4" id="a4" />
                                    <Label htmlFor="a4">A4</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="letter" id="letter" />
                                    <Label htmlFor="letter">Letter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPdfOptions(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handlePdfOptionsConfirm}>
                            Generate PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* PDF Preview Dialog */}
            <Dialog open={showPdfPreview} onOpenChange={setShowPdfPreview}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>PDF Preview</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <iframe
                            src={pdfUrl}
                            className="w-full h-[600px] border rounded"
                            title="PDF Preview"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowPdfPreview(false)}>
                            Close
                        </Button>
                        <Button onClick={downloadPDF}>
                            Download PDF
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Import Summary Dialog */}
            <Dialog open={showImportSummary} onOpenChange={setShowImportSummary}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Import Summary</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {importErrors.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-medium text-red-600">Errors ({importErrors.length})</h3>
                                <div className="max-h-[200px] overflow-y-auto space-y-2">
                                    {importErrors.map((error, index) => (
                                        <div key={index} className="p-2 bg-red-50 border border-red-200 rounded">
                                            <p className="text-sm text-red-600">
                                                Row {error.row}: {error.message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {importWarnings.length > 0 && (
                            <div className="space-y-2">
                                <h3 className="font-medium text-yellow-600">Warnings ({importWarnings.length})</h3>
                                <div className="max-h-[200px] overflow-y-auto space-y-2">
                                    {importWarnings.map((warning, index) => (
                                        <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                                            <p className="text-sm text-yellow-600">
                                                Row {warning.row}: {warning.message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowImportSummary(false)}>
                            Close
                        </Button>
                        {importErrors.length === 0 && importWarnings.length > 0 && (
                            <Button onClick={() => {
                                setShowImportSummary(false);
                                toast.success('Import completed with warnings');
                            }}>
                                Continue Anyway
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Duplicate Items Dialog */}
            <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Duplicate Equipment Found</DialogTitle>
                    </DialogHeader>
                    {selectedDuplicateGroup && (
                        <div className="space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                                <h3 className="font-medium text-yellow-800">
                                    {selectedDuplicateGroup.equipmentName}
                                </h3>
                                <p className="text-sm text-yellow-600">
                                    Found {selectedDuplicateGroup.indices.length} items with this equipment
                                </p>
                            </div>

                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Operator</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {getDuplicateItems(selectedDuplicateGroup).map(({ index, item, total, operator }) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    Item {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {operator}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency(parseFloat(item.rate))} ({item.rate_type})
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.days}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatCurrency(total)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="space-y-2">
                                <h4 className="font-medium">Choose an action:</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDuplicateAction('keep-first')}
                                        Keep First Item
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDuplicateAction('keep-last')}
                                        Keep Last Item
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDuplicateAction('merge')}
                                        Merge Items
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleDuplicateAction('keep-all')}
                                        Keep All Items
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}



