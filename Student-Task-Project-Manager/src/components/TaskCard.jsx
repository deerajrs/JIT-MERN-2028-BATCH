import { Link } from "react-router-dom";

function TaskCard({ id, title, description, status, onToggle, onDelete }) {

    return (
        <div className="task-card">

            <h3>{title}</h3>

            <p>{description}</p>

            <p>Status: {status}</p>

            <button onClick={onToggle}>
                Mark as {status === "Completed" ? "Pending" : "Completed"}
            </button>

            <button onClick={onDelete}>
                Delete
            </button>

            <Link to={`/tasks/${id}`}>
                View Details
            </Link>

        </div>
    );
}

export default TaskCard;