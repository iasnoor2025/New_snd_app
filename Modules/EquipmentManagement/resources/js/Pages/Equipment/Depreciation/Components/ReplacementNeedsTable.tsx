import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ReplacementNeedsProps {
  replacementNeeds: {
    id: number;
    name: string;
    current_value: number;
    replacement_cost: number;
    is_fully_depreciated: boolean;
    remaining_life: number;
  }[];
  formatCurrency: (value: number) => string;
}

const ReplacementNeedsTable: React.FC<ReplacementNeedsProps> = ({
  replacementNeeds,
  formatCurrency
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Equipment</TableHead>
          <TableHead>Current Value</TableHead>
          <TableHead>Replacement Cost</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {replacementNeeds.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{formatCurrency(item.current_value)}</TableCell>
            <TableCell>{formatCurrency(item.replacement_cost)}</TableCell>
            <TableCell>
              <Badge variant={item.is_fully_depreciated ? "destructive" : "secondary"}>
                {item.is_fully_depreciated
                  ? 'Fully Depreciated'
                  : `${item.remaining_life.toFixed(1)} years left`
                }
              </Badge>
            </TableCell>
          </TableRow>
        ))}
        {replacementNeeds.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
              No equipment currently needs replacement
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ReplacementNeedsTable;
