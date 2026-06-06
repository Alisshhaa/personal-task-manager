import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(
       " https://personal-task-manager-api-1bhc.onrender.com/",
        {
          title: newTask,
          description: description,
          dueDate: dueDate,
        }
      );

      setTasks([response.data, ...tasks]);
      setNewTask("");
      setDueDate("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;
    try {
      await axios.delete(
        `https://personal-task-manager-api-1bhc.onrender.com/${id}`
      );

      setTasks(
        tasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.log("DELETE ERROR");
      console.log(error);
    }
  };
  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(
        `https://personal-task-manager-api-1bhc.onrender.com/${id}`,
        {
          completed: !completed,
        }
      );

      setTasks(
        tasks.map((task) =>
          task.id === id
            ? response.data
            : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const editTask = async (id) => {
  const task = tasks.find((t) => t.id === id);

  const newTitle = prompt(
    "Edit title",
    task.title
  );

  if (newTitle === null) return;

  const newDescription = prompt(
    "Edit description",
    task.description || ""
  );

  if (newDescription === null) return;

  const newDueDate = prompt(
    "Edit due date (YYYY-MM-DD)",
    task.dueDate || ""
  );

  if (newDueDate === null) return;

  try {
    const response = await axios.put(
      `https://personal-task-manager-api-1bhc.onrender.com/${id}`,
      {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
      }
    );

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? response.data
          : task
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    axios
      .get("https://personal-task-manager-api-1bhc.onrender.com/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container"
      style={{
        width: "700px",
  margin: "40px auto",
  padding: "25px",
  backgroundColor: "white",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        display: "flex",
flexDirection: "column",
alignItems: "center",
marginTop: "40px"
      }}
    >
      <h1 style={{ textAlign: "center",color: "#1e293b",
    marginBottom: "20px", }}>Personal Task Manager 📋 </h1>
    <br />
  
      <input
        style={{
           width: "250px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px"
        }}
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "250px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  display: "block",
  marginTop: "10px",
  marginBottom: "10px"
        }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />


      <button
        onClick={addTask}
        style={{
          marginTop: "15px",
          padding: "8px 12px",
        }}
      >
        Add Task
      </button>
      

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)}
          style={{
    width: "250px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "15px",
    marginBottom: "15px"
        }}
      />
      <div style={{ display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
    fontWeight: "bold",}}>
        <button onClick={() => setFilter("all")} style={{ marginRight: "5px" }}>
          All
        </button>

        <button onClick={() => setFilter("active")} style={{ marginRight: "5px" }}>
          Active
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>


      <p>Total Tasks: {tasks.length}</p>

      <p>
        Completed: {tasks.filter(task => task.completed).length}
      </p>

      <p>
        Active: {tasks.filter(task => !task.completed).length}
      </p>
      {
        tasks.length > 0 &&
        tasks.every((task) => task.completed) && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              
            }}
          >
            🎉 All tasks completed!
          </p>
        )
      }

      {
        tasks
        .filter((task) => {
          if (
            !task.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return false;
          }

          if (filter === "active") {
            return !task.completed;
          }

          if (filter === "completed") {
            return task.completed;
          }

          return true;
        }).length === 0 && (
          <p>No tasks found</p>
        )
      }

      <ul>
        {tasks
          .sort((a, b) => b.id - a.id)
          .filter((task) => {
            if (
              !task.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return false;
            }
            if (filter === "active") {
              return !task.completed;
            }

            if (filter === "completed") {
              return task.completed;
            }

            return true;
          })
          .map((task) => {
            const isOverdue =
              task.dueDate &&
              !task.completed &&
              new Date(task.dueDate) < new Date();
            return (
              <li
                key={task.id}
                style={{ 
  width: "350px",
  margin: "15px auto",
  padding: "15px",
  border: isOverdue
    ? "2px solid red"
    : "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "white",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",}}>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(
                      task.id,
                      task.completed
                    )
                  }

                />


                <span
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                    marginLeft: "8px",
                    color: isOverdue ? "red" : "black",
                    fontWeight: isOverdue
                      ? "bold"
                      : "normal",
                  }}
                >
                  {task.title}
                </span>
                {task.description && (
                  <div
                    style={{
                      marginLeft: "28px",
                      color: "#666",
                      fontSize: "14px",
                      marginTop: "4px"
                    }}
                  >
                    {task.description}
                  </div>
                )}
                <div>
                  Due: {task.dueDate || "No date"}
                </div>
                {
                  isOverdue && (
                    <div
                      style={{
                        color: "red",
                        marginLeft: "28px",
                        
                      }}
                    >
                      ⚠️ Overdue
                    </div>
                  )
                }
                <button
                  onClick={() => editTask(task.id)}
                  style={{backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
     marginLeft: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    marginLeft: "10px",
  backgroundColor: "#f44336",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "5px",
  cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default App;