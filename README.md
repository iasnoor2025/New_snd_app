# Laravel 12 with React and Inertia.js

This is a complete Laravel 12 project scaffold with React frontend integrated via Inertia.js and styled using Shadcn UI components.

## Features

- Laravel 12 backend with best practices
- Authentication using Laravel Sanctum
- Spatie packages for roles & permissions and media management
- Caching, queue, and debugging tools configuration
- React components using Shadcn UI, connected with Laravel backend via Inertia.js
- Example routes, controllers, and views for user registration, login, role-based access, and a React dashboard
- Internationalization support with i18n

## Requirements

- PHP 8.2 or higher
- Composer
- Node.js and npm
- MySQL or SQLite

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

2. Install PHP dependencies

```bash
composer install
```

3. Install JavaScript dependencies

```bash
npm install
```

4. Create a copy of the .env file

```bash
cp .env.example .env
```

5. Generate an application key

```bash
php artisan key:generate
```

6. Configure your database in the .env file

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

Or for SQLite:

```
DB_CONNECTION=sqlite
# Comment out the other DB_ variables
```

Then create the SQLite database file:

```bash
touch database/database.sqlite
```

7. Run the migrations and seed the database

```bash
php artisan migrate --seed
```

8. Generate VAPID keys for push notifications

```bash
php artisan webpush:generate
```

9. Build the frontend assets

```bash
npm run dev
```

10. Start the development server

```bash
php artisan serve
```

## Usage

Visit `http://localhost:8000` in your browser to see the application.

### Default Login

- Email: admin@ias.com
- Password: password

## Project Structure

- `app/` - Core application code
- `Modules/` - Modular application structure
- `resources/js/` - React components and pages
- `resources/css/` - CSS styles
- `routes/` - Application routes

## Modules

The application is organized into modules:

- Core - Core system functionality
- EmployeeManagement - Manage employees, roles, and responsibilities
- LeaveManagement - Track and approve leave requests
- TimesheetManagement - Monitor time entries and approvals
- Payroll - Process payroll and manage compensation
- ProjectManagement - Manage projects, tasks, and milestones
- RentalManagement - Handle equipment rentals and invoicing
- EquipmentManagement - Track equipment inventory and maintenance
- Settings - Application settings
- Notifications - User notifications
- Reporting - Generate reports
- API - API endpoints
- Localization - Multi-language support
- AuditCompliance - Data auditing and compliance
- MobileBridge - Mobile app integration

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
