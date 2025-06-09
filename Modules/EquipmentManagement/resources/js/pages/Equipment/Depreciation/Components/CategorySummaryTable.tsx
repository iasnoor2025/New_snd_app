import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  category_id: number;
  category_name: string;
  count: number;
  original_value: number;
  current_value: number;
  depreciation: number;
}

interface CategorySummaryTableProps {
  categories: Category[];
  formatCurrency: (value: number) => string;
}

const CategorySummaryTable: React.FC<CategorySummaryTableProps> = ({
  categories,
  formatCurrency
}) => {
  // Sort categories by original value for better visualization
  const sortedCategories = [...categories].sort((a, b) => b.original_value - a.original_value);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Count</TableHead>
          <TableHead>Original Value</TableHead>
          <TableHead>Current Value</TableHead>
          <TableHead>Depreciation</TableHead>
          <TableHead>Depreciation %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedCategories.map((category) => {
          const depreciationPercent = category.original_value > 0
            ? (category.depreciation / category.original_value) * 100
            : 0;

          return (
            <TableRow key={category.category_id}>
              <TableCell className="font-medium">{category.category_name}</TableCell>
              <TableCell>{category.count}</TableCell>
              <TableCell>{formatCurrency(category.original_value)}</TableCell>
              <TableCell>{formatCurrency(category.current_value)}</TableCell>
              <TableCell>{formatCurrency(category.depreciation)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Progress value={depreciationPercent} className="h-2 w-24" />
                  <span className="text-xs text-muted-foreground">
                    {depreciationPercent.toFixed(1)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
        {categories.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              No category data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CategorySummaryTable;


