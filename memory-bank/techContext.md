# Technical Context

## Technologies Used

### Backend Framework
- **Laravel 12**
  - Latest version with improved performance
  - Modular architecture using Laravel Modules
  - Service-Repository pattern
  - RESTful API endpoints
  - Background job processing
  - Event-driven architecture
  - Sanctum for API authentication
  - Spatie Permissions for role-based access
  - Spatie MediaLibrary for document management
  - Spatie Translatable for multilingual support
  - Spatie ActivityLog for audit trailing

### Frontend Framework
- **React 19**
  - Latest version with improved performance
  - TypeScript for type safety
  - Component-based architecture
  - Inertia.js for backend integration
  - React Hook Form for form handling
  - Zod for schema validation
  - ShadCN UI with Tailwind CSS
  - RTL support for Arabic language
  - Glassmorphic UI design elements

### Database
- **MySQL 8.0**
  - Relational database
  - InnoDB engine
  - UTF-8mb4 character set for multilingual support
  - Indexing strategy for performance
  - Foreign key constraints
  - Transactions for data integrity

### State Management
- **Zustand**
  - Lightweight state management
  - TypeScript support
  - Middleware capabilities
  - Persist plugin for storage

### API Layer
- **Laravel API Resources**
  - Type-safe API responses
  - Consistent data formatting
  - Conditional field inclusion
  - Version control

### Authentication
- **Laravel Sanctum**
  - Token-based authentication
  - CSRF protection
  - Single-page application support
  - API token abilities

### PDF Generation
- **Barryvdh Laravel DomPDF**
  - HTML to PDF conversion
  - Custom document templates
  - Advanced styling options
  - Support for Arabic text

### Caching
- **Redis**
  - In-memory data structure store
  - Fast read/write operations
  - Support for complex data types
  - Publish/subscribe capability

### Queue Management
- **Laravel Queues**
  - Delayed job processing
  - Job batching
  - Rate limiting
  - Failed job handling

### Testing
- **PHPUnit & Jest**
  - Unit testing
  - Feature testing
  - Frontend component testing
  - Integration testing
  - API testing
  - Mocking framework
  - RTL support testing

### Deployment
- **CI/CD Pipeline**
  - Automated testing
  - Build process
  - Deployment strategy
  - Environment configuration

## Development Setup

### Local Environment
- **Development Server**
  - Laravel Valet or Laravel Sail
  - Hot module replacement
  - HTTPS support
  - Custom domains

### Development Tools
- **Tooling**
  - Composer for PHP dependencies
  - NPM for JavaScript dependencies
  - TypeScript compiler
  - ESLint for code linting
  - Prettier for code formatting
  - PHP_CodeSniffer for PHP linting
  - Laravel Pint for PHP styling
  - Git for version control

### IDE Configuration
- **Visual Studio Code Settings**
  - PHP Intelephense
  - ESLint
  - Prettier
  - TypeScript support
  - Tailwind CSS IntelliSense
  - Git integration

### Code Standards
- **PHP Standards**
  - PSR-12 coding standard
  - Laravel conventions
  - Type hinting
  - Return type declarations
  - PHPDoc comments

- **JavaScript/TypeScript Standards**
  - ESLint recommended rules
  - Prettier formatting
  - Typescript strict mode
  - JSDoc comments
  - Component documentation

## Technical Constraints

### Performance Requirements
- Page load time < 2 seconds
- API response time < 200ms
- Database query execution < 100ms
- Frontend bundle size < 500kb (initial load)
- Support for 1000+ concurrent users

### Security Requirements
- OWASP top 10 compliance
- CSRF protection
- Content Security Policy
- Sanitized user inputs
- Rate limiting
- Secure password handling
- Role-based access control
- PII data encryption
- Security headers

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Sufficient color contrast
- Focus management
- Multi-language support
- RTL interface support

### Browser Support
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Android Chrome)

## Architecture Patterns

### Service Layer
The application utilizes a Service Layer to encapsulate business logic:

