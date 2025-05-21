import React from 'react';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/shared/ToastNotification';

/**
 * ToastExample Component
 *
 * Demonstrates how to use the Toast API with different toast types
 */
export function ToastExample() {
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Toast Notification Examples</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Success Toast</h3>
          <Button
            variant="outline"
            onClick={() => Toast.success('Operation completed successfully!')}
            Show Success
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Error Toast</h3>
          <Button
            variant="outline"
            onClick={() => Toast.error('An error occurred while processing your request.')}
            Show Error
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Info Toast</h3>
          <Button
            variant="outline"
            onClick={() => Toast.info('Here is some helpful information.')}
            Show Info
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Warning Toast</h3>
          <Button
            variant="outline"
            onClick={() => Toast.warning('Please be careful with this action.')}
            Show Warning
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Loading Toast</h3>
          <Button
            variant="outline"
            onClick={() => {
              const id = Toast.loading('Processing your request...');

              // Simulate completing the operation after 3 seconds
              setTimeout(() => {
                Toast.dismiss(id);
                Toast.success('Operation completed!');
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

              Toast.promise(promise, {
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
          Import the Toast API in your component:
        </p>
        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
          {`import { Toast } from '@/components/shared/ToastNotification';

// Show a success toast
Toast.success('Operation successful!');

// Show an error toast
Toast.error('Something went wrong');

// Show an info toast
Toast.info('Here is some information');

// Show a warning toast
Toast.warning('Be careful with this action');

// Show a loading toast (returns an ID for updating later)
const id = Toast.loading('Processing...');

// Update or dismiss the toast later
Toast.update(id, 'Almost done...');
Toast.dismiss(id);

// Use with promises
Toast.promise(apiCall(), {
  loading: 'Loading...',
  success: 'Success!',
  error: 'Error!',
})`}
        </pre>
      </div>
    </div>
  );
}

export default ToastExample;
