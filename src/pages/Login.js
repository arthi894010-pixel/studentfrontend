import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            alert("Login successful");

            navigate("/dashboard");

        } catch (error) {

            alert(error.response?.data?.message || "Invalid login details");

        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Student Management</h2>
                <p>Login to your account</p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>

                </form>

                <p>
                    Don't have an account?
                    <Link to="/signup"> Sign Up</Link>
                </p>

            </div>

        </div>
    );
}

export default Login;