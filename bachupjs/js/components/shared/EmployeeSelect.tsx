import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
}

interface EmployeeSelectProps {
  form: UseFormReturn<any>
  name: string;
  label?: string;
  employees: Employee[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function EmployeeSelect({
  form,
  name,
  label = 'Employee',
  employees,
  required = true,
  placeholder = 'Select employee',
  className,
}: EmployeeSelectProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}{required && ' *'}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value?.toString()}
            required={required}
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem
                  key={employee.id}
                  value={employee.id.toString()}
                  {`${employee.first_name} ${employee.last_name}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
