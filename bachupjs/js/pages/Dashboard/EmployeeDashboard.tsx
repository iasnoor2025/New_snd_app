import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TimesheetOverview } from '@/components/dashboard/TimesheetOverview';
import { LeaveRequestStatus } from '@/components/dashboard/LeaveRequestStatus';
import { PersonalInfo } from '@/components/dashboard/PersonalInfo';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { usePermission } from '@/hooks/usePermission';

interface Props {
    timesheets: any[];
    leaveRequests: any[];
    personalInfo: any;
    recentActivities: any[];
}

export const EmployeeDashboard: FC<Props> = ({
    timesheets,
    leaveRequests,
    personalInfo,
    recentActivities
}) => {
    const canViewTimesheets = usePermission('timesheets.view');
    const canViewLeaveRequests = usePermission('leave-requests.view');

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Hours This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {timesheets.reduce((acc, ts) => acc + ts.hours, 0)}h
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {personalInfo.leaveBalance} days
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {leaveRequests.filter(lr => lr.status === 'pending').length}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {recentActivities.length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="timesheets" className="space-y-4">
                <TabsList>
                    {canViewTimesheets && (
                        <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
                    )}
                    {canViewLeaveRequests && (
                        <TabsTrigger value="leave-requests">Leave Requests</TabsTrigger>
                    )}
                    <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                    <TabsTrigger value="activities">Recent Activities</TabsTrigger>
                </TabsList>

                {canViewTimesheets && (
                    <TabsContent value="timesheets" className="space-y-4">
                        <TimesheetOverview timesheets={timesheets} />
                    </TabsContent>
                )}

                {canViewLeaveRequests && (
                    <TabsContent value="leave-requests" className="space-y-4">
                        <LeaveRequestStatus leaveRequests={leaveRequests} />
                    </TabsContent>
                )}

                <TabsContent value="personal-info" className="space-y-4">
                    <PersonalInfo info={personalInfo} />
                </TabsContent>

                <TabsContent value="activities" className="space-y-4">
                    <RecentActivities activities={recentActivities} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default EmployeeDashboard;
