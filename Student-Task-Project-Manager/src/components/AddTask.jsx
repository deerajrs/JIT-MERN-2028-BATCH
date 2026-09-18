import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    async function handleAddTask() {
        if (!title || !description) {
            alert("Please enter title and description");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        status: "Pending"
                    })
                }
            );

            const data = await response.json();

            console.log("Add Task Response:", data);

            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                alert("Session expired. Please login again.");
                navigate("/login");
                return;
            }

            if (!response.ok) {
                alert(data.message || "Failed to add task");
                return;
            }

            onAddTask(data);

            setTitle("");
            setDescription("");

            alert("Task added successfully!");

        } catch (error) {
            console.error("Add Task Error:", error);
            alert("Unable to connect to backend");
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

            <input
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <button onClick={handleAddTask}>
                Add Task
            </button>
        </div>
    );
}

export default AddTask;