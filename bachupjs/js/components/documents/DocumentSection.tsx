import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DocumentSectionProps {
  title: string;
  description: string;
  badgeText: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  badgeClassName?: string;
  children: React.ReactNode;
}

export function DocumentSection({
  title,
  description,
  badgeText,
  badgeVariant = 'outline',
  badgeClassName = '',
  children
}: DocumentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant={badgeVariant} className={badgeClassName}>
            {badgeText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
