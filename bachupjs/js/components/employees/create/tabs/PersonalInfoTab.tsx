import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { countries } from '@/lib/countries';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoCircledIcon } from '@radix-ui/react-icons';

interface PersonalInfoTabProps {
  form: UseFormReturn<any>
}

export default function PersonalInfoTab({ form }: PersonalInfoTabProps) {
  const { toast } = useToast();
  const [lastFileNumber, setLastFileNumber] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchLastFileNumber = async () => {
      try {
        const response = await axios.get('/api/employees/last-file-number');
        console.log('API response:', response.data);

        if (response.data && typeof response.data.lastFileNumber === 'number') {
          setLastFileNumber(response.data.lastFileNumber);
          // If no employee number set yet, generate one based on last number
          if (!form.getValues('file_number')) {
            const nextNumber = response.data.lastFileNumber + 1;
            const formattedNumber = nextNumber.toString().padStart(4, '0');
            const newFileNumber = `EMP-${formattedNumber}`;
            console.log('Setting file_number to:', newFileNumber);
            form.setValue('file_number', newFileNumber, { shouldValidate: true })
          }
        } else {
          console.error('Invalid response format:', response.data);
          toast.warning({
            title: "Warning",
            description: "Could not retrieve last employee number. Using default value.",
          })
          setLastFileNumber(0);
          // Set default value when response is invalid
          if (!form.getValues('file_number')) {
            form.setValue('file_number', 'EMP-0001', { shouldValidate: true })
          }
        }
      } catch (error) {
        console.error('Error fetching last file number:', error);
        toast.error({
          title: "Error",
          description: "Failed to fetch employee number. Using default value.",
        })
        // Set default value on error
        setLastFileNumber(0);
        if (!form.getValues('file_number')) {
          form.setValue('file_number', 'EMP-0001', { shouldValidate: true })
        }
      }
    };

    fetchLastFileNumber();
  }, [form]);

  const handleGenerateFileNumber = async () => {
    try {
      setIsGenerating(true);

      // Clear any existing error on the field
      form.clearErrors('file_number');

      // Try the simple endpoint instead
      const response = await axios.get('/api/employees/simple-file-number');
      console.log('Generate simple file number response:', response.data);

      if (response.data.success && response.data.file_number) {
        // Set the file number
        form.setValue('file_number', response.data.file_number, { shouldValidate: true })

        // Update last file number for consistency
        if (typeof response.data.lastFileNumber === 'number') {
          setLastFileNumber(response.data.lastFileNumber);
        }

        // Show success message
        toast.success({
          title: "Success",
          description: `Unique file number ${response.data.file_number} generated`,
        })
      } else {
        throw new Error(response.data.message || 'Invalid response from file number generation API');
      }
    } catch (error) {
      console.error('Error generating file number:', error);
      toast.error({
        title: "Error",
        description: error.response?.data?.message || "Failed to generate unique file number. Please try again.",
      })
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <InfoCircledIcon className="h-4 w-4" />
          <AlertTitle>Important!</AlertTitle>
          <AlertDescription>
            Fields marked with an asterisk (*) are required. Please fill in all required fields to create an employee.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="file_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Employee File Number <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <div className="flex space-x-2">
                    <FormControl>
                      <Input {...field} placeholder="Enter employee file number" />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleGenerateFileNumber}
                      title="Generate File Number"
                      disabled={isGenerating}
                      <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    First Name <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter first name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Last Name <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Email <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="name@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Phone <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Nationality <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Date of Birth <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergency_contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter emergency contact name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergency_contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter emergency contact phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

</Input>
</Input>
</Input>
</Input>
</Input>
</Input>
</Input>
</Input>

