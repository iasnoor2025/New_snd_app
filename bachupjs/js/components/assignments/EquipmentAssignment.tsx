import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DatePicker } from '../ui/date-picker';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Loader2, Search, Plus, Eye, Clipboard, ClipboardCheck, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}

interface Equipment {
  id: number;
  name: string;
  type: string;
  model: string;
  serial_number: string;
  available: boolean;
  current_condition: string;
  acquisition_date: string;
  acquisition_cost: number;
}

interface Assignment {
  id: number;
  employee_id: number;
  employee_name: string;
  equipment_id: number;
  equipment_name: string;
  equipment_type: string;
  equipment_serial: string;
  assigned_date: string;
  expected_return_date: string;
  actual_return_date: string | null;
  condition_on_assignment: string;
  condition_on_return: string | null;
  notes: string;
  status: 'active' | 'returned' | 'overdue';
}

export const EquipmentAssignment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewAssignmentDialog, setShowNewAssignmentDialog] = useState(false);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New assignment form state
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');
  const [assignmentDate, setAssignmentDate] = useState<Date>(new Date());
  const [expectedReturnDate, setExpectedReturnDate] = useState<Date | undefined>(undefined);
  const [conditionOnAssignment, setConditionOnAssignment] = useState('excellent');
  const [assignmentNotes, setAssignmentNotes] = useState('');

  // Return form state
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [conditionOnReturn, setConditionOnReturn] = useState('excellent');
  const [returnNotes, setReturnNotes] = useState('');

  useEffect(() => {
    fetchAssignments();
    fetchEmployees();
    fetchEquipment();
  }, [activeTab]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEquipment(equipment.filter(e => e.available));
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredEquipment(
        equipment.filter(
          e =>
            e.available &&
            (e.name.toLowerCase().includes(term) ||
            e.model.toLowerCase().includes(term) ||
            e.serial_number.toLowerCase().includes(term) ||
            e.type.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, equipment]);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const status = activeTab === 'active' ? 'active' : (activeTab === 'returned' ? 'returned' : 'all');
      const response = await axios.get(`/api/equipment-assignments?status=${status}`);
      setAssignments(response.data.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to load equipment assignments');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees');
    }
  };

  const fetchEquipment = async () => {
    try {
      const response = await axios.get('/api/equipment');
      setEquipment(response.data.data);
      setFilteredEquipment(response.data.data.filter((e: Equipment) => e.available));
    } catch (error) {
      console.error('Error fetching equipment:', error);
      toast.error('Failed to load equipment');
    }
  };

  const handleCreateAssignment = async () => {
    if (!selectedEmployeeId || !selectedEquipmentId || !assignmentDate || !expectedReturnDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/api/equipment-assignments', {
        employee_id: parseInt(selectedEmployeeId),
        equipment_id: parseInt(selectedEquipmentId),
        assigned_date: assignmentDate.toISOString().split('T')[0],
        expected_return_date: expectedReturnDate.toISOString().split('T')[0],
        condition_on_assignment: conditionOnAssignment,
        notes: assignmentNotes
      })

      toast.success('Equipment assigned successfully');
      setShowNewAssignmentDialog(false);
      resetNewAssignmentForm();
      fetchAssignments();
      fetchEquipment(); // Refresh equipment to update availability
    } catch (error: any) {
      console.error('Error creating assignment:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to assign equipment. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnEquipment = async () => {
    if (!selectedAssignment || !returnDate || !conditionOnReturn) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`/api/equipment-assignments/${selectedAssignment.id}/return`, {
        return_date: returnDate.toISOString().split('T')[0],
        condition_on_return: conditionOnReturn,
        notes: returnNotes
      })

      toast.success('Equipment return processed successfully');
      setShowReturnDialog(false);
      resetReturnForm();
      fetchAssignments();
      fetchEquipment(); // Refresh equipment to update availability
    } catch (error: any) {
      console.error('Error processing return:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to process return. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openViewDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowViewDialog(true);
  };

  const openReturnDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setReturnDate(new Date());
    setConditionOnReturn('excellent');
    setReturnNotes('');
    setShowReturnDialog(true);
  };

  const resetNewAssignmentForm = () => {
    setSelectedEmployeeId('');
    setSelectedEquipmentId('');
    setAssignmentDate(new Date());
    setExpectedReturnDate(undefined);
    setConditionOnAssignment('excellent');
    setAssignmentNotes('');
  };

  const resetReturnForm = () => {
    setReturnDate(new Date());
    setConditionOnReturn('excellent');
    setReturnNotes('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>
      case 'returned':
        return <Badge className="bg-blue-500">Returned</Badge>
      case 'overdue':
        return <Badge className="bg-red-500">Overdue</Badge>
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';

    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Good';
      case 'fair':
        return 'Fair';
      case 'poor':
        return 'Poor';
      case 'damaged':
        return 'Damaged';
      default:
        return condition;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Equipment Assignments</h2>
        <Button onClick={() => setShowNewAssignmentDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Assignment
        </Button>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="returned">Returned</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Equipment Assignments</CardTitle>
              <CardDescription>
                Equipment currently assigned to employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderAssignmentsTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="returned" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Returned Equipment</CardTitle>
              <CardDescription>
                Equipment that has been returned after assignment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderAssignmentsTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Equipment Assignments</CardTitle>
              <CardDescription>
                Complete history of equipment assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderAssignmentsTable()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Assignment Dialog */}
      <Dialog open={showNewAssignmentDialog} onOpenChange={setShowNewAssignmentDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Assign Equipment</DialogTitle>
            <DialogDescription>
              Assign equipment to an employee and set return expectations
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select
                  value={selectedEmployeeId}
                  onValueChange={setSelectedEmployeeId}
                  disabled={isSubmitting}
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.name} - {employee.position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment-search">Search Equipment</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="equipment-search"
                    placeholder="Search by name, model, or serial"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Available Equipment</Label>
              <div className="border rounded-md max-h-[250px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipment.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No available equipment found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEquipment.map((item) => (
                        <TableRow key={item.id} className={selectedEquipmentId === item.id.toString() ? "bg-muted/50" : ""}>
                          <TableCell>
                            <input
                              type="radio"
                              name="equipment"
                              disabled={isSubmitting}
                              checked={selectedEquipmentId === item.id.toString()}
                              onChange={() => setSelectedEquipmentId(item.id.toString())}
                              className="h-4 w-4"
                            />
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.model}</TableCell>
                          <TableCell>{item.serial_number}</TableCell>
                          <TableCell>{getConditionLabel(item.current_condition)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assignment Date</Label>
                <DatePicker
                  date={assignmentDate}
                  setDate={setAssignmentDate}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label>Expected Return Date</Label>
                <DatePicker
                  date={expectedReturnDate}
                  setDate={setExpectedReturnDate}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition on Assignment</Label>
              <Select
                value={conditionOnAssignment}
                onValueChange={setConditionOnAssignment}
                disabled={isSubmitting}
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={assignmentNotes}
                onChange={(e) => setAssignmentNotes(e.target.value)}
                placeholder="Add any additional notes about this assignment"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewAssignmentDialog(false)}
              disabled={isSubmitting}
              Cancel
            </Button>
            <Button
              onClick={handleCreateAssignment}
              disabled={isSubmitting || !selectedEmployeeId || !selectedEquipmentId || !expectedReturnDate}
              {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Assignment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Assignment Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assignment Details</DialogTitle>
            <DialogDescription>
              Detailed information about this equipment assignment
            </DialogDescription>
          </DialogHeader>

          {selectedAssignment && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{selectedAssignment.equipment_name}</h3>
                {getStatusBadge(selectedAssignment.status)}
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Equipment Type</p>
                  <p className="text-sm">{selectedAssignment.equipment_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Serial Number</p>
                  <p className="text-sm">{selectedAssignment.equipment_serial}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium">Assigned To</p>
                <p className="text-sm">{selectedAssignment.employee_name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Assignment Date</p>
                  <p className="text-sm">{formatDate(selectedAssignment.assigned_date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Expected Return</p>
                  <p className="text-sm">{formatDate(selectedAssignment.expected_return_date)}</p>
                </div>
              </div>

              {selectedAssignment.actual_return_date && (
                <div>
                  <p className="text-sm font-medium">Actual Return Date</p>
                  <p className="text-sm">{formatDate(selectedAssignment.actual_return_date)}</p>
                </div>
              )}

              <Separator />

              <div>
                <p className="text-sm font-medium">Condition on Assignment</p>
                <p className="text-sm">{getConditionLabel(selectedAssignment.condition_on_assignment)}</p>
              </div>

              {selectedAssignment.condition_on_return && (
                <div>
                  <p className="text-sm font-medium">Condition on Return</p>
                  <p className="text-sm">{getConditionLabel(selectedAssignment.condition_on_return)}</p>
                </div>
              )}

              {selectedAssignment.notes && (
                <div>
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm mt-1 p-2 bg-muted rounded-md">{selectedAssignment.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:justify-start">
            {selectedAssignment && selectedAssignment.status === 'active' && (
              <Button
                type="button"
                onClick={() => {
                  setShowViewDialog(false);
                  openReturnDialog(selectedAssignment);
                }}
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Process Return
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowViewDialog(false)}
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Return Equipment Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Process Equipment Return</DialogTitle>
            <DialogDescription>
              Record the return of the assigned equipment
            </DialogDescription>
          </DialogHeader>

          {selectedAssignment && (
            <div className="space-y-4 py-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Return Confirmation</AlertTitle>
                <AlertDescription>
                  You are processing the return of {selectedAssignment.equipment_name} from {selectedAssignment.employee_name}.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Return Date</Label>
                <DatePicker
                  date={returnDate}
                  setDate={setReturnDate}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="return-condition">Condition on Return</Label>
                <Select
                  value={conditionOnReturn}
                  onValueChange={setConditionOnReturn}
                  disabled={isSubmitting}
                  <SelectTrigger id="return-condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="return-notes">Notes</Label>
                <Textarea
                  id="return-notes"
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  placeholder="Add any notes about the equipment condition or return process"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReturnDialog(false)}
              disabled={isSubmitting}
              Cancel
            </Button>
            <Button
              onClick={handleReturnEquipment}
              disabled={isSubmitting}
              {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Return'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  function renderAssignmentsTable() {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (assignments.length === 0) {
      return (
        <div className="text-center py-10 text-muted-foreground">
          No equipment assignments found
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Assignment Date</TableHead>
              <TableHead>Expected Return</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div className="font-medium">{assignment.equipment_name}</div>
                  <div className="text-sm text-muted-foreground">{assignment.equipment_type}</div>
                </TableCell>
                <TableCell>{assignment.employee_name}</TableCell>
                <TableCell>{formatDate(assignment.assigned_date)}</TableCell>
                <TableCell>{formatDate(assignment.expected_return_date)}</TableCell>
                <TableCell>{getStatusBadge(assignment.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openViewDialog(assignment)}
                      className="flex items-center gap-1"
                      <Eye className="h-4 w-4" />
                      View
                    </Button>

                    {assignment.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReturnDialog(assignment)}
                        className="flex items-center gap-1"
                        <Clipboard className="h-4 w-4" />
                        Return
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default EquipmentAssignment;
