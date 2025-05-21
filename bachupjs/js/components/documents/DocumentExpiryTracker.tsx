import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { DeleteButton } from './DeleteButton';
import { ToastService } from '@/components/shared/ToastManager';
import axios from 'axios';
import { router } from '@inertiajs/react';

interface Document {
  name: string;
  expiry?: string;
  number?: string;
  type?: string;
  employeeId?: number;
}

interface DocumentExpiryTrackerProps {
  documents: Document[];
}

export function DocumentExpiryTracker({ documents }: DocumentExpiryTrackerProps) {
  const validDocuments = documents.filter(doc => doc.expiry && doc.number);

  const handleDelete = (document: Document) => {
    if (!document.type || !document.employeeId) return;

    axios.delete(`/api/employee/${document.employeeId}/documents/${document.type}`)
      .then(() => {
        ToastService.success('Document deleted successfully');
        router.reload();
      })
      .catch(() => {
        ToastService.error('Failed to delete document');
      })
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Document Expiry Tracker</CardTitle>
            <CardDescription>Keep track of important document expirations</CardDescription>
          </div>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Expiry Monitoring
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {validDocuments.map((doc, index) => {
            const expiryDate = new Date(doc.expiry!);
            const today = new Date();
            const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const expired = daysRemaining < 0;
            const warning = daysRemaining <= 30 && !expired;

            return (
              <div key={index} className={`p-4 rounded-md border ${
                expired ? 'bg-destructive/10 border-destructive/30' :
                warning ? 'bg-amber-50 border-amber-200' :
                'bg-muted/30 border-border'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{doc.number}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      expired ? 'text-destructive' :
                      warning ? 'text-amber-600' :
                      'text-muted-foreground'
                    }`}>
                      {format(expiryDate, 'PPP')}
                    </p>
                    <p className={`text-xs mt-0.5 ${
                      expired ? 'text-destructive' :
                      warning ? 'text-amber-600' :
                      'text-muted-foreground'
                    }`}>
                      {expired
                        ? `Expired ${Math.abs(daysRemaining)} days ago`
                        : `${daysRemaining} days remaining`}
                    </p>
                  </div>
                </div>
                {(expired || warning) && (
                  <div className={`mt-2 text-xs ${expired ? 'text-destructive' : 'text-amber-600'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <AlertCircle className="h-3.5 w-3.5 mr-1" />
                      {expired
                        ? 'This document has expired and requires immediate renewal.'
                        : 'This document will expire soon and should be renewed.'}
                    </div>
                    {expired && doc.type && doc.employeeId && (
                      <DeleteButton
                        onDelete={() => handleDelete(doc)}
                        title={`Delete ${doc.name}`}
                        description={`Are you sure you want to delete this expired ${doc.name.toLowerCase()}? This action cannot be undone.`}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {validDocuments.length === 0 && (
            <div className="text-center p-8 bg-muted/30 rounded-lg border">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Documents to Track</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                There are no documents with expiration dates to track for this employee.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
