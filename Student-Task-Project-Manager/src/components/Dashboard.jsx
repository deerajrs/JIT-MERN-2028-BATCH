import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useState } from "react";

function DashBoard() {

    const [tasks, setTasks] = useState([
        {
            id: 1,
            topic: "Learn React",
            description: "Understanding Components",
            status: "Completed"
        },
        {
            id: 2,
            topic: "Learn JavaScript",
            description: "Understanding Async/Await",
            status: "Pending"
        },
        {
            id: 3,
            topic: "Learn MongoDB",
            description: "Database",
            status: "Completed"
        },
        {
            id: 4,
            topic: "Learn SQL",
            description: "Database",
            status: "Completed"
        }
    ]);

    function toggleTask(id) {

        setTasks(
            tasks.map((task) => {

                if (task.id === id) {

                    return {
                        ...task,
                        status:
                            task.status === "Completed"
                                ? "Pending"
                                : "Completed"
                    };
                }

                return task;
            })
        );
    }

    function addTask(newTask) {

        setTasks([
            ...tasks,
            {
                id: tasks.length + 1,
                topic: newTask.title,
                description: newTask.description,
                status: "Pending"
            }
        ]);
    }

    return (
        <main>

            <div className="stats-container">

                <StatCard
                    title="Total Tasks"
                    value={tasks.length}
                />

                <StatCard
                    title="Completed"
                    value={
                        tasks.filter(
                            (task) => task.status === "Completed"
                        ).length
                    }
                />

                <StatCard
                    title="Pending"
                    value={
                        tasks.filter(
                            (task) => task.status === "Pending"
                        ).length
                    }
                />

            </div>

            <AddTask onAddTask={addTask} />

            <h2>Recent Tasks</h2>

            <div className="tasks-container">

                {tasks.map((task) => (

                    <TaskCard
                        key={task.id}
                        title={task.topic}
                        description={task.description}
                        status={task.status}
                        onToggle={() => toggleTask(task.id)}
                    />

                ))}

            </div>

        </main>
    );
}

export default DashBoard;