# RTL Support Implementation Guide

This guide provides detailed instructions for implementing Right-to-Left (RTL) support for Arabic language in the application.

## Understanding RTL Requirements

Arabic is a Right-to-Left (RTL) language, which means the UI layout needs to be mirrored compared to Left-to-Right (LTR) languages like English. This affects:

- Text alignment (right-aligned instead of left-aligned)
- Flow direction (elements flow from right to left)
- Directional elements (icons, arrows, etc.)
- Form elements (input fields, dropdowns, etc.)
- Navigation elements (menus, breadcrumbs, etc.)

## Implementation Steps

### 1. Set up Dynamic Direction Switching

First, implement a mechanism to dynamically change the document direction based on the selected language:

#### In your main layout component:

```jsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function MainLayout({ children }) {
  const { i18n } = useTranslation();
  
  // Update document direction when language changes
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    document.body.classList.toggle('rtl-layout', dir === 'rtl');
  }, [i18n.language]);
  
  return (
    <div className="app-container">
      {children}
    </div>
  );
}
```

### 2. Add RTL-Specific CSS

Create a dedicated CSS file for RTL-specific styles:

```css
/* rtl-styles.css */

/* Only apply these styles when in RTL mode */
.rtl-layout {
  /* Text alignment */
  text-align: right;
  
  /* Flip margins and paddings */
  .form-label, .form-item {
    margin-left: 1rem;
    margin-right: 0;
  }
  
  /* Flip flexbox direction */
  .flex-row {
    flex-direction: row-reverse;
  }
  
  /* Flip grid columns */
  .grid-container {
    direction: rtl;
  }
  
  /* Flip icons that indicate direction */
  .arrow-icon {
    transform: scaleX(-1);
  }
  
  /* Adjust text input alignment */
  input[type="text"], 
  input[type="email"],
  input[type="password"],
  textarea {
    text-align: right;
  }
  
  /* Adjust table alignment */
  th, td {
    text-align: right;
  }
  
  /* Flip table header and footer */
  thead, tfoot {
    direction: rtl;
  }
  
  /* Adjust dropdown menus */
  .dropdown-menu {
    right: 0;
    left: auto;
  }
  
  /* Adjust modal positioning */
  .modal-header .close {
    margin: -1rem auto -1rem -1rem;
  }
  
  /* Adjust breadcrumbs */
  .breadcrumb-item {
    float: right;
  }
  
  .breadcrumb-item::before {
    transform: scaleX(-1);
  }
  
  /* Adjust pagination */
  .pagination {
    flex-direction: row-reverse;
  }
  
  /* Adjust button groups */
  .btn-group {
    flex-direction: row-reverse;
  }
  
  /* Adjust form check alignment */
  .form-check {
    padding-right: 1.25rem;
    padding-left: 0;
  }
  
  .form-check-input {
    margin-right: -1.25rem;
    margin-left: 0;
  }
}
```

### 3. Handle Bidirectional Text

For components that mix LTR and RTL content (like English product names in Arabic text), use the `bdi` HTML element:

```jsx
<p>
  {t('product_description')}
  <bdi>{productName}</bdi>
  {t('product_details')}
</p>
```

### 4. Handle Directional Icons

For icons that indicate direction (arrows, carets, etc.), create a component that flips based on the current language:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const DirectionalIcon = ({ iconType, ...props }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  // Map of icons that need to be flipped in RTL mode
  const iconMap = {
    'next': isRTL ? ArrowLeft : ArrowRight,
    'previous': isRTL ? ArrowRight : ArrowLeft,
    // Add more directional icons as needed
  };
  
  const IconComponent = iconMap[iconType];
  
  return <IconComponent {...props} />;
};

export default DirectionalIcon;
```

Usage:

```jsx
<Button>
  <DirectionalIcon iconType="next" />
  {t('buttons.next')}
</Button>
```

### 5. Handle Date Formats

Ensure date formats are appropriate for Arabic locale:

```jsx
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

