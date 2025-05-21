import React, { useState } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import { Project, ProjectStatus, ProjectPriority } from '../../types/project';
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
  PauseCircle,
  PlayCircle,
  CheckCircle,
  XCircle,
  Users,
  ListTodo
} from 'lucide-react';

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  onViewProject: (project: Project) => void;
  onUpdateStatus: (projectId: number, status: ProjectStatus) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  isLoading,
  onViewProject,
  onUpdateStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<ProjectPriority | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(
    (project) =>
      (statusFilter === 'all' || project.status === statusFilter) &&
      (priorityFilter === 'all' || project.priority === priorityFilter) &&
      (searchQuery === '' || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.client_name.toLowerCase().includes(searchQuery.toLowerCase()));
  );

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Active</Badge>
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Completed</Badge>
      case 'on_hold':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">On Hold</Badge>
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>
      case 'planning':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Planning</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  };

  const getPriorityBadge = (priority: ProjectPriority) => {
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

  const isOverdue = (project: Project) => {
    if (project.status === 'completed' || !project.end_date) {
      return false;
    }

    const endDate = parseISO(project.end_date);
    return isAfter(new Date(), endDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as ProjectStatus | 'all')}
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority-filter">Priority</Label>
          <Select
            value={priorityFilter}
            onValueChange={(value) => setPriorityFilter(value as ProjectPriority | 'all')}
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
            placeholder="Search by project name or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">Loading projects...</span>
                </TableCell>
              </TableRow>
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <Calendar className="h-6 w-6 text-gray-400 mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">No projects found.</span>
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow
                  key={project.id}
                  className={isOverdue(project) && project.status !== 'completed' ? 'bg-red-50' : undefined}
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>{format(parseISO(project.start_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    {project.end_date ? (
                      <div className="flex items-center gap-1">
                        {format(parseISO(project.end_date), 'MMM dd, yyyy')}
                        {isOverdue(project) && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>{getPriorityBadge(project.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{project.progress}%</span>
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
                        <DropdownMenuItem onClick={() => onViewProject(project)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => window.location.href = `/projects/${project.id}/tasks`}>
                          <ListTodo className="mr-2 h-4 w-4" />
                          Manage Tasks
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => window.location.href = `/projects/${project.id}/team`}>
                          <Users className="mr-2 h-4 w-4" />
                          Team Members
                        </DropdownMenuItem>

                        {/* Status update actions */}
                        {project.status !== 'active' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(project.id, 'active')}>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Set as Active
                          </DropdownMenuItem>
                        )}

                        {project.status !== 'on_hold' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(project.id, 'on_hold')}>
                            <PauseCircle className="mr-2 h-4 w-4" />
                            Put on Hold
                          </DropdownMenuItem>
                        )}

                        {project.status !== 'completed' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(project.id, 'completed')}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                        )}

                        {project.status !== 'cancelled' && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(project.id, 'cancelled')}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Project
                          </DropdownMenuItem>
                        )}
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

export default ProjectList;



