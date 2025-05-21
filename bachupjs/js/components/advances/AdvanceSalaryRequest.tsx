import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DatePicker } from '../ui/date-picker';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  repayment_months: z.string().min(1, "Repayment period is required").refine(val => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 12, {
    message: "Repayment period must be between 1 and 12 months",
  }),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  requested_date: z.date({
    required_error: "Requested date is required",
  }),
})

type FormValues = z.infer<typeof formSchema>

interface AdvanceSalaryRequestProps {
  employeeId: number;
  maxAdvanceAmount: number;
  onRequestSubmitted?: () => void;
}

export const AdvanceSalaryRequest: React.FC<AdvanceSalaryRequestProps> = ({
  employeeId,
  maxAdvanceAmount,
  onRequestSubmitted
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      repayment_months: '3',
      reason: '',
      requested_date: new Date(),
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/advance-salary/request', {
        employee_id: employeeId,
        amount: parseFloat(data.amount),
        repayment_months: parseInt(data.repayment_months),
        reason: data.reason,
        requested_date: data.requested_date.toISOString().split('T')[0],
      })

      toast.success('Advance salary request submitted successfully');
      form.reset();

      if (onRequestSubmitted) {
        onRequestSubmitted();
      }
    } catch (error: any) {
      console.error('Error submitting advance salary request:', error);

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to submit advance salary request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request Advance Salary</CardTitle>
        <CardDescription>
          Submit a request for an advance on your salary. Maximum allowed amount is {maxAdvanceAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount Requested</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter amount"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you wish to request as an advance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repayment_months"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repayment Period (months)</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select repayment period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                        <SelectItem key={month} value={month.toString()}>
                          {month} {month === 1 ? 'month' : 'months'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose how many months you'd like to repay the advance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Request</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Please provide a reason for your advance request"
                      disabled={isSubmitting}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain why you need an advance on your salary.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requested_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Requested Date</FormLabel>
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    disabled={isSubmitting}
                  />
                  <FormDescription>
                    Select the date when you need to receive the advance.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="bg-muted/50 text-xs text-muted-foreground">
        <p>
          Note: Advance salary requests are subject to approval. The repayment will be automatically deducted from your future salary payments.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AdvanceSalaryRequest;
