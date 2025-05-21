import React, { useState } from 'react';
import { format, parseISO, differenceInDays } from 'date-fns';
import {
  EquipmentRental,
  EquipmentRentalStatus,
  EquipmentCondition
} from '../../types/equipmentRental';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { DatePicker } from '../ui/date-picker';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import {
  ArrowLeft,
  Calendar,
  User,
  Wrench,
  AlertTriangle,
  AlertCircle,
  Loader2,
  Printer,
  ClipboardList,
  Truck,
  Check,
  X,
  RefreshCw,
  MessageSquare
} from 'lucide-react';

interface EquipmentRentalDetailsProps {
  rental: EquipmentRental;
  onBack: () => void;
  onReturnEquipment: (returnData: any) => void;
  onReportDamage: (damageData: any) => void;
  onUpdateStatus: (status: EquipmentRentalStatus) => void;
}

const EquipmentRentalDetails: React.FC<EquipmentRentalDetailsProps> = ({
  rental,
  onBack,
  onReturnEquipment,
  onReportDamage,
  onUpdateStatus,
}) => {
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [showDamageDialog, setShowDamageDialog] = useState(false);
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [returnCondition, setReturnCondition] = useState<EquipmentCondition>('good');
  const [isDamaged, setIsDamaged] = useState(false);
  const [damageDescription, setDamageDescription] = useState('');
  const [damageCost, setDamageCost] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleOpenReturnDialog = () => {
    setReturnDate(new Date());
    setReturnCondition('good');
    setIsDamaged(false);
    setDamageDescription('');
    setDamageCost('');
    setNotes('');
    setShowReturnDialog(true);
  };

  const handleOpenDamageDialog = () => {
    setDamageDescription('');
    setDamageCost('');
    setShowDamageDialog(true);
  };

  const handleReturnSubmit = async () => {
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

      await onReturnEquipment(returnData);
      setShowReturnDialog(false);
    } catch (error) {
      console.error('Error returning equipment:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDamageSubmit = async () => {
    setProcessing(true);
    try {
      const damageData = {
        damage_description: damageDescription,
        repair_cost_estimate: damageCost !== '' ? Number(damageCost) : 0,
        repair_needed: true,
      };

      await onReportDamage(damageData);
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

  const isOverdue = () => {
    if (rental.status === 'returned' || rental.actual_return_date) {
      return false;
    }

    const expectedDate = parseISO(rental.expected_return_date);
    return new Date() > expectedDate;
  };

  const getDaysRemaining = () => {
    if (rental.actual_return_date || rental.status === 'returned') {
      return 0;
    }

    const expectedDate = parseISO(rental.expected_return_date);
    const today = new Date();

    const diffDays = differenceInDays(expectedDate, today);
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();
  const rentalDuration = differenceInDays(
    parseISO(rental.actual_return_date || rental.expected_return_date),;
    parseISO(rental.assigned_date);
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Equipment Rental Details</CardTitle>
            <CardDescription>
              Rental #{rental.id} - {rental.equipment?.name} assigned to{' '}
              {rental.employee?.first_name} {rental.employee?.last_name}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={onBack}
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => window.open(`/equipment-rentals/${rental.id}/print`, '_blank')}
              <Printer className="h-4 w-4" />
              Print Agreement
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Employee & Status Info */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    {rental.employee?.first_name} {rental.employee?.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {rental.employee?.position?.name || 'No Position'} â€¢{' '}
                    {rental.employee?.department?.name || 'No Department'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <ClipboardList className="h-4 w-4" />
                    <span>Rental ID</span>
                  </div>
                  <span className="font-medium">#{rental.id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Assigned Date</span>
                  </div>
                  <span className="font-medium">
                    {format(parseISO(rental.assigned_date), 'MMM dd, yyyy')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expected Return</span>
                  </div>
                  <span className="font-medium">
                    {format(parseISO(rental.expected_return_date), 'MMM dd, yyyy')}
                  </span>
                </div>

                {rental.actual_return_date && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <Check className="h-4 w-4" />
                      <span>Actual Return</span>
                    </div>
                    <span className="font-medium">
                      {format(parseISO(rental.actual_return_date), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <Truck className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                  {getStatusBadge(rental.status)}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    <RefreshCw className="h-4 w-4" />
                    <span>Rental Duration</span>
                  </div>
                  <span className="font-medium">
                    {rentalDuration} {rentalDuration === 1 ? 'day' : 'days'}
                  </span>
                </div>

                {rental.status !== 'returned' && !rental.actual_return_date && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Days {daysRemaining < 0 ? 'Overdue' : 'Remaining'}</span>
                    </div>
                    <span className={`font-medium ${daysRemaining < 0 ? 'text-red-600' : daysRemaining <= 3 ? 'text-amber-600' : 'text-green-600'}`}>
                      {daysRemaining < 0 ? Math.abs(daysRemaining) : daysRemaining} {Math.abs(daysRemaining) === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  Rental Purpose
                </h4>
                <p className="text-sm text-gray-700">
                  {rental.rental_purpose || 'No purpose specified'}
                </p>
              </div>

              {rental.notes && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                    Notes
                  </h4>
                  <p className="text-sm text-gray-700">{rental.notes}</p>
                </div>
              )}

              {/* Acknowledgment Status */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-600">Agreement Signed</span>
                {rental.acknowledgment_signed ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Signed
                    {rental.acknowledgment_date &&
                      ` on ${format(parseISO(rental.acknowledgment_date), 'MMM dd, yyyy')}`}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Not Signed
                  </Badge>
                )}
              </div>
            </div>

            {/* Center/Right columns - Equipment Info and Condition */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Equipment Details */}
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Equipment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center text-blue-500">
                        <Wrench className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {rental.equipment?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {rental.equipment?.model} â€¢ {rental.equipment?.door_number || rental.equipment?.serial_number}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="text-gray-500">Category:</span>
                        <span className="col-span-2 font-medium">{rental.equipment?.category}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="text-gray-500">Serial Number:</span>
                        <span className="col-span-2 font-medium">{rental.equipment?.serial_number}</span>
                      </div>
                      {rental.equipment?.door_number && (
                        <div className="grid grid-cols-3 gap-1">
                          <span className="text-gray-500">Door Number:</span>
                          <span className="col-span-2 font-medium">{rental.equipment?.door_number}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-1">
                        <span className="text-gray-500">Daily Rate:</span>
                        <span className="col-span-2 font-medium">${rental.equipment?.daily_rate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Condition Assessment */}
                <Card className="border-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Condition Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Initial Condition:</span>
                        <div>
                          {getConditionBadge(rental.initial_condition)}
                        </div>
                      </div>

                      {rental.return_condition && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Return Condition:</span>
                          <div>
                            {getConditionBadge(rental.return_condition)}
                          </div>
                        </div>
                      )}

                      {rental.is_damaged && (
                        <div className="mt-3 border-t pt-3">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium text-amber-700">Damage Reported</p>
                              <p className="text-sm text-gray-600 mt-1">{rental.damage_description}</p>
                            </div>
                          </div>
                          {rental.damage_cost !== undefined && rental.damage_cost > 0 && (
                            <div className="flex justify-between items-center mt-2 text-sm">
                              <span>Estimated Repair Cost:</span>
                              <span className="font-medium">${rental.damage_cost.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between items-center mt-2 text-sm">
                            <span>Damage Charged:</span>
                            <Badge variant="outline" className={rental.damage_charged ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}>
                              {rental.damage_charged ? "Yes" : "No"}
                            </Badge>
                          </div>
                          {rental.damage_charged && (
                            <div className="flex justify-between items-center mt-2 text-sm">
                              <span>Payment Status:</span>
                              <Badge variant="outline" className={rental.damage_paid ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}>
                                {rental.damage_paid ? "Paid" : "Pending"}
                              </Badge>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts and Warnings */}
              {isOverdue() && rental.status !== 'overdue' && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Equipment Return Overdue</h4>
                      <p className="text-sm text-red-700 mt-1">
                        This equipment was due to be returned on {format(parseISO(rental.expected_return_date), 'MMMM d, yyyy')}
                        and is now {Math.abs(daysRemaining)} {Math.abs(daysRemaining) === 1 ? 'day' : 'days'} overdue.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!rental.actual_return_date && daysRemaining <= 3 && daysRemaining >= 0 && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Return Due Soon</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        This equipment is due to be returned in {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}.
                        Please arrange for timely return or extension.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            Back to List
          </Button>

          {/* Conditionally render actions based on status */}
          {(rental.status === 'assigned' ||
            rental.status === 'in_use' ||
            rental.status === 'scheduled_return' ||
            rental.status === 'overdue') && (
              <Button
                variant="outline"
                onClick={() => onUpdateStatus('scheduled_return')}
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Return
              </Button>
              <Button
                variant="outline"
                onClick={handleOpenDamageDialog}
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Damage
              </Button>
              <Button
                onClick={handleOpenReturnDialog}
                <Check className="mr-2 h-4 w-4" />
                Return Equipment
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

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

export default EquipmentRentalDetails;



