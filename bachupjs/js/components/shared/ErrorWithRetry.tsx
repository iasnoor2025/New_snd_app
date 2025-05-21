import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ErrorWithRetryProps {
  message: string;
  onRetry: () => void;
  title?: string;
}

export const ErrorWithRetry: React.FC<ErrorWithRetryProps> = ({
  message,
  onRetry,
  title = 'Error loading data'
}) => {
  return (
    <div className="text-center p-5 rounded-md bg-red-50 border border-red-200 mb-4">
      <div className="text-red-600 font-medium mb-2">{title}</div>
      <div className="text-sm text-red-600 mb-3">{message}</div>
      <Button
        variant="outline"
        size="sm"
        className="bg-white hover:bg-slate-50"
        onClick={onRetry}
        <RefreshCw className="mr-2 h-4 w-4" /> Retry
      </Button>
    </div>
  );
};

export default ErrorWithRetry;
