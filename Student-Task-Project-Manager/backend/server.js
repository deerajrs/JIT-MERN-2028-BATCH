const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
    },
    {
        id: 4,
        title: "Learn SQL",
        description: "Database Queries",
        status: "Pending"
    }
];

app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(
        (task) => task.id === id
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

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

app.put("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(
        (task) => task.id === id
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    if (req.body.title !== undefined) {
        task.title = req.body.title;
    }

    if (req.body.description !== undefined) {
        task.description = req.body.description;
    }

    if (req.body.status !== undefined) {
        task.status = req.body.status;
    }

    res.json(task);
});

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

    const deletedTask = tasks.splice(
        taskIndex,
        1
    );

    res.json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

app.get("/", (req, res) => {
    res.send("Backend is working!!");
});

app.listen(5000, () => {
    console.log(
        "Server Is Running On Port 5000"
    );
});