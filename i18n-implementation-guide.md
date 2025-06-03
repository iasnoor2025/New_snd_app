# Internationalization (i18n) Implementation Guide

## Phase 1: TimesheetManagement Module

This guide provides step-by-step instructions for implementing internationalization in the TimesheetManagement module, starting with the Monthly.tsx component.

### Prerequisites

1. Ensure you have the required dependencies:
   - react-i18next
   - i18next
   - i18next-http-backend
   - i18next-browser-languagedetector

2. Verify that the i18n configuration is properly set up in `resources/js/i18n.js`

### Step 1: Add Translation Hook to Monthly.tsx

First, import the `useTranslation` hook at the top of the file:

```tsx
import { useTranslation } from 'react-i18next';
```

Then, initialize the hook inside your component function:

```tsx
export default function MonthlyTimesheets({ auth, timesheets = [], employees = [] }: Props) {
  const { t } = useTranslation('timesheet'); // Use the timesheet namespace
  const { toast } = useToast();
  // ... rest of the component
}
```

### Step 2: Replace Hardcoded Text with Translation Keys

Replace hardcoded text with translation function calls. Here are some examples from the Monthly.tsx file:

#### Breadcrumbs

```tsx
// Before
const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Timesheets', href: '/timesheets' },
  { title: 'Monthly View', href: '#' }
];

// After
const breadcrumbs: BreadcrumbItem[] = [
  { title: t('navigation.dashboard'), href: '/dashboard' },
  { title: t('navigation.timesheets'), href: '/timesheets' },
  { title: t('navigation.monthly_view'), href: '#' }
];
```

#### Card Titles and Descriptions

```tsx
// Before
<CardTitle>Monthly Timesheet</CardTitle>
<CardDescription>View and manage employee working hours</CardDescription>

// After
<CardTitle>{t('cards.monthly_timesheet_title')}</CardTitle>
<CardDescription>{t('cards.monthly_timesheet_description')}</CardDescription>
```

#### Form Labels and Placeholders

```tsx
// Before
<FormLabel>Select Employee</FormLabel>
<Input placeholder="Search employees..." />

// After
<FormLabel>{t('forms.select_employee')}</FormLabel>
<Input placeholder={t('forms.search_employees')} />
```

#### Button Text

```tsx
// Before
<Button>Export to Excel</Button>
<Button>Print Report</Button>

// After
<Button>{t('buttons.export_to_excel')}</Button>
<Button>{t('buttons.print_report')}</Button>
```

#### Table Headers

```tsx
// Before
<TableHead>Employee Name</TableHead>
<TableHead>Date</TableHead>
<TableHead>Hours Worked</TableHead>

// After
<TableHead>{t('table.employee_name')}</TableHead>
<TableHead>{t('table.date')}</TableHead>
<TableHead>{t('table.hours_worked')}</TableHead>
```

### Step 3: Add Translation Keys to JSON Files

Add the translation keys to the English and Arabic translation files:

#### English (public/locales/en/timesheet.json)

```json
{
  "navigation": {
    "dashboard": "Dashboard",
    "timesheets": "Timesheets",
    "monthly_view": "Monthly View"
  },
  "cards": {
    "monthly_timesheet_title": "Monthly Timesheet",
    "monthly_timesheet_description": "View and manage employee working hours"
  },
  "forms": {
    "select_employee": "Select Employee",
    "search_employees": "Search employees...",
    "select_date": "Select date",
    "all_employees": "All Employees"
  },
  "buttons": {
    "export_to_excel": "Export to Excel",
    "print_report": "Print Report",
    "apply_filters": "Apply Filters",
    "reset": "Reset"
  },
  "table": {
    "employee_name": "Employee Name",
    "date": "Date",
    "hours_worked": "Hours Worked",
    "overtime": "Overtime",
    "status": "Status",
    "actions": "Actions"
  },
  "status": {
    "approved": "Approved",
    "pending": "Pending",
    "rejected": "Rejected"
  },
  "summary": {
    "total_hours": "Total Hours",
    "total_overtime": "Total Overtime",
    "absent_days": "Absent Days"
  },
  "view_modes": {
    "week": "Week",
    "month": "Month"
  },
  "messages": {
    "no_timesheets": "No timesheets found for the selected period",
    "loading": "Loading timesheets..."
  }
}
```

