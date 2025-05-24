# Active Context

## Current Focus

We are now focused on implementing a comprehensive modular system with Laravel 12, Inertia.js, and React. The application follows a well-structured modular architecture with specialized modules for different business domains including HR & Payroll, Project Management, Rental Management, Equipment Management, and more.

### Recent Implementation: Modular Architecture with Domain-Driven Structure

We have implemented a comprehensive modular architecture that organizes the application into self-contained, domain-specific modules. Each module follows a consistent structure with dedicated directories for:

- Domain Models
- Controllers and Requests
- Actions for business operations
- Events and Listeners
- Jobs for background processing
- Queries for specialized data retrieval
- Repositories for data access
- Services for business logic

The modules are organized in a way that promotes separation of concerns and domain-driven design principles.

## Comprehensive Module Structure

Our application is structured with the following key modules:

1. **Core Module**
   - Shared infrastructure, authentication, authorization, logging, i18n, settings
   - User, Role, and Permission management
   - Activity logging
   - Base components for other modules

2. **EmployeeManagement Module**
   - Employee profiles and organizational data
   - Department and position management
   - Employee document handling
   - Employee lifecycle management

3. **LeaveManagement Module**
   - Leave types and definitions
   - Leave request workflow
   - Leave approval process
   - Leave balance tracking

4. **TimesheetManagement Module**
   - Mobile time-logging
   - Geofencing for location verification
   - 4-step approval workflow
   - Attendance tracking

5. **Payroll Module**
   - Payroll calculation
   - Advances management
   - Final settlements
   - Salary processing

6. **ProjectManagement Module**
   - Project tracking through phases
   - Task management
   - Equipment allocation to projects
   - Budget monitoring

7. **RentalManagement Module**
   - Equipment rentals
   - Invoicing
   - Payment processing
   - Rental tracking

8. **EquipmentManagement Module**
   - Equipment master data
   - Maintenance records
   - Maintenance scheduling
   - Equipment status tracking

9. **Settings Module**
   - Company-wide configuration
   - System preferences
   - Global settings management

10. **Notifications Module**
    - Centralized notification system
    - Email, SMS, and push notifications
    - Notification preferences
    - Notification history

11. **Reporting Module**
    - Cross-module business intelligence
    - Export functionality
    - Report scheduling
    - Data visualization

12. **API Module**
    - REST/GraphQL endpoints for mobile apps
    - API versioning
    - Authentication for third-party access
    - API documentation

13. **Localization Module**
    - Dynamic i18n beyond Spatie Translatable
    - Translation management
    - Language switching
    - RTL support for Arabic

14. **AuditCompliance Module**
    - GDPR compliance
    - Data retention policies
    - Data erasure requests
    - Audit logging for sensitive operations

15. **MobileBridge Module**
    - PWA support
    - Native bridge functionality
    - Offline capabilities
    - Service worker management

## Implementation Status Update

We need to develop or enhance the following key modules:

1. **Employee Management Module**
   - Employee profiles with document management using Spatie MediaLibrary ⚠️
   - Role-based permissions using Spatie Permissions ⚠️
   - Document handling and verification ⚠️
   - Activity logging for changes to employee records ⚠️

2. **Timesheet-based Payroll Module**
   - Timesheet entry linked to projects ⚠️
   - Overtime calculation logic ⚠️
   - Prorated salary calculations ⚠️
   - Payroll report generation (PDF/CSV) ⚠️

3. **Advance Salary System**
   - Request submission and approval workflow ⚠️
   - Automatic deduction from future payments ⚠️
   - Transaction history and tracking ⚠️

4. **Manual Final Settlement**
   - Calculation for departing employees ⚠️
   - PDF generation for settlement documentation ⚠️
   - Audit logging for settlement actions ⚠️

5. **Equipment Rentals Workflow**
   - Equipment assignment to employees ⚠️
   - Rental agreement generation ⚠️
   - Return tracking and reminders ⚠️
   - Condition assessment upon return ⚠️

6. **Project Management Module**
   - Project phases: Planning, Execution, Closure ⚠️
   - Resource allocation tracking ⚠️
   - Budget monitoring ⚠️
   - Daily logs for project progress ⚠️

7. **Multilingual Support (EN/AR)**
   - Spatie Translatable integration ⚠️
   - RTL support for Arabic ⚠️
   - Language switching mechanism ⚠️
   - Translations for all UI elements ⚠️

8. **UI/UX Implementation**
   - ShadCN UI components with Tailwind CSS ⚠️
   - Glassmorphic design elements ⚠️
   - Responsive layouts for all device sizes ⚠️
   - Form validation with React Hook Form & Zod ⚠️

