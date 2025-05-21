import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportTemplate, User } from '@/types/models';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Download, Filter, Save, Calendar, PlayCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';
import DataSourceSelector from '@/components/Reports/DataSourceSelector';
import ColumnSelector from '@/components/Reports/ColumnSelector';
import FilterBuilder from '@/components/Reports/FilterBuilder';
import GroupBySelector from '@/components/Reports/GroupBySelector';
import AggregationBuilder from '@/components/Reports/AggregationBuilder';
import SortingSelector from '@/components/Reports/SortingSelector';
import VisualizationSelector from '@/components/Reports/VisualizationSelector';
import ReportPreview from '@/components/Reports/ReportPreview';
import SaveTemplateModal from '@/components/Reports/SaveTemplateModal';
import ScheduleReportModal from '@/components/Reports/ScheduleReportModal';

interface Props extends PageProps {
    templates: ReportTemplate[];
    dataSources: Record<string, string>
    columns: Record<string, string[]>
    aggregationFunctions: Record<string, string>
    filterOperators: Record<string, string>
    visualizationTypes: string[];
    exportFormats: Record<string, string>
    scheduleFrequencies: Record<string, string>
    daysOfWeek: Record<number, string>
    daysOfMonth: Record<number, string>
    times: Record<string, string>
    recipients: User[];
}

