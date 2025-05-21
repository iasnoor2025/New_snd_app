import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Project, ProjectStatus } from '../../types/project';
import { Employee } from '../../types/employee';
import ProjectList from '../../components/ProjectManagement/ProjectList';
import ProjectForm from '../../components/ProjectManagement/ProjectForm';
import ProjectDetails from '../../components/ProjectManagement/ProjectDetails';
import { Breadcrumbs } from '../../components/ui/breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  ChevronDown,
  Download,
  Plus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to load employees');
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load project data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = () => {
    setActiveTab('create');
  };

  const handleProjectCreated = () => {
    setActiveTab('list');
    fetchProjects();
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('details');
  };

  const handleUpdateStatus = async (projectId: number, status: ProjectStatus) => {
    try {
      await axios.post(`/api/projects/${projectId}/update-status`, { status })
      fetchProjects();
      if (selectedProject?.id === projectId) {
        const response = await axios.get(`/api/projects/${projectId}`);
        setSelectedProject(response.data.data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update project status');
    }
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      const response = await axios.get(`/api/projects/export?format=${format}`, {
        responseType: 'blob',
      })

      // Create a download link and trigger it
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `projects.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting projects:', error);
      setError('Failed to export projects');
    }
  };

  const handleBackToList = () => {
    setActiveTab('list');
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', href: '/' },
              { title: 'Project Management', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight">Project Management</h1>
          <p className="text-muted-foreground">
            Manage project details, tasks, and team members
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => fetchProjects()}
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleCreateProject} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Project
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
          <TabsTrigger value="list">Project List</TabsTrigger>
          <TabsTrigger value="create">Create Project</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedProject}>
            Project Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                View and manage your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectList
                projects={projects}
                isLoading={isLoading}
                onViewProject={handleViewProject}
                onUpdateStatus={handleUpdateStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <ProjectForm
            employees={employees}
            onProjectCreated={handleProjectCreated}
            onCancel={handleBackToList}
          />
        </TabsContent>

        <TabsContent value="details">
          {selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onBack={handleBackToList}
              onUpdateStatus={(status) => handleUpdateStatus(selectedProject.id, status)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManagement;
