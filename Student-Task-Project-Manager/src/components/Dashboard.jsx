import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:5000/api/tasks", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async (response) => {
                const data = await response.json();

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    navigate("/login");

                    return null;
                }

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch tasks"
                    );
                }

                return data;
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setTasks(data);
                }
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [navigate]);

    async function toggleTask(id) {
        const task = tasks.find(
            (task) => task._id === id
        );

        if (!task) {
            return;
        }

        const token = localStorage.getItem("token");

        const newStatus =
            task.status === "Completed"
                ? "Pending"
                : "Completed";

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update task"
                );
            }

            setTasks(
                tasks.map((item) =>
                    item._id === id ? data : item
                )
            );

        } catch (error) {
            console.error("Update error:", error);
        }
    }

    async function deleteTask(id) {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete task"
                );
            }

            setTasks(
                tasks.filter(
                    (task) => task._id !== id
                )
            );

        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    function addTask(newTask) {
        setTasks((previousTasks) => [
            ...previousTasks,
            newTask
        ]);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    if (loading) {
        return <h2>Loading tasks...</h2>;
    }

    return (
        <main>
            <div className="dashboard-header">
                <div>
                    <h1>Task Dashboard</h1>
                    <p>Manage your tasks</p>
                </div>

                <button onClick={logout}>
                    Logout
                </button>
            </div>

            <div className="stats-container">
                <StatCard
                    title="Total Tasks"
                    value={totalTasks}
                />

                <StatCard
                    title="Completed"
                    value={completedTasks}
                />

                <StatCard
                    title="Pending"
                    value={pendingTasks}
                />
            </div>

            <AddTask onAddTask={addTask} />

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {tasks.length === 0 ? (
                    <p>No tasks available.</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            onToggle={() =>
                                toggleTask(task._id)
                            }
                            onDelete={() =>
                                deleteTask(task._id)
                            }
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default Dashboard;