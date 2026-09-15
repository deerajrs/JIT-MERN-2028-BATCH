// Bring Express in Node.js
const express = require("express");
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Tasks
const tasks = [
    {
        id: 1,
        title: "Learn React",
        description: "Understanding Components",
        status: "Completed"
    },
    {
        id: 2,
        title: "Learn JavaScript",
        description: "Understanding Async/Await",
        status: "Pending"
    },
    {
        id: 3,
        title: "Learn MongoDB",
        description: "Database",
        status: "Completed"
    }
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// GET single task by ID
app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

// Testing backend
app.get("/", (req, res) => {
    res.send("Backend is working!!");
});

// POST - Add new task
app.post("/api/tasks", (req, res) => {

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || "Pending"
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// DELETE - Delete task
app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex(
        (task) => task.id === id
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Start server
app.listen(5000, () => {
    console.log("Server Is Running On Port 5000");
});