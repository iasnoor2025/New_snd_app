import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const feedbackFormSchema = z.object({
    rating: z.number().min(1).max(5),
    comments: z.string().optional(),
    answers: z.record(z.string()),
})

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>

interface FeedbackFormProps {
    formId: number;
    equipmentId?: number;
    rentalId?: number;
    questions: Array<{
        id: string;
        question: string;
        type: string;
        required: boolean;
    }>
    onSuccess?: () => void;
}

export function FeedbackForm({ formId, equipmentId, rentalId, questions, onSuccess }: FeedbackFormProps) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackFormSchema),
        defaultValues: {
            rating: 0,
            comments: '',
            answers: {},
        },
    })

    const onSubmit = async (data: FeedbackFormValues) => {
        try {
            setIsSubmitting(true);
            const response = await fetch('/api/feedback/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback_form_id: formId,
                    equipment_id: equipmentId,
                    rental_id: rentalId,
                    ...data,
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            toast({
                title: "Feedback Submitted",
                description: "Thank you for your feedback!",
                variant: "success",
            })

            form.reset();
            onSuccess?.();
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: error instanceof Error ? error.message : 'Failed to submit feedback',
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Feedback Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Overall Rating</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => field.onChange(parseInt(value))}
                                            defaultValue={field.value.toString()}
                                            className="flex space-x-4"
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <FormItem key={value}>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={value.toString()}
                                                            className="peer sr-only"
                                                        />
                                                    </FormControl>
                                                    <div className="peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground rounded-md border p-2 hover:bg-accent hover:text-accent-foreground">
                                                        {value}
                                                    </div>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {questions.map((question) => (
                            <FormField
                                key={question.id}
                                control={form.control}
                                name={`answers.${question.id}`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{question.question}</FormLabel>
                                        <FormControl>
                                            {question.type === 'text' ? (
                                                <Textarea
                                                    placeholder="Enter your answer"
                                                    {...field}
                                                />
                                            ) : (
                                                <Input
                                                    type={question.type}
                                                    placeholder="Enter your answer"
                                                    {...field}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Comments</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter any additional comments"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
