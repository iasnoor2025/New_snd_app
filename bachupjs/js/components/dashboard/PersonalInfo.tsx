import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';

interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    position: string;
    department: string;
    leaveBalance: number;
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };
}

interface Props {
    info: PersonalInfo;
}

export const PersonalInfo: FC<Props> = ({ info }) => {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Personal Information</CardTitle>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium">{info.name}</h3>
                            <p className="text-sm text-muted-foreground">{info.position}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{info.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{info.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{info.address}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Employment Details</CardTitle>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{info.department}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Joined: {info.joinDate}</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium">Leave Balance</h4>
                            <p className="text-2xl font-bold">{info.leaveBalance} days</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Emergency Contact</CardTitle>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{info.emergencyContact.name}</span>
                            <span className="text-sm text-muted-foreground">
                                ({info.emergencyContact.relationship})
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{info.emergencyContact.phone}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
