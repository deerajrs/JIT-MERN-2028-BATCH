import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState([]);

    // Get tasks from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    // Add new task to React state
    function handleAddTask(newTask) {
        setTasks((previousTasks) => [
            ...previousTasks,
            newTask
        ]);
    }

    return (
        <div>
            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={
                        <Dashboard
                            tasks={tasks}
                            setTasks={setTasks}
                            onAddTask={handleAddTask}
                        />
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <Tasks
                            tasks={tasks}
                        />
                    }
                />

                <Route
                    path="/tasks/:id"
                    element={
                        <TaskDetails
                            tasks={tasks}
                        />
                    }
                />

            </Routes>
        </div>
    );
}

export default App;