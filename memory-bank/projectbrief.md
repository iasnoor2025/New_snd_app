# SND Rental React App - Project Brief

## Project Overview
A comprehensive rental and HR management system built with Laravel 12 and React, featuring role-based dashboards, real-time data management, and advanced HR & Payroll functionality.

## Project Goals
1. Create a scalable and maintainable rental and HR management system
2. Implement a modular architecture for easy feature addition
3. Provide a modern and intuitive user interface
4. Ensure robust security and performance
5. Maintain comprehensive documentation
6. Support dual language functionality (English & Arabic with RTL)

## Core Requirements

### Dashboard System
- Role-based dashboards (Admin, Manager, Employee, Accountant, HR)
- Real-time data updates
- System health monitoring
- User activity tracking
- Approval workflow management

### User Management
- Role-based access control
- User profile management
- Team management
- Activity logging

### Project Management
- Project phase tracking (Planning, Execution, Closure)
- Budget monitoring
- Team allocation
- Progress tracking
- Daily logs for project tasks

### Time Management
- Timesheet management linked to projects
- Leave request system
- Approval workflows
- Activity tracking
- Overtime calculation

### Technical Requirements
1. Architecture
   - Modular design using Laravel Modules
   - Service-Repository pattern
   - RESTful API endpoints
   - Type-safe frontend

2. Performance
   - Fast page loads (< 2s)
   - Quick API responses (< 200ms)
   - Efficient data processing
   - Optimized database queries

3. Security
   - Role-based access control using Spatie Permissions
   - Secure authentication with Laravel Sanctum
   - Data encryption
   - Input validation

### Functional Requirements
1. Rental Management
   - Equipment tracking
   - Customer management
   - Billing system
   - Contract management
   - Equipment rentals workflow

2. Employee Management
   - Employee profiles
   - Timesheet system
   - Leave management
   - Document handling with Spatie MediaLibrary
   - Performance reviews

3. Payroll System
   - Timesheet-based salary calculation
   - Overtime and prorated calculations
   - Advance salary system with deductions
   - Manual final settlement
   - Comprehensive reporting (PDF/CSV)

4. Inventory System
   - Stock management
   - Supplier management
   - Order processing
   - Inventory tracking

## Project Scope

### In Scope
1. Core Features
   - Rental management
   - Employee management
   - Payroll processing
   - Inventory control
   - Project management
   - Equipment rentals workflow
   - Dual language support (EN/AR)

2. Technical Implementation
   - Modular architecture
   - Frontend components using ShadCN UI
   - API endpoints
   - Database design
   - Glassmorphic UI design

3. Documentation
   - API documentation
   - User guides
   - Technical docs
   - Setup guides

### Out of Scope
1. Mobile Application
   - Native mobile apps
   - Mobile-specific features
   - Push notifications
   - Offline support

2. External Integrations
   - Third-party systems
   - Payment gateways
   - Communication systems
   - Document storage

## Technical Stack
- Frontend: React with TypeScript
- Backend: Laravel 12
- UI Components: ShadCN UI with Tailwind CSS
- State Management: React Hooks, Zustand
- Form Validation: React Hook Form with Zod
- Database: postgresql
- Authentication: Laravel Sanctum
- Authorization: Spatie Permissions
- Media Management: Spatie MediaLibrary
- Activity Logging: Spatie ActivityLog
- Translations: Spatie Translatable

## Key Features
1. Role-based Dashboards
   - Admin: System overview, user management, role management
   - Manager: Team overview, project status, approval requests
   - Employee: Personal info, timesheet, leave requests
   - Accountant: Financial overview, expense tracking
   - HR: Employee management, payroll, performance reviews

2. Real-time Monitoring
   - System health metrics
   - Resource usage tracking
   - User activity logging
   - Project status updates

3. Approval Workflows
   - Timesheet approvals
   - Leave request management
   - Project status updates
   - User role changes
   - Advance salary requests

4. Team Management
   - Team member overview
   - Project allocation
   - Performance tracking
   - Resource utilization

5. HR & Payroll Features
   - Employee document management
   - Timesheet-based payroll
   - Advance salary system
   - Manual final settlement
   - Equipment rentals workflow

## Success Criteria
1. Responsive and intuitive user interface
2. Real-time data updates
3. Efficient approval workflows
4. Comprehensive activity tracking
5. Secure role-based access
6. Scalable architecture
7. Dual language support

## Timeline
1. Phase 1: Core Development
   - Module architecture
   - Base components
   - Core features
   - Basic documentation

2. Phase 2: Feature Implementation
   - Rental module
   - Employee module
   - Payroll module
   - Inventory module

3. Phase 3: HR & Payroll Enhancements
   - Timesheet integration
   - Advance salary system
   - Final settlement processing
   - Equipment rentals workflow

4. Phase 4: Project Management
   - Project phases tracking
   - Resource allocation
   - Budget tracking
   - Daily logs

5. Phase 5: Testing & Optimization
   - Unit testing
   - Integration testing
   - Performance optimization
   - Security testing

6. Phase 6: Multi-language & Deployment
   - English/Arabic support
   - RTL implementation
   - Documentation completion
   - Production deployment

## Notes
- The project follows a modular architecture
- Each module is self-contained
- Frontend uses consistent components
- Security is implemented throughout
- Performance optimization is ongoing
- Documentation is maintained regularly
- Dual language support is integrated at the core level 