```php
// Example: PayrollService.php
class PayrollService
{
    private EmployeeRepository $employeeRepository;
    private TimesheetRepository $timesheetRepository;
    
    public function __construct(
        EmployeeRepository $employeeRepository,
        TimesheetRepository $timesheetRepository
    ) {
        $this->employeeRepository = $employeeRepository;
        $this->timesheetRepository = $timesheetRepository;
    }
    
    public function calculateSalary(int $employeeId, Carbon $startDate, Carbon $endDate): SalaryResult
    {
        $employee = $this->employeeRepository->findById($employeeId);
        $timesheets = $this->timesheetRepository->getByEmployeeAndDateRange(
            $employeeId, 
            $startDate, 
            $endDate
        );
        
        // Calculate salary based on timesheet hours
        $regularHours = 0;
        $overtimeHours = 0;
        
        foreach ($timesheets as $timesheet) {
            if ($timesheet->is_overtime) {
                $overtimeHours += $timesheet->hours;
            } else {
                $regularHours += $timesheet->hours;
            }
        }
        
        $regularPay = $regularHours * $employee->hourly_rate;
        $overtimePay = $overtimeHours * $employee->hourly_rate * 1.5;
        
        return new SalaryResult(
            employeeId: $employeeId,
            regularHours: $regularHours,
            overtimeHours: $overtimeHours,
            regularPay: $regularPay,
            overtimePay: $overtimePay,
            totalPay: $regularPay + $overtimePay
        );
    }
}
```

### Repository Pattern
Repositories abstract the data access layer:

```php
// Example: TimesheetRepository.php
class TimesheetRepository
{
    public function getByEmployeeAndDateRange(
        int $employeeId, 
        Carbon $startDate, 
        Carbon $endDate
    ): Collection {
        return Timesheet::query()
            ->where('employee_id', $employeeId)
            ->whereBetween('date', [$startDate, $endDate])
            ->where('status', 'approved')
            ->get();
    }
    
    public function create(array $data): Timesheet
    {
        return Timesheet::create($data);
    }
    
    public function update(Timesheet $timesheet, array $data): Timesheet
    {
        $timesheet->update($data);
        return $timesheet;
    }
    
    public function delete(Timesheet $timesheet): bool
    {
        return $timesheet->delete();
    }
}
```

### Data Transfer Objects (DTOs)
DTOs are used to transfer data between layers:

```php
// Example: SalaryResult.php
class SalaryResult
{
    public function __construct(
        public readonly int $employeeId,
        public readonly float $regularHours,
        public readonly float $overtimeHours,
        public readonly float $regularPay,
        public readonly float $overtimePay,
        public readonly float $totalPay
    ) {}
    
    public function toArray(): array
    {
        return [
            'employee_id' => $this->employeeId,
            'regular_hours' => $this->regularHours,
            'overtime_hours' => $this->overtimeHours,
            'regular_pay' => $this->regularPay,
            'overtime_pay' => $this->overtimePay,
            'total_pay' => $this->totalPay,
        ];
    }
}
```

### Inertia.js Integration
Backend and frontend are connected using Inertia.js:

```php
// Example: EmployeeController.php
class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with('department')
            ->orderBy('name')
            ->paginate(10);
            
        return Inertia::render('Employees/Index', [
            'employees' => EmployeeResource::collection($employees),
            'departments' => DepartmentResource::collection(Department::all()),
        ]);
    }
    
    public function show(Employee $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee' => new EmployeeResource($employee->load('department', 'documents')),
        ]);
    }
}
```

Frontend consumption with TypeScript:

