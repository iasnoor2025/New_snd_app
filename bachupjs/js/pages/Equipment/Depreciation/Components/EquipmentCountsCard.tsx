import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BarChart, ListChecks, AlertTriangle, ClipboardList } from 'lucide-react';

interface EquipmentCountsProps {
  counts: {
    total: number;
    with_depreciation: number;
    without_depreciation: number;
    fully_depreciated: number;
    needing_replacement: number;
  };
}

const EquipmentCountsCard: React.FC<EquipmentCountsProps> = ({ counts }) => {
  const pieData = [
    {
      name: 'Tracking Depreciation',
      value: counts.with_depreciation - counts.fully_depreciated,
      color: '#3B82F6',
    },
    {
      name: 'Fully Depreciated',
      value: counts.fully_depreciated,
      color: '#EF4444',
    },
    {
      name: 'No Depreciation',
      value: counts.without_depreciation,
      color: '#9CA3AF',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Equipment Status</CardTitle>
        <BarChart className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-2 rounded-full bg-blue-100 p-1.5">
                  <ClipboardList className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{counts.total}</div>
                  <div className="text-xs text-muted-foreground">Total Equipment</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-2 rounded-full bg-green-100 p-1.5">
                  <ListChecks className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{counts.with_depreciation}</div>
                  <div className="text-xs text-muted-foreground">Tracking Depreciation</div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-2 rounded-full bg-red-100 p-1.5">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{counts.needing_replacement}</div>
                  <div className="text-xs text-muted-foreground">Need Replacement</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div style={{ width: '130px', height: '130px' }}>
              <RechartsPieChart width={130} height={130}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={65}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  labelFormatter={(value) => {
                    const entry = pieData.find(d => d.value === value);
                    return entry ? entry.name : null;
                  }}
                />
                <Legend />
              </RechartsPieChart>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: pieData[0].color }} />
            <div className="text-xs">Tracking Depreciation: {pieData[0].value} ({Math.round((pieData[0].value / counts.total) * 100)}%)</div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: pieData[1].color }} />
            <div className="text-xs">Fully Depreciated: {pieData[1].value} ({Math.round((pieData[1].value / counts.total) * 100)}%)</div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: pieData[2].color }} />
            <div className="text-xs">No Depreciation: {pieData[2].value} ({Math.round((pieData[2].value / counts.total) * 100)}%)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCountsCard;

