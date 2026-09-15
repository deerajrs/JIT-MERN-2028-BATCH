
import { useState } from "react";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleAddTask() {
        const newTask = {
            title: title,
            description: description,
            status: "pending"
        };

        console.log("object:", newTask);

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            const data = await response.json();

            console.log("Response:", data);

            // Send the newly created task to App.jsx
            props.onAddTask(data);

            // Clear input fields
            setTitle("");
            setDescription("");

        } catch (error) {
            console.error("Error adding task:", error);
        }
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

            <br />

            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br />

            <button onClick={handleAddTask}>
                Add Task
            </button>

            <p>Current title: {title}</p>

            <p>Current description: {description}</p>

        </div>
    );
}

export default AddTask;

