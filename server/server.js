const express = require("express");
const cors = require("cors");

const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const tasksFile = path.join(__dirname, "tasks.json");

let tasks = [];

if (fs.existsSync(tasksFile)) {
  const data = fs.readFileSync(tasksFile, "utf8");

  if (data) {
    tasks = JSON.parse(data);
  }
}

let nextId =
  tasks.length > 0
    ? Math.max(...tasks.map((t) => t.id)) + 1
    : 1;

    const saveTasks = () => {
  fs.writeFileSync(
    tasksFile,
    JSON.stringify(tasks, null, 2)
  );
};
app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});
app.post("/tasks", (req, res) => {
  const newTask = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description || "",
    dueDate: req.body.dueDate || "",
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();

  res.status(201).json(newTask);
});
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  console.log("Deleting ID:", id);

  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();

  console.log(tasks);

  res.json({
    message: "Task deleted",
  });
});
app.put("/tasks/:id", (req, res) => {
  console.log("PUT ID:", req.params.id);
  console.log("BODY:", req.body);
  const id = parseInt(req.params.id);

  const task = tasks.find(
    (task) => task.id === id
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title =
    req.body.title || task.title;
    task.description =
  req.body.description ?? task.description;

task.dueDate =
  req.body.dueDate ?? task.dueDate;

  if (
    req.body.completed !== undefined
  ) {
    task.completed =
      req.body.completed;
  }
  console.log("UPDATED TASK:", task);
  saveTasks();
  res.json(task);
  
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});