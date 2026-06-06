# Personal Task Manager

A full-stack task management application built using React, Node.js, and Express.

## Features

- Add tasks
- Edit tasks
- Delete tasks
- Task completion toggle
- Search tasks
- Filter tasks (All, Active, Completed)
- Due dates
- Task descriptions
- Overdue task highlighting
- Active and completed task counters
- Empty state message
- Persistent storage using JSON file

## Tech Stack

Frontend:
- React
- Axios
- CSS

Backend:
- Node.js
- Express
- CORS

Storage:
- JSON File (tasks.json)

## Project Structure

task-manager/
│
├── client/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── server/
│ ├── server.js
│ ├── tasks.json
│ └── package.json
│
└── README.md

## API Endpoints

### Get All Tasks

GET

```
/tasks
```

### Create Task

POST

```
/tasks
```

Request Body:

```json
{
  "title": "Learn React",
  "description": "Finish hooks",
  "dueDate": "2026-06-10"
}
```

### Update Task

PUT

```
/tasks/:id
```

### Delete Task

DELETE

```
/tasks/:id
```

## Run Locally

### Backend

```bash
cd server
npm install
node server.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Future Improvements

- Drag and drop tasks
- Authentication
- SQLite database
- Dark mode
- Better mobile responsiveness