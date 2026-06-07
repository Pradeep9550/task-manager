# Task Management Web Application

#Overview

A full-stack Task Management Web Application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

Users can register, log in, create tasks, update tasks, delete tasks, and mark tasks as completed or pending.



---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Change Password
* Logout

### Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task
* Mark Task as Completed/Pending
* Search Tasks
* Filter Tasks 

### Dashboard

* Total Tasks Count
* Pending Tasks Count
* Completed Tasks Count

---

## Tech Stack

### Frontend

* React.js
* Redux Toolkit
* React Router DOM
* hooks
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* JWT Authentication
* Cookie Based Authentication

### Database

* MongoDB

---

## Installation

### Clone Repository

```bash
git clone <repository-url>


---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file inside backend folder:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_secret

REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_EXPIRY=7d

CORS_ORIGIN=http://localhost:5173
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create a `.env` file inside frontend folder:

```env
VITE_API_URL=http://localhost:8000/api
```


---

## Author

Pradeep Verma

MERN Stack Developer
