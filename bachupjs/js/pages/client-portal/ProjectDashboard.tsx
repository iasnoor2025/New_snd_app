import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ClientPortalLayout from '@/layouts/client-portal-layout';

// Register ChartJS components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Task {
  id: number;
  name: string;
  due_date: string;
  status: string;
  progress: number;
}

interface Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string | null;
  status: string;
  budget: number;
  progress: number;
  tasks: Task[];
}

interface Props {
  projects: Project[];
}

export default function ProjectDashboard({ projects }: Props) {
  const formatStatus = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
      active: {
        variant: "outline",
        icon: <Clock className="h-3.5 w-3.5 mr-1 text-blue-500" />
      },
      completed: {
        variant: "default",
        icon: <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
      },
      on_hold: {
        variant: "secondary",
        icon: <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-500" />
      },
      cancelled: {
        variant: "destructive",
        icon: <XCircle className="h-3.5 w-3.5 mr-1 text-red-500" />
      }
    };

    return statusMap[status] || { variant: "outline", icon: null };
  };

  // Chart data for project progress
  const chartData = {
    labels: projects.map(p => p.name),
    datasets: [
      {
        label: 'Progress (%)',
        data: projects.map(p => p.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Project Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Active tasks across all projects
  const activeTasks = projects.flatMap(project =>
    project.tasks.filter(task => task.status !== 'completed');
  );

  // Sort tasks by due date
  const upcomingDeadlines = [...activeTasks];
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
    .slice(0, 5);

  return (
      <Head title="Client Project Dashboard" />

      <ClientPortalLayout>
        <div className="container mx-auto py-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Project Dashboard</h1>
            <p className="text-muted-foreground mt-1">View and monitor your projects</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-500" />
                  Total Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{projects.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-amber-500" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {projects.filter(p => p.status === 'active').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-500" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{upcomingDeadlines.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="tasks">Upcoming Tasks</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Projects</CardTitle>
                  <CardDescription>Overview of all your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Timeline</TableHead>
                          <TableHead>Progress</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => {
                          const { variant, icon } = formatStatus(project.status);

                          return (
                            <TableRow key={project.id}>
                              <TableCell className="font-medium">
                                {project.name}
                              </TableCell>
                              <TableCell>
                                <Badge variant={variant} className="flex w-fit items-center">
                                  {icon}
                                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {format(new Date(project.start_date), 'MMM d, yyyy')}
                                {' - '}
                                {project.end_date
                                  ? format(new Date(project.end_date), 'MMM d, yyyy')
                                  : 'Ongoing'}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={project.progress}
                                    className="h-2 w-[100px]"
                                  />
                                  <span className="text-sm text-muted-foreground">
                                    {project.progress}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Link href={route('client.projects.show', [project.id])}>
                                  <Button variant="outline" size="sm">
                                    View Details
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Upcoming Tasks</CardTitle>
                  <CardDescription>Tasks with approaching deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingDeadlines.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Task</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {upcomingDeadlines.map((task) => {
                            const { variant, icon } = formatStatus(task.status);

                            return (
                              <TableRow key={task.id}>
                                <TableCell className="font-medium">
                                  {task.name}
                                </TableCell>
                                <TableCell>
                                  {format(new Date(task.due_date), 'MMM d, yyyy')}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={variant} className="flex w-fit items-center">
                                    {icon}
                                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={task.progress}
                                      className="h-2 w-[100px]"
                                    />
                                    <span className="text-sm text-muted-foreground">
                                      {task.progress}%
                                    </span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center py-6">
                      <p className="text-muted-foreground">No upcoming tasks</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Project Analytics</CardTitle>
                  <CardDescription>Visual overview of your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ClientPortalLayout>
    </>
  );
}


