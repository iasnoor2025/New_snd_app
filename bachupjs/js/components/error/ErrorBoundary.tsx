import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  fallbackUrl?: string;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Component error:', error, errorInfo);
  }

  render(): ReactNode {
    const { fallbackUrl = '/rentals', fallback } = this.props;

    if (this.state.hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="container mx-auto py-12">
          <Card className="border-red-300">
            <CardHeader>
              <CardTitle className="text-red-600">Error Loading Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                  {this.state.error?.message || 'The requested content could not be loaded properly. This might be due to missing or invalid data.'}
                </AlertDescription>
              </Alert>
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Page
                </Button>
                <Button className="ml-2" onClick={() => window.location.href = fallbackUrl}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * A specific error boundary for list components that are causing the infinite loop issue
 */
export class ListErrorBoundary extends Component<Props, State> {
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
    console.error('List component error caught:', error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // For list components, we'll render a minimal fallback that doesn't disrupt the layout
      return (
        <div className="flex flex-wrap items-center gap-1.5 text-sm">
          {this.props.fallback || <span>Navigation path</span>}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
