# Packages and Modules Overview

## Core PHP Packages

### Laravel Framework (v12.x)
- **Purpose**: Main backend framework
- **Key Features**: Routing, middleware, ORM, migrations, authentication
- **Usage**: Foundation of the entire backend architecture

### Laravel Modules (nwidart/laravel-modules)
- **Purpose**: Modular architecture implementation
- **Key Features**: Module separation, isolation, and management
- **Usage**: Used to organize codebase into business domains

### Spatie Permissions (spatie/laravel-permission)
- **Purpose**: Role-based access control
- **Key Features**: Roles, permissions, middleware, trait integration
- **Usage**: Handles all authorization across the application

### Spatie Media Library (spatie/laravel-medialibrary)
- **Purpose**: File management
- **Key Features**: File uploads, conversions, collections
- **Usage**: Handles employee documents, equipment images, contract files

### Spatie Activity Log (spatie/laravel-activitylog)
- **Purpose**: Audit trailing
- **Key Features**: Activity logging, causers, subjects
- **Usage**: Tracks all system activities for accountability

### Spatie Translatable (spatie/laravel-translatable)
- **Purpose**: Multi-language support
- **Key Features**: Translatable model attributes, language switching
- **Usage**: Provides Arabic/English translations for content

### Laravel Sanctum
- **Purpose**: API authentication
- **Key Features**: Tokens, SPA authentication, scopes
- **Usage**: Secures all API endpoints and SPA

### Laravel Excel (maatwebsite/excel)
- **Purpose**: Excel export/import
- **Key Features**: CSV/Excel generation, data import
- **Usage**: Reporting, data exports, bulk imports

### Laravel DomPDF (barryvdh/laravel-dompdf)
- **Purpose**: PDF generation
- **Key Features**: HTML to PDF conversion, styling
- **Usage**: Payslips, invoices, reports, contracts

## JavaScript/TypeScript Packages

### React (v19.x)
- **Purpose**: Frontend framework
- **Key Features**: Component-based UI, virtual DOM, hooks
- **Usage**: All frontend interfaces

### TypeScript (v5.x)
- **Purpose**: Type safety
- **Key Features**: Static typing, interfaces, type checking
- **Usage**: All frontend code

### Inertia.js
- **Purpose**: Backend-frontend integration
- **Key Features**: SPA without API, shared controllers
- **Usage**: Page transitions, data passing

### ShadCN UI
- **Purpose**: UI component system
- **Key Features**: Accessible components, Tailwind CSS integration
- **Usage**: All UI elements (buttons, forms, tables, etc.)

### React Hook Form
- **Purpose**: Form handling
- **Key Features**: Uncontrolled components, validation
- **Usage**: All form implementations

### Zod
- **Purpose**: Schema validation
- **Key Features**: TypeScript integration, runtime validation
- **Usage**: API data validation, form validation

### Zustand
- **Purpose**: State management
- **Key Features**: Simple API, middleware, persistence
- **Usage**: Application state (auth, preferences, etc.)

### TanStack Table
- **Purpose**: Data tables
- **Key Features**: Sorting, filtering, pagination
- **Usage**: All data tables across the application

### Chart.js
- **Purpose**: Data visualization
- **Key Features**: Responsive charts, animations
- **Usage**: Dashboards, reports, analytics

### Date-fns
- **Purpose**: Date manipulation
- **Key Features**: Immutable date operations, i18n
- **Usage**: Date calculations, formatting, localization

### React-pdf
- **Purpose**: PDF generation and viewing
- **Key Features**: PDF rendering, generation
- **Usage**: Document previews, PDF exports

## Application Modules

### Core Module
- **Purpose**: Base functionality and shared services
- **Key Features**: Authentication, authorization, settings, logging
- **Dependencies**: Spatie Permissions, Laravel Sanctum, Spatie ActivityLog

### EmployeeManagement Module
- **Purpose**: HR employee data management
- **Key Features**: Employee profiles, departments, positions
- **Dependencies**: Spatie MediaLibrary (documents)

### LeaveManagement Module
- **Purpose**: Employee leave tracking
- **Key Features**: Leave requests, approval workflow, balances
- **Dependencies**: Core Module (notifications)

### TimesheetManagement Module
- **Purpose**: Work time tracking
- **Key Features**: Time logs, geofencing, approvals
- **Dependencies**: EmployeeManagement Module

### Payroll Module
- **Purpose**: Salary processing
- **Key Features**: Salary calculation, advances, settlements
- **Dependencies**: TimesheetManagement, Laravel DomPDF

### ProjectManagement Module
- **Purpose**: Project tracking
- **Key Features**: Projects, tasks, resources, budgets
- **Dependencies**: EmployeeManagement, EquipmentManagement

### RentalManagement Module
- **Purpose**: Equipment rental business
- **Key Features**: Rentals, contracts, invoicing
- **Dependencies**: CustomerManagement, EquipmentManagement, Laravel DomPDF

### EquipmentManagement Module
- **Purpose**: Equipment inventory
- **Key Features**: Equipment catalog, maintenance, status
- **Dependencies**: Spatie MediaLibrary (images)

### CustomerManagement Module
- **Purpose**: Client data management
- **Key Features**: Customer profiles, history, documents
- **Dependencies**: Spatie MediaLibrary (documents)

### Settings Module
- **Purpose**: System configuration
- **Key Features**: Global settings, preferences
- **Dependencies**: Core Module

### Notifications Module
- **Purpose**: Communication system
- **Key Features**: Email, in-app notifications
- **Dependencies**: Core Module

### Reporting Module
- **Purpose**: Business intelligence
- **Key Features**: Reports, exports, analytics
- **Dependencies**: Laravel Excel, Laravel DomPDF

### Localization Module
- **Purpose**: Multi-language support
- **Key Features**: Translations, localization
- **Dependencies**: Spatie Translatable

### MobileBridge Module
- **Purpose**: Mobile app integration
- **Key Features**: API endpoints for mobile apps
- **Dependencies**: Laravel Sanctum

### API Module
- **Purpose**: External integrations
- **Key Features**: RESTful endpoints, authentication
- **Dependencies**: Laravel Sanctum, Laravel Resources

## Development Tools

### Laravel Pint
- **Purpose**: PHP code style enforcement
- **Key Features**: PSR-12 compliance, automatic fixing
- **Usage**: CI/CD pipeline, local development

### ESLint
- **Purpose**: JavaScript/TypeScript linting
- **Key Features**: Code quality, style enforcement
- **Usage**: CI/CD pipeline, local development

### Prettier
- **Purpose**: Code formatting
- **Key Features**: Consistent code style
- **Usage**: Frontend code formatting

### Jest
- **Purpose**: JavaScript testing
- **Key Features**: Unit tests, component tests
- **Usage**: Frontend testing

### PHPUnit
- **Purpose**: PHP testing
- **Key Features**: Unit tests, feature tests
- **Usage**: Backend testing

### Vite
- **Purpose**: Frontend build tool
- **Key Features**: Fast HMR, optimized builds
- **Usage**: Frontend development and production builds 
