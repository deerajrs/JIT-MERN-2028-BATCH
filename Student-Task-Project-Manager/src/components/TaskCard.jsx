function TaskCard(props) {
    return (
        <div className="task-card">
            <h3>{props.title}</h3>

            <p>{props.description}</p>

            <p> {props.status}</p>
        </div>
    );
}

export default TaskCard;