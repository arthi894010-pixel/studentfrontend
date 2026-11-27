import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function ProtectedRoute({ children }) {

    const user = localStorage.getItem("user");

    return user ? children : <Navigate to="/" />;

}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;