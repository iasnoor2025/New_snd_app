import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
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

export default ListErrorBoundary;
