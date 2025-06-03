# i18n Integration Instructions

## 1. Install Required Dependencies

```bash
npm install react-i18next i18next i18next-browser-languagedetector i18next-http-backend
# or
yarn add react-i18next i18next i18next-browser-languagedetector i18next-http-backend
```

## 2. Import i18n Configuration

Add the following import to your main application file (usually `app.tsx` or `main.tsx`):

```typescript
// At the top of your main app file
import './i18n';
```

## 3. Add RTL Support

Import the RTL CSS file in your main CSS file or component:

```css
/* In your main CSS file (e.g., app.css) */
@import './rtl.css';
```

## 4. Add Language Switcher to Layout

Add the LanguageSwitcher component to your main layout:

```typescript
import LanguageSwitcher from '@/components/LanguageSwitcher';

// In your layout component
<div className="header-actions">
  <LanguageSwitcher />
  {/* Other header components */}
</div>
```

## 5. Initialize Direction on App Load

Add this to your main app component to set initial direction:

```typescript
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial direction based on language
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Rest of your app
}
```

## 6. Update Tailwind CSS Configuration (if using Tailwind)

Add RTL support to your `tailwind.config.js`:

```javascript
module.exports = {
  // ... other config
  plugins: [
    // ... other plugins
    require('@tailwindcss/forms'),
    // Add RTL plugin if available
    // require('tailwindcss-rtl'),
  ],
  // Add custom RTL utilities
  theme: {
    extend: {
      // Custom RTL utilities can be added here
    }
  }
}
```

## 7. Test Your Implementation

1. Start your development server
2. Check that the language switcher appears
3. Switch between English and Arabic
4. Verify that:
   - Text changes language
   - Layout direction changes for Arabic (RTL)
   - All translated strings appear correctly

## 8. Common Issues and Solutions

### Issue: Translations not loading
**Solution:** Make sure all translation JSON files exist and are properly formatted.

### Issue: RTL layout not working
**Solution:** Ensure RTL CSS is imported and `dir` attribute is set on `<html>` element.

### Issue: Some strings still hardcoded
**Solution:** Run `node detect-missing-translations.js` to find remaining hardcoded strings.

### Issue: Arabic text not displaying correctly
**Solution:** Ensure your font supports Arabic characters and is properly loaded.

## 9. Next Steps

1. **Test thoroughly:** Test all components with both languages
2. **Add more languages:** Extend the system to support additional languages
3. **Optimize loading:** Consider lazy loading translation files for better performance
4. **Add pluralization:** Implement plural forms for different languages
5. **Context-aware translations:** Add context to translation keys for better accuracy

## 10. Maintenance

- Regularly run `detect-missing-translations.js` to find new hardcoded strings
- Keep translation files synchronized between languages
- Update RTL styles as you add new components
- Test language switching functionality with each release
