import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {

    async function toggleTask(id) {

        const task = props.tasks.find(
            (task) => task.id === id
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

            console.log("Update response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update task"
                );
            }

            props.setTasks(
                props.tasks.map((task) => {

                    if (task.id === id) {
                        return {
                            ...task,
                            status: newStatus
                        };
                    }

                    return task;
                })
            );

        } catch (error) {

            console.error(
                "Update error:",
                error
            );

        }
    }


    function addTask(newTask) {

        props.setTasks([
            ...props.tasks,
            newTask
        ]);
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

            console.log(
                "Delete response:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete task"
                );
            }

            props.setTasks(
                props.tasks.filter(
                    (task) => task.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

        }
    }


    const totalTasks =
        props.tasks.length;


    const completedTasks =
        props.tasks.filter(
            (task) =>
                task.status === "Completed"
        ).length;


    const pendingTasks =
        props.tasks.filter(
            (task) =>
                task.status === "Pending" ||
                task.status === "pending"
        ).length;


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

                {props.tasks.map((task) => (

                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                        onToggle={() =>
                            toggleTask(task.id)
                        }
                        onDelete={() =>
                            deleteTask(task.id)
                        }
                    />

                ))}

            </div>

        </main>
    );
}

export default Dashboard;