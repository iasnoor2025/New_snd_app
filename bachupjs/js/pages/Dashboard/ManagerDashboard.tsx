import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TeamOverview } from '@/components/dashboard/TeamOverview';
import { ProjectStatus } from '@/components/dashboard/ProjectStatus';
import { ApprovalRequests } from '@/components/dashboard/ApprovalRequests';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { usePermission } from '@/hooks/usePermission';

interface Props {
    teamData: any;
    projects: any[];
    approvalRequests: any[];
    performanceMetrics: any;
}

export const ManagerDashboard: FC<Props> = ({
    teamData,
    projects,
    approvalRequests,
    performanceMetrics
}) => {
    const canViewTeam = usePermission('employees.view');
    const canViewProjects = usePermission('projects.view');
    const canViewApprovals = usePermission('timesheets.approve') || usePermission('leave-requests.approve');

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Size</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {teamData.totalMembers}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {projects.filter(p => p.status === 'active').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {approvalRequests.length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {performanceMetrics.overallScore}%
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="team" className="space-y-4">
                <TabsList>
                    {canViewTeam && (
                        <TabsTrigger value="team">Team Overview</TabsTrigger>
                    )}
                    {canViewProjects && (
                        <TabsTrigger value="projects">Project Status</TabsTrigger>
                    )}
                    {canViewApprovals && (
                        <TabsTrigger value="approvals">Approval Requests</TabsTrigger>
                    )}
                    <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
                </TabsList>

                {canViewTeam && (
                    <TabsContent value="team" className="space-y-4">
                        <TeamOverview data={teamData} />
                    </TabsContent>
                )}

                {canViewProjects && (
                    <TabsContent value="projects" className="space-y-4">
                        <ProjectStatus projects={projects} />
                    </TabsContent>
                )}

                {canViewApprovals && (
                    <TabsContent value="approvals" className="space-y-4">
                        <ApprovalRequests requests={approvalRequests} />
                    </TabsContent>
                )}

                <TabsContent value="performance" className="space-y-4">
                    <PerformanceMetrics metrics={performanceMetrics} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ManagerDashboard;
