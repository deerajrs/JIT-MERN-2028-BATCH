import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";


function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Learn React",
            description: "Understanding Components",
            status: "Completed"
        },
        {
            id: 2,
            title: "Learn JavaScript",
            description: "Understanding Async/Await",
            status: "Pending"
        },
        {
            id: 3,
            title: "Learn MongoDB",
            description: "Database",
            status: "Completed"
        },
        {
            id: 4,
            title: "Learn SQL",
            description: "Database",
            status: "Completed"
        }
    ]);
useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
        .then((response) => response.json())
        .then((data) => {
            setTasks(data);
            
        })
        
}, []);


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