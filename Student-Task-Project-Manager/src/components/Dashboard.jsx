import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    async function toggleTask(id) {
        const task = tasks.find(
            (task) => task._id === id
        );

        if (!task) {
            return;
        }

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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Update failed"
                );
            }

            setTasks(
                tasks.map((task) => {
                    if (task._id === id) {
                        return data;
                    }

                    return task;
                })
            );
        } catch (error) {
            console.error("Update error:", error);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Delete failed"
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
        setTasks([
            ...tasks,
            newTask
        ]);
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

            <AddTask
                onAddTask={addTask}
            />

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {tasks.map((task) => (
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
                ))}
            </div>
        </main>
    );
}

export default Dashboard;