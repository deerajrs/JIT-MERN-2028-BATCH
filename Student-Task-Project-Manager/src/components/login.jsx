import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter email and password");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login Response:", data);

            if (!response.ok) {
                setMessage(
                    data.message || "Login failed"
                );
                return;
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            console.log(
                "Token stored:",
                localStorage.getItem("token")
            );

            setMessage("Login successful!");

            setTimeout(() => {
                navigate("/");
            }, 500);

        } catch (error) {
            console.error("Login Error:", error);
            setMessage("Unable to connect to backend");
        }
    }

    return (
        <div className="login-container">

            <div className="login-box">

                <h1>Welcome Back</h1>

                <p>Login to your Student Task Portal</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

                {message && (
                    <p className="login-message">
                        {message}
                    </p>
                )}

                <p className="login-link">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;