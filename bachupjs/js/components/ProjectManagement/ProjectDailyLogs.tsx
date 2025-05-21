import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO, subDays } from 'date-fns';
import { Project, ProjectDailyLog, DailyLogFormData } from '../../types/project';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { DatePicker } from '../ui/date-picker';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  Calendar,
  Edit,
  Eye,
  Plus,
  Trash2,
  Clock,
  FileText,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface ProjectDailyLogsProps {
  projectId: number;
  projectName: string;
}

const ProjectDailyLogs: React.FC<ProjectDailyLogsProps> = ({ projectId, projectName }) => {
  const [dailyLogs, setDailyLogs] = useState<ProjectDailyLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ProjectDailyLog | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<DailyLogFormData>({
    log_date: new Date(),
    description: '',
    hours_worked: 0,
    work_completed: '',
    challenges: null,
    next_steps: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDailyLogs();
  }, [projectId]);

  const fetchDailyLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/projects/${projectId}/daily-logs`);
      setDailyLogs(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching daily logs:', error);
      setError('Failed to load daily logs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof DailyLogFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, log_date: date }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Format the date to YYYY-MM-DD
      const formattedData = {
        ...formData,
        project_id: projectId,
        log_date: format(formData.log_date, 'yyyy-MM-dd'),
      };

      await axios.post(`/api/projects/${projectId}/daily-logs`, formattedData);

      // Reset form and close dialog
      setFormData({
        log_date: new Date(),
        description: '',
        hours_worked: 0,
        work_completed: '',
        challenges: null,
        next_steps: null,
      })

      setIsAddDialogOpen(false);

      // Refresh the list
      fetchDailyLogs();
    } catch (error: any) {
      console.error('Error adding daily log:', error);
      setError(error.response?.data?.message || 'Failed to add daily log');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewLog = (log: ProjectDailyLog) => {
    setSelectedLog(log);
    setIsDetailSheetOpen(true);
  };

  const handleDeleteLog = async (logId: number) => {
    if (!confirm('Are you sure you want to delete this log?')) return;

    try {
      await axios.delete(`/api/projects/${projectId}/daily-logs/${logId}`);
      fetchDailyLogs();
    } catch (error) {
      console.error('Error deleting daily log:', error);
      setError('Failed to delete daily log');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Daily Progress Logs</CardTitle>
            <CardDescription>
              Track daily work and progress for {projectName}
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Log
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Daily Log</DialogTitle>
                <DialogDescription>
                  Record today's work and progress for the project.
                </DialogDescription>
              </DialogHeader>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 my-4">
                <div className="space-y-2">
                  <Label htmlFor="log_date">Date</Label>
                  <DatePicker
                    date={formData.log_date}
                    onSelect={handleDateChange}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours_worked">Hours Worked</Label>
                  <Input
                    id="hours_worked"
                    type="number"
                    min="0"
                    step="0.5"
                    value={formData.hours_worked}
                    onChange={(e) => handleInputChange('hours_worked', parseFloat(e.target.value) || 0)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Summary</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief summary of work done"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work_completed">Work Completed</Label>
                  <Textarea
                    id="work_completed"
                    value={formData.work_completed}
                    onChange={(e) => handleInputChange('work_completed', e.target.value)}
                    placeholder="Detailed description of work completed today"
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges (Optional)</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges || ''}
                    onChange={(e) => handleInputChange('challenges', e.target.value)}
                    placeholder="Any challenges or blockers faced"
                    rows={2}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="next_steps">Next Steps (Optional)</Label>
                  <Textarea
                    id="next_steps"
                    value={formData.next_steps || ''}
                    onChange={(e) => handleInputChange('next_steps', e.target.value)}
                    placeholder="Planned next steps or tasks"
                    rows={2}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isSubmitting}
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.description || !formData.work_completed}
                  {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Log'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                    <span className="text-sm text-gray-500 mt-2 block">Loading daily logs...</span>
                  </TableCell>
                </TableRow>
              ) : dailyLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <FileText className="h-6 w-6 text-gray-400 mx-auto" />
                    <span className="text-sm text-gray-500 mt-2 block">No daily logs found.</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setIsAddDialogOpen(true)}
                      <Plus className="h-4 w-4 mr-2" />
                      Add your first log
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                dailyLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {format(parseISO(log.log_date), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{log.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {log.hours_worked} hrs
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewLog(log)}
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteLog(log.id)}
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Log Details Side Sheet */}
      <Sheet open={isDetailSheetOpen && !!selectedLog} onOpenChange={setIsDetailSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className="pb-4">
            <SheetTitle>Daily Log Details</SheetTitle>
            <SheetDescription>
              {selectedLog && format(parseISO(selectedLog.log_date), 'MMMM d, yyyy')}
            </SheetDescription>
          </SheetHeader>

          {selectedLog && (
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Hours Worked</h3>
                <p className="mt-1 text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  {selectedLog.hours_worked} hours
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500">Summary</h3>
                <p className="mt-1">{selectedLog.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500">Work Completed</h3>
                <p className="mt-1 whitespace-pre-line">{selectedLog.work_completed}</p>
              </div>

              {selectedLog.challenges && (
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Challenges</h3>
                    <p className="mt-1 whitespace-pre-line">{selectedLog.challenges}</p>
                  </div>
                </>
              )}

              {selectedLog.next_steps && (
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Next Steps</h3>
                    <p className="mt-1 whitespace-pre-line">{selectedLog.next_steps}</p>
                  </div>
                </>
              )}

              <Separator />

              <div className="text-sm text-gray-500">
                <p>Logged by: {selectedLog.user?.name || 'Unknown'}</p>
                <p>Created: {format(parseISO(selectedLog.created_at), 'MMM dd, yyyy h:mm a')}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default ProjectDailyLogs;
