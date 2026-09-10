function TaskCard({ title, description, status, onToggle }) {

    return (
        <div className="task-card">

            <h3>{title}</h3>

            <p>{description}</p>

            <p>Status: {status}</p>

            <button onClick={onToggle}>
                Mark as {status === "Completed" ? "Pending" : "Completed"}
            </button>

        </div>
    );
}

export default TaskCard;