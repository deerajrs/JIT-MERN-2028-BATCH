require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Task = require("./models/Task");
const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Backend is working!!");
});


app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please enter name, email and password"
            });
        }

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        res.status(500).json({
            message: "Registration Failed"
        });
    }
});


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password"
            });
        }

        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Login Failed"
        });
    }
});


app.get("/api/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password -resetPasswordToken -resetPasswordExpires");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user: user
        });

    } catch (error) {
        console.log("PROFILE ERROR:", error);

        res.status(500).json({
            message: "Failed to get profile"
        });
    }
});


app.post("/api/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please enter your email"
            });
        }

        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        const resetTokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = resetTokenHash;

        user.resetPasswordExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        res.json({
            message: "Password reset token generated",
            resetToken: resetToken
        });

    } catch (error) {
        console.log("FORGOT PASSWORD ERROR:", error);

        res.status(500).json({
            message: "Forgot Password Failed"
        });
    }
});


app.post("/api/reset-password/:token", async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: "Please enter a new password"
            });
        }

        const resetTokenHash = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        user.resetPasswordToken = undefined;

        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({
            message: "Password Reset Successfully"
        });

    } catch (error) {
        console.log("RESET PASSWORD ERROR:", error);

        res.status(500).json({
            message: "Password Reset Failed"
        });
    }
});


app.get("/api/tasks", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({
            userId: req.user.userId
        });

        res.json(tasks);

    } catch (error) {
        console.log("GET TASKS ERROR:", error);

        res.status(500).json({
            message: "Failed To Fetch Tasks"
        });
    }
});


app.get("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {
        console.log("GET TASK ERROR:", error);

        res.status(400).json({
            message: "Invalid Task ID"
        });
    }
});


app.post("/api/tasks", authMiddleware, async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || "Pending",
            userId: req.user.userId
        });

        res.status(201).json(newTask);

    } catch (error) {
        console.log("ADD TASK ERROR:", error);

        res.status(500).json({
            message: "Failed To Add Task"
        });
    }
});


app.put("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.userId
            },
            {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            },
            {
                returnDocument: "after"
            }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(task);

    } catch (error) {
        console.log("UPDATE TASK ERROR:", error);

        res.status(400).json({
            message: "Failed To Update Task"
        });
    }
});


app.delete("/api/tasks/:id", authMiddleware, async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });

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
        console.log("DELETE TASK ERROR:", error);

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