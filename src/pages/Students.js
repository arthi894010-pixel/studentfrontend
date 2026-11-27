import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Students() {

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [editId, setEditId] = useState(null);

    // Get all students
    const getStudents = async () => {

        try {

            const response = await API.get("/students");

            setStudents(response.data);

        } catch (error) {

            alert("Unable to load students");

        }
    };

    useEffect(() => {

        getStudents();

    }, []);

    // Clear form
    const clearForm = () => {

        setName("");
        setEmail("");
        setCourse("");
        setPhone("");
        setAddress("");

        setEditId(null);
    };

    // Add or Update student
    const handleSubmit = async (e) => {

        e.preventDefault();

        const student = {
            name,
            email,
            course,
            phone,
            address
        };

        try {

            if (editId) {

                await API.put(`/students/${editId}`, student);

                alert("Student updated successfully");

            } else {

                await API.post("/students", student);

                alert("Student added successfully");

            }

            clearForm();

            getStudents();

        } catch (error) {

            alert("Unable to save student");

        }
    };

    // Edit student
    const handleEdit = (student) => {

        setEditId(student.id);

        setName(student.name);
        setEmail(student.email);
        setCourse(student.course);
        setPhone(student.phone);
        setAddress(student.address);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Delete student
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (confirmDelete) {

            try {

                await API.delete(`/students/${id}`);

                alert("Student deleted successfully");

                getStudents();

            } catch (error) {

                alert("Unable to delete student");

            }
        }
    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2>Student Management</h2>

                {/* Add / Update Form */}

                <div className="card p-4 mt-3">

                    <h4>
                        {editId ? "Edit Student" : "Add New Student"}
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Student Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Course"
                                    value={course}
                                    onChange={(e) => setCourse(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <input
                                    className="form-control"
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <textarea
                                    className="form-control"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />

                            </div>

                        </div>

                        <button type="submit" className="btn btn-success me-2">

                            {editId ? "Update Student" : "Add Student"}

                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={clearForm}
                        >
                            Clear
                        </button>

                    </form>

                </div>

                {/* Student List */}

                <div className="mt-5">

                    <h4>Student List</h4>

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped mt-3">

                            <thead className="table-dark">

                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {students.map((student, index) => (

                                    <tr key={student.id}>

                                        <td>{index + 1}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.course}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.address}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(student)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                                {students.length === 0 && (

                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No Students Found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Students;