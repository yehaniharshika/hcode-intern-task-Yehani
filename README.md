## VehiCore - Comprehensive Vehicle Data Management System 🚗🚘

---

## 📖 Project Description

**VehiCore**  is a full-stack microservice-based web application designed for managing vehicle data efficiently. Built for the Hcode internship task, it enables importing vehicle records from CSV/Excel, real-time export handling, search with filters, and displays alerts using WebSockets. This system supports bulk operations via background job processing and is containerized for scalable deployment.

---

## 🚀 Features

### ✅ Backend
- Import vehicle data via CSV/Excel.
- Auto calculation of age_of_vehicle from manufactured_date.
- CRUD Operations (Create, Read, Update, Delete) for vehicle records.
- Server-side Pagination (100 records per page).
- Wildcard Search by car model 
- Export vehicles older than a given vehicle_age as CSV File.
- Redis Pub/Sub with Socket.IO for notification


### ✅ Frontend
- File upload UI with progress and alerting.
- Real-time success/error notifications for import/export jobs.
- Paginated and searchable vehicle list.
- Dynamic vehicle entry form with age calculation.

### ✅ System Architecture

**Microservice Architecture-based Design**
- ui-service - React-based frontend for user interaction
- api-service - GraphQL backend that handles all API requests and business logic
- batch-job-service - Background job queue powered by Bull and Redis
- database-service - TypeORM database models

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
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
DB_NAME=vehicledatadb
```

### 3️⃣ Run Services

### ✅ Using Docker
```sh
docker-compose up --build
```

### ✅ Run Services Manually ( If Docker doesn't work )
Since Docker isn’t working on your setup, you can run each service separately

**01. Start Redis Server** 

Open a terminal and run:
```sh
redis-server --port 6380
```
Make sure Redis is installed on your machine.If not, install Redis first.

**02. Run Database Service**

Open new project terminal and run these commands
```sh
cd database-service
npm install    # if not already done
npx ts-node index.ts
```

**03. Run Batch Job Service**

Open another project terminal and run these commands
```sh
cd batch-job-service
npm install    # if not already done
npx ts-node worker.ts
```

**04. Run API Service**

Open another project terminal and run these commands
```sh
cd api-service
npm install    # if not already done
npm run start
```

**05. Run UI Service**

Open another project terminal and run these commands
```sh
cd ui-service
npm install    # if not already done
npm run dev
``` 

### 4️⃣ Login Credentials
After all services are running, open your browser and go to the UI.

Use the following credentials to log in:

- Email: adminvehicore@gmail.com
- Password: vehicore123


## 🧪 Verify Imported Files
In the project, ensure all necessary files are correctly imported and accessible.You can use this Files.

- [For CSV file import](batch-job-service/sample/vehicle-data.csv)

- [For Excel file import](batch-job-service/sample/vehicle-details.xlsx)

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