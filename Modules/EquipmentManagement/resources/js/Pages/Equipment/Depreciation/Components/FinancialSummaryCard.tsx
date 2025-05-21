import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Modules/EquipmentManagement/Resources/js/Components/ui/card';
import { Progress } from '@/Modules/EquipmentManagement/Resources/js/Components/ui/progress';
import { DollarSign } from 'lucide-react';

interface FinancialSummaryProps {
  summary: {
    total_original_value: number;
    total_current_value: number;
    total_accumulated_depreciation: number;
    depreciation_rate: number;
    average_remaining_life: number;
  };
}

const FinancialSummaryCard: React.FC<FinancialSummaryProps> = ({ summary }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Financial Summary</CardTitle>
        <DollarSign className="h-5 w-5 text-green-500" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Asset Book Value</div>
              <div className="text-sm font-medium text-green-600">
                {formatCurrency(summary.total_current_value)}
              </div>
            </div>
            <Progress
              value={(summary.total_current_value / summary.total_original_value) * 100}
              className="h-2 bg-gray-200"
              indicatorClassName="bg-green-500"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>Current Value</div>
              <div>Original Value: {formatCurrency(summary.total_original_value)}</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Accumulated Depreciation</div>
              <div className="text-sm font-medium text-amber-600">
                {formatCurrency(summary.total_accumulated_depreciation)}
              </div>
            </div>
            <Progress
              value={summary.depreciation_rate}
              className="h-2 bg-gray-200"
              indicatorClassName="bg-amber-500"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>{formatPercent(summary.depreciation_rate)} Depreciated</div>
              <div>Original: {formatCurrency(summary.total_original_value)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xs text-muted-foreground">Depreciation Rate</div>
              <div className="text-xl font-bold">{formatPercent(summary.depreciation_rate)}</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="text-xs text-muted-foreground">Avg. Remaining Life</div>
              <div className="text-xl font-bold">{summary.average_remaining_life.toFixed(1)} years</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummaryCard;
