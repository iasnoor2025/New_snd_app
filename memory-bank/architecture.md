# Application Architecture

## Overall Architecture

The SND Rental React App follows a modular monolithic architecture with a clear separation of concerns. The application is structured as a single deployable unit but organized internally as a collection of independent modules. This approach provides the benefits of a modular system (maintainability, separation of concerns) while avoiding the complexity of a distributed microservices architecture.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SND Rental React App                          │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌───────────┐   ┌───────────┐  │
│  │    Core     │   │     API     │   │ Frontend  │   │  Shared   │  │
│  │   Module    │   │   Module    │   │   Layer   │   │ Services  │  │
│  └─────────────┘   └─────────────┘   └───────────┘   └───────────┘  │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌───────────┐   ┌───────────┐  │
│  │   Rental    │   │  Employee   │   │  Project  │   │ Equipment │  │
│  │   Module    │   │   Module    │   │  Module   │   │  Module   │  │
│  └─────────────┘   └─────────────┘   └───────────┘   └───────────┘  │
│                                                                     │
│  ┌─────────────┐   ┌─────────────┐   ┌───────────┐   ┌───────────┐  │
│  │  Timesheet  │   │   Payroll   │   │  Leave    │   │ Settings  │  │
│  │   Module    │   │   Module    │   │  Module   │   │  Module   │  │
│  └─────────────┘   └─────────────┘   └───────────┘   └───────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Backend Architecture

The backend follows a layered architecture with the following components:

### 1. Controllers Layer
- Handles HTTP requests and responses
- Input validation
- Route handling
- Authentication and authorization checks

### 2. Service Layer
- Implements business logic
- Orchestrates operations across repositories
- Handles transactions and complex operations
- Encapsulates domain rules

### 3. Repository Layer
- Data access abstraction
- Database operations
- Query building
- Data mapping

### 4. Domain Layer
- Models and entities
- Value objects
- Domain events
- Business rules

### 5. Infrastructure Layer
- External integrations
- File storage
- Caching
- Messaging

## Module Structure

Each module follows a consistent structure with dedicated directories for each concern:

```
Module/
├── Actions/           # Single responsibility actions (Command pattern)
├── Config/            # Module-specific configuration
├── Database/          # Migrations, seeders, factories
├── Domain/            # Domain models and business logic
│   ├── Models/        # Eloquent models
│   ├── Events/        # Domain events
│   ├── ValueObjects/  # Immutable value objects
│   └── DTOs/          # Data transfer objects
├── Events/            # Event classes
├── Http/              # HTTP layer
│   ├── Controllers/   # Request handlers
│   ├── Middleware/    # HTTP middleware
│   ├── Requests/      # Form requests (validation)
│   └── Resources/     # API resources
├── Jobs/              # Background jobs
├── Listeners/         # Event listeners
├── Observers/         # Model observers
├── Policies/          # Authorization policies
├── Providers/         # Service providers
├── Repositories/      # Data access layer
├── Resources/         # Frontend views
├── Routes/            # Web and API routes
├── Services/          # Business logic services
└── Tests/             # Module tests
```

## Frontend Architecture

The frontend follows a component-based architecture using React with TypeScript:

### 1. Pages
- Page-level components
- Inertia.js page controllers
- Layout integration
- Route handling

### 2. Components
- Reusable UI components
- Shared building blocks
- Component composition
- ShadCN UI integration

### 3. Hooks
- Custom React hooks
- Shared state and logic
- Business logic abstraction
- Form handling

### 4. Services
- API communication
- External integrations
- Global utilities
- Shared operations

### 5. Stores
- Global state management with Zustand
- Persistent state
- State synchronization
- Type-safe state

## Data Flow Architecture

The application uses a clear, unidirectional data flow:

1. **User Interaction** → Front-end component triggers action
2. **Request** → Inertia.js sends request to backend controller
3. **Controller** → Validates input and delegates to service
4. **Service** → Processes business logic, calls repositories
5. **Repository** → Performs database operations, returns data
6. **Response** → Controller formats response with resources
7. **Frontend** → Updates UI based on response data

