import React, { useState } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import { Task, TaskStatus, TaskPriority } from '../../types/project';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  MoreHorizontal,
  Eye,
  Calendar,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  User,
  Play,
  Trash2
} from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onUpdateStatus: (taskId: number, status: TaskStatus) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onUpdateStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(
    (task) =>
      (statusFilter === 'all' || task.status === statusFilter) &&
      (priorityFilter === 'all' || task.priority === priorityFilter) &&
      (searchQuery === '' || 
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));
  );

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Pending</Badge>
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">In Progress</Badge>
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>
      case 'overdue':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Overdue</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  };

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-300">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Medium</Badge>
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  };

  const isOverdue = (task: Task) => {
    if (task.status === 'completed' || task.status === 'cancelled' || !task.due_date) {
      return false;
    }

    const dueDate = parseISO(task.due_date);
    return isAfter(new Date(), dueDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as TaskStatus | 'all')}
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-filter">Priority</Label>
          <Select
            value={priorityFilter}
            onValueChange={(value) => setPriorityFilter(value as TaskPriority | 'all')}
            <SelectTrigger id="priority-filter" className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by task name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">Loading tasks...</span>
                </TableCell>
              </TableRow>
            ) : filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Calendar className="h-6 w-6 text-gray-400 mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">No tasks found.</span>
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow
                  key={task.id}
                  className={isOverdue(task) && task.status !== 'completed' ? 'bg-red-50' : undefined}
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>
                    {task.assignedEmployee ? (
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <User className="h-4 w-4" />
                        </div>
                        <span>{task.assignedEmployee.first_name} {task.assignedEmployee.last_name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {task.due_date ? (
                      <div className="flex items-center gap-1">
                        {format(parseISO(task.due_date), 'MMM dd, yyyy')}
                        {isOverdue(task) && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.location.href = `/tasks/${task.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => window.location.href = `/tasks/${task.id}/edit`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Edit Task
                        </DropdownMenuItem>

                        {/* Status update actions */}
                        {task.status === 'pending' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(task.id, 'in_progress')}>
                            <Play className="mr-2 h-4 w-4" />
                            Start Task
                          </DropdownMenuItem>
                        )}

                        {(task.status === 'pending' || task.status === 'in_progress') && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(task.id, 'completed')}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                        )}

                        {task.status !== 'cancelled' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(task.id, 'cancelled')}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Task
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem onClick={() => window.confirm('Are you sure you want to delete this task?') &&
                          window.location.href = `/tasks/${task.id}/delete`}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskList;



