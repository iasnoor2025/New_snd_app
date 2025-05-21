import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Image, Download, Trash2 } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';
import { Document } from '@/types';
import ActionButton from '@/components/shared/ActionButton';

interface DocumentListProps {
  documents: Document[];
  onDelete?: (document: Document) => void;
  showActions?: boolean;
}

export function DocumentList({ documents, onDelete, showActions = true }: DocumentListProps) {
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-5 w-5" />
    }
    return <FileText className="h-5 w-5" />
  };

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Card key={document.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getFileIcon(document.file_type)}
                <div>
                  <p className="font-medium">{document.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(document.file_size)} • {document.file_type}
                  </p>
                </div>
              </div>
              {showActions && (
                <div className="flex items-center space-x-2">
                  <ActionButton
                    action="download"
                    resourceType="documents"
                    resourceId={document.id}
                    resourceName={document.name}
                    buttonVariant="ghost"
                    buttonSize="icon"
                    customRoute={document.download_url}
                    onClick={() => window.open(document.download_url, '_blank')}
                  />
                  {onDelete && (
                    <ActionButton
                      action="delete"
                      resourceType="documents"
                      resourceId={document.id}
                      resourceName={document.name}
                      buttonVariant="ghost"
                      buttonSize="icon"
                      onClick={() => onDelete(document)}
                    />
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
