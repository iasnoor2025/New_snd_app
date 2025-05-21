import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format, formatDistance } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { 
  Check as CheckIcon, 
  X as XIcon, 
  FileText as FileTextIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  AlertCircle as AlertCircleIcon,
  User as UserIcon,
  Building as BuildingIcon,
  Tag as TagIcon,
  AlignLeft as AlignLeftIcon,
  Settings as SettingsIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Extension {
  id: number;
  rental_id: number;
  rental_number: string;
  customer: {
    id: number;
    company_name: string;
  };
  previous_end_date: string;
  new_end_date: string;
  duration_days: number;
  reason: string;
  keep_operators: boolean;
  additional_equipment: any[]; // Adjust based on actual data structure
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approver?: {
    id: number;
    name: string;
  };
  approved_at?: string;
  rejection_reason?: string;
}

interface Props extends PageProps {
  extension: Extension;
  success?: string;
  error?: string;
}

export default function ExtensionShow({ auth, extension, success, error }: Props) {
  const { toast } = useToast();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      })
      return;
    }

    setIsSubmitting(true);
    router.post(route('extensions.reject', extension.id), {
      rejection_reason: rejectionReason
    }, {
      onSuccess: () => {
        setIsRejectDialogOpen(false);
        setRejectionReason('');
      },
      onFinish: () => setIsSubmitting(false)
    })
  };

  const handleApprove = () => {
    router.post(route('extensions.approve', extension.id));
  };

  const handleCreateTimesheet = () => {
    router.post(route('extensions.approve', extension.id), {
      create_timesheet: true
    })
  };

  // Display success toast if provided
  React.useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: success,
      })
    }
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive"
      })
    }
  }, [success, error]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  const breadcrumbs = [;
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Extensions', href: '/extensions' },
    { title: `Extension #${extension.id}`, href: `/extensions/${extension.id}` },
  ];

  return (
    <AdminLayout title="View Extension Request" breadcrumbs={breadcrumbs} requiredPermission="rentals.view">
      <Head title={`Extension Request #${extension.id}`} />
      
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Extension Request #{extension.id}</h1>
          
          <div className="flex space-x-2">
            <Link href={route('extensions.index')}>
              <Button variant="outline">Back to List</Button>
            </Link>
            {extension.status === 'approved' && (
              <Link href={route('timesheets.create', {
                include_rentals: true,
                rental_id: extension.rental_id
              })}>
                <Button>Create Timesheet</Button>
              </Link>
            )}
            {extension.status === 'pending' && (
                <Button onClick={handleCreateTimesheet} className="bg-blue-600 hover:bg-blue-700">
                  Approve & Create Timesheet
                </Button>
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                  Approve
                </Button>
                <Button onClick={() => setIsRejectDialogOpen(true)} variant="destructive">
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Card className="md:col-span-8">
            <CardHeader>
              <CardTitle>Extension Details</CardTitle>
              <CardDescription>
                Details of the extension request for rental #{extension.rental_number}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <div className="mt-1">{getStatusBadge(extension.status)}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Created</Label>
                  <div className="mt-1 text-gray-900">{format(new Date(extension.created_at), 'PPP')}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    <BuildingIcon className="inline-block w-4 h-4 mr-1" />
                    customer
                  </Label>
                  <div className="mt-1 text-gray-900">{extension.customer.company_name}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    <TagIcon className="inline-block w-4 h-4 mr-1" />
                    Rental Number
                  </Label>
                  <div className="mt-1 text-gray-900">
                    <Link href={route('rentals.show', extension.rental_id)} className="text-blue-600 hover:underline">
                      {extension.rental_number}
                    </Link>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                    Previous End Date
                  </Label>
                  <div className="mt-1 text-gray-900">{format(new Date(extension.previous_end_date), 'PPP')}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                    New End Date
                  </Label>
                  <div className="mt-1 text-gray-900">{format(new Date(extension.new_end_date), 'PPP')}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    <ClockIcon className="inline-block w-4 h-4 mr-1" />
                    Extension Duration
                  </Label>
                  <div className="mt-1 text-gray-900">{extension.duration_days} days</div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    <SettingsIcon className="inline-block w-4 h-4 mr-1" />
                    Keep Operators
                  </Label>
                  <div className="mt-1 text-gray-900">{extension.keep_operators ? 'Yes' : 'No'}</div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">
                  <AlignLeftIcon className="inline-block w-4 h-4 mr-1" />
                  Reason for Extension
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-gray-900">{extension.reason}</div>
              </div>
              
              {extension.additional_equipment && extension.additional_equipment.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Additional Equipment</Label>
                  <div className="mt-1 overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Needs Operator</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {extension.additional_equipment.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.equipment_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {item.needs_operator ? 'Yes' : 'No'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {extension.status !== 'pending' && (
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        <UserIcon className="inline-block w-4 h-4 mr-1" />
                        {extension.status === 'approved' ? 'Approved By' : 'Rejected By'}
                      </Label>
                      <div className="mt-1 text-gray-900">
                        {extension.approver ? extension.approver.name : 'N/A'}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">
                        <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                        {extension.status === 'approved' ? 'Approved On' : 'Rejected On'}
                      </Label>
                      <div className="mt-1 text-gray-900">
                        {extension.approved_at ? format(new Date(extension.approved_at), 'PPP p') : 'N/A'}
                      </div>
                    </div>
                  </div>
                  
                  {extension.status === 'rejected' && extension.rejection_reason && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-500">
                        <AlertCircleIcon className="inline-block w-4 h-4 mr-1 text-red-500" />
                        Rejection Reason
                      </Label>
                      <div className="mt-1 p-3 bg-red-50 rounded-md text-red-700">{extension.rejection_reason}</div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href={route('rentals.show', extension.rental_id)} className="w-full">
                <Button variant="outline" className="w-full">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  View Rental
                </Button>
              </Link>
              
              {extension.status === 'pending' && (
                  <Button onClick={handleApprove} className="w-full bg-green-600 hover:bg-green-700">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Approve Extension
                  </Button>
                  
                  <Button onClick={handleCreateTimesheet} className="w-full bg-blue-600 hover:bg-blue-700">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Approve & Create Timesheet
                  </Button>
                  
                  <Button onClick={() => setIsRejectDialogOpen(true)} variant="destructive" className="w-full">
                    <XIcon className="mr-2 h-4 w-4" />
                    Reject Extension
                  </Button>
                </>
              )}
              
              {extension.status === 'approved' && (
                <Link 
                  href={route('timesheets.create', {
                    include_rentals: true,
                    rental_id: extension.rental_id
                  })} 
                  className="w-full"
                  <Button className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Create Timesheet
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Extension Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this extension request.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleReject();
          }}>
            <div className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rejection_reason">Rejection Reason</Label>
                <Textarea
                  id="rejection_reason"
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  placeholder="Enter the reason for rejection..."
                  rows={4}
                />
                {rejectionReason.trim().length > 0 && rejectionReason.trim().length < 5 && (
                  <p className="text-sm text-red-500">Rejection reason must be at least 5 characters</p>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive" disabled={isSubmitting || rejectionReason.trim().length < 5}>
                {isSubmitting ? 'Rejecting...' : 'Reject Extension'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
} 