```tsx
// Example: Employees/Index.tsx
import { PageProps } from '@/types';
import { Employee, Department } from '@/types/models';
import { Inertia } from '@inertiajs/inertia';

interface EmployeesIndexProps extends PageProps {
  employees: Employee[];
  departments: Department[];
}

export default function EmployeesIndex({ employees, departments }: EmployeesIndexProps) {
  return (
    <div>
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department.name}</td>
              <td>
                <button onClick={() => Inertia.visit(`/employees/${employee.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Event-Driven Architecture
For handling side effects:

```php
// Example: PayrollProcessedEvent.php
class PayrollProcessedEvent
{
    public function __construct(
        public readonly Carbon $payrollDate,
        public readonly int $employeeCount,
        public readonly float $totalAmount
    ) {}
}

// Example: PayrollProcessedListener.php
class PayrollProcessedListener
{
    private NotificationService $notificationService;
    
    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }
    
    public function handle(PayrollProcessedEvent $event): void
    {
        // Send notifications to HR and finance departments
        $this->notificationService->notifyHR(
            subject: 'Payroll Processed',
            message: "Payroll for {$event->employeeCount} employees processed with total amount {$event->totalAmount}."
        );
        
        // Generate reports
        // Update accounting system
    }
}
```

### Multi-language Support
Using Spatie Translatable:

```php
// Example: Department.php
use Spatie\Translatable\HasTranslations;

class Department extends Model
{
    use HasTranslations;
    
    public $translatable = ['name', 'description'];
    
    protected $fillable = ['name', 'description'];
}

// Usage example
$department = new Department();
$department->setTranslation('name', 'en', 'Human Resources');
$department->setTranslation('name', 'ar', 'الموارد البشرية');
$department->save();

// Retrieving the translation in the current locale
$departmentName = $department->name; // Returns based on current app locale
```

And in the frontend:

```tsx
// Example: useTranslation.tsx
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';

export function useTranslation() {
  const { translations, locale } = usePage().props;
  
  function t(key: string, replacements: Record<string, string> = {}): string {
    let translation = translations[key] || key;
    
    Object.entries(replacements).forEach(([search, replace]) => {
      translation = translation.replace(`:${search}`, replace);
    });
    
    return translation;
  }
  
  return { t, locale };
}

// Usage example
function WelcomeMessage() {
  const { t } = useTranslation();
  
  return <h1>{t('welcome.message', { name: 'John' })}</h1>;
}
```

### Form Handling with React Hook Form and Zod
Type-safe form handling:

```tsx
// Example: EmployeeForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Inertia } from '@inertiajs/inertia';

const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  department_id: z.number().min(1, 'Department is required'),
  position: z.string().min(2, 'Position is required'),
  join_date: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export function EmployeeForm({ departments }) {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      department_id: 0,
      position: '',
      join_date: '',
    },
  });
  
  const onSubmit = (data: EmployeeFormValues) => {
    Inertia.post('/employees', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...register('name')} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>
      
      <div>
        <label htmlFor="department_id">Department</label>
        <select id="department_id" {...register('department_id', { valueAsNumber: true })}>
          <option value="0">Select a department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
        {errors.department_id && <p className="error">{errors.department_id.message}</p>}
      </div>
      
      <div>
        <label htmlFor="position">Position</label>
        <input id="position" type="text" {...register('position')} />
        {errors.position && <p className="error">{errors.position.message}</p>}
      </div>
      
      <div>
        <label htmlFor="join_date">Join Date</label>
        <input id="join_date" type="date" {...register('join_date')} />
        {errors.join_date && <p className="error">{errors.join_date.message}</p>}
      </div>
      
      <button type="submit">Save Employee</button>
    </form>
  );
}
```

## Database Schema

### Core Tables
- **employees**
  - id
  - name
  - email
  - position
  - department_id
  - join_date
  - status
  - salary_type (hourly, monthly)
  - base_salary
  - created_at
  - updated_at

- **departments**
  - id
  - name (translatable)
  - description (translatable)
  - parent_id (self-referential for hierarchical structure)
  - created_at
  - updated_at

- **timesheet_entries**
  - id
  - employee_id
  - project_id
  - date
  - hours
  - description
  - is_overtime
  - status (pending, approved, rejected)
  - approved_by
  - approval_date
  - created_at
  - updated_at

- **salary_payments**
  - id
  - employee_id
  - period_start
  - period_end
  - basic_salary
  - overtime_pay
  - allowances
  - deductions
  - advance_deductions
  - net_amount
  - payment_date
  - payment_method
  - status
  - created_at
  - updated_at

- **advance_salary_requests**
  - id
  - employee_id
  - amount
  - request_date
  - reason
  - status (pending, approved, rejected, paid)
  - approved_by
  - approval_date
  - payment_date
  - repayment_month
  - created_at
  - updated_at

- **final_settlements**
  - id
  - employee_id
  - termination_date
  - basic_salary
  - unused_leave_compensation
  - pending_salary
  - overtime_pay
  - deductions
  - gratuity
  - net_amount
  - payment_date
  - payment_method
  - status
  - approved_by
  - created_at
  - updated_at

- **equipment_assignments**
  - id
  - employee_id
  - equipment_id
  - assigned_date
  - expected_return_date
  - returned_date
  - condition_on_assignment
  - condition_on_return
  - notes
  - assigned_by
  - created_at
  - updated_at

- **projects**
  - id
  - name
  - description
  - start_date
  - end_date
  - budget
  - status
  - client_id
  - manager_id
  - created_at
  - updated_at

- **project_phases**
  - id
  - project_id
  - name
  - description
  - start_date
  - end_date
  - status
  - deliverables
  - created_at
  - updated_at

- **project_daily_logs**
  - id
  - project_id
  - employee_id
  - date
  - description
  - work_done
  - challenges
  - next_steps
  - created_at
  - updated_at

## Dependencies

### Backend Packages
- laravel/framework: ^12.0
- laravel/sanctum: ^4.1
- laravel/tinker: ^2.10.1
- inertiajs/inertia-laravel: ^2.0
- nwidart/laravel-modules: *
- spatie/laravel-permission: ^6.16
- spatie/laravel-activitylog: ^4.10
- spatie/laravel-medialibrary: ^11.12
- spatie/laravel-translatable: *
- barryvdh/laravel-dompdf: ^3.1
- predis/predis: ^2.3

### Frontend Packages
- react: ^19.0.0
- react-dom: ^19.0.0
- @inertiajs/react: ^2.0.5
- typescript: ^5.7.2
- react-hook-form: ^7.56.2
- @hookform/resolvers: ^4.1.3
- zod: ^3.24.4
- tailwindcss: ^4.0.0
- dayjs: ^1.11.10
- jspdf: ^3.0.1
- jspdf-autotable: ^5.0.2
- zustand: ^5.0.3
- clsx: ^2.1.1
- class-variance-authority: ^0.7.1
- lucide-react: ^0.475.0

## Technical Notes

### Performance Considerations
- Implement query optimization for large datasets
- Use eager loading to prevent N+1 query issues
- Implement caching for frequently accessed data
- Use pagination for large result sets
- Implement lazy loading for media assets

### Security Considerations
- Implement proper input validation
- Use Laravel Sanctum for API authentication
- Implement role-based access control with Spatie Permissions
- Encrypt sensitive data in the database
- Implement audit logging for sensitive operations
- Follow OWASP security best practices

### Testing Strategy
- Unit tests for services and repositories
- Feature tests for controllers and API endpoints
- Frontend component tests
- End-to-end testing for critical workflows
- Test coverage targets: 80% for business logic
- Multi-language testing for UI components

### Deployment Strategy
- Continuous Integration with GitHub Actions
- Automated testing before deployment
- Staging environment for QA
- Blue-green deployment for production
- Database migration strategy
- Rollback plan for failed deployments

## Architecture Diagram

```
+---------------------+     +----------------------+
|                     |     |                      |
| Frontend (React)    |     | Backend (Laravel)    |
|                     |     |                      |
| - Components        |     | - Controllers        |
| - Pages             |     | - Services           |
| - Forms             |<--->| - Repositories       |
| - State Management  |     | - Models             |
| - API Client        |     | - Events             |
|                     |     | - Jobs               |
+---------------------+     +----------------------+
         |                           |
         v                           v
+---------------------+     +----------------------+
|                     |     |                      |
| UI/UX               |     | Database             |
|                     |     |                      |
| - ShadCN UI         |     | - MySQL              |
| - Tailwind CSS      |     | - Redis              |
| - Glassmorphic UI   |     | - Migrations         |
| - RTL Support       |     | - Seeds              |
|                     |     |                      |
+---------------------+     +----------------------+
```

This architecture provides a clear separation of concerns, with the frontend handling UI rendering and user interactions, while the backend manages business logic, data access, and persistence. The Inertia.js layer connects these two worlds, providing a seamless developer experience.

## Role-Based Access Control

The application implements role-based access control (RBAC) using Spatie Permissions:

### Core Roles

- **Admin**: Full system access
- **Manager**: Department or project-level management
- **Employee**: Standard user role with limited access
- **Accountant**: Financial operations
- **Foreman**: Project team management
- **System Administrator**: Technical configuration

### Specialized Roles for Timesheet Approval

- **Foreman Approver**: First-level timesheet approval
- **Timesheet Incharge**: Second-level timesheet validation
- **Timesheet Checking Incharge**: Third-level timesheet verification
- **Manager**: Final timesheet approval
- **Payroll Processor**: Processes approved timesheets for payroll

### Permission Sets

- **View Permissions**: Allow reading data
- **Create Permissions**: Allow creating new records
- **Edit Permissions**: Allow modifying existing records
- **Delete Permissions**: Allow removing records
- **Approval Permissions**: Allow workflow transitions
  - Granular approval permissions based on workflow step
  - timesheets.approve.foreman
  - timesheets.approve.incharge
  - timesheets.approve.checking
  - timesheets.approve.manager
