
<div align="center">

# University Cafeteria Food Demand & Waste Management System

### Smart Cafeteria Operations Through Intelligent Data Management

A full-stack web application designed to streamline university cafeteria operations through centralized data management, food demand monitoring, inventory tracking, and food waste analysis.

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## Overview

The University Cafeteria Food Demand & Waste Management System is a full-stack Database Management System (DBMS) capstone project developed to simplify and organize university cafeteria operations.

University cafeterias handle multiple interconnected activities, including student records, menu planning, attendance, food preparation, ingredient inventory, supplier information, purchases, and food waste.

Managing these activities independently can create difficulties in maintaining accurate records, monitoring consumption, and identifying unnecessary food wastage.

This project aims to bring these operations together through a centralized web-based application supported by a structured relational database.

## Project Objectives

- Centralize cafeteria operational data.
- Organize student and menu records.
- Maintain attendance and food preparation information.
- Monitor ingredient inventory and purchase records.
- Track food waste and consumption patterns.
- Support efficient cafeteria resource management.
- Apply relational database concepts through a practical application.
- Establish a foundation for data-driven cafeteria operations.

## Key Features

- **Interactive Dashboard:** Provides a centralized overview of cafeteria operations.
- **Student Management:** Organizes student information and records.
- **Menu Management:** Provides a dedicated interface for managing cafeteria menus and food items.
- **Attendance Management:** Maintains attendance-related information.
- **Food Preparation:** Organizes food preparation records.
- **Waste Tracking:** Provides a dedicated module for food waste monitoring.
- **Inventory Management:** Organizes ingredient and stock information.
- **Supplier Management:** Maintains supplier-related information.
- **Purchase Management:** Organizes purchase records.
- **Analytics:** Provides an interface for operational data analysis.
- **Reports:** Offers a dedicated reporting interface.
- **Authentication:** Includes bcrypt-based password hashing and JWT authentication components.
- **Role-Based Access Control:** Includes middleware for protected operations.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development server and build tool |
| Tailwind CSS | User interface styling |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MySQL 8 | Relational database |
| bcrypt | Password hashing |
| JWT | Token-based authentication |
| Recharts | Data visualization |
| Git | Version control |
| GitHub | Source code hosting |

## Application Modules

| Module | Description |
|---|---|
| Dashboard | Centralized cafeteria overview |
| Students | Student record management |
| Menus | Menu and food item management |
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
                       USER
                         |
                         v
                  REACT FRONTEND
                         |
                         v
                    EXPRESS API
                         |
                         v
              AUTHENTICATION & RBAC
                         |
                         v
                   MVC BACKEND
                         |
              +----------+----------+
              |          |          |
              v          v          v
            Models   Controllers  Routes
                         |
                         v
                    MYSQL 8
