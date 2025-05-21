import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { Employee } from '../../types/employee';
import { Equipment } from '../../types/models';
import { EquipmentCondition, EquipmentRentalFormData } from '../../types/equipmentRental';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { DatePicker } from '../ui/date-picker';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '../ui/alert';
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Calendar
} from 'lucide-react';

interface EquipmentRentalFormProps {
  employees: Employee[];
  equipment: Equipment[];
  onRentalCreated: () => void;
  onCancel: () => void;
}

// Define form validation schema with Zod
const formSchema = z.object({
  employee_id: z.string().min(1, 'Employee is required'),
  equipment_id: z.string().min(1, 'Equipment is required'),
  assigned_date: z.date({ required_error: 'Assigned date is required' }),
  expected_return_date: z.date({ required_error: 'Expected return date is required' }),
  initial_condition: z.string().min(1, 'Initial condition is required'),
  rental_purpose: z.string().min(3, 'Purpose is required'),
  notes: z.string().optional(),
  acknowledgment_signed: z.boolean().default(false),
})

const EquipmentRentalForm: React.FC<EquipmentRentalFormProps> = ({
  employees,
  equipment,
  onRentalCreated,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableEquipment, setAvailableEquipment] = useState<Equipment[]>(equipment);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EquipmentRentalFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employee_id: '',
      equipment_id: '',
      assigned_date: new Date(),
      expected_return_date: new Date(),
      initial_condition: 'good',
      rental_purpose: '',
      notes: '',
      acknowledgment_signed: false,
    },
  })

  const selectedEquipmentId = watch('equipment_id');

  // Filter available equipment by fetching a list from the API
  useEffect(() => {
    const fetchAvailableEquipment = async () => {
      try {
        const response = await axios.get('/api/equipment/available');
        setAvailableEquipment(response.data.data);
      } catch (error) {
        console.error('Error fetching available equipment:', error);
        setError('Failed to load available equipment');
      }
    };

    fetchAvailableEquipment();
  }, []);

  // Get equipment details when equipment selection changes
  useEffect(() => {
    if (selectedEquipmentId) {
      const selectedItem = equipment.find(item => item.id.toString() === selectedEquipmentId);
      if (selectedItem && selectedItem.status) {
        // You can use equipment details for any special logic needed
      }
    }
  }, [selectedEquipmentId, equipment]);

  const onSubmit = async (data: EquipmentRentalFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Format the dates to YYYY-MM-DD
      const formattedData = {
        ...data,
        employee_id: parseInt(data.employee_id),
        equipment_id: parseInt(data.equipment_id),
        assigned_date: format(data.assigned_date, 'yyyy-MM-dd'),
        expected_return_date: format(data.expected_return_date, 'yyyy-MM-dd'),
      };

      await axios.post('/api/equipment-rentals', formattedData);
      onRentalCreated();
    } catch (error: any) {
      console.error('Error creating equipment rental:', error);
      setError(
        error.response?.data?.message || 'Failed to create equipment rental. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create Equipment Rental</CardTitle>
            <CardDescription>
              Assign equipment to employees and track rental details
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={onCancel}
            <ArrowLeft className="h-4 w-4" />
            Back to List
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee <span className="text-red-500">*</span></Label>
                <Controller
                  name="employee_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      <SelectTrigger id="employee_id">
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem
                            key={employee.id}
                            value={employee.id.toString()}
                            {employee.first_name} {employee.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.employee_id && (
                  <p className="text-sm text-red-500">{errors.employee_id.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment_id">Equipment <span className="text-red-500">*</span></Label>
                <Controller
                  name="equipment_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      <SelectTrigger id="equipment_id">
                        <SelectValue placeholder="Select equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableEquipment.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id.toString()}
                            {item.name} - {item.model} ({item.door_number || item.serial_number})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.equipment_id && (
                  <p className="text-sm text-red-500">{errors.equipment_id.message}</p>
                )}
                {availableEquipment.length === 0 && (
                  <p className="text-sm text-amber-600">No equipment available for rental</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assigned_date">Assigned Date <span className="text-red-500">*</span></Label>
                  <Controller
                    name="assigned_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.assigned_date && (
                    <p className="text-sm text-red-500">{errors.assigned_date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected_return_date">Expected Return Date <span className="text-red-500">*</span></Label>
                  <Controller
                    name="expected_return_date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  {errors.expected_return_date && (
                    <p className="text-sm text-red-500">{errors.expected_return_date.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initial_condition">Equipment Condition <span className="text-red-500">*</span></Label>
                <Controller
                  name="initial_condition"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                      <SelectTrigger id="initial_condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.initial_condition && (
                  <p className="text-sm text-red-500">{errors.initial_condition.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rental_purpose">Rental Purpose <span className="text-red-500">*</span></Label>
                <Textarea
                  id="rental_purpose"
                  {...register('rental_purpose')}
                  rows={3}
                  disabled={isLoading}
                  placeholder="Describe the purpose of this equipment rental"
                />
                {errors.rental_purpose && (
                  <p className="text-sm text-red-500">{errors.rental_purpose.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  {...register('notes')}
                  rows={3}
                  disabled={isLoading}
                  placeholder="Enter any additional notes or special instructions"
                />
              </div>

              <div className="pt-4">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="acknowledgment_signed"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <Label htmlFor="acknowledgment_signed">
                    Equipment rental acknowledgment signed by employee
                  </Label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  By checking this box, you confirm that the employee has signed the acknowledgment form accepting
                  responsibility for the equipment and agreeing to the rental terms.
                </p>
              </div>

              {selectedEquipmentId && (
                <div className="mt-6 border rounded-md p-4 bg-gray-50">
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    Rental Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      Equipment is expected to be returned in the same condition as received.
                      Any damage will need to be reported and may result in repair charges.
                    </p>
                    <p className="font-medium text-amber-700 mt-2">
                      Please ensure the employee is trained in proper use of this equipment
                      and understands any safety requirements.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Rental'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EquipmentRentalForm;
