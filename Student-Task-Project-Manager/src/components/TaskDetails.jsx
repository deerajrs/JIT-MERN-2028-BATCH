import { useParams } from "react-router-dom";

function TaskDetails({ tasks }) {
    const { id } = useParams();

    const task = tasks.find(
        (task) => task.id === Number(id)
    );
    if(!task){
        return <h2> Task Not Found! </h2>
    }

    return (
        <div>
            <h1>Task Details</h1>

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>
        </div>
    );
}

export default TaskDetails;