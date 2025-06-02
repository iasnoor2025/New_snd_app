import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Filter, Download, Eye, Calendar, User, Database, AlertCircle } from 'lucide-react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { DatePicker } from '@/Components/ui/date-picker';
import { Input } from '@/Components/ui/input';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { formatDateTime } from '@/utils/date';
import { cn } from '@/lib/utils';
import useTranslation from '@/hooks/useTranslation';

interface AuditLog {
    id: number;
    event: string;
    subject_type: string;
    subject_id: number;
    causer_type?: string;
    causer_id?: number;
    properties?: {
        ip_address?: string;
        user_agent?: string;
        old?: Record<string, any>;
        attributes?: Record<string, any>;
    };
    created_at: string;
    updated_at: string;
    causer?: {
        id: number;
        name: string;
        email: string;
    };
}

interface PaginatedLogs {
    data: AuditLog[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface AuditStats {
    total_logs: number;
    active_users: number;
    today_logs: number;
    critical_events: number;
}

interface FilterData {
    event: string;
    model_type: string;
    model_id: string;
    user_id: string;
    from_date: string;
    to_date: string;
    search: string;
}

interface IndexProps {
    logs: PaginatedLogs;
    filters: FilterData;
    eventTypes: string[];
    modelTypes: string[];
    stats?: AuditStats;
}

const Index: React.FC<IndexProps> = ({ logs, filters, eventTypes, modelTypes, stats }) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState<FilterData>({
        event: filters.event || '',
        model_type: filters.model_type || '',
        model_id: filters.model_id || '',
        user_id: filters.user_id || '',
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
        search: filters.search || ''
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (name: keyof FilterData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = () => {
        setIsLoading(true);
        router.get(route('audit-compliance.audit-logs.index'), formData, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(false)
        });
    };

    const resetFilters = () => {
        const resetData: FilterData = {
            event: '',
            model_type: '',
            model_id: '',
            user_id: '',
            from_date: '',
            to_date: '',
            search: ''
        };
        setFormData(resetData);
        setIsLoading(true);
        router.get(route('audit-compliance.audit-logs.index'), resetData, {
            onFinish: () => setIsLoading(false)
        });
    };

    const exportLogs = () => {
        router.get(route('audit-compliance.audit-logs.export'), formData);
    };

  const formatDate = (date: Date | null): string | null => {
    if (!date) return null;
    return date.toISOString().split('T')[0];
  };

  const getEventBadge = (event: string) => {
    const eventConfig = {
      'created': { variant: 'default', color: 'bg-green-100 text-green-800', label: 'Created' },
      'updated': { variant: 'secondary', color: 'bg-blue-100 text-blue-800', label: 'Updated' },
      'deleted': { variant: 'destructive', color: 'bg-red-100 text-red-800', label: 'Deleted' },
      'restored': { variant: 'outline', color: 'bg-purple-100 text-purple-800', label: 'Restored' },
      'login': { variant: 'default', color: 'bg-green-100 text-green-800', label: 'Login' },
      'logout': { variant: 'secondary', color: 'bg-gray-100 text-gray-800', label: 'Logout' },
      'failed_login': { variant: 'destructive', color: 'bg-red-100 text-red-800', label: 'Failed Login' },
      'password_changed': { variant: 'outline', color: 'bg-yellow-100 text-yellow-800', label: 'Password Changed' },
      'permission_granted': { variant: 'default', color: 'bg-green-100 text-green-800', label: 'Permission Granted' },
      'permission_revoked': { variant: 'destructive', color: 'bg-red-100 text-red-800', label: 'Permission Revoked' }
    };

    const config = eventConfig[event] || { variant: 'default', color: 'bg-gray-100 text-gray-800', label: event };

    return (
      <Badge
        variant={config.variant}
        className={cn('text-xs font-medium', config.color)}
      >
        {config.label}
      </Badge>
    );
  };

  return (
    <AppLayout
      title="Audit Logs"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Audit Logs
        </h2>
      )}
    >
      <Head title="Audit Logs" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Type</label>
                  <Select
                    value={formData.event}
                    onValueChange={(value) => handleChange('event', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Events</SelectItem>
                      {eventTypes.map(event => (
                        <SelectItem key={event} value={event}>{event}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Model Type</label>
                  <Select
                    value={formData.model_type}
                    onValueChange={(value) => handleChange('model_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Models</SelectItem>
                      {modelTypes.map(model => {
                        const displayName = model.split('\\').pop();
                        return (
                          <SelectItem key={model} value={model}>{displayName}</SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Model ID</label>
                  <Input
                    type="text"
                    value={formData.model_id}
                    onChange={(e) => handleChange('model_id', e.target.value)}
                    placeholder="Enter model ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">User ID</label>
                  <Input
                    type="text"
                    value={formData.user_id}
                    onChange={(e) => handleChange('user_id', e.target.value)}
                    placeholder="Enter user ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">From Date</label>
                  <DatePicker
                    date={formData.from_date}
                    setDate={(date) => handleChange('from_date', date)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">To Date</label>
                  <DatePicker
                    date={formData.to_date}
                    setDate={(date) => handleChange('to_date', date)}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={resetFilters}>Reset</Button>
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Audit Logs ({logs.total || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {logs.data && logs.data.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16">ID</TableHead>
                <TableHead className="min-w-40">Date & Time</TableHead>
                <TableHead className="min-w-32">User</TableHead>
                <TableHead className="min-w-24">Event</TableHead>
                <TableHead className="min-w-32">Model</TableHead>
                <TableHead className="w-24">Model ID</TableHead>
                <TableHead className="min-w-32">IP Address</TableHead>
                <TableHead className="w-32">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.data.map((log) => (
                          <TableRow key={log.id} className="hover:bg-gray-50">
                            <TableCell className="font-mono text-sm">{log.id}</TableCell>
                            <TableCell className="text-sm">
                              <div className="flex flex-col">
                                <span>{formatDateTime(log.created_at)}</span>
                                <span className="text-xs text-gray-500">
                                  {new Date(log.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">
                                  {log.causer?.name || 'System'}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getEventBadge(log.event)}
                            </TableCell>
                            <TableCell className="text-sm font-mono">
                              {log.subject_type?.split('\\').pop() || log.subject_type}
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {log.subject_id}
                            </TableCell>
                            <TableCell className="text-sm font-mono">
                              {log.properties?.ip_address || '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={route('audit-compliance.audit-logs.show', log.id)}
                                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </Link>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {logs.links && (
                    <div className="mt-6">
                      <Pagination links={logs.links} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">No audit logs found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search filters</p>
                  {Object.values(formData).some(value => value !== '') && (
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
