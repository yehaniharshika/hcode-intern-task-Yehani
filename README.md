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
**Microservice Architecture-based Design**
- ui-service: React frontend
- api-service: GraphQL backend
- batch-job-service: Bull-powered job queue
- database-service: TypeORM database models

---

## 📌 Tech Stack

| Category          | Technologies                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------|
| **Frontend**      | React, Redux Toolkit, TypeScript, React Bootstrap, Tailwind CSS, Socket.IO Client      |
| **Backend**       | Node.js, Express.js, TypeScript, GraphQL (Apollo), TypeORM , Socket.IO , Bull.js, Redis|
| **Database**      | TypeORM with MySQL                                                                     |
| **Deployment**    | Docker, Docker Compose                                                                 |

---

## ⚙️ Installation & Setup Instructions
**Prerequisites**
- Node.js Version **v22.11.0**
- Docker & Docker Compose
- MySQL / Redis running


### 1️⃣ Clone the Project
```sh
git clone https://github.com/yehaniharshika/hcode-intern-task-Yehani.git
```

### 2️⃣ Update Environment Variables
```sh
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=yourpassword
DB_NAME=vehicledatadb
REDIS_PORT=6380
```

### 3️⃣ Run Services
```sh
docker-compose up --build
```

---

## 📁 Folder Structure

```sh
hcode-intern-task-Yehani/
│          
├── api-service/     
├── batch-job-service/  
├── database-service/ 
├── ui-service/
├── docker-compose.yml
├── License.txt
└── README.md
```

---

## 🪪 License
© 2025 All Right Reserved Created By Yehani Harshika
<br/>
This project is licensed under the [MIT](License.txt) license