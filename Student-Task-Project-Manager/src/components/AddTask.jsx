import { useState } from "react";

function AddTask(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function handleAddTask() {

        props.onAddTask({
            title: title,
            description: description
        });

        setTitle("");
        setDescription("");
    }

    return (
        <div className="add-task">

            <h2>Add Task</h2>

            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>

            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br></br>

            <button onClick={handleAddTask}>
                Add Task
            </button>
            

            <p>Current title: {title}</p>
           

            <p>Current description: {description}</p>
            

        </div>
    );
}

export default AddTask;