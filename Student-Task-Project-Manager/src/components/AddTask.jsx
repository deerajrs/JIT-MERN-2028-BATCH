import { useState } from "react";

function AddTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleAddTask() {
        if (!title || !description) {
            alert("Please enter title and description");
            return;
        }

        const newTask = {
            title: title,
            description: description,
            status: "Pending"
        };

        try {
            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTask)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add task"
                );
            }

            onAddTask(data);

            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Add task error:", error);
            alert("Failed to add task");
        }
    }

    return (
        <div className="add-task">
            <h2>Add Task</h2>

            <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <br />

            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <br />

            <button onClick={handleAddTask}>
                Add Task
            </button>
        </div>
    );
}

export default AddTask;