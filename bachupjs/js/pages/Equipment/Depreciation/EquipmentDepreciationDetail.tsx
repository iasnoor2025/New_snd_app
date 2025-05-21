import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const EquipmentDepreciationDetail: React.FC = () => {
  const { user } = useAuth();

  return (
    <AdminLayout
      title="Equipment Depreciation Detail"
      breadcrumbs={[]}
      header={undefined}
      user={user}
    >
      <Head title="Equipment Depreciation Detail" />
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Equipment Depreciation Detail</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
              <p className="mb-2 font-medium">This component is temporarily unavailable.</p>
              <p>The component is being updated to fix compatibility issues.</p>
              <div className="mt-4">
                <Button
                  onClick={() => window.history.back()}
                  variant="outline"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EquipmentDepreciationDetail;
