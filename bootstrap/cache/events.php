<?php return array (
  'Illuminate\\Foundation\\Support\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\AuditCompliance\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\Core\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\EquipmentManagement\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\LeaveManagement\\Providers\\EventServiceProvider' => 
  array (
    'Modules\\LeaveManagement\\Events\\LeaveRequested' => 
    array (
      0 => 'Modules\\LeaveManagement\\Listeners\\NotifyHRDepartment',
      1 => 'Modules\\LeaveManagement\\Listeners\\NotifySupervisor',
    ),
    'Modules\\LeaveManagement\\Events\\LeaveApproved' => 
    array (
      0 => 'Modules\\LeaveManagement\\Listeners\\NotifyEmployee',
      1 => 'Modules\\LeaveManagement\\Listeners\\UpdateLeaveBalance',
    ),
    'Modules\\LeaveManagement\\Events\\LeaveRejected' => 
    array (
      0 => 'Modules\\LeaveManagement\\Listeners\\NotifyEmployeeRejection',
    ),
  ),
  'Modules\\Localization\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\MobileBridge\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\Notifications\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\Reporting\\Providers\\EventServiceProvider' => 
  array (
  ),
  'Modules\\Settings\\Providers\\EventServiceProvider' => 
  array (
    'Modules\\Settings\\Events\\SettingCreated' => 
    array (
      0 => 'Modules\\Settings\\Listeners\\LogSettingChange@handleSettingCreated',
    ),
    'Modules\\Settings\\Events\\SettingUpdated' => 
    array (
      0 => 'Modules\\Settings\\Listeners\\LogSettingChange@handleSettingUpdated',
    ),
    'Modules\\Settings\\Events\\SettingDeleted' => 
    array (
      0 => 'Modules\\Settings\\Listeners\\LogSettingChange@handleSettingDeleted',
    ),
  ),
  'Modules\\TimesheetManagement\\Providers\\EventServiceProvider' => 
  array (
    'Modules\\TimesheetManagement\\Events\\TimesheetSubmitted' => 
    array (
      0 => 'Modules\\TimesheetManagement\\Listeners\\NotifyManager',
      1 => 'Modules\\TimesheetManagement\\Listeners\\CalculateWorkHours',
    ),
    'Modules\\TimesheetManagement\\Events\\TimesheetApproved' => 
    array (
      0 => 'Modules\\TimesheetManagement\\Listeners\\NotifyEmployee',
      1 => 'Modules\\TimesheetManagement\\Listeners\\UpdateWorkSummary',
    ),
    'Modules\\TimesheetManagement\\Events\\TimesheetRejected' => 
    array (
      0 => 'Modules\\TimesheetManagement\\Listeners\\NotifyEmployeeRejection',
    ),
    'Modules\\TimesheetManagement\\Events\\OvertimeRecorded' => 
    array (
      0 => 'Modules\\TimesheetManagement\\Listeners\\NotifyPayrollDepartment',
    ),
  ),
  'Modules\\CustomerManagement\\Providers\\EventServiceProvider' => 
  array (
  ),
);