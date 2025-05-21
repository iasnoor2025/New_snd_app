import React, { useState, useEffect } from 'react';
import { format, parseISO, differenceInDays, addDays } from 'date-fns';
import axios from 'axios';
import { Project, ProjectStatus, Task, ProjectTeamMember } from '../../types/project';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  ArrowLeft,
  Calendar,
  User,
  DollarSign,
  Clock,
  Building,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader2,
  PauseCircle,
  PlayCircle,
  XCircle,
  Users,
  ListTodo,
  Plus,
  Info
} from 'lucide-react';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
  onUpdateStatus: (status: ProjectStatus) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  project,
  onBack,
  onUpdateStatus,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [teamMembers, setTeamMembers] = useState<ProjectTeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchProjectDetails();
  }, [project.id]);

  const fetchProjectDetails = async () => {
    setIsLoading(true);
    try {
      // Fetch tasks
      const tasksResponse = await axios.get(`/api/projects/${project.id}/tasks`);
      setTasks(tasksResponse.data.data);

      // Fetch team members
      const teamResponse = await axios.get(`/api/projects/${project.id}/team`);
      setTeamMembers(teamResponse.data.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTaskProgress = () => {
    if (!tasks || tasks.length === 0) return 0;

    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / tasks.length) * 100);
  };

  const calculateDaysLeft = () => {
    if (!project.end_date) return null;

    const endDate = parseISO(project.end_date);
    const today = new Date();
    return differenceInDays(endDate, today);
  };

  const isOverdue = () => {
    if (!project.end_date || project.status === 'completed') return false;

    const endDate = parseISO(project.end_date);
    return new Date() > endDate;
  };

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

  const getPriorityBadge = (priority: string) => {
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

  const getTaskStatusBadge = (status: string) => {
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

  const daysLeft = calculateDaysLeft();
  const taskProgress = calculateTaskProgress();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl">{project.name}</CardTitle>
            <CardDescription>
              Project #{project.id} - {project.client_name}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onBack}
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column - Project Info */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <Info className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Project Details</h3>
                      <p className="text-sm text-gray-500">
                        {getStatusBadge(project.status)} • {getPriorityBadge(project.priority)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Start Date</span>
                      </div>
                      <span className="font-medium">
                        {format(parseISO(project.start_date), 'MMM dd, yyyy')}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>End Date</span>
                      </div>
                      <span className="font-medium">
                        {project.end_date
                          ? format(parseISO(project.end_date), 'MMM dd, yyyy')
                          : 'Not set'}
                      </span>
                    </div>

                    {daysLeft !== null && project.status !== 'completed' && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{daysLeft < 0 ? 'Overdue by' : 'Days Remaining'}</span>
                        </div>
                        <span className={`font-medium ${daysLeft < 0 ? 'text-red-600' : daysLeft <= 7 ? 'text-amber-600' : 'text-green-600'}`}>
                          {Math.abs(daysLeft)} {Math.abs(daysLeft) === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Budget</span>
                      </div>
                      <span className="font-medium">
                        ${project.budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <User className="h-4 w-4" />
                        <span>Project Manager</span>
                      </div>
                      <span className="font-medium">
                        {project.manager?.first_name} {project.manager?.last_name}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        Client
                      </span>
                      <span className="font-medium">{project.client_name}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contact
                      </span>
                      <span className="font-medium">{project.client_contact}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Description</h4>
                    <p className="text-sm text-gray-700">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Center/Right columns - Progress and Overview */}
                <div className="md:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Project Progress</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Overall Progress</span>
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Task Completion</span>
                            <span className="text-sm font-medium">{taskProgress}%</span>
                          </div>
                          <Progress value={taskProgress} className="h-2" />
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xl font-bold">{tasks.filter(t => t.status === 'completed').length}</div>
                            <div className="text-xs text-gray-500">Completed Tasks</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xl font-bold">{tasks.filter(t => t.status !== 'completed').length}</div>
                            <div className="text-xs text-gray-500">Pending Tasks</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Team Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Team Size</span>
                          <span className="font-medium">{teamMembers.length}</span>
                        </div>

                        {teamMembers.length > 0 ? (
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium">Key Team Members</h4>
                            <div className="space-y-2">
                              {teamMembers.slice(0, 3).map(member => (
                                <div key={member.id} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                      <User className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">
                                        {member.employee?.first_name} {member.employee?.last_name}
                                      </p>
                                      <p className="text-xs text-gray-500">{member.role}</p>
                                    </div>
                                  </div>
                                  <span className="text-xs text-gray-500">{member.allocation_percentage}%</span>
                                </div>
                              ))}
                            </div>

                            {teamMembers.length > 3 && (
                              <div className="text-sm text-primary text-center">
                                +{teamMembers.length - 3} more members
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No team members added yet</p>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          className="w-full mt-2"
                          size="sm"
                          onClick={() => window.location.href = `/projects/${project.id}/team`}
                          <Users className="h-4 w-4 mr-2" />
                          Manage Team
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Alerts and Warnings */}
                  {isOverdue() && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800">Project Overdue</h4>
                          <p className="text-sm text-red-700 mt-1">
                            This project was due on {format(parseISO(project.end_date!), 'MMMM d, yyyy')}
                            and is now {Math.abs(daysLeft!)} {Math.abs(daysLeft!) === 1 ? 'day' : 'days'} overdue.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.status === 'on_hold' && (
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                      <div className="flex items-start gap-2">
                        <PauseCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Project On Hold</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            This project is currently on hold. You can resume it by changing the status to active.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Project Tasks</h3>
                <Button
                  size="sm"
                  onClick={() => window.location.href = `/projects/${project.id}/tasks/create`}
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : tasks.length === 0 ? (
                <div className="border rounded-md p-8 text-center">
                  <ListTodo className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-lg font-medium text-gray-900">No tasks found</p>
                  <p className="text-sm text-gray-500 mt-1">Create tasks to track project progress</p>
                </div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tasks.map(task => (
                        <TableRow key={task.id} className="cursor-pointer hover:bg-gray-50" onClick={() => window.location.href = `/projects/${project.id}/tasks/${task.id}`}>
                          <TableCell className="font-medium">{task.name}</TableCell>
                          <TableCell>
                            {task.assignedEmployee ? (
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                {task.assignedEmployee.first_name} {task.assignedEmployee.last_name}
                              </div>
                            ) : (
                              <span className="text-gray-500">Unassigned</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {task.due_date ? format(parseISO(task.due_date), 'MMM dd, yyyy') : 'Not set'}
                          </TableCell>
                          <TableCell>{getTaskStatusBadge(task.status)}</TableCell>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.href = `/projects/${project.id}/tasks`}
                <ListTodo className="h-4 w-4 mr-2" />
                View All Tasks
              </Button>
            </TabsContent>

            <TabsContent value="team">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">Team Members</h3>
                <Button
                  size="sm"
                  onClick={() => window.location.href = `/projects/${project.id}/team/add`}
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : teamMembers.length === 0 ? (
                <div className="border rounded-md p-8 text-center">
                  <Users className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-lg font-medium text-gray-900">No team members found</p>
                  <p className="text-sm text-gray-500 mt-1">Add team members to collaborate on this project</p>
                </div>
              ) : (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Allocation</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teamMembers.map(member => (
                        <TableRow key={member.id} className="cursor-pointer hover:bg-gray-50" onClick={() => window.location.href = `/projects/${project.id}/team/${member.id}`}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <User className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {member.employee?.first_name} {member.employee?.last_name}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.allocation_percentage}%</TableCell>
                          <TableCell>{format(parseISO(member.start_date), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>
                            {member.end_date ? format(parseISO(member.end_date), 'MMM dd, yyyy') : 'Not set'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={member.is_active ? 'outline' : 'secondary'} className={member.is_active ? 'bg-green-100 text-green-800' : ''}>
                              {member.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.href = `/projects/${project.id}/team`}
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            Back to List
          </Button>

          {project.status !== 'completed' && (
            <Button
              variant="outline"
              onClick={() => window.location.href = `/projects/${project.id}/edit`}
              Edit Project
            </Button>
          )}

          {/* Conditionally render actions based on status */}
          {project.status !== 'active' && project.status !== 'completed' && project.status !== 'cancelled' && (
            <Button
              variant="default"
              onClick={() => onUpdateStatus('active')}
              <PlayCircle className="mr-2 h-4 w-4" />
              Activate Project
            </Button>
          )}

          {project.status === 'active' && (
            <Button
              variant="default"
              onClick={() => onUpdateStatus('on_hold')}
              <PauseCircle className="mr-2 h-4 w-4" />
              Put on Hold
            </Button>
          )}

          {project.status !== 'completed' && project.status !== 'cancelled' && (
            <Button
              variant="default"
              onClick={() => onUpdateStatus('completed')}
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProjectDetails;
