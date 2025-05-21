import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTimestamp } from '@/utils/dashboard';
import { Mail, Phone, Calendar } from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    joinDate: string;
    status: 'active' | 'on_leave' | 'inactive';
    avatar?: string;
}

interface TeamData {
    totalMembers: number;
    activeMembers: number;
    onLeaveMembers: number;
    members: TeamMember[];
}

interface Props {
    data: TeamData;
}

export const TeamOverview: FC<Props> = ({ data }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-500';
            case 'on_leave':
                return 'bg-yellow-500';
            case 'inactive':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.totalMembers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.activeMembers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>On Leave</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.onLeaveMembers}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Team Members</CardTitle>
                        <Button>Add Member</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Avatar>
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback>
                                                    {member.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{member.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{member.position}</TableCell>
                                    <TableCell>{member.department}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-1">
                                                <Mail className="h-3 w-3" />
                                                <span className="text-sm">{member.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Phone className="h-3 w-3" />
                                                <span className="text-sm">{member.phone}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-3 w-3" />
                                            <span className="text-sm">
                                                {formatTimestamp(member.joinDate)}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(member.status)}>
                                            {member.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Mail className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