#### Arabic (public/locales/ar/timesheet.json)

```json
{
  "navigation": {
    "dashboard": "لوحة القيادة",
    "timesheets": "سجلات الدوام",
    "monthly_view": "العرض الشهري"
  },
  "cards": {
    "monthly_timesheet_title": "سجل الدوام الشهري",
    "monthly_timesheet_description": "عرض وإدارة ساعات عمل الموظفين"
  },
  "forms": {
    "select_employee": "اختر الموظف",
    "search_employees": "البحث عن موظفين...",
    "select_date": "اختر التاريخ",
    "all_employees": "جميع الموظفين"
  },
  "buttons": {
    "export_to_excel": "تصدير إلى إكسل",
    "print_report": "طباعة التقرير",
    "apply_filters": "تطبيق الفلاتر",
    "reset": "إعادة تعيين"
  },
  "table": {
    "employee_name": "اسم الموظف",
    "date": "التاريخ",
    "hours_worked": "ساعات العمل",
    "overtime": "العمل الإضافي",
    "status": "الحالة",
    "actions": "الإجراءات"
  },
  "status": {
    "approved": "معتمد",
    "pending": "قيد الانتظار",
    "rejected": "مرفوض"
  },
  "summary": {
    "total_hours": "إجمالي الساعات",
    "total_overtime": "إجمالي العمل الإضافي",
    "absent_days": "أيام الغياب"
  },
  "view_modes": {
    "week": "أسبوع",
    "month": "شهر"
  },
  "messages": {
    "no_timesheets": "لم يتم العثور على سجلات دوام للفترة المحددة",
    "loading": "جاري تحميل سجلات الدوام..."
  }
}
```

### Step 4: Test the Implementation

After implementing the changes:

1. Run the i18n scanner to ensure all keys are properly detected:
   ```
   npm run scan-i18n
   ```

2. Start the development server and test language switching:
   ```
   npm run dev
   ```

3. Verify that the UI displays correctly in both English and Arabic

### Step 5: Implement RTL Support for Arabic

For proper Arabic support, ensure RTL (Right-to-Left) layout is applied when the language is set to Arabic:

1. Add a direction attribute to the HTML element based on the current language:

```jsx
// In your main layout component
import { useTranslation } from 'react-i18next';

function MainLayout({ children }) {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  
  return (
    <div dir={dir} className={`app-container ${dir === 'rtl' ? 'rtl-layout' : ''}`}>
      {children}
    </div>
  );
}
```

2. Add RTL-specific CSS adjustments:

```css
/* In your global CSS file */
.rtl-layout {
  text-align: right;
}

.rtl-layout .form-label {
  margin-right: 0;
  margin-left: 0.5rem;
}

/* Add more RTL-specific styles as needed */
```

### Next Steps

After implementing internationalization for the Monthly.tsx component, continue with:

1. Create.tsx
2. Edit.tsx
3. Index.tsx
4. Other components in the TimesheetManagement module

Follow the same pattern for each component:
1. Import useTranslation
2. Initialize the hook with the appropriate namespace
3. Replace hardcoded text with t() function calls
4. Add translation keys to the JSON files
5. Test the implementation

## Automation Tips

- Use the `npm run scan-i18n` command regularly to detect new translation keys
- Use the `npm run i18n-report` command to check translation coverage
- Consider using the `npm run suggest-i18n` command to get suggestions for missing translations

## Best Practices

1. **Organize Keys Hierarchically**: Group related keys under descriptive namespaces
2. **Use Consistent Naming**: Follow a consistent naming pattern for translation keys
3. **Context Comments**: Add context comments for translators when necessary
4. **Avoid String Concatenation**: Use interpolation instead of concatenating strings
5. **Handle Pluralization**: Use proper pluralization rules for different languages

```jsx
// Bad
<p>{t('you_have')} {count} {t('messages')}</p>

// Good
<p>{t('you_have_messages', { count })}</p>
```

By following this guide, you'll ensure a consistent and maintainable internationalization implementation across the TimesheetManagement module.
