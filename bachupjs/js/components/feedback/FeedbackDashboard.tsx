import { useEffect, useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDistanceToNow, format } from 'date-fns';

interface FeedbackSubmission {
    id: number;
    feedback_form_id: number;
    equipment_id: number;
    rating: number;
    status: string;
    created_at: string;
}

interface FeedbackResponse {
    id: number;
    feedback_submission_id: number;
    user_id: number;
    response: string;
    is_public: boolean;
    created_at: string;
}

interface FeedbackDashboardProps {
    equipmentId?: number;
}

export function FeedbackDashboard({ equipmentId }: FeedbackDashboardProps) {
    const { toast } = useToast();
    const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);
    const [responses, setResponses] = useState<FeedbackResponse[]>([]);
    const [stats, setStats] = useState({
        total_submissions: 0,
        average_rating: 0,
        status_distribution: {} as Record<string, number>,
    })

    // Subscribe to feedback submissions
    const { isConnected: isSubmissionConnected } = useWebSocket({
        channel: equipmentId ? `equipment.${equipmentId}` : 'feedback',
        event: 'App\\Events\\FeedbackSubmissionCreated',
        onMessage: (data) => {
            setSubmissions(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "New Feedback Submission",
                description: `New feedback received with rating ${data.rating}/5`,
                variant: "default",
            })
        },
    })

    // Subscribe to feedback responses
    const { isConnected: isResponseConnected } = useWebSocket({
        channel: 'feedback',
        event: 'App\\Events\\FeedbackResponseCreated',
        onMessage: (data) => {
            setResponses(prev => [data, ...prev].slice(0, 10));
            toast({
                title: "New Response",
                description: "A new response has been added to feedback",
                variant: "default",
            })
        },
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/feedback/stats${equipmentId ? `?equipment_id=${equipmentId}` : ''}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch feedback stats:', error);
            }
        };

        fetchStats();
    }, [equipmentId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500';
            case 'reviewed':
                return 'bg-blue-500';
            case 'resolved':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Feedback Dashboard</span>
                        <div className="flex items-center space-x-2">
                            <Badge variant={isSubmissionConnected && isResponseConnected ? "success" : "destructive"}>
                                {isSubmissionConnected && isResponseConnected ? "Connected" : "Disconnected"}
                            </Badge>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{stats.total_submissions}</div>
                                <p className="text-sm text-muted-foreground">Total Submissions</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">{stats.average_rating.toFixed(1)}</div>
                                <p className="text-sm text-muted-foreground">Average Rating</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="text-2xl font-bold">
                                    {Object.entries(stats.status_distribution)
                                        .map(([status, count]) => (
                                            <div key={status} className="flex items-center space-x-2">
                                                <Badge className={getStatusColor(status)}>
                                                    {status}
                                                </Badge>
                                                <span>{count}</span>
                                            </div>
                                        ))}
                                </div>
                                <p className="text-sm text-muted-foreground">Status Distribution</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="submissions">
                        <TabsList>
                            <TabsTrigger value="submissions">Submissions</TabsTrigger>
                            <TabsTrigger value="responses">Responses</TabsTrigger>
                        </TabsList>

                        <TabsContent value="submissions">
                            <div className="space-y-2">
                                {submissions.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <Badge className={getStatusColor(submission.status)}>
                                                    {submission.status}
                                                </Badge>
                                                <span className="font-medium">
                                                    Rating: {submission.rating}/5
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                Submitted {formatDistanceToNow(new Date(submission.created_at))} ago
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="responses">
                            <div className="space-y-2">
                                {responses.map((response) => (
                                    <div
                                        key={response.id}
                                        className="flex items-start justify-between p-3 rounded-lg border"
                                        <div className="space-y-1">
                                            <p className="text-sm">{response.response}</p>
                                            <div className="flex items-center space-x-2">
                                                <Badge variant={response.is_public ? "default" : "secondary"}>
                                                    {response.is_public ? "Public" : "Private"}
                                                </Badge>
                                                <p className="text-xs text-muted-foreground">
                                                    Added {formatDistanceToNow(new Date(response.created_at))} ago
                                                </p>
                                            </div>
                                        </div>
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
