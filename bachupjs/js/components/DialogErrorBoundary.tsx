import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ToastService } from '@/components/shared/ToastManager';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Special error boundary for Dialog components
 * This prevents the infinite loop errors that can occur with radix-ui dialogs
 */
export class DialogErrorBoundary extends React.Component<Props, State> {
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error
    console.error('Dialog error:', error);
    console.error('Error details:', errorInfo);

    // Show toast in development
    if (process.env.NODE_ENV !== 'production') {
      ToastService.error('Dialog Error: ' + error.message);
    }
  }

  handleClose = () => {
    this.setState({
      hasError: false,
      error: null
    })
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Dialog open={true} onOpenChange={this.handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
              <DialogDescription>
                An error occurred while displaying this dialog.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Please try again or refresh the page if the problem persists.
              </p>
              {process.env.NODE_ENV !== 'production' && this.state.error && (
                <pre className="mt-2 rounded bg-muted p-2 text-xs">
                  {this.state.error.message}
                </pre>
              )}
            </div>
            <DialogFooter>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    return this.props.children;
  }
}
