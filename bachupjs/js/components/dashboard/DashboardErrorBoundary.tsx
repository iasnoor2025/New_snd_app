import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class DashboardErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Dashboard component error:', error);
        console.error('Error info:', errorInfo);

        // Here you could send the error to an error reporting service
        // Example: reportError(error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Dashboard Component Error
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {this.state.error?.message || 'An unknown error occurred'}
                            </AlertDescription>
                        </Alert>
                        <div className="mt-4 text-muted-foreground text-sm">
                            <p>Please try refreshing the page or contact support if the issue persists.</p>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return this.props.children;
    }
}

export default DashboardErrorBoundary;
