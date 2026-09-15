function Tasks({ tasks }) {
    return (
        <div className="tasks-page">
            <h1>Tasks Page</h1>

            <p>View and manage all your tasks.</p>

            <div className="tasks-list">
                {tasks.map((task) => (
                    <div className="task-item" key={task.id}>
                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <p className="status">
                            Status: {task.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tasks;