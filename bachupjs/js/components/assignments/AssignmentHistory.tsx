import React from 'react';
import { format, differenceInDays } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Calendar, MapPin, User, Truck } from 'lucide-react';
import { Assignment } from '@/types/models';

interface Props {
  assignments: Assignment[];
}

export function AssignmentHistory({ assignments }: Props) {
  // Debug log assignments
  console.log('AssignmentHistory assignments:', assignments);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Briefcase className="h-4 w-4" />
      case 'rental':
        return <Truck className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  };

  // Function to calculate duration
  const calculateDuration = (startDate: string, endDate?: string | null) => {
    if (!startDate) return 'N/A';

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const days = differenceInDays(end, start);

    return `${days} days`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment History</CardTitle>
        <CardDescription>Track employee project and rental assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!assignments || assignments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Briefcase className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">No assignment records found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) :
                assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(assignment.type)}
                        <span className="capitalize">{assignment.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {assignment.type === 'project' && (
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {typeof assignment.project === 'object' && assignment.project !== null
                              ? assignment.project.name
                              : 'Unknown Project'}
                          </span>
                        </div>
                      )}
                      {assignment.type === 'rental' && (
                        <div className="flex flex-col">
                          <span className="font-medium">
                            Rental #{typeof assignment.rental === 'object' && assignment.rental !== null
                              ? assignment.rental.number
                              : 'Unknown'}
                          </span>
                          {typeof assignment.rental === 'object' &&
                           assignment.rental !== null &&
                           typeof assignment.rental.customer === 'object' &&
                           assignment.rental.customer !== null &&
                           assignment.rental.customer.name && (
                            <span className="text-sm text-muted-foreground">
                              {assignment.rental.customer.name}
                            </span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {assignment.type === 'project' && assignment.project?.location?.name
                            ? assignment.project.location.name
                            : assignment.location || 'Not specified'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {format(new Date(assignment.start_date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          {assignment.end_date ? (
                              to {format(new Date(assignment.end_date), 'MMM d, yyyy')}
                              <span className="ml-2">({calculateDuration(assignment.start_date, assignment.end_date)})</span>
                            </>
                          ) : (
                              till now
                              <span className="ml-2">({calculateDuration(assignment.start_date)})</span>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {typeof assignment.assigned_by === 'object' && assignment.assigned_by !== null
                            ? assignment.assigned_by.name
                            : 'Unknown'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
