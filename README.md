# University Cafeteria Food Demand & Waste Management System

A full-stack starter application for the DBMS Capstone Project (Project 5).

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express (MVC structure)
- Database: MySQL 8
- Authentication: bcrypt + JWT access/refresh tokens
- Charts: Recharts

## Important database note
The report references a separate `sql.zip` containing `01_schema.sql` through `06_security_roles.sql`. That archive was not included with the uploaded report, so this starter does **not** invent or replace your 12-table schema. Import your original SQL scripts into MySQL first. The API currently includes safe starter endpoints for the table names explicitly visible in the report: `students`, `menus`, `menu_item`, `attendance`, `ingredients`, `purchases`, `food_preparation`, and `food_waste`. Adjust the model queries if your actual schema uses different column names.

## Run locally

### 1. Requirements
Install Node.js 20+, MySQL 8+, and Git.

### 2. Database
Create a database and run your supplied SQL scripts in this order:
1. `01_schema.sql`
2. `02_sample_data.sql`
3. `03_objects.sql`
4. `04_analytics_queries.sql`
5. `05_transactions.sql`
6. `06_security_roles.sql` (using a MySQL administrator account)

### 3. Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials and strong JWT secrets
npm install
npm run dev
```

### 4. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
Visit http://localhost:5173

## Demo mode
The dashboard and navigation work with built-in demonstration data. To use live data, configure the backend and connect the imported database. Do not use demo data as actual project evidence.

## Security
- `.env` is ignored by Git.
- Passwords are hashed with bcrypt.
- Access and refresh tokens are issued at login.
- API routes include authentication and role-based middleware.
- Use HTTPS and rotate secrets before deployment.
- The starter uses parameterized SQL queries.

## Current modules
Dashboard, students, menus, attendance, food preparation, waste tracking, inventory, suppliers, purchases, analytics and reports.
