require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is working!!");
});

app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed To Fetch Tasks"
        });
    }
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({
            message: "Invalid Task ID"
        });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || "Pending"
        });

        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({
            message: "Failed To Add Task"
        });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(400).json({
            message: "Failed To Update Task"
        });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed To Delete Task"
        });
    }
});

async function startServer() {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(
            process.env.MONGODB_URL,
            {
                serverSelectionTimeoutMS: 10000
            }
        );

        console.log("MongoDB Connected Successfully");

        app.listen(5000, () => {
            console.log("Server Is Running On Port 5000");
        });
    } catch (error) {
        console.log("MongoDB Connection Failed:");
        console.log(error.message);
    }
}

startServer();