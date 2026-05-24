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
- Employee records management
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
- Performance trends

### Notifications
- Evaluation deadline reminders
- Feedback update notifications
- Training notifications

### Testing & Metrics
- API testing
- Response validation
- Authentication testing

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

## System Architecture

```text
Frontend (React + Vite)
        ↓
Backend API (Node.js + Express)
        ↓
PostgreSQL Database (Prisma ORM)
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

### Dashboard
- GET /api/dashboard

---

## Usage

1. Register a user
2. Login and obtain JWT token
3. Access protected APIs
4. Add employee performance data
5. View dashboard analytics
6. Get AI recommendations