import React, { useState } from 'react';
import axios from 'axios';
import { format, addDays } from 'date-fns';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Label,
  Input,
  Checkbox,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { X } from 'lucide-react';

interface AdditionalEquipment {
  equipment_id: string;
  quantity: number;
  needs_operator: boolean;
  operator_id?: number;
  daily_rate: number;
}

export function RentalExtensionForm({
  rentalId,
  currentEndDate,
  hasOperators,
  availableEquipment,
  availableOperators,
  isOpen,
  onOpenChange,
  onSuccess
}: RentalExtensionFormProps) {
  const [extensionDays, setExtensionDays] = useState<number>(7);
  const [keepOperators, setKeepOperators] = useState<boolean>(hasOperators);
  const [additionalEquipment, setAdditionalEquipment] = useState<AdditionalEquipment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(route('rentals.request-extension'), {
        rental_id: rentalId,
        extension_days: extensionDays,
        keep_operators: keepOperators,
        additional_equipment: additionalEquipment,
      })

      if (response.data.success) {
        toast.success('Extension request submitted successfully');
        onSuccess?.();
        onOpenChange(false);
      }
    } catch (error) {
      
      toast.error('Failed to submit extension request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addEquipment = () => {
    setAdditionalEquipment([
      ...additionalEquipment,
      {
        equipment_id: '',
        quantity: 1,
        needs_operator: false,
        daily_rate: 0,
      },
    ]);
  };

  const updateEquipment = (index: number, field: keyof AdditionalEquipment, value: any) => {
    const updated = [...additionalEquipment];
    if (field === 'equipment_id') {
      const equipment = availableEquipment.find(e => e.id === value);
      updated[index] = {
        ...updated[index],
        [field]: value,
        daily_rate: equipment?.daily_rate || 0,
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }
    setAdditionalEquipment(updated);
  };

  const removeEquipment = (index: number) => {
    setAdditionalEquipment(additionalEquipment.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Request Rental Extension</DialogTitle>
          <DialogDescription>
            Request an extension for your rental period and add additional equipment if needed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Extension Days</Label>
              <Input
                type="number"
                min={1}
                value={extensionDays}
                onChange={(e) => setExtensionDays(parseInt(e.target.value))}
                required
              />
              <p className="text-sm text-muted-foreground mt-1">
                Current end date: {format(new Date(currentEndDate), 'PPP')}
              </p>
              <p className="text-sm text-muted-foreground">
                New end date: {format(addDays(new Date(currentEndDate), extensionDays), 'PPP')}
              </p>
            </div>

            {hasOperators && (
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keepOperators"
                    checked={keepOperators}
                    onCheckedChange={(checked) => setKeepOperators(checked as boolean)}
                  />
                  <Label htmlFor="keepOperators">Keep current operators</Label>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Additional Equipment</h4>
                <Button type="button" variant="outline" size="sm" onClick={addEquipment}>
                  Add Equipment
                </Button>
              </div>

              {additionalEquipment.map((item, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => removeEquipment(index)}
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Equipment</Label>
                      <Select
                        value={item.equipment_id}
                        onValueChange={(value) => updateEquipment(index, 'equipment_id', value)}
                        <SelectTrigger>
                          <SelectValue placeholder="Select equipment" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableEquipment.map((equipment) => (
                            <SelectItem key={equipment.id} value={equipment.id}>
                              {equipment.name} - {equipment.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateEquipment(index, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`needs_operator_${index}`}
                        checked={item.needs_operator}
                        onCheckedChange={(checked) => updateEquipment(index, 'needs_operator', checked)}
                      />
                      <Label htmlFor={`needs_operator_${index}`}>Needs operator</Label>
                    </div>

                    {item.needs_operator && (
                      <div>
                        <Label>Select Operator</Label>
                        <Select
                          value={item.operator_id?.toString()}
                          onValueChange={(value) => updateEquipment(index, 'operator_id', parseInt(value))}
                          <SelectTrigger>
                            <SelectValue placeholder="Select operator" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableOperators.map((operator) => (
                              <SelectItem key={operator.id} value={operator.id.toString()}>
                                {operator.name} - {operator.specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <Label>Daily Rate</Label>
                      <Input
                        type="number"
                        value={item.daily_rate}
                        onChange={(e) => updateEquipment(index, 'daily_rate', parseFloat(e.target.value))}
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}