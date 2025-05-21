import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { UseFormReturn } from 'react-hook-form';

export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'datepicker';

export interface FormFieldProps {
  form: UseFormReturn<any>
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: FieldType;
  options?: Option[];
  className?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  autoComplete?: string;
  labelClassName?: string;
  controlClassName?: string;
  inputClassName?: string;
  showLabel?: boolean;
  onChange?: (value: any) => void;
}

/**
 * A reusable form field component that works with react-hook-form and shadcn/ui
 *
 * @example
 * // Basic text input
 * <FormField
 *   form={form}
 *   name="email"
 *   label="Email Address"
 *   type="email"
 *   required
 * />
 *
 * @example
 * // Select input with options
 * <FormField
 *   form={form}
 *   name="status"
 *   label="Status"
 *   type="select"
 *   options={[
 *     { label: 'Active', value: 'active' },
 *     { label: 'Inactive', value: 'inactive' }
 *   ]}
 * />
 */
export function FormField({
  form,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  options = [],
  required = false,
  disabled = false,
  readOnly = false,
  multiline = false,
  rows = 3,
  min,
  max,
  step,
  autoComplete,
  labelClassName = '',
  controlClassName = '',
  inputClassName = '',
  showLabel = true,
  onChange,
  className = '',
}: FormFieldProps) {

  // Add asterisk to required fields
  const labelContent = required ? `${label} *` : label;

  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          {showLabel && (
            <FormLabel className={labelClassName}>
              {labelContent}
            </FormLabel>
          )}

          <FormControl>
            <div>
              {/* Render different input types */}
              {type === 'textarea' && (
                <Textarea
                  {...field}
                  value={field.value || ''}
                  placeholder={placeholder}
                  disabled={disabled || readOnly}
                  className={inputClassName}
                  rows={rows}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.(e.target.value);
                  }}
                  readOnly={readOnly}
                />
              )}

              {type === 'select' && (
                <Select
                  disabled={disabled || readOnly}
                  onValueChange={(value) => {
                    field.onChange(value);
                    onChange?.(value);
                  }}
                  value={field.value ? String(field.value) : undefined}
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {type === 'checkbox' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      onChange?.(checked);
                    }}
                    disabled={disabled || readOnly}
                    className={inputClassName}
                  />
                  {placeholder && <span className="text-sm">{placeholder}</span>}
                </div>
              )}

              {type === 'date' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                        inputClassName
                      )}
                      disabled={disabled || readOnly}
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(new Date(field.value), 'PPP')
                      ) : (
                        <span>{placeholder || 'Pick a date'}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        field.onChange(date);
                        onChange?.(date);
                      }}
                      disabled={disabled || readOnly}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}

              {['text', 'email', 'password', 'number'].includes(type) && (
                <Input
                  {...field}
                  value={field.value || (type === 'number' ? '' : '')}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled || readOnly}
                  className={inputClassName}
                  min={type === 'number' ? min : undefined}
                  max={type === 'number' ? max : undefined}
                  step={type === 'number' ? step : undefined}
                  onChange={(e) => {
                    const value = type === 'number';
                      ? (e.target.value === '' ? '' : Number(e.target.value))
                      : e.target.value;
                    field.onChange(value);
                    onChange?.(value);
                  }}
                  readOnly={readOnly}
                />
              )}
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;


