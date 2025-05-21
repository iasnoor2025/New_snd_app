import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Task, TaskStatus } from '../../types/project';
import { Employee } from '../../types/employee';
import TaskList from '../../components/ProjectManagement/TaskList';
import TaskForm from '../../components/ProjectManagement/TaskForm';
import { Breadcrumbs } from '../../components/ui/breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  ChevronLeft,
  Plus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const TaskManagement: React.FC = () => {
  const params = useParams();
  const projectId = params.projectId;
  const [activeTab, setActiveTab] = useState('list');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchEmployees();
      fetchTasks();
      fetchProjectName();
    }
  }, [projectId]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to load employees');
    }
  };

  const fetchTasks = async () => {
    if (!projectId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/projects/${projectId}/tasks`);
      setTasks(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load task data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectName = async () => {
    if (!projectId) return;

    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      setProjectName(response.data.data.name);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleCreateTask = () => {
    setActiveTab('create');
  };

  const handleTaskCreated = () => {
    setActiveTab('list');
    fetchTasks();
  };

  const handleUpdateStatus = async (taskId: number, status: TaskStatus) => {
    try {
      await axios.post(`/api/tasks/${taskId}/update-status`, { status })
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      setError('Failed to update task status');
    }
  };

  const handleBackToProject = () => {
    window.location.href = `/projects/${projectId}`;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', href: '/' },
              { title: 'Projects', href: '/projects' },
              { title: projectName, href: `/projects/${projectId}` },
              { title: 'Tasks', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight">Project Tasks</h1>
          <p className="text-muted-foreground">
            Manage tasks for {projectName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleBackToProject}
            <ChevronLeft className="h-4 w-4" />
            Back to Project
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={fetchTasks}
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={handleCreateTask} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Task List</TabsTrigger>
          <TabsTrigger value="create">Create Task</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                View and manage project tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onUpdateStatus={handleUpdateStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          {projectId && (
            <TaskForm
              projectId={Number(projectId)}
              employees={employees}
              parentTasks={tasks.filter(task => !task.parent_task_id)}
              onTaskCreated={handleTaskCreated}
              onCancel={() => setActiveTab('list')}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManagement;
