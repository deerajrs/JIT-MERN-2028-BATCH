import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function TaskDetails() {

    const { id } = useParams();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`http://localhost:5000/api/tasks/${id}`)

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Task Not Found");
                }

                return response.json();
            })

            .then((data) => {
                setTask(data);
            })

            .catch((error) => {
                console.log(error);
                setTask(null);
            })

            .finally(() => {
                setLoading(false);
            });

    }, [id]);


    if (loading) {
        return <h2>Loading......</h2>;
    }


    if (!task) {
        return <h2>Task Not Found!</h2>;
    }


    return (
        <div>
            <h1>Task Details</h1>

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
                Status: {task.status}
            </p>
        </div>
    );
}

export default TaskDetails;