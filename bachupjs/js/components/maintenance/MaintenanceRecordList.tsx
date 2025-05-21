import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { Wrench, Calendar, User, FileText, Download, Link2 } from 'lucide-react';

interface MaintenanceRecord {
  id: number;
  title: string;
  description: string;
  date: string;
  status: 'scheduled' | 'completed' | 'canceled' | string;
  technician?: string;
  cost?: number;
  parts?: string[];
  documents?: Array<{
    id: number;
    name: string;
    url: string;
  }>
}

interface MaintenanceRecordListProps {
  records: MaintenanceRecord[];
}

/**
 * Component to display a list of maintenance records for equipment
 */
const MaintenanceRecordList = ({ records }: MaintenanceRecordListProps) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Get badge color based on status
  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'scheduled': 'bg-blue-100 text-blue-800 border-blue-300',
      'completed': 'bg-green-100 text-green-800 border-green-300',
      'canceled': 'bg-red-100 text-red-800 border-red-300',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    };

    const colorClass = statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
    
    return (
      <Badge className={`${colorClass} font-normal`} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {records.map((record) => (
        <Card key={record.id} className="overflow-hidden border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-blue-500" />
                <h3 className="text-sm font-medium">{record.title}</h3>
              </div>
              {getStatusBadge(record.status)}
            </div>
            
            <Separator className="my-2" />
            
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Date:</span>
              </div>
              <span>{formatDate(record.date)}</span>
              
              {record.technician && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>Technician:</span>
                  </div>
                  <span>{record.technician}</span>
                </>
              )}
              
              {record.cost !== undefined && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span>Cost:</span>
                  </div>
                  <span>${record.cost.toFixed(2)}</span>
                </>
              )}
            </div>
            
            {record.description && (
              <div className="mt-2 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground mb-1">
                  <FileText className="h-3 w-3" />
                  <span>Description:</span>
                </div>
                <p className="ml-4 text-sm">{record.description}</p>
              </div>
            )}
            
            {record.parts && record.parts.length > 0 && (
              <div className="mt-2">
                <div className="text-xs text-muted-foreground mb-1">Parts Used:</div>
                <div className="flex flex-wrap gap-1 ml-4">
                  {record.parts.map((part, index) => (
                    <Badge key={index} variant="outline" className="text-xs font-normal">
                      {part}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {record.documents && record.documents.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-muted-foreground mb-1">Documents:</div>
                <div className="flex flex-wrap gap-2 ml-4">
                  {record.documents.map((doc) => (
                    <Button 
                      key={doc.id} 
                      variant="outline" 
                      size="sm" 
                      className="h-7 text-xs"
                      asChild
                      <a href={doc.url} target="_blank" rel="noreferrer">
                        <Download className="h-3 w-3 mr-1" />
                        {doc.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MaintenanceRecordList; 