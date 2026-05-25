# Employee Performance System

## Project Overview

Employee Performance System is a web application designed to track employee performance metrics, analyze trends, and provide AI-based recommendations for improving productivity and training programs.

The system enables managers and HR teams to monitor employee performance, feedback, achievements, and analytics through an interactive dashboard.

---

## Features

### Authentication & Access Control
- Secure JWT Login System
- Role-based access (Admin / HR / Manager / Employee)
- Protected routes

### Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- Performance metrics
- Feedback management
- Achievement tracking

### AI Recommendation Module
- Performance score analysis
- Top performer identification
- Training need analysis
- AI-based recommendations

### Analytics Dashboard
- Total employee analytics
- Top performer analytics
- Average performance score
- Performance trends visualization

### Notifications
- Evaluation deadline reminders
- Feedback update notifications
- Training notifications

### Testing & Metrics
- API testing
- Authentication testing
- AI prediction testing
- System response metrics

---

## Technologies Used

### Frontend
- React.js
- Vite
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT
- bcryptjs

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Backend `.env`

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

## System Architecture

```text
Frontend (React + Vite)
        ↓
Backend API (Node.js + Express)
        ↓
Authentication Middleware
        ↓
Controllers
        ↓
Prisma ORM
        ↓
PostgreSQL Database
        ↓
AI Recommendation Engine
```

---

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Employees
- GET /api/employees
- POST /api/employees
- PUT /api/employees/:id
- DELETE /api/employees/:id

### AI
- GET /api/ai

### Notifications
- GET /api/notifications

---

## Usage

1. Register user
2. Login using credentials
3. Access dashboard
4. Add employee records
5. View analytics
6. Check AI recommendations
7. Receive notifications