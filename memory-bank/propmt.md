Project Overview
----------------
Your Laravel 12 + Inertia.js + React monolith is currently broken in many places: controllers, routes, views, and frontend components throw errors, pages don’t render, and features from your `memory-bank/` documentation are missing or partially implemented. You need Cursor AI to perform a full audit, automatically fix syntax and import errors, implement or complete every feature listed in `memory-bank/`, and update that documentation. The goal is a fully working, production‐ready app with all routes, modules, and UI pages error‐free.

Cursor AI Tasks
---------------
1. **Load & Parse Memory Bank**  
   - Recursively read all files under `memory-bank/` to extract every feature, endpoint, requirement, and module pattern documented.  
   - Build an index of “Feature Name → Module → Status (pending/implemented/buggy).”

2. **Full Codebase Syntax & Import Scan**  
   - Run `php -l` on all `.php` files under `app/`, `Modules/`, `routes/`, `database/`, and `tests/` to capture syntax errors (e.g. unexpected tokens, namespace mismatches).  
   - Run `npx eslint --ext .js,.jsx resources/js Modules/**/resources/js --format json` to list JavaScript/React syntax and import errors (e.g. semicolons in arrays, invalid JSX).  
   - Save results as `memory-bank/syntax_import_report.md`.

3. **Auto‐fix Trivial Syntax & Import Issues**  
   - Use PHP‐CS‐Fixer with rules like `no_superfluous_semicolons`, `psr12`, and Rector with PSR‐4 mapping to correct namespaces and remove extra semicolons.  
   - Run `eslint --fix` to resolve common JS/React problems.  
   - Re‐run `php -l` and `eslint` to verify no remaining parse errors; log any unresolved issues.

4. **Verify & Consolidate Migrations per Module**  
   - Identify duplicate or conflicting migration files across `database/migrations/` and each `Modules/*/database/migrations/`.  
   - For each table, merge all CREATE/ALTER migrations into one consolidated migration inside its owning module’s `database/migrations/` (e.g. `Users` → `Modules/EmployeeManagement/database/migrations/`, `Projects` → `Modules/ProjectManagement/...`).  
   - Ensure new `create_<table>_table.php` includes all necessary columns (including any missing user fields, salary increment fields, etc.).  
   - Delete old standalone migrations.  
   - Update `memory-bank/migration_consolidation.md` listing changes.

5. **Scan & Repair Routes Across Modules**  
   - For each module under `Modules/`, verify `Providers/ModuleServiceProvider.php` loads `routes/web.php` (and `routes/api.php` if used).  
   - In each `routes/web.php`, confirm route prefixes match the intended URLs (e.g. `/hr/employees`, `/hr/leaves`, `/projects`, `/rentals`, `/equipment`, `/notifications`, `/reports`, `/localization`, `/audit`).  
   - Compare against `memory-bank/route_requirements.md` to identify missing endpoints or incorrect prefixes.  
   - Add or correct any missing resource routes or custom actions (e.g. `/hr/leaves/{leave}/approve`).  
   - Delete any orphaned routes in the global `routes/` folder.  
   - Run `php artisan route:cache` to catch any runtime errors and fix accordingly.

6. **Implement Missing Module Features**  
   For each feature listed in the memory bank as “pending” or “buggy”:
   a. **EmployeeManagement**  
      - Ensure CRUD for employees, departments, positions is complete.  
      - Implement Salary Increment workflow inside this module if missing.  
      - Add row‐level policies so users only see their own employees, managers see team, admins see all.  
   b. **LeaveManagement**  
      - Confirm leave types and leave request approval workflow is fully implemented (4-step approval).  
      - Fix any broken controllers, Inertia pages, and translations.  
   c. **TimesheetManagement**  
      - Verify mobile geofencing time log, attendance logs, and 4-step approval flows are present and working.  
      - Implement ranking logic so only authorized roles see correct entries.  
   d. **Payroll**  
      - Ensure timesheet-based payroll, advance salary, prorated/OT calculation, and final settlement with PDF export are fully implemented.  
      - Integrate salary increments so next payroll uses the updated salary.  
   e. **ProjectManagement**  
      - Confirm project phases, daily logs, resource tracking, cost analysis, and equipment assignment features exist.  
      - Implement missing REST endpoints, Inertia pages, and policies.  
   f. **RentalManagement**  
      - Verify equipment rental workflows, invoicing, payment, and reminders.  
      - Add overdue rental query and related Inertia pages if absent.  
   g. **EquipmentManagement**  
      - Ensure equipment master, maintenance scheduling, cost tracking, and notifications are implemented.  
      - Fix any missing Observers/Events for maintenance reminders.  
   h. **Settings/Notifications/Reporting/API/Localization/AuditCompliance/MobileBridge**  
      - Compare each module’s delivered code against `memory-bank/` specs.  
      - Scaffold any missing controllers, routes, views, or JS pages.  
      - For API, confirm GraphQL/REST endpoints exist and return expected data (e.g. for mobile apps).  
      - For Localization, confirm dynamic translation loading works as documented.  
      - For AuditCompliance, ensure data‐erasure and retention features exist and policies are enforced.  
      - For MobileBridge, verify PWA manifest and service worker files are present and served correctly.

