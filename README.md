# University Cafeteria Food Demand & Waste Management System

A full-stack web application for managing university cafeteria operations through centralized student records, menu data, attendance, food preparation, inventory, purchasing, and food-waste monitoring.

<p align="center">
  <strong>DBMS Capstone Project</strong><br />
  React · Vite · Node.js · Express · MySQL
</p>

<p align="center">
  <a href="https://nouriq-cafeteria-web.onrender.com">Live Application</a> ·
  <a href="https://nouriq-cafeteria-api.onrender.com/api/health">API Health</a>
</p>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Objectives](#objectives)
- [Features and Modules](#features-and-modules)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database](#database)
- [Live Deployment](#live-deployment)
- [Demo Access](#demo-access)
- [Run Locally](#run-locally)
- [Environment Configuration](#environment-configuration)
- [API Overview](#api-overview)
- [Security](#security)
- [Repository Structure](#repository-structure)
- [Project Information](#project-information)

## Project Overview

University cafeterias coordinate several connected activities every day: maintaining student information, planning menus, recording attendance, preparing meals, managing ingredients, handling suppliers and purchases, and monitoring food waste.

When these activities are recorded separately, it becomes difficult to maintain consistent information and understand how food resources are being used.

The **University Cafeteria Food Demand & Waste Management System** brings these operational areas into one web-based platform. It is designed to support organized record management, improve operational visibility, and provide a foundation for more informed cafeteria planning.

## Objectives

- Centralize cafeteria-related information in one application.
- Organize student and menu records.
- Maintain attendance and food preparation records.
- Track ingredients, suppliers, and purchases.
- Record and monitor food waste.
- Support efficient cafeteria resource management.
- Apply database management and full-stack development concepts to a practical use case.

## Features and Modules

| Module | Purpose |
|---|---|
| Dashboard | Provides a consolidated view of cafeteria operations. |
| Student Management | Maintains student records and related information. |
| Menu Management | Organizes menus and food items. |
| Attendance | Maintains student attendance records. |
| Food Preparation | Records meal preparation information. |
| Inventory | Organizes ingredient and stock information. |
| Supplier Management | Maintains supplier details. |
| Purchase Management | Organizes purchase records. |
| Waste Tracking | Records food waste for monitoring and analysis. |
| Analytics and Reports | Provides a foundation for reviewing operational information. |
| Authentication | Supports authenticated access to protected application routes. |

*Module availability and data displayed depend on the deployed application version and its configured database.*

## Technology Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=react&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

| Layer | Technology | Role |
|---|---|---|
| Frontend | React.js | Component-based user interface |
| Frontend Tooling | Vite | Development server and production build |
| Styling | Tailwind CSS | Utility-first interface styling |
| Visualization | Recharts | Charts and data visualization |
| Backend | Node.js | Server-side JavaScript runtime |
| API | Express.js | HTTP routes and middleware |
| Database Driver | mysql2 | MySQL-compatible database connectivity |
| Authentication | JSON Web Tokens (JWT) | Token-based authentication |
| Password Security | bcryptjs | Password hashing |
| Security Middleware | Helmet, Express Rate Limit | HTTP security headers and request limiting |
| Deployment | Render | Hosting for the web application and API |
| Version Control | Git and GitHub | Source control and collaboration |
## System Architecture

The application follows a client-server architecture.

```text
                   USER
                     |
                     v
              REACT FRONTEND
                     |
               HTTP / REST API
                     |
                     v
              EXPRESS BACKEND
                     |
          +----------+-----------+
          |          |           |
          v          v           v
        ROUTES   MIDDLEWARE   CONTROLLERS
                     |           |
                     +-----+-----+
                           |
                           v
                    DATABASE LAYER
                           |
                           v
                    RELATIONAL DB
```

The frontend communicates with the backend through HTTP API requests. The backend handles routing, request processing, authentication, and database operations.

## Database

The application uses a relational database approach to organize cafeteria information.

The database layer is intended to support records relating to:

- Users and students
- Menus and menu items
- Attendance
- Ingredients and inventory
- Suppliers and purchases
- Food preparation
- Food waste

The exact schema and database engine must match the code and deployment configuration of the branch being used. Configure database access through environment variables; do not commit connection strings or database passwords to the repository.

## Live Deployment

The project is deployed on Render.

| Component | URL |
|---|---|
| Web Application | [https://nouriq-cafeteria-web.onrender.com](https://nouriq-cafeteria-web.onrender.com) |
| Backend API | [https://nouriq-cafeteria-api.onrender.com](https://nouriq-cafeteria-api.onrender.com) |
| API Health Check | [https://nouriq-cafeteria-api.onrender.com/api/health](https://nouriq-cafeteria-api.onrender.com/api/health) |

The API health endpoint can be used to check whether the backend service is responding. A successful API health response does not, by itself, confirm database connectivity or successful login.

## Demo Access

An administrator demo account is configured through the deployment environment.

For security reasons, the administrator password and other private credentials are not published in this README or committed to GitHub. To request access for a project demonstration, contact the repository maintainer.

**Do not share production passwords, database credentials, JWT secrets, or private environment-variable values in a public repository.**

## Run Locally

### Prerequisites

Install the following:

- Node.js (LTS recommended)
- npm
- Git
- A MySQL-compatible database configured for the backend

### 1. Clone the repository

```bash
git clone https://github.com/aradhana-bit/University-Cafeteria-Food-Demand-Waste-Management-System.git
cd University-Cafeteria-Food-Demand-Waste-Management-System
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the required configuration values described below.

### 3. Start the backend

```bash
npm run dev
```

The backend uses the configured `PORT`; if it is not set, the current server code defaults to port `5000`.

### 4. Configure and start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local Vite URL shown in the terminal (typically [http://localhost:5173](http://localhost:5173)).

### 5. Create a production frontend build

From the `frontend` directory:

```bash
npm run build
```

## Environment Configuration

Create environment files locally. Keep them out of version control.

### Backend

The backend database configuration reads the following variables:

| Variable | Description |
|---|---|
| `PORT` | Port used by the Express server. |
| `CLIENT_URL` | Allowed frontend origin for CORS. |
| `DB_HOST` | Database host. |
| `DB_PORT` | Database port. |
| `DB_USER` | Database username. |
| `DB_PASSWORD` | Database password. |
| `DB_NAME` | Database name. |
| `JWT_ACCESS_SECRET` | Secret used to sign access tokens. |
| `JWT_REFRESH_SECRET` | Secret used to sign refresh tokens. |

Use the exact variable names expected by the selected branch's backend configuration. Supply real values through your local `.env` file or your hosting provider's environment settings.

### Frontend

If the frontend requires a separately configured API base URL, set it using the variable name expected by the frontend source and the deployment environment.

## API Overview

The backend exposes REST endpoints under the `/api` prefix. The following routes are present in the current source:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health check |
| GET | `/api/db-health` | Database connectivity check |
| POST | `/api/auth/login` | User login |
| GET | `/api/dashboard` | Authenticated dashboard data |
| GET | `/api/data/:table` | Authenticated table data |
| GET | `/api/students` | List student records |
| GET | `/api/students/:id` | Retrieve a student |
| POST | `/api/students` | Create a student record |
| PUT | `/api/students/:id` | Update a student record |
| DELETE | `/api/students/:id` | Delete a student record |

Protected endpoints require valid authentication. Access to management endpoints may also depend on the user's role.

## Security

The backend includes security-related middleware and authentication components, including:

- JWT-based authentication.
- Password hashing with bcryptjs.
- Helmet security headers.
- Express rate limiting.
- CORS origin configuration.
- Protected API routes and role-based authorization middleware.
- Environment-based configuration for sensitive values.

For any public deployment, use strong unique secrets, restrict database permissions, enforce HTTPS, and rotate credentials if they are exposed.

## Repository Structure

```text
University-Cafeteria-Food-Demand-Waste-Management-System/
|
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- routes/
|   |   |-- models/
|   |-- package.json
|
|-- frontend/
|   |-- src/
|   |-- package.json
|   |-- vite.config.js
|
|-- .gitignore
|-- README.md
```

## Project Information

| Field | Details |
|---|---|
| Project Title | University Cafeteria Food Demand & Waste Management System |
| Project Category | DBMS Capstone Project |
| Project Type | Full-Stack Web Application |
| Frontend | React.js and Vite |
| Backend | Node.js and Express.js |
| Database Layer | MySQL-compatible relational database |
| Deployment Platform | Render |
| Repository | [GitHub Repository](https://github.com/aradhana-bit/University-Cafeteria-Food-Demand-Waste-Management-System) |

---

<p align="center">
  <strong>University Cafeteria Food Demand & Waste Management System</strong><br />
  Designed to bring clarity, structure, and data-driven thinking to cafeteria operations.
</p>
