import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { DatePicker } from '@/Components/ui/date-picker';
import { Input } from '@/Components/ui/input';
import { formatDateTime } from '@/utils/date';

const Index = ({ logs, filters, eventTypes, modelTypes }) => {
  const [formState, setFormState] = useState({
    event: filters.event || '',
    model_type: filters.model_type || '',
    model_id: filters.model_id || '',
    user_id: filters.user_id || '',
    from_date: filters.from_date ? new Date(filters.from_date) : null,
    to_date: filters.to_date ? new Date(filters.to_date) : null,
  });

  const handleChange = (name, value) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    Inertia.get(route('audit.logs'), {
      ...formState,
      from_date: formState.from_date ? formatDate(formState.from_date) : null,
      to_date: formState.to_date ? formatDate(formState.to_date) : null,
    }, { preserveState: true });
  };

  const resetFilters = () => {
    setFormState({
      event: '',
      model_type: '',
      model_id: '',
      user_id: '',
      from_date: null,
      to_date: null,
    });
    Inertia.get(route('audit.logs'));
  };

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const getEventBadge = (event) => {
    const eventMap = {
      'created': 'bg-green-500',
      'updated': 'bg-blue-500',
      'deleted': 'bg-red-500',
      'restored': 'bg-yellow-500',
    };

    return (
      <Badge className={eventMap[event] || 'bg-gray-400'}>
        {event}
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
                    value={formState.event}
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
                    value={formState.model_type}
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
                    value={formState.model_id}
                    onChange={(e) => handleChange('model_id', e.target.value)}
                    placeholder="Enter model ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">User ID</label>
                  <Input
                    type="text"
                    value={formState.user_id}
                    onChange={(e) => handleChange('user_id', e.target.value)}
                    placeholder="Enter user ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">From Date</label>
                  <DatePicker
                    date={formState.from_date}
                    setDate={(date) => handleChange('from_date', date)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">To Date</label>
                  <DatePicker
                    date={formState.to_date}
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

          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Date/Time</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Model ID</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.data.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.id}</TableCell>
                      <TableCell>{formatDateTime(log.created_at)}</TableCell>
                      <TableCell>{log.user ? log.user.name : 'System'}</TableCell>
                      <TableCell>{getEventBadge(log.event)}</TableCell>
                      <TableCell>{log.auditable_type.split('\\').pop()}</TableCell>
                      <TableCell>{log.auditable_id}</TableCell>
                      <TableCell>
                        <Link href={route('audit.logs.show', log.id)}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}

                  {logs.data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No audit logs found matching the criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="mt-6">
                <Pagination links={logs.links} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