7. **Refactor Translation Systems**  
   - Ensure all models use `HasTranslations` with JSON columns.  
   - Update module controllers to pass only translation objects (e.g. `name_translations`) to Inertia.  
   - Integrate **react‐i18next** as per the `memory-bank/frontend_i18next_modules.md` instructions.  
   - Confirm that every static UI string is pulled from `/public/locales/{en,ar}/common.json` via `t('key')`.  
   - Fix any remaining “Objects are not valid as a React child” errors by using `t()` or extracting the correct locale string.

8. **Reintegrate Authentication & Authorization**  
   - If custom auth is broken, remove it and install Laravel Breeze + Inertia + React + Sanctum.  
   - Rewire all modules to use new auth routes (`/login`, `/register`, `/logout`) and middleware.  
   - Ensure Spatie Permissions are re‐integrated: add `HasRoles` to `User` model, seed roles/permissions, enforce row‐level policies in each module.  
   - Update module controllers to call `$this->authorize(...)` and scope queries accordingly.  
   - Fix any CSRF errors in Axios/Inertia setup.

9. **Automate Tests for Every Feature**  
   - For each module, create or fix Unit tests for Models, Services, Queries, and Actions under `Modules/<Module>/tests/Unit/`.  
   - Write Feature tests under `Modules/<Module>/tests/Feature/` to cover all HTTP endpoints (index, show, store, update, delete, approve).  
   - Add end‐to‐end tests (Cypress or Jest) for critical user flows (login, view own data, manager view team data, create a leave request, approve, run payroll).  
   - Ensure test coverage of translations: visiting pages with `?locale=ar` shows Arabic text.

10. **Update Memory Bank Documentation**  
    - For every feature fixed or scaffolded, append an entry to `memory-bank/feature_discrepancies.md` detailing:  
      • Feature name and module  
      • Original status (“missing” or “broken”)  
      • Changes made (code paths, methods, routes)  
      • New status “Implemented” or “Fixed” with date and brief note  
    - Overwrite or consolidate outdated memory‐bank files:  
      - `migration_consolidation.md`  
      - `route_requirements.md`  
      - `authorization.md`  
      - `frontend_i18next_modules.md`  
      - `translation_implementation.md`  
      - `auth_reinstall_log.md`  
      - etc., so that `memory-bank/` now accurately reflects the current state of the app.

11. **Final Verification & Cleanup**  
    - Run `composer dump-autoload`, `php artisan module:refresh`, `php artisan migrate:fresh --seed`.  
    - Run `npm install && npm run dev`.  
    - Clear caches: `php artisan config:cache`, `route:cache`, `view:cache`.  
    - Manually navigate every key URL in all modules (e.g. `/hr/employees`, `/hr/leaves`, `/hr/timesheets`, `/hr/payroll`, `/projects`, `/rentals`, `/equipment`, `/settings`, `/notifications`, `/reports`, `/localization`, `/audit`) as different roles (user, manager, admin) and confirm no errors.  
    - Run entire test suite: `php artisan test` and JS tests.  
    - Address any last‐minute issues.

Expected Outcome
----------------
Your application is fully functional, production‐ready, with no syntax, import, or routing errors. All features documented in `memory-bank/` are implemented or marked resolved, and `memory-bank/feature_discrepancies.md` reflects the current state. Each module’s pages load correctly, row‐level permissions are enforced, translations work with react‐i18next (EN/AR), authentication and CSRF are fixed, and tests all pass. ```
