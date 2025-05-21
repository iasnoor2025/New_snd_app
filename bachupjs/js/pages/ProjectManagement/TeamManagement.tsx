import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProjectTeamMember, TeamMemberRole } from '../../types/project';
import { Employee } from '../../types/employee';
import { Breadcrumbs } from '../../components/ui/breadcrumbs';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  ChevronLeft,
  Plus,
  RefreshCw,
  AlertCircle,
  Trash2,
  User,
  Users,
  PercentIcon,
  CalendarIcon,
  Shield
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { format, parseISO } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Input } from '../../components/ui/input';
import { DatePicker } from '../../components/ui/date-picker';

interface RouteParams {
  projectId: string;
}

const TeamManagement: React.FC = () => {
  const { projectId } = useParams<RouteParams>();
  const [teamMembers, setTeamMembers] = useState<ProjectTeamMember[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projectName, setProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);

  // Form state for adding a team member
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<TeamMemberRole>('member');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [allocation, setAllocation] = useState<number>(100);
  const [isAddingMember, setIsAddingMember] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchEmployees();
      fetchTeamMembers();
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

  const fetchTeamMembers = async () => {
    if (!projectId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`/api/projects/${projectId}/team`);
      setTeamMembers(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setError('Failed to load team members');
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

  const getRoleBadge = (role: TeamMemberRole) => {
    switch (role) {
      case 'manager':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Manager</Badge>
      case 'lead':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Team Lead</Badge>
      case 'member':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Member</Badge>
      case 'consultant':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Consultant</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  };

  const handleAddMember = async () => {
    if (!selectedEmployee || !projectId) return;

    setIsAddingMember(true);
    setError(null);

    try {
      const formattedData = {
        project_id: Number(projectId),
        employee_id: Number(selectedEmployee),
        role: selectedRole,
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: endDate ? format(endDate, 'yyyy-MM-dd') : null,
        allocation_percentage: allocation,
        is_active: true,
      };

      await axios.post(`/api/projects/${projectId}/team`, formattedData);

      // Reset form and close dialog
      setSelectedEmployee('');
      setSelectedRole('member');
      setStartDate(new Date());
      setEndDate(null);
      setAllocation(100);
      setIsAddMemberDialogOpen(false);

      // Refresh the list
      fetchTeamMembers();
    } catch (error: any) {
      console.error('Error adding team member:', error);
      setError(error.response?.data?.message || 'Failed to add team member');
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      await axios.delete(`/api/projects/${projectId}/team/${memberId}`);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error removing team member:', error);
      setError('Failed to remove team member');
    }
  };

  const handleToggleActive = async (memberId: number, isCurrentlyActive: boolean) => {
    try {
      await axios.post(`/api/projects/${projectId}/team/${memberId}/toggle-status`, {
        is_active: !isCurrentlyActive
      })
      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating member status:', error);
      setError('Failed to update member status');
    }
  };

  const handleBackToProject = () => {
    window.location.href = `/projects/${projectId}`;
  };

  const availableEmployees = employees.filter(
    employee => !teamMembers.some(member => member.employee_id === employee.id);
  );

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', href: '/' },
              { title: 'Projects', href: '/projects' },
              { title: projectName, href: `/projects/${projectId}` },
              { title: 'Team', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight">Project Team</h1>
          <p className="text-muted-foreground">
            Manage team members for {projectName}
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
            onClick={fetchTeamMembers}
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>
                  Add a new team member to the project.
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
                  <Label htmlFor="employee">Employee</Label>
                  <Select
                    value={selectedEmployee}
                    onValueChange={setSelectedEmployee}
                    disabled={isAddingMember || availableEmployees.length === 0}
                    <SelectTrigger id="employee">
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableEmployees.length === 0 ? (
                        <SelectItem value="" disabled>No available employees</SelectItem>
                      ) : (
                        availableEmployees.map(employee => (
                          <SelectItem key={employee.id} value={employee.id.toString()}>
                            {employee.first_name} {employee.last_name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={selectedRole}
                    onValueChange={(value) => setSelectedRole(value as TeamMemberRole)}
                    disabled={isAddingMember}
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="lead">Team Lead</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="consultant">Consultant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <DatePicker
                      id="start-date"
                      date={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      disabled={isAddingMember}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date (Optional)</Label>
                    <DatePicker
                      id="end-date"
                      date={endDate}
                      onSelect={(date) => setEndDate(date)}
                      disabled={isAddingMember}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allocation">Allocation Percentage</Label>
                  <div className="flex items-center">
                    <Input
                      id="allocation"
                      type="number"
                      min="1"
                      max="100"
                      value={allocation}
                      onChange={(e) => setAllocation(parseInt(e.target.value) || 0)}
                      disabled={isAddingMember}
                      className="mr-2"
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddMemberDialogOpen(false)}
                  disabled={isAddingMember}
                  Cancel
                </Button>
                <Button
                  onClick={handleAddMember}
                  disabled={isAddingMember || !selectedEmployee}
                  {isAddingMember ? 'Adding...' : 'Add Member'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            View and manage project team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Allocation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto" />
                      <span className="text-sm text-gray-500 mt-2 block">Loading team members...</span>
                    </TableCell>
                  </TableRow>
                ) : teamMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      <Users className="h-6 w-6 text-gray-400 mx-auto" />
                      <span className="text-sm text-gray-500 mt-2 block">No team members found.</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4"
                        onClick={() => setIsAddMemberDialogOpen(true)}
                        <Plus className="h-4 w-4 mr-2" />
                        Add your first team member
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {member.employee?.first_name} {member.employee?.last_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.employee?.email || 'No email'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(member.role)}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-gray-500" />
                          {format(parseISO(member.start_date), 'MMM dd, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {member.end_date ? (
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            {format(parseISO(member.end_date), 'MMM dd, yyyy')}
                          </div>
                        ) : (
                          <span className="text-gray-500">Not set</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <PercentIcon className="h-4 w-4 text-gray-500" />
                          {member.allocation_percentage}%
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={member.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleActive(member.id, member.is_active)}
                            {member.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveMember(member.id)}
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
      </Card>
    </div>
  );
};

export default TeamManagement;


