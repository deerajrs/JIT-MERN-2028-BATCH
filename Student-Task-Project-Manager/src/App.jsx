import "./App.css";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      topic: "Learn React",
      description: "Understanding Components",
      status: "Completed",
    },
    {
      id: 2,
      topic: "Learn JavaScript",
      description: "Understanding Async/Await",
      status: "Pending",
    },
    {
      id: 3,
      topic: "Learn MongoDB",
      description: "Database",
      status: "Completed",
    },
    {
      id: 4,
      topic: "Learn SQL",
      description: "Database",
      status: "Completed",
    },
  ]);

  // Toggle task status
  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : task
      )
    );
  }

  // Add a new task
  function addTask(newTask) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  // Delete a task
  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={
            <DashBoard
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          }
        />

        {/* All Tasks */}
        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          }
        />

        {/* Task Details */}
        <Route
          path="/tasks/:id"
          element={<TaskDetails tasks={tasks} />}
        />
      </Routes>
    </div>
  );
}

export default App;