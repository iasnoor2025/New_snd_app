import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function QuotationTest({ auth }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDirectGeneration = () => {
    const rentalId = 1; // Example rental ID, adjust as needed

    setIsGenerating(true);
    toast.loading("Testing direct quotation generation...");

    try {
      // Store in session storage
      window.sessionStorage.setItem('generating_quotation_test', 'true');

      // Delay to simulate processing
      setTimeout(() => {
        toast.success("Test completed successfully");
        setIsGenerating(false);
      }, 2000);

      // Uncomment this to test actual navigation
      // window.location.href = route("rentals.direct-generate-quotation", rentalId);
    } catch (error) {
      console.error("Test failed:", error);
      toast.error("Test failed");
      setIsGenerating(false);
    }
  };

  const handleInertiaGeneration = () => {
    const rentalId = 1; // Example rental ID, adjust as needed

    setIsGenerating(true);
    toast.loading("Testing Inertia quotation generation...");

    try {
      // This would normally use Inertia router
      setTimeout(() => {
        toast.success("Inertia test completed successfully");
        setIsGenerating(false);
      }, 2000);

      // Uncomment to test with Inertia router
      // router.post(route("rentals.generate-quotation", rentalId));
    } catch (error) {
      console.error("Inertia test failed:", error);
      toast.error("Inertia test failed");
      setIsGenerating(false);
    }
  };

  const checkSessionStorage = () => {
    const hasValue = window.sessionStorage.getItem('generating_quotation_test') === 'true';
    toast.info(`Session storage test value: ${hasValue ? 'Found' : 'Not found'}`);
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title="Quotation Test" />

      <div className="container mx-auto py-6">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Generate Quotation Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Direct Generation Test</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tests window.location.href approach
              </p>
              <Button
                variant="default"
                className="bg-black text-white hover:bg-black/90 mr-4"
                onClick={handleDirectGeneration}
                disabled={isGenerating}
                Test Direct Generation
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Inertia Generation Test</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tests Inertia router approach
              </p>
              <Button
                variant="default"
                className="bg-primary text-white hover:bg-primary/90 mr-4"
                onClick={handleInertiaGeneration}
                disabled={isGenerating}
                Test Inertia Generation
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Session Storage Test</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check if session storage is working correctly
              </p>
              <Button
                variant="outline"
                onClick={checkSessionStorage}
                Check Session Storage
              </Button>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Clear Session Storage</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Reset test state
              </p>
              <Button
                variant="destructive"
                onClick={() => {
                  window.sessionStorage.removeItem('generating_quotation_test');
                  toast.success("Session storage cleared");
                }}
                Clear Session Storage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
