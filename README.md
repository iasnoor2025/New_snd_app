# SND Rental Management System

A comprehensive Laravel 12 rental management system with React frontend, built using Inertia.js and styled with Shadcn UI components.

## 🚀 Features

### Core Modules
- **Customer Management**: Complete customer lifecycle management
- **Equipment Management**: Inventory tracking and equipment lifecycle
- **Rental Management**: End-to-end rental process management
- **User Management**: Role-based access control with Spatie permissions
- **Dashboard**: Real-time analytics and module overview

### Technical Features
- **Authentication**: Laravel Sanctum with secure session management
- **Authorization**: Spatie roles & permissions package
- **Frontend**: React with TypeScript and Inertia.js
- **UI Components**: Shadcn UI with Tailwind CSS
- **Database**: PostgreSQL with comprehensive migrations
- **Internationalization**: Multi-language support (EN/ES)
- **Media Management**: Spatie Media Library integration
- **Caching**: Redis support for performance optimization
- **Queue Management**: Laravel Horizon for background jobs
- **Development Tools**: Laravel Telescope for debugging

## 🛠️ Installation

### Prerequisites
- PHP 8.2+
- Node.js 18+
- PostgreSQL 13+
- Composer
- NPM/Yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snd-rental-system
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database Configuration**
   Update your `.env` file with PostgreSQL credentials:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. **Run Migrations**
   ```bash
   php artisan migrate
   ```

7. **Seed Demo Data**
   ```bash
   php artisan db:seed --class=DemoDataSeeder
   ```

8. **Build Frontend Assets**
   ```bash
   npm run build
   ```

9. **Start Development Servers**
   ```bash
   # Terminal 1: Laravel Backend
   php artisan serve
   
   # Terminal 2: Vite Frontend
   npm run dev
   ```

## 👥 Demo Users

After running the demo seeder, you can login with these accounts:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| Admin | admin@sndrentals.com | password | Full system access |
| Manager | manager@sndrentals.com | password | CRUD operations, reports |
| Employee | employee@sndrentals.com | password | View-only access |

## 📊 Demo Data

The system includes comprehensive demo data:
- **5 Users** (including 3 role-based demo users)
- **3 Customers** (ABC Construction, XYZ Builders, Premier Contractors)
- **5 Equipment Items** (Excavator, Backhoe, Drill, Generator, Scissor Lift)
- **3 Rental Records** (Active, Completed, Pending)
- **6 Equipment Categories** (Construction, Power Tools, Generators, etc.)
- **4 Locations** (Main Warehouse, North Branch, South Depot, Mobile Unit)

## 🏗️ Architecture

### Backend Structure
```
app/
├── Models/           # Eloquent models
├── Http/
│   ├── Controllers/  # API controllers
│   ├── Middleware/   # Custom middleware
│   └── Requests/     # Form request validation
├── Services/         # Business logic layer
└── Traits/           # Reusable traits

Modules/
├── Core/                    # Shared components
├── CustomerManagement/      # Customer module
├── EquipmentManagement/     # Equipment module
└── RentalManagement/        # Rental module
```

### Frontend Structure
```
resources/js/
├── components/       # Reusable React components
├── pages/           # Inertia.js pages
├── layouts/         # Layout components
├── lib/             # Utility functions
└── types/           # TypeScript definitions
```

## 🔐 Security Features

- **CSRF Protection**: Built-in Laravel CSRF tokens
- **SQL Injection Prevention**: Eloquent ORM with parameter binding
- **XSS Protection**: Input sanitization and output escaping
- **Authentication**: Secure session-based authentication
- **Authorization**: Role-based permissions with Spatie
- **Password Hashing**: Bcrypt encryption for passwords
- **Environment Variables**: Sensitive data in .env files

## 🚀 Performance Optimizations

- **Database Indexing**: Optimized database indexes
- **Eager Loading**: Reduced N+1 query problems
- **Caching**: Redis integration for session and cache
- **Asset Optimization**: Vite for efficient bundling
- **Lazy Loading**: Component-level code splitting
- **Database Pagination**: Efficient data loading

## 🌐 API Endpoints

### Authentication
- `POST /login` - User authentication
- `POST /logout` - User logout
- `GET /dashboard` - Dashboard data

### Customers
- `GET /customers` - List customers
- `POST /customers` - Create customer
- `PUT /customers/{id}` - Update customer
- `DELETE /customers/{id}` - Delete customer

### Equipment
- `GET /equipment` - List equipment
- `POST /equipment` - Create equipment
- `PUT /equipment/{id}` - Update equipment
- `DELETE /equipment/{id}` - Delete equipment

### Rentals
- `GET /rentals` - List rentals
- `POST /rentals` - Create rental
- `PUT /rentals/{id}` - Update rental
- `DELETE /rentals/{id}` - Delete rental

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run JavaScript tests
npm run test

# Run with coverage
php artisan test --coverage
```

## 📦 Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   APP_ENV=production
   APP_DEBUG=false
   ```

2. **Optimize Application**
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   composer install --optimize-autoloader --no-dev
   ```

3. **Build Assets**
   ```bash
   npm run build
   ```

4. **Set Permissions**
   ```bash
   chmod -R 755 storage bootstrap/cache
   ```

## 🔧 Configuration

### Key Configuration Files
- `config/app.php` - Application settings
- `config/database.php` - Database configuration
- `config/auth.php` - Authentication settings
- `config/permission.php` - Spatie permissions
- `vite.config.js` - Frontend build configuration

## 📚 Documentation

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [React Documentation](https://react.dev)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Spatie Permissions](https://spatie.be/docs/laravel-permission)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo data and examples

## 🔄 Version History

- **v1.0.0** - Initial release with core modules
- **v1.1.0** - Added internationalization support
- **v1.2.0** - Enhanced UI with Shadcn components
- **v1.3.0** - Added comprehensive demo data

---

**Built with ❤️ using Laravel 12, React, and Inertia.js**