## Authentication & Authorization

The authentication and authorization flow:

```
┌──────────┐           ┌────────────┐          ┌────────────┐
│  Client  │           │  Laravel   │          │  Database  │
│ Browser  │           │  Backend   │          │            │
└────┬─────┘           └─────┬──────┘          └─────┬──────┘
     │                       │                       │
     │  Login Request        │                       │
     │───────────────────────>                       │
     │                       │                       │
     │                       │   Validate User       │
     │                       │───────────────────────>
     │                       │                       │
     │                       │   Return User Data    │
     │                       │<───────────────────────
     │                       │                       │
     │                       │  Generate Sanctum     │
     │                       │  Token & Session      │
     │                       │                       │
     │  Return Auth Token    │                       │
     │<───────────────────────                       │
     │                       │                       │
     │  Authenticated Request│                       │
     │  (w/ Sanctum Token)   │                       │
     │───────────────────────>                       │
     │                       │                       │
     │                       │   Verify Token &      │
     │                       │   Check Permissions   │
     │                       │                       │
     │  Response             │                       │
     │<───────────────────────                       │
     │                       │                       │
```

## Event-Driven Architecture

The system uses Laravel's event system for decoupling components:

1. **Domain Events** - Triggered when significant domain operations occur
2. **Event Listeners** - Handle side effects of domain events
3. **Queued Jobs** - Process long-running tasks asynchronously
4. **Notifications** - Send alerts and messages to users

## Database Architecture

The database is organized by module, with each module having its own migrations:

```
┌────────────────┐     ┌───────────────┐     ┌────────────────┐
│   Core Tables  │     │  HR Tables    │     │ Rental Tables  │
│ ┌────────────┐ │     │ ┌───────────┐ │     │ ┌────────────┐ │
│ │   users    │─┼─────┼─│ employees │ │     │ │ equipments │ │
│ └────────────┘ │     │ └───────────┘ │     │ └────────────┘ │
│ ┌────────────┐ │     │ ┌───────────┐ │     │ ┌────────────┐ │
│ │   roles    │ │     │ │   leaves  │ │     │ │  rentals   │ │
│ └────────────┘ │     │ └───────────┘ │     │ └────────────┘ │
│ ┌────────────┐ │     │ ┌───────────┐ │     │ ┌────────────┐ │
│ │permissions │ │     │ │ timesheets│ │     │ │ customers  │ │
│ └────────────┘ │     │ └───────────┘ │     │ └────────────┘ │
└────────────────┘     └───────────────┘     └────────────────┘
```

## API Architecture

The API follows RESTful principles with versioned endpoints:

```
/api/v1
  ├── /auth
  │   ├── POST /login
  │   ├── POST /logout
  │   └── GET /user
  ├── /employees
  │   ├── GET /
  │   ├── POST /
  │   ├── GET /{id}
  │   ├── PUT /{id}
  │   └── DELETE /{id}
  ├── /equipment
  │   ├── GET /
  │   ├── POST /
  │   └── ...
  └── ...
```

## Deployment Architecture

The application is deployed as a single unit but can be scaled horizontally:

```
┌───────────────────┐
│    Load Balancer  │
└─────────┬─────────┘
          │
┌─────────┴─────────┐
│                   │
▼                   ▼
┌───────────┐   ┌───────────┐
│  App Node │   │  App Node │
│    #1     │   │    #2     │
└───────────┘   └───────────┘
      │               │
      └───────┬───────┘
              │
        ┌─────▼─────┐
        │  Database │
        │  Cluster  │
        └───────────┘
```

## Security Architecture

Security is implemented at multiple layers:

1. **Network Layer** - SSL/TLS, WAF, rate limiting
2. **Application Layer** - Input validation, output encoding, CSRF protection
3. **Authentication Layer** - Sanctum, secure cookies, password policies
4. **Authorization Layer** - Spatie Permissions, policies, middleware
5. **Data Layer** - Encryption at rest, parameterized queries
6. **Logging Layer** - Audit trails, error logging, security events 
