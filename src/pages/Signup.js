import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post("/auth/signup", {
                name,
                email,
                password
            });

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            alert(error.response?.data?.message || "Signup failed");

        }
    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Create Account</h2>
                <p>Register your account</p>

                <form onSubmit={handleSignup}>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                    />

                    <button type="submit">Sign Up</button>

                </form>

                <p>
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;