/**
 * Internationalization Implementation Example
 * This file demonstrates how to convert hardcoded text to i18n in React components
 */

// BEFORE: Original component with hardcoded text
import React from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const OriginalComponent = () => {
  return (
    <div className="timesheet-container">
      <h1>Monthly Timesheet</h1>
      <p>View and manage employee working hours for the current month.</p>

      <div className="filters">
        <label>Select Employee:</label>
        <select placeholder="All Employees">
          <option value="all">All Employees</option>
        </select>

        <label>Date Range:</label>
        <Input type="date" placeholder="Start Date" />
        <Input type="date" placeholder="End Date" />

        <Button>Apply Filters</Button>
        <Button>Reset</Button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Hours Worked</th>
            <th>Overtime</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Table content */}
        </tbody>
      </table>

      <div className="summary">
        <h3>Monthly Summary</h3>
        <p>Total Hours: <span>160</span></p>
        <p>Total Overtime: <span>12</span></p>
        <p>Absent Days: <span>2</span></p>
      </div>

      <div className="actions">
        <Button>Export to Excel</Button>
        <Button>Print Report</Button>
      </div>
    </div>
  );
};

// AFTER: Internationalized component using react-i18next
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const InternationalizedComponent = () => {
  // Initialize the translation hook with the timesheet namespace
  const { t } = useTranslation('timesheet');

  return (
    <div className="timesheet-container">
      <h1>{t('headings.monthly_timesheet')}</h1>
      <p>{t('descriptions.view_manage_hours')}</p>

      <div className="filters">
        <label>{t('forms.select_employee')}:</label>
        <select placeholder={t('forms.all_employees')}>
          <option value="all">{t('forms.all_employees')}</option>
        </select>

        <label>{t('forms.date_range')}:</label>
        <Input type="date" placeholder={t('forms.start_date')} />
        <Input type="date" placeholder={t('forms.end_date')} />

        <Button>{t('buttons.apply_filters')}</Button>
        <Button>{t('buttons.reset')}</Button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>{t('table.employee_name')}</th>
            <th>{t('table.date')}</th>
            <th>{t('table.hours_worked')}</th>
            <th>{t('table.overtime')}</th>
            <th>{t('table.status')}</th>
            <th>{t('table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {/* Table content */}
        </tbody>
      </table>

      <div className="summary">
        <h3>{t('headings.monthly_summary')}</h3>
        <p>{t('summary.total_hours')}: <span>160</span></p>
        <p>{t('summary.total_overtime')}: <span>12</span></p>
        <p>{t('summary.absent_days')}: <span>2</span></p>
      </div>

      <div className="actions">
        <Button>{t('buttons.export_to_excel')}</Button>
        <Button>{t('buttons.print_report')}</Button>
      </div>
    </div>
  );
};

/**
 * Translation Keys Example (public/locales/en/timesheet.json)
 */
const englishTranslations = {
  "headings": {
    "monthly_timesheet": "Monthly Timesheet",
    "monthly_summary": "Monthly Summary"
  },
  "descriptions": {
    "view_manage_hours": "View and manage employee working hours for the current month."
  },
  "forms": {
    "select_employee": "Select Employee",
    "all_employees": "All Employees",
    "date_range": "Date Range",
    "start_date": "Start Date",
    "end_date": "End Date"
  },
  "buttons": {
    "apply_filters": "Apply Filters",
    "reset": "Reset",
    "export_to_excel": "Export to Excel",
    "print_report": "Print Report"
  },
  "table": {
    "employee_name": "Employee Name",
    "date": "Date",
    "hours_worked": "Hours Worked",
    "overtime": "Overtime",
    "status": "Status",
    "actions": "Actions"
  },
  "summary": {
    "total_hours": "Total Hours",
    "total_overtime": "Total Overtime",
    "absent_days": "Absent Days"
  }
};

/**
 * Translation Keys Example (public/locales/ar/timesheet.json)
 */
const arabicTranslations = {
  "headings": {
    "monthly_timesheet": "سجل الدوام الشهري",
    "monthly_summary": "الملخص الشهري"
  },
  "descriptions": {
    "view_manage_hours": "عرض وإدارة ساعات عمل الموظفين للشهر الحالي."
  },
  "forms": {
    "select_employee": "اختر الموظف",
    "all_employees": "جميع الموظفين",
    "date_range": "نطاق التاريخ",
    "start_date": "تاريخ البدء",
    "end_date": "تاريخ الانتهاء"
  },
  "buttons": {
    "apply_filters": "تطبيق الفلاتر",
    "reset": "إعادة تعيين",
    "export_to_excel": "تصدير إلى إكسل",
    "print_report": "طباعة التقرير"
  },
  "table": {
    "employee_name": "اسم الموظف",
    "date": "التاريخ",
    "hours_worked": "ساعات العمل",
    "overtime": "العمل الإضافي",
    "status": "الحالة",
    "actions": "الإجراءات"
  },
  "summary": {
    "total_hours": "إجمالي الساعات",
    "total_overtime": "إجمالي العمل الإضافي",
    "absent_days": "أيام الغياب"
  }
};

export { OriginalComponent, InternationalizedComponent };
