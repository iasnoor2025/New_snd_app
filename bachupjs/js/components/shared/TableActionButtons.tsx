import React from 'react';
import { Button } from '@/components/ui/button';
import {
  RefreshCw,
  Filter,
  Upload,
  FileText,
  MoreVertical,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CreateButton from '@/components/shared/CreateButton';
import { Permission } from '@/components/Permission';

export interface ExportOption {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

export interface TableActionButtonsProps {
  resourceType: string;
  permissionResourceName?: string;
  onExport?: () => void;
  onImport?: () => void;
  onReset?: () => void;
  onRefresh?: () => void;
  exportOptions?: ExportOption[];
  disableReset?: boolean;
  disableRefresh?: boolean;
  disableExport?: boolean;
  disableImport?: boolean;
  additionalButtons?: React.ReactNode;
}

/**
 * A component for standardizing common table actions like export, import, filtering and creating.
 */
export default function TableActionButtons({
  resourceType,
  permissionResourceName,
  onExport,
  onImport,
  onReset,
  onRefresh,
  exportOptions,
  disableReset = false,
  disableRefresh = false,
  disableExport = false,
  disableImport = false,
  additionalButtons
}: TableActionButtonsProps) {

  const permissionBase = permissionResourceName || resourceType;

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {exportOptions ? (
        exportOptions.map((option, index) => (
          <Permission key={index} permission={`${permissionBase}.export`} fallback={null}>
            <Button
              variant="outline"
              size="sm"
              onClick={option.action}
              disabled={disableExport}
              {option.icon}
              {option.label}
            </Button>
          </Permission>
        ))
      ) : onExport ? (
        <Permission permission={`${permissionBase}.export`} fallback={null}>
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={disableExport}
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </Permission>
      ) : null}

      {onImport && (
        <Permission permission={`${permissionBase}.import`} fallback={null}>
          <Button
            variant="outline"
            size="sm"
            onClick={onImport}
            disabled={disableImport}
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </Permission>
      )}

      {additionalButtons}

      <div className="flex gap-2">
        {onReset && (
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={disableReset}
            <Filter className="mr-2 h-4 w-4" />
            Reset
          </Button>
        )}

        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={disableRefresh}
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
