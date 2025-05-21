import React from 'react';
import { Button } from '@/components/ui/button';
import { ToastService } from '@/components/shared/ToastManager';

/**
 * ToastExampleFixed Component
 *
 * Demonstrates how to use the fixed Toast API with different toast types
 */
export function ToastExampleFixed() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Toast Notification Examples (Fixed)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Success Toast</h3>
          <Button
            variant="outline"
            onClick={() => ToastService.success('Operation completed successfully!')}
            Show Success
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Error Toast</h3>
          <Button
            variant="outline"
            onClick={() => ToastService.error('An error occurred while processing your request.')}
            Show Error
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Info Toast</h3>
          <Button
            variant="outline"
            onClick={() => ToastService.info('Here is some helpful information.')}
            Show Info
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Warning Toast</h3>
          <Button
            variant="outline"
            onClick={() => ToastService.warning('Please be careful with this action.')}
            Show Warning
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Loading Toast</h3>
          <Button
            variant="outline"
            onClick={() => {
              const id = ToastService.loading('Processing your request...');

              // Simulate completing the operation after 3 seconds
              setTimeout(() => {
                ToastService.dismiss(id);
                ToastService.success('Operation completed!');
              }, 3000);
            }}
            Show Loading
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Promise Toast</h3>
          <Button
            variant="outline"
            onClick={() => {
              const promise = new Promise((resolve, reject) => {
                // Simulate API call
                setTimeout(() => {
                  // Randomly succeed or fail
                  if (Math.random() > 0.5) {
                    resolve('Data loaded successfully');
                  } else {
                    reject(new Error('Failed to load data'));
                  }
                }, 2000);
              })

              ToastService.promise(promise, {
                loading: 'Loading data...',
                success: 'Data loaded successfully!',
                error: 'Failed to load data',
              })
            }}
            Show Promise
          </Button>
        </div>
      </div>

      <div className="p-4 border rounded-lg mt-4">
        <h3 className="font-medium mb-2">Custom Usage Example</h3>
        <p className="text-sm text-gray-600 mb-4">
          Import the ToastService in your component:
        </p>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
          {`import { ToastService } from '@/components/shared/ToastManager';

// Show a success toast
ToastService.success('Operation successful!');

// Show an error toast
ToastService.error('Something went wrong');

// Show an info toast
ToastService.info('Here is some information');

// Show a warning toast
ToastService.warning('Be careful with this action');

// Show a loading toast (returns an ID for updating later)
const id = ToastService.loading('Processing...');

// Update or dismiss the toast later
ToastService.update(id, 'Almost done...');
ToastService.dismiss(id);

// Use with promises
ToastService.promise(apiCall(), {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error!',
})`}
        </pre>
      </div>
    </div>
  );
}

export default ToastExampleFixed;
