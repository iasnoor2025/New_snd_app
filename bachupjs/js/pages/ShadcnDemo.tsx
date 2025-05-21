import React from 'react';
import { ShadcnDemo } from '@/components/ui/example/shadcn-demo';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ToastService } from '@/components/shared/ToastManager';

export default function ShadcnDemoPage() {
  return (
      <Head title="Shadcn UI Demo" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Shadcn UI Demo</h1>
                <p className="text-gray-600">
                  This page demonstrates the shadcn/ui components integrated into the SND Rental React App.
                </p>
                <div className="mt-4 flex space-x-4">
                  <Button onClick={() => window.location.href = '/shadcn-ui-README.md'}>
                    View Documentation
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => ToastService.success('Documentation is also available in the project root as shadcn-ui-README.md')}
                    Show Info
                  </Button>
                </div>
              </div>

              <ShadcnDemo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
