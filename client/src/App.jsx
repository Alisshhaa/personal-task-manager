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
       `https://personal-task-manager-api-1bhc.onrender.com/tasks`,
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
        `https://personal-task-manager-api-1bhc.onrender.com/tasks/${id}`
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
        `https://personal-task-manager-api-1bhc.onrender.com/tasks/${id}`,
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
      `https://personal-task-manager-api-1bhc.onrender.com/tasks/${id}`,
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
      .get(`https://personal-task-manager-api-1bhc.onrender.com/tasks`)
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
  width: "850px",
  maxWidth: "95%",
  margin: "40px auto",
  padding: "30px",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}}
    >
      <h1
  style={{
    textAlign: "center",
    color: "#1e293b",
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "5px",
  }}
>
  📝 Personal Task Manager
</h1> <p
  style={{
    color: "#64748b",
    marginBottom: "25px",
  }}
>
  Organize your tasks efficiently and never miss a deadline.
</p>
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
  padding: "12px 20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
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
  width: "300px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  marginTop: "20px",
  marginBottom: "20px",
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


      <div
  style={{
    display: "flex",
    gap: "30px",
    margin: "20px 0",
    fontWeight: "bold",
    color: "#334155",
  }}
>
  <span>📌 Total: {tasks.length}</span>

  <span>
    ✅ Completed:{" "}
    {tasks.filter(task => task.completed).length}
  </span>

  <span>
    ⏳ Active:{" "}
    {tasks.filter(task => !task.completed).length}
  </span>
</div>
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
          <p
  style={{
    color: "#64748b",
    fontWeight: "bold",
  }}
>
  No tasks found!
</p>
        )
      }

      <ul>
        {[tasks]
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
  width: "450px",
  margin: "15px auto",
  padding: "18px",
  border: isOverdue
    ? "2px solid #ef4444"
    : "1px solid #e2e8f0",
  borderRadius: "14px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  listStyle: "none",
}}>

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
                  style={{
  backgroundColor: "#3b82f6",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  marginLeft: "10px",
  fontWeight: "bold",
}}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
  marginLeft: "10px",
  backgroundColor: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
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