```

### Backend Architecture

The backend follows the Model-View-Controller (MVC) architectural pattern.

- **Models:** Handle database interactions and data operations.
- **Controllers:** Manage application logic and request processing.
- **Routes:** Define and organize API endpoints.
- **Middleware:** Handle authentication and authorization.
- **Config:** Manage database and application configuration.

## Database Design

The project documentation references a 12-table relational database schema designed to organize university cafeteria operations.

The following table names are explicitly identified in the available project documentation:

| Table Name | Description |
|---|---|
| `students` | Student information |
| `menus` | Cafeteria menu records |
| `menu_item` | Individual menu items |
| `attendance` | Attendance information |
| `ingredients` | Ingredient information |
| `purchases` | Purchase records |
| `food_preparation` | Food preparation records |
| `food_waste` | Food waste records |

The complete database schema must be obtained from the original project SQL archive. The starter application does not invent or replace the missing database definitions.

### SQL Implementation Scripts

The project documentation references six SQL scripts:

| Script | Description |
|---|---|
| `01_schema.sql` | Database schema creation |
| `02_sample_data.sql` | Sample data insertion |
| `03_objects.sql` | Database objects |
| `04_analytics_queries.sql` | Analytical SQL queries |
| `05_transactions.sql` | Transaction operations |
| `06_security_roles.sql` | Database roles and permissions |

Execute the scripts sequentially after obtaining the original SQL archive.

## Authentication & Security

The backend starter includes the foundation for secure authentication and authorization.

- Password hashing using bcrypt.
- JWT-based access and refresh tokens.
- Authentication middleware.
- Protected API route support.
- Role-Based Access Control (RBAC) middleware.
- Environment-based application configuration.
- Parameterized SQL query support.

### Security Practices

- Sensitive credentials are maintained in environment variables.
- `.env` files are excluded from Git.
- Strong and unique JWT secrets should be configured.
- Database permissions should follow the principle of least privilege.
- HTTPS should be configured before deployment.
- Exposed credentials should be rotated immediately.

## Project Structure

The application separates frontend and backend responsibilities.

```text
University-Cafeteria-Food-Demand-Waste-Management-System/
│
├── frontend/
│   └── React + Vite application
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── .gitignore
├── .env.example
└── README.md
```

## Installation & Setup

Follow these instructions to run the application locally.

### Prerequisites

Install the following tools:

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

1. Start your MySQL server.
2. Create the project database.
3. Obtain the original SQL archive.
4. Execute the six SQL scripts in the specified order.
5. Verify that the database tables and objects have been created successfully.

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create the environment configuration file.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cp .env.example .env
```

Configure the database credentials and JWT secrets in `.env`, following the variable names defined in `.env.example`.

Start the backend development server:

```bash
npm run dev
```

### 4. Frontend Setup

Open a separate terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 5. Access the Application

Open the following URL in your browser:

http://localhost:5173

## Demo Mode

The current starter application includes an interactive dashboard and navigation supported by built-in demonstration data.

Demo mode allows users to explore the initial interface without connecting the live MySQL database.

**Important:** Demonstration data must not be presented as actual database output or used as evidence of completed live database integration.

## Current Development Status

| Component | Status |
|---|---|
| React + Vite Frontend | Starter implementation |
| Dashboard Interface | Implemented with demonstration data |
| Navigation | Implemented |
| Express Backend | Starter implementation |
| MVC Folder Structure | Scaffolded |
| MySQL Integration | Requires schema setup and verification |
| Authentication | Starter implementation |
| JWT Access & Refresh Tokens | Starter implementation |
| Role-Based Authorization | Middleware foundation |
| Live Analytics | Requires database integration |
| Individual Module Integration | Further development required |

## Future Enhancements

- Complete integration of the original 12-table database schema.
- Dynamic dashboards powered by live MySQL data.
- Food demand forecasting.
- Advanced food waste analytics.
- Automated inventory threshold notifications.
- Supplier performance analysis.
- Purchase trend analysis.
- Role-specific dashboards and permissions.
- Downloadable operational reports.
- Improved input validation and automated testing.

## Concepts & Learning Outcomes

This project provides practical experience in:

- Relational Database Management Systems.
- Database schema design.
- SQL Data Definition Language (DDL).
- SQL Data Manipulation Language (DML).
- SQL queries and joins.
- Database transactions.
- Database objects.
- MVC architecture.
- REST API development.
- Authentication and authorization.
- Full-stack web application development.
- Data visualization.

## Repository Information

**Project:** University Cafeteria Food Demand & Waste Management System

**Category:** DBMS Capstone Project

**Project Type:** Full-Stack Web Application

**Frontend:** React.js, Vite, Tailwind CSS

**Backend:** Node.js, Express.js

**Database:** MySQL 8

**Authentication:** bcrypt, JWT

**Visualization:** Recharts

**GitHub Repository:** [University Cafeteria Food Demand & Waste Management System](https://github.com/aradhana-bit/University-Cafeteria-Food-Demand-Waste-Management-System)

---

<div align="center">

### University Cafeteria Food Demand & Waste Management System

**DBMS Capstone Project | Project 5**

Built using React.js, Node.js, Express.js and MySQL.

</div>
