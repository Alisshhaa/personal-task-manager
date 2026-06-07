# Personal Task Manager 📋

## Project Title & Brief Description

This project is a solution for Exercise 1: Personal Task Manager from the Studio Graphene Associate Software Engineer Take-Home Assignment.

Personal Task Manager is a full-stack task management application built using React, Node.js, and Express.js. The application allows users to create, edit, delete, search, and manage tasks efficiently. Users can set due dates, mark tasks as completed, view overdue tasks, and filter tasks based on their status. Task data is stored using a JSON file and the application is deployed using Vercel (Frontend) and Render (Backend).

---

## Live Demo Links

### Frontend
https://personal-task-manager-xi.vercel.app

### Backend
https://personal-task-manager-api-1bhc.onrender.com

### GitHub Repository:
https://github.com/Alisshhaa/personal-task-manager

---

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Search tasks
- Filter tasks (All, Active, Completed)
- Due date support
- Overdue task indication
- Task statistics dashboard
- Persistent storage using JSON file
- Responsive and clean user interface

---

## Tech Stack

### Frontend
- React.js
- React Hooks 
- Vite
- Axios
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Storage
- JSON File (`tasks.json`)

### Deployment
- Vercel (Frontend)
- Render (Backend)

### Version Control
- Git
- GitHub

---

## How To Run Locally

### Clone Repository

```bash
git clone https://github.com/Alisshhaa/personal-task-manager.git
```

### Backend Setup

Navigate to backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start backend server:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5000
```

---

### Frontend Setup

Navigate to frontend folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## API Documentation

### 1. Get All Tasks

**Endpoint**

```http
GET /tasks
```

**Response**

```json
[
  {
    "id": 1,
    "title": "Learn React",
    "description": "Practice Hooks",
    "dueDate": "2026-06-10",
    "completed": false
  }
]
```

---

### 2. Create Task

**Endpoint**

```http
POST /tasks
```

**Request Body**

```json
{
  "title": "Learn React",
  "description": "Practice Hooks",
  "dueDate": "2026-06-10"
}
```

**Response**

```json
{
  "id": 1,
  "title": "Learn React",
  "description": "Practice Hooks",
  "dueDate": "2026-06-10",
  "completed": false
}
```

---

### 3. Update Task

**Endpoint**

```http
PUT /tasks/:id
```

**Request Body**

```json
{
  "title": "Updated Task",
  "description": "Updated Description",
  "dueDate": "2026-06-15",
  "completed": true
}
```

**Response**

```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated Description",
  "dueDate": "2026-06-15",
  "completed": true
}
```

---

### 4. Delete Task

**Endpoint**

```http
DELETE /tasks/:id
```

**Response**

```json
{
  "message": "Task deleted"
}
```

---

## Project Structure

```text
personal-task-manager

├── client
│   ├── src
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server
│   ├── server.js
│   ├── tasks.json
│   └── package.json
│
└── README.md
```

---

## Next Steps / Future Improvements

If more development time were available, the following improvements could be added:

- User Authentication and Authorization
- Database Integration (MongoDB/PostgreSQL)
- Dark Mode Support
- Drag and Drop Task Reordering
- Task Categories and Tags
- Task Priority Levels


---

## Deployment

### Frontend Deployment
Vercel

### Backend Deployment
Render

---

## Author

Alisha Gupta

