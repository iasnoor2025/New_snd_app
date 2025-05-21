import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface AccessDeniedProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  backUrl?: string;
}

export default function AccessDenied({
  title = "Access Denied",
  description = "You do not have permission to access this page or perform this action.",
  showBackButton = true,
  backUrl = '/dashboard'
}: AccessDeniedProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-destructive" />
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Permission Required</AlertTitle>
            <AlertDescription>
              Please contact your administrator if you believe you should have access to this resource.
            </AlertDescription>
          </Alert>
          {showBackButton && (
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href={backUrl}>
                  Return to Dashboard
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
