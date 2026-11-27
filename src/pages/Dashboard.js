import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2>Welcome, {user?.name}</h2>

                <p>Manage your student information here.</p>

                <div className="row mt-4">

                    <div className="col-md-4">

                        <div className="card dashboard-card p-4">

                            <h4>Student Management</h4>

                            <p>
                                Add, edit, update and delete student records.
                            </p>

                            <Link
                                to="/students"
                                className="btn btn-primary"
                            >
                                Manage Students
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Dashboard;