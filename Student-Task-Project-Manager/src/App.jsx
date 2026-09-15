import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [backendError, setBackendError] = useState(false);

    // Get tasks from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Backend server error");
                }

                return response.json();
            })
            .then((data) => {
                setTasks(data);
                setBackendError(false);
            })
            .catch((error) => {
                console.error("Backend Error:", error);
                setBackendError(true);
                setTasks([]);
            });
    }, []);

    // Add new task
    function handleAddTask(newTask) {
        setTasks((previousTasks) => [
            ...previousTasks,
            newTask
        ]);
    }

    return (
        <div>
            <Navbar />

            {/* Backend Error Message */}
            {backendError && (
                <div className="backend-error">
                    ❌ Backend server is not running.
                    <br />
                    Please start your backend server on port 5000.
                </div>
            )}

            <Routes>

                <Route
                    path="/"
                    element={
                        <Dashboard
                            tasks={tasks}
                            setTasks={setTasks}
                            onAddTask={handleAddTask}
                            backendError={backendError}
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