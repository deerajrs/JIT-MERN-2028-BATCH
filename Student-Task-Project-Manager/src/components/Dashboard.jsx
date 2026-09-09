import StatCard from "./StatCard";
import TaskCard from "./TaskCard";

function DashBoard() {

    const tasks = [
        {
            id: 1,
            title: "Learn React",
            description: "Understanding Components",
            status: "In Progress"
        },
        {
            id: 2,
            title: "Learn JavaScript",
            description: "Understanding Async/Await",
            status: "Completed"
        },
        {
            id: 3,
            title: "Build MERN Project",
            description: "Create a full-stack application",
            status: "Not Started"
        },
        {
            id: 4,
            title: "Learn MongoDB",
            description: "Understanding Database and CRUD Operations",
            status: "Not Started"
        }
    ];

    return (
        <main>

            <div className="stats-container">
                <StatCard title="Total Tasks" value="4" />
                <StatCard title="Completed" value="1" />
                <StatCard title="Pending" value="3" />
            </div>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">

                {tasks.map((task) => (
                    <TaskCard key={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                    />
                ))}

            </div>

        </main>
    );
}

export default DashBoard;