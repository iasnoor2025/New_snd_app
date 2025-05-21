import React, { useState } from 'react';
import { format, parseISO, isAfter } from 'date-fns';
import {
  EquipmentRental,
  EquipmentRentalStatus,
  EquipmentCondition
} from '../../types/equipmentRental';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DatePicker } from '../ui/date-picker';
import { Textarea } from '../ui/textarea';
import {
  MoreHorizontal,
  Eye,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Calendar,
  Loader2
} from 'lucide-react';

interface EquipmentRentalListProps {
  rentals: EquipmentRental[];
  isLoading: boolean;
  onViewRental: (rental: EquipmentRental) => void;
  onReturnEquipment: (rentalId: number, returnData: any) => void;
  onReportDamage: (rentalId: number, damageData: any) => void;
  onUpdateStatus: (rentalId: number, status: EquipmentRentalStatus) => void;
}

const EquipmentRentalList: React.FC<EquipmentRentalListProps> = ({
  rentals,
  isLoading,
  onViewRental,
  onReturnEquipment,
  onReportDamage,
  onUpdateStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<EquipmentRentalStatus | 'all'>('all');
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [showDamageDialog, setShowDamageDialog] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<number | null>(null);
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [returnCondition, setReturnCondition] = useState<EquipmentCondition>('good');
  const [isDamaged, setIsDamaged] = useState(false);
  const [damageDescription, setDamageDescription] = useState('');
  const [damageCost, setDamageCost] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  const filteredRentals = rentals.filter(
    (rental) => statusFilter === 'all' || rental.status === statusFilter;
  );

  const handleOpenReturnDialog = (rentalId: number) => {
    setSelectedRentalId(rentalId);
    setReturnDate(new Date());
    setReturnCondition('good');
    setIsDamaged(false);
    setDamageDescription('');
    setDamageCost('');
    setNotes('');
    setShowReturnDialog(true);
  };

  const handleOpenDamageDialog = (rentalId: number) => {
    setSelectedRentalId(rentalId);
    setDamageDescription('');
    setDamageCost('');
    setShowDamageDialog(true);
  };

  const handleReturnSubmit = async () => {
    if (!selectedRentalId) return;

    setProcessing(true);
    try {
      const returnData = {
        actual_return_date: format(returnDate, 'yyyy-MM-dd'),
        return_condition: returnCondition,
        is_damaged: isDamaged,
        damage_description: isDamaged ? damageDescription : '',
        damage_cost: isDamaged && damageCost !== '' ? Number(damageCost) : undefined,
        notes,
      };

      await onReturnEquipment(selectedRentalId, returnData);
      setShowReturnDialog(false);
    } catch (error) {
      console.error('Error returning equipment:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDamageSubmit = async () => {
    if (!selectedRentalId) return;

    setProcessing(true);
    try {
      const damageData = {
        damage_description: damageDescription,
        repair_cost_estimate: damageCost !== '' ? Number(damageCost) : 0,
        repair_needed: true,
      };

      await onReportDamage(selectedRentalId, damageData);
      setShowDamageDialog(false);
    } catch (error) {
      console.error('Error reporting damage:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: EquipmentRentalStatus) => {
    switch (status) {
      case 'assigned':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Assigned</Badge>
      case 'in_use':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">In Use</Badge>
      case 'scheduled_return':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Return Scheduled</Badge>
      case 'returned':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Returned</Badge>
      case 'overdue':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Overdue</Badge>
      case 'damaged':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">Damaged</Badge>
      case 'lost':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Lost</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  };

  const isOverdue = (rental: EquipmentRental) => {
    if (rental.status === 'returned' || rental.actual_return_date) {
      return false;
    }

    const expectedDate = parseISO(rental.expected_return_date);
    return isAfter(new Date(), expectedDate);
  };

  const getConditionBadge = (condition: EquipmentCondition) => {
    switch (condition) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Excellent</Badge>
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Good</Badge>
      case 'fair':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Fair</Badge>
      case 'poor':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-300">Poor</Badge>
      case 'damaged':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Damaged</Badge>
      case 'unusable':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Unusable</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter" className="text-sm whitespace-nowrap">
            Filter by status:
          </Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as EquipmentRentalStatus | 'all')}
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in_use">In Use</SelectItem>
              <SelectItem value="scheduled_return">Return Scheduled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Assigned Date</TableHead>
              <TableHead>Return Due</TableHead>
              <TableHead>Initial Condition</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">Loading rentals...</span>
                </TableCell>
              </TableRow>
            ) : filteredRentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <Calendar className="h-6 w-6 text-gray-400 mx-auto" />
                  <span className="text-sm text-gray-500 mt-2 block">No equipment rental records found.</span>
                </TableCell>
              </TableRow>
            ) : (
              filteredRentals.map((rental) => (
                <TableRow
                  key={rental.id}
                  className={isOverdue(rental) && rental.status !== 'overdue' ? 'bg-red-50' : undefined}
                  <TableCell className="font-medium">{rental.id}</TableCell>
                  <TableCell>
                    {rental.employee?.first_name} {rental.employee?.last_name}
                  </TableCell>
                  <TableCell>
                    {rental.equipment?.name}
                    {rental.equipment?.model && <span className="text-gray-500 text-xs ml-1">({rental.equipment.model})</span>}
                  </TableCell>
                  <TableCell>{format(parseISO(rental.assigned_date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {format(parseISO(rental.expected_return_date), 'MMM dd, yyyy')}
                      {isOverdue(rental) && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getConditionBadge(rental.initial_condition)}</TableCell>
                  <TableCell>{getStatusBadge(rental.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onViewRental(rental)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>

                        {/* Conditionally render return action */}
                        {(rental.status === 'assigned' ||
                          rental.status === 'in_use' ||
                          rental.status === 'scheduled_return' ||
                          rental.status === 'overdue') && (
                          <DropdownMenuItem onClick={() => handleOpenReturnDialog(rental.id)}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return Equipment
                          </DropdownMenuItem>
                        )}

                        {/* Conditionally render damage report action */}
                        {(rental.status === 'assigned' ||
                          rental.status === 'in_use' ||
                          rental.status === 'scheduled_return' ||
                          rental.status === 'overdue') && (
                          <DropdownMenuItem onClick={() => handleOpenDamageDialog(rental.id)}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Report Damage
                          </DropdownMenuItem>
                        )}

                        {/* Mark as lost action */}
                        {(rental.status === 'assigned' ||
                          rental.status === 'in_use' ||
                          rental.status === 'scheduled_return' ||
                          rental.status === 'overdue') && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(rental.id, 'lost')}>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            Mark as Lost
                          </DropdownMenuItem>
                        )}

                        {/* Schedule return action */}
                        {(rental.status === 'assigned' || rental.status === 'in_use') && (
                          <DropdownMenuItem onClick={() => onUpdateStatus(rental.id, 'scheduled_return')}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Return
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Return Equipment Dialog */}
      <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Equipment</DialogTitle>
            <DialogDescription>
              Record the return of equipment and document its condition.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="return-date">Return Date</Label>
              <DatePicker
                value={returnDate}
                onChange={setReturnDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-condition">Equipment Condition</Label>
              <Select
                value={returnCondition}
                onValueChange={(value) => {
                  setReturnCondition(value as EquipmentCondition);
                  setIsDamaged(['damaged', 'unusable', 'poor'].includes(value));
                }}
                <SelectTrigger id="return-condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                  <SelectItem value="unusable">Unusable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isDamaged && (
                <div className="space-y-2">
                  <Label htmlFor="damage-description">Damage Description</Label>
                  <Textarea
                    id="damage-description"
                    value={damageDescription}
                    onChange={(e) => setDamageDescription(e.target.value)}
                    placeholder="Describe the damage..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="damage-cost">Estimated Damage Cost</Label>
                  <Input
                    id="damage-cost"
                    type="number"
                    step="0.01"
                    value={damageCost}
                    onChange={(e) => setDamageCost(e.target.value ? parseFloat(e.target.value) : '')}
                    placeholder="0.00"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes about the return..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowReturnDialog(false)}
              disabled={processing}
              Cancel
            </Button>
            <Button
              onClick={handleReturnSubmit}
              disabled={processing}
              {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Complete Return'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Damage Dialog */}
      <Dialog open={showDamageDialog} onOpenChange={setShowDamageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Equipment Damage</DialogTitle>
            <DialogDescription>
              Report damage to equipment currently assigned to an employee.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="damage-description">Damage Description</Label>
              <Textarea
                id="damage-description"
                value={damageDescription}
                onChange={(e) => setDamageDescription(e.target.value)}
                placeholder="Describe the damage in detail..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="damage-cost">Estimated Repair Cost</Label>
              <Input
                id="damage-cost"
                type="number"
                step="0.01"
                value={damageCost}
                onChange={(e) => setDamageCost(e.target.value ? parseFloat(e.target.value) : '')}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDamageDialog(false)}
              disabled={processing}
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDamageSubmit}
              disabled={processing || !damageDescription}
              {processing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Damage Report'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EquipmentRentalList;


