import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("user");

        navigate("/");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">

            <Link to="/dashboard" className="navbar-brand">
                Student Management
            </Link>

            <div className="ms-auto">

                <Link
                    to="/students"
                    className="btn btn-outline-light me-3"
                >
                    Students
                </Link>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;