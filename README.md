# 🚗 VehiCore - Comprehensive Vehicle Data Management System

---

## 📖 Project Description

**VehiCore**  is a full-stack microservice-based web application designed for managing vehicle data efficiently. Built for the Hcode internship task, it enables importing vehicle records from CSV/Excel, real-time export handling, search with filters, and displays alerts using WebSockets. This system supports bulk operations via background job processing and is containerized for scalable deployment.

---

## 🚀 Features

### ✅ Backend (Node.js + GraphQL + Bull + Redis + TypeORM with MySQL)
- Import vehicle data via CSV/Excel.
- Auto calculation of age_of_vehicle from manufactured_date.
- CRUD Operations (Create, Read, Update, Delete) for vehicle records.
- Server-side Pagination (100 records per page).
- Wildcard Search by car model 
- Export vehicles older than a given vehicle_age as CSV File.
- Redis Pub/Sub with Socket.IO for notification


### ✅ Frontend (React + Redux + TypeScript +  React Bootstrap + Tailwind CSS)
- File upload UI with progress and alerting.
- Real-time success/error notifications for import/export jobs.
- Paginated and searchable vehicle list.
- Dynamic vehicle entry form with age calculation.

### ✅ System Architecture
- **Microservice Architecture-based design**
- ui-service: React frontend
- api-service: GraphQL backend
- batch-job-service: Bull-powered job queue
- database-service: TypeORM database models

---

## 🧰 Tech Stack

| Category          | Technologies                                                          |
| ----------------- | ----------------------------------------------------------------------|
| **Frontend**      | React, Redux Toolkit, TypeScript, React Bootstrap, Socket.IO Client   |
| **Backend**       | Node.js, Express.js, TypeScript, GraphQL (Apollo), TypeORM , Socket.IO|
| **Queue & Cache** | Bull.js, Redis                                                        |
| **Database**      | TypeORM with MySQL                                                    |
| **Deployment**    | Docker, Docker Compose                                                |

---
