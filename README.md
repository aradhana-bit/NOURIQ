
# University Cafeteria Food Demand & Waste Management System

A full-stack DBMS capstone project designed to streamline university cafeteria operations through centralized data management, food demand monitoring, inventory tracking, and food waste analysis.

The system provides a unified platform for managing cafeteria activities, organizing operational records, and supporting data-driven decision-making.

## Project Overview

University cafeterias handle multiple interconnected operations, including student records, daily menus, attendance, food preparation, ingredient inventory, purchases, and food waste.

Managing these activities independently can make it difficult to maintain accurate records, monitor food consumption, and identify unnecessary wastage.

The **University Cafeteria Food Demand & Waste Management System** aims to simplify these operations through a centralized web-based application.

## Objectives

- Centralize cafeteria operational data.
- Manage student and menu records.
- Maintain attendance and food preparation information.
- Monitor ingredient inventory and purchase records.
- Track food waste and consumption patterns.
- Support data-driven cafeteria management.
- Apply relational database concepts through a practical application.
- Implement authentication and role-based access control.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Architecture | MVC |
| Database | MySQL 8 |
| Authentication | bcrypt, JWT |
| Data Visualization | Recharts |
| Version Control | Git, GitHub |

## Core Modules

| Module | Description |
|---|---|
| Dashboard | Overview of cafeteria activities |
| Students | Student record management |
| Menus | Cafeteria menu management |
| Attendance | Attendance record management |
| Food Preparation | Food preparation records |
| Waste Tracking | Food waste monitoring |
| Inventory | Ingredient and stock management |
| Suppliers | Supplier information management |
| Purchases | Purchase record management |
| Analytics | Operational data analysis |
| Reports | Reporting interface |

## System Architecture

The application follows a client-server architecture with an MVC-based backend.

```text
User
 |
 v
React Frontend
 |
 v
Express REST API
 |
 v
Authentication & Authorization
 |
 v
MVC Backend
 |
 +---- Models
 +---- Controllers
 +---- Routes
 +---- Middleware
 +---- Configuration
 |
 v
MySQL Database
```

### Backend Architecture

The backend follows the Model-View-Controller (MVC) architecture.

- **Models:** Handle database interactions and data operations.
- **Controllers:** Manage application logic and requests.
- **Routes:** Define API endpoints.
- **Middleware:** Handle authentication and authorization.
- **Config:** Manage database and application configuration.

## Database Design

The application is designed to work with a MySQL relational database.

The project report references a 12-table database schema. The following table names are explicitly available in the project documentation:

- `students`
- `menus`
- `menu_item`
- `attendance`
- `ingredients`
- `purchases`
- `food_preparation`
- `food_waste`

The original database SQL archive is required to import the complete schema. The starter application does not invent or replace the missing database definitions.

### Database SQL Scripts

The project documentation references the following SQL scripts:

| Script | Purpose |
|---|---|
| `01_schema.sql` | Database schema creation |
| `02_sample_data.sql` | Sample data insertion |
| `03_objects.sql` | Database objects |
| `04_analytics_queries.sql` | Analytical queries |
| `05_transactions.sql` | Transaction operations |
| `06_security_roles.sql` | Database roles and permissions |

Execute the scripts in the specified order after obtaining the original SQL archive.

## Authentication & Security

The backend starter includes the foundation for authentication and access control.

- Password hashing using bcrypt.
- JWT-based access and refresh tokens.
- Protected API routes.
- Role-Based Access Control (RBAC) middleware.
- Environment-based configuration.
- Parameterized SQL queries.
- Environment files excluded from Git.

### Security Practices

- Never commit `.env` files or database credentials.
- Use strong and unique JWT secrets.
- Configure HTTPS before deployment.
- Rotate exposed credentials.
- Restrict database privileges according to application roles.

## Getting Started

Follow these instructions to run the application locally.

### Prerequisites

Install the following:

- Node.js 20+
- MySQL 8+
- Git
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone https://github.com/aradhana-bit/University-Cafeteria-Food-Demand-Waste-Management-System.git
cd University-Cafeteria-Food-Demand-Waste-Management-System
```

### 2. Database Configuration

1. Start the MySQL server.
2. Create the project database.
3. Obtain the original SQL archive.
4. Execute the SQL scripts in the specified order.
5. Verify that the tables and database objects have been created successfully.

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the environment file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Configure the database credentials and JWT secrets in `.env`, following the variable names in `.env.example`.

Start the backend:

```bash
npm run dev
```

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

### 5. Access the Application

Open the following URL in your browser:

http://localhost:5173

## Demo Mode

The current starter application includes an interactive dashboard and navigation supported by built-in demonstration data.

Demo mode allows users to explore the initial interface without connecting the live MySQL database.

**Note:** Demonstration data must not be presented as actual database output or used as evidence of completed live database integration.

## Development Status

| Component | Status |
|---|---|
| React + Vite Frontend | Starter implementation |
| Dashboard Interface | Implemented with demo data |
| Navigation | Implemented |
| Express Backend | Starter implementation |
| MVC Structure | Scaffolded |
| MySQL Integration | Requires schema setup and verification |
| Authentication | Starter implementation |
| JWT Access & Refresh Tokens | Starter implementation |
| Role-Based Authorization | Middleware foundation |
| Live Analytics | Requires database integration |
| Individual Module Integration | Further development required |

## Future Enhancements

- Complete integration of all database tables.
- Dynamic dashboards powered by live MySQL data.
- Advanced food demand forecasting.
- Automated food waste analysis.
- Inventory threshold notifications.
- Supplier and purchase analytics.
- Role-specific dashboards and permissions.
- Exportable operational reports.
- Improved validation and automated testing.

## Learning Outcomes

This project provides practical experience in:

- Relational database design.
- SQL queries and database operations.
- Database connectivity using Node.js.
- Full-stack web application development.
- MVC architecture.
- Authentication and authorization.
- Data visualization.
- Database-driven application design.

## Repository Information

**Project:** University Cafeteria Food Demand & Waste Management System

**Category:** DBMS Capstone Project

**Database:** MySQL 8

**Frontend:** React + Vite

**Backend:** Node.js + Express.js

**GitHub Repository:**  
https://github.com/aradhana-bit/University-Cafeteria-Food-Demand-Waste-Management-System

---