9. **Notification System**
   - Centralized notification handling ⚠️
   - Multi-channel delivery (email, SMS, push) ⚠️
   - Notification preferences ⚠️
   - Real-time notifications ⚠️

10. **Reporting and Analytics**
    - Cross-module reporting ⚠️
    - Export functionality ⚠️
    - Data visualization ⚠️
    - Scheduled reports ⚠️

11. **API for Mobile Access**
    - RESTful endpoints ⚠️
    - Authentication and authorization ⚠️
    - Versioning strategy ⚠️
    - Rate limiting and security ⚠️

12. **Audit and Compliance**
    - Data retention policies ⚠️
    - Compliance with regulations ⚠️
    - Data erasure capabilities ⚠️
    - Comprehensive audit logging ⚠️

## Implementation Approach

We'll implement the system following these principles:

1. **Modular Design**
   - Each feature in its own module
   - Clear interfaces between modules
   - Self-contained business logic
   - Domain-driven structure

2. **Type Safety**
   - TypeScript for frontend
   - Strong typing in PHP
   - DTOs for data transfer
   - Schema validation for forms

3. **Service-Repository Pattern**
   - Services for business logic
   - Repositories for data access
   - Clean separation of concerns
   - Testable components

4. **Integration Strategy**
   - Inertia.js for seamless frontend/backend
   - API endpoints for CRUD operations
   - Event-driven for side effects
   - Activity logging for auditing

5. **Testing Approach**
   - Unit tests for core business logic
   - Feature tests for API endpoints
   - UI tests for critical workflows
   - Test factories for consistent data

## Next Steps

We need to begin by:

1. First implementing the core Employee Management module:
   - Create migration for employee profiles
   - Build basic CRUD operations
   - Implement document management
   - Set up role-based permissions

2. Then integrate the Timesheet system:
   - Design database schema for timesheets
   - Create timesheet entry functionality
   - Build approval workflow
   - Connect to projects module

3. Finally implement the Payroll calculation:
   - Build salary calculation service
   - Implement overtime processing
   - Create prorated calculation logic
   - Develop reporting system

After these core components are in place, we can implement the advance salary, final settlement, equipment rental, and project management features.

## Technical Debt and Notes

- We should ensure proper validation for all form inputs
- The salary calculation needs to handle various edge cases
- We need to test RTL layout thoroughly across all components
- Consider optimization strategies for reporting on large datasets
- Need to implement proper caching for translation strings
- Module interactions need to be clearly defined to prevent circular dependencies
- API versioning strategy needs to be established early

## Active Decisions
1. Using ShadCN UI for consistent component design
2. Implementing Service-Repository pattern for business logic
3. Using TypeScript for type safety in frontend
4. Following modular architecture for better maintainability
5. Implementing Zod schemas for form validation
6. Using Spatie Translatable for multilingual support
7. Integrating document management with Spatie MediaLibrary
8. Adopting domain-driven module structure
9. Using the action pattern for single-purpose business operations

## Current Considerations
1. Performance optimization for large datasets
2. Security for sensitive HR data
3. Handling of complex payroll edge cases
4. Testing strategy for multi-language support
5. Deployment process with language assets
6. Mobile responsiveness for field workers
7. Offline capabilities for remote use cases
8. Integration between modules while maintaining clear boundaries
9. Cross-module reporting capabilities
10. Audit logging strategy across modules

## Recent Changes
- Analyzed requirements for a comprehensive modular system
- Updated system patterns documentation with detailed module structure
- Identified key modules and their components
- Planned integration with existing architecture
- Prepared implementation roadmap for remaining modules
- Defined clear module boundaries and responsibilities

## Next Steps
1. Employee Management Module
   - Create database migrations
   - Implement employee model
   - Build document management
   - Develop frontend components

2. Timesheet System
   - Design database schema
   - Create timesheet entry UI
   - Implement approval workflow
   - Connect to projects module

3. Salary Calculation
   - Implement calculation service
   - Build overtime processing
   - Create prorated calculations
   - Develop reporting functionality

4. UI/UX Implementation
   - Configure ShadCN UI components
   - Implement responsive layouts
   - Create form validation schema
   - Design dashboard views

## Recent Change: Unified Module Routing

- All module web routes are now wrapped in the correct `Route::prefix()` and `->name()` group as per the new convention (see systemPatterns.md for mapping).
- Each module's ServiceProvider loads its web.php using `$this->loadRoutesFrom(...)`.
- Ziggy manifest regenerated, route/config/view caches cleared and rebuilt.
- This resolves the 404/403/500 errors for module endpoints and brings all modules into routing alignment for Inertia.js and Ziggy.