const FormattedDate = ({ date }) => {
  const { i18n } = useTranslation();
  
  return (
    <span>
      {format(date, 'PPP', { 
        locale: i18n.language === 'ar' ? ar : undefined 
      })}
    </span>
  );
};
```

### 6. Handle Number Formats

Ensure numbers are formatted correctly for Arabic locale:

```jsx
const FormattedNumber = ({ value }) => {
  const { i18n } = useTranslation();
  
  return (
    <span>
      {new Intl.NumberFormat(i18n.language).format(value)}
    </span>
  );
};
```

### 7. Implement RTL Support for Specific UI Components

#### Tables

```jsx
import { useTranslation } from 'react-i18next';

const DataTable = ({ data, columns }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <table className={`data-table ${isRTL ? 'rtl-table' : ''}`}>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key} className={isRTL ? 'text-right' : 'text-left'}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Table body */}
      </tbody>
    </table>
  );
};
```

#### Forms

```jsx
import { useTranslation } from 'react-i18next';

const FormField = ({ label, children }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  return (
    <div className={`form-field ${isRTL ? 'rtl-form-field' : ''}`}>
      <label className={isRTL ? 'text-right' : 'text-left'}>{label}</label>
      {children}
    </div>
  );
};
```

### 8. Testing RTL Support

Create a comprehensive testing plan for RTL support:

1. **Visual Testing**:
   - Check text alignment (should be right-aligned)
   - Check form elements (labels should be on the right)
   - Check directional icons (should be flipped)
   - Check tables (headers and content should be right-aligned)
   - Check modals and popups (should open from the right)

2. **Functional Testing**:
   - Test language switching (UI should immediately reflect the change)
   - Test form submission with Arabic input
   - Test sorting and filtering with Arabic content
   - Test pagination with Arabic content

3. **Responsive Testing**:
   - Test RTL layout on different screen sizes
   - Test RTL layout on mobile devices

### 9. Common RTL Issues and Solutions

#### Issue: Text Overflow in Fixed-Width Containers

**Solution**: Use CSS `overflow-wrap: break-word;` and ensure containers have appropriate padding.

#### Issue: Bidirectional Text Mixing

**Solution**: Use the `bdi` HTML element for isolated text segments.

#### Issue: Form Validation Messages

**Solution**: Ensure validation messages are positioned correctly in RTL mode.

```css
.rtl-layout .validation-message {
  right: 0;
  left: auto;
}
```

#### Issue: Third-Party Components Without RTL Support

**Solution**: Create wrapper components that apply RTL-specific styles or use libraries with built-in RTL support.

### 10. RTL Support for Specific Modules

#### TimesheetManagement Module

Focus on these components first:

1. Monthly.tsx - Calendar view needs special RTL handling
2. Create.tsx - Form layout needs to be mirrored
3. Approvals/Index.jsx - Table layout needs RTL support

#### ProjectManagement Module

Focus on these components:

1. Project timeline views - Direction needs to be reversed
2. Gantt charts - Need special RTL handling
3. Project forms - Layout needs to be mirrored

## Implementation Checklist

- [ ] Set up dynamic direction switching
- [ ] Add RTL-specific CSS
- [ ] Handle bidirectional text
- [ ] Handle directional icons
- [ ] Handle date formats
- [ ] Handle number formats
- [ ] Implement RTL support for tables
- [ ] Implement RTL support for forms
- [ ] Test RTL support
- [ ] Fix common RTL issues

## Resources

- [MDN Web Docs: RTL (Right To Left) Development](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
- [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- [React-i18next RTL Support](https://react.i18next.com/guides/rtl-support)
- [Material-UI RTL Support](https://mui.com/material-ui/guides/right-to-left/)

## Conclusion

Implementing proper RTL support is crucial for providing a good user experience for Arabic-speaking users. By following this guide, you can ensure that your application works correctly in both LTR and RTL modes, providing a seamless experience regardless of the user's language preference.
