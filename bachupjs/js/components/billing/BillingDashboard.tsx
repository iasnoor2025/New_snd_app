import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow, format } from 'date-fns';

interface PaymentReminder {
    id: number;
    rental_id: number;
    type: string;
    amount: number;
    due_date: string;
    status: string;
    created_at: string;
}

interface PaymentTransaction {
    id: number;
    rental_id: number;
    transaction_type: string;
    amount: number;
    payment_method: string;
    status: string;
    created_at: string;
}

interface LatePaymentPenalty {
    id: number;
    rental_id: number;
    original_amount: number;
    penalty_amount: number;
    days_overdue: number;
    status: string;
    created_at: string;
}

interface BillingDashboardProps {
    userId: number;
}

export function BillingDashboard({ userId }: BillingDashboardProps) {
    const { toast } = useToast();
    const [reminders, setReminders] = useState<PaymentReminder[]>([]);
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
    const [penalties, setPenalties] = useState<LatePaymentPenalty[]>([]);

    // Subscribe to payment reminders
    const { isConnected: isReminderConnected } = useWebSocket({
        channel: `user.${userId}`,
        event: 'App\\Events\\PaymentReminderCreated',
        onMessage: (data) => {
            setReminders(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "Payment Reminder",
                description: `New payment reminder for $${data.amount} due ${formatDistanceToNow(new Date(data.due_date))}`,
                variant: data.type === 'overdue' ? 'destructive' : 'default',
            })
        },
    })

    // Subscribe to payment transactions
    const { isConnected: isTransactionConnected } = useWebSocket({
        channel: `user.${userId}`,
        event: 'App\\Events\\PaymentTransactionCreated',
        onMessage: (data) => {
            setTransactions(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "Payment Processed",
                description: `Payment of $${data.amount} has been processed`,
                variant: "success",
            })
        },
    })

    // Subscribe to late payment penalties
    const { isConnected: isPenaltyConnected } = useWebSocket({
        channel: `user.${userId}`,
        event: 'App\\Events\\LatePaymentPenaltyCreated',
        onMessage: (data) => {
            setPenalties(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "Late Payment Penalty",
                description: `Late payment penalty of $${data.penalty_amount} has been applied`,
                variant: "destructive",
            })
        },
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'paid':
                return 'bg-green-500';
            case 'overdue':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getTransactionTypeColor = (type: string) => {
        switch (type) {
            case 'payment':
                return 'bg-green-500';
            case 'refund':
                return 'bg-blue-500';
            case 'adjustment':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Billing Dashboard</span>
                        <div className="flex items-center space-x-2">
                            <Badge variant={isReminderConnected && isTransactionConnected && isPenaltyConnected ? "success" : "destructive"}>
                                {isReminderConnected && isTransactionConnected && isPenaltyConnected ? "Connected" : "Disconnected"}
                            </Badge>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="reminders">
                        <TabsList>
                            <TabsTrigger value="reminders">Payment Reminders</TabsTrigger>
                            <TabsTrigger value="transactions">Transactions</TabsTrigger>
                            <TabsTrigger value="penalties">Late Payments</TabsTrigger>
                        </TabsList>

                        <TabsContent value="reminders">
                            <div className="space-y-2">
                                {reminders.map((reminder) => (
                                    <div
                                        key={reminder.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Badge className={getStatusColor(reminder.status)}>
                                                    {reminder.status}
                                                </Badge>
                                                <span className="font-medium">${reminder.amount}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Due {formatDistanceToNow(new Date(reminder.due_date))}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Created {formatDistanceToNow(new Date(reminder.created_at))} ago
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="transactions">
                            <div className="space-y-2">
                                {transactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Badge className={getTransactionTypeColor(transaction.transaction_type)}>
                                                    {transaction.transaction_type}
                                                </Badge>
                                                <span className="font-medium">${transaction.amount}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {transaction.payment_method}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(transaction.created_at))} ago
                                            </p>
                                        </div>
                                        <Badge variant={transaction.status === 'completed' ? 'success' : 'default'}>
                                            {transaction.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="penalties">
                            <div className="space-y-2">
                                {penalties.map((penalty) => (
                                    <div
                                        key={penalty.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Badge variant="destructive">
                                                    Late Payment
                                                </Badge>
                                                <span className="font-medium">
                                                    ${penalty.penalty_amount}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Original Amount: ${penalty.original_amount}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {penalty.days_overdue} days overdue
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Created {formatDistanceToNow(new Date(penalty.created_at))} ago
                                            </p>
                                        </div>
                                        <Badge variant={penalty.status === 'paid' ? 'success' : 'default'}>
                                            {penalty.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