export default function Builder({
    templates,
    dataSources,
    columns,
    aggregationFunctions,
    filterOperators,
    visualizationTypes,
    exportFormats,
    scheduleFrequencies,
    daysOfWeek,
    daysOfMonth,
    times,
    recipients,
}: Props) {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('build');
    const [selectedTemplate, setSelectedTemplate] = useState<string>('');
    const [reportName, setReportName] = useState<string>('New Report');
    const [dataSource, setDataSource] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const [groupBy, setGroupBy] = useState<string>('');
    const [aggregations, setAggregations] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [visualizationType, setVisualizationType] = useState<string>('table');
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
    const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);

    const loadTemplate = (templateId: string) => {
        const template = templates.find(t => t.id.toString() === templateId);
        if (!template) return;

        try {
            const params = JSON.parse(template.parameters);
            setReportName(template.name);
            setDataSource(params.data_source || '');
            setSelectedColumns(params.columns || []);
            setFilters(params.filters || []);
            setGroupBy(params.group_by || '');
            setAggregations(params.aggregations || []);
            setSortBy(params.sort_by || '');
            setSortDirection(params.sort_direction || 'asc');
            setVisualizationType(params.visualization_type || 'table');

            toast({
                title: 'Template Loaded',
                description: `Loaded template: ${template.name}`,
            })
        } catch (e) {
            toast({
                variant: 'destructive',
                title: 'Error Loading Template',
                description: 'Failed to parse template parameters.',
            })
        }
    };

    const generateReport = async () => {
        if (!dataSource) {
            setError('Please select a data source');
            return;
        }

        if (selectedColumns.length === 0) {
            setError('Please select at least one column');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(route('reports.builder.generate'), {
                data_source: dataSource,
                columns: selectedColumns,
                filters: filters,
                group_by: groupBy,
                aggregations: aggregations,
                sort_by: sortBy,
                sort_direction: sortDirection,
                visualization_type: visualizationType,
                report_name: reportName,
            })

            setReportData(response.data);
            setActiveTab('preview');
            toast({
                title: 'Report Generated',
                description: 'Your report has been generated successfully.',
            })
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to generate report. Please try again.');
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || 'Failed to generate report. Please try again.',
            })
        } finally {
            setLoading(false);
        }
    };

    const exportReport = async (format: string) => {
        if (!reportData) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No report data to export. Please generate a report first.',
            })
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                route('reports.builder.export'),;
                {
                    data: reportData,
                    format: format,
                    filename: reportName.replace(/\s+/g, '_').toLowerCase(),
                },
                { responseType: 'blob' }
            );

            // Create a blob and download the file
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${reportName.replace(/\s+/g, '_').toLowerCase()}.${format}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: 'Report Exported',
                description: `Report has been exported as ${format.toUpperCase()}`,
            })
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Export Failed',
                description: 'Failed to export report. Please try again.',
            })
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTemplate = async (name: string, description: string, isPublic: boolean) => {
        if (!dataSource) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please select a data source before saving as a template.',
            })
            return;
        }

        if (selectedColumns.length === 0) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please select at least one column before saving as a template.',
            })
            return;
        }

        try {
            await axios.post(route('reports.builder.template'), {
                name,
                description,
                is_public: isPublic,
                data_source: dataSource,
                columns: selectedColumns,
                filters: filters,
                group_by: groupBy,
                aggregations: aggregations,
                sort_by: sortBy,
                sort_direction: sortDirection,
                visualization_type: visualizationType,
            })

            setShowSaveModal(false);
            toast({
                title: 'Template Saved',
                description: 'Report template has been saved successfully.',
            })
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || 'Failed to save template. Please try again.',
            })
        }
    };

    return (
        <AdminLayout title="Report Builder" breadcrumbs={[
            { title: 'Dashboard', href: route('dashboard') },
            { title: 'Reports', href: route('reports.index') },
            { title: 'Builder', href: route('reports.builder') }
        ]}>
            <Head title="Report Builder" />

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Custom Report Builder</h1>
                        <p className="text-gray-500">
                            Create, customize, and schedule your own reports
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowSaveModal(true)}
                            <Save className="w-4 h-4 mr-2" />
                            Save Template
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowScheduleModal(true)}
                            disabled={!reportData}
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="build">Build Report</TabsTrigger>
                        <TabsTrigger value="preview" disabled={!reportData}>Preview Report</TabsTrigger>
                    </TabsList>

                    <TabsContent value="build" className="space-y-4 mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Report Configuration</CardTitle>
                                <CardDescription>Define the parameters for your custom report</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Report name and template selection */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="reportName">Report Name</Label>
                                        <Input
                                            id="reportName"
                                            value={reportName}
                                            onChange={(e) => setReportName(e.target.value)}
                                            placeholder="Enter a name for your report"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="template">Load Template</Label>
                                        <Select
                                            value={selectedTemplate}
                                            onValueChange={(value) => {
                                                setSelectedTemplate(value);
                                                loadTemplate(value);
                                            }}
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a template" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">None</SelectItem>
                                                {templates.map((template) => (
                                                    <SelectItem key={template.id} value={template.id.toString()}>
                                                        {template.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator />

                                {/* Data source and columns */}
                                <DataSourceSelector
                                    dataSources={dataSources}
                                    value={dataSource}
                                    onChange={setDataSource}
                                />

                                {dataSource && (
                                    <ColumnSelector
                                        columns={columns[dataSource] || []}
                                        selectedColumns={selectedColumns}
                                        onChange={setSelectedColumns}
                                    />
                                )}

                                <Separator />

                                {/* Filters */}
                                {dataSource && (
                                    <FilterBuilder
                                        columns={columns[dataSource] || []}
                                        operators={filterOperators}
                                        filters={filters}
                                        onChange={setFilters}
                                    />
                                )}

                                <Separator />

                                {/* Group by and aggregations */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {dataSource && (
                                        <GroupBySelector
                                            columns={columns[dataSource] || []}
                                            value={groupBy}
                                            onChange={setGroupBy}
                                        />
                                    )}

                                    {groupBy && (
                                        <AggregationBuilder
                                            columns={columns[dataSource] || []}
                                            functions={aggregationFunctions}
                                            aggregations={aggregations}
                                            onChange={setAggregations}
                                        />
                                    )}
                                </div>

                                <Separator />

                                {/* Sorting */}
                                {dataSource && (
                                    <SortingSelector
                                        columns={groupBy ? [groupBy, ...aggregations.map(a => a.alias || `${a.function}_${a.field}`)] : columns[dataSource] || []}
                                        sortBy={sortBy}
                                        sortDirection={sortDirection}
                                        onSortByChange={setSortBy}
                                        onSortDirectionChange={setSortDirection}
                                    />
                                )}

                                <Separator />

                                {/* Visualization */}
                                <VisualizationSelector
                                    visualizationTypes={visualizationTypes}
                                    value={visualizationType}
                                    onChange={setVisualizationType}
                                />

                                {/* Error display */}
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setReportName('New Report');
                                        setDataSource('');
                                        setSelectedColumns([]);
                                        setFilters([]);
                                        setGroupBy('');
                                        setAggregations([]);
                                        setSortBy('');
                                        setSortDirection('asc');
                                        setVisualizationType('table');
                                        setSelectedTemplate('');
                                        setReportData(null);
                                    }}
                                    Reset
                                </Button>
                                <Button onClick={generateReport} disabled={loading}>
                                    {loading ? 'Generating...' : 'Generate Report'} <PlayCircle className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-4 mt-4">
                        {reportData && (
                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>{reportName}</CardTitle>
                                            <CardDescription>
                                                Preview your generated report
                                            </CardDescription>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Select onValueChange={exportReport}>
                                                <SelectTrigger className="w-32">
                                                    <SelectValue placeholder="Export" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.entries(exportFormats).map(([key, label]) => (
                                                        <SelectItem key={key} value={key}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ReportPreview
                                        data={reportData}
                                        visualizationType={visualizationType}
                                    />
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Modals */}
            <SaveTemplateModal
                open={showSaveModal}
                onOpenChange={setShowSaveModal}
                onSave={handleSaveTemplate}
            />

            <ScheduleReportModal
                open={showScheduleModal}
                onOpenChange={setShowScheduleModal}
                reportData={{
                    report_name: reportName,
                    data_source: dataSource,
                    columns: selectedColumns,
                    filters: filters,
                    group_by: groupBy,
                    aggregations: aggregations,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    visualization_type: visualizationType,
                }}
                frequencies={scheduleFrequencies}
                daysOfWeek={daysOfWeek}
                daysOfMonth={daysOfMonth}
                times={times}
                formats={exportFormats}
                recipients={recipients}
            />
        </AdminLayout>
    );
}


