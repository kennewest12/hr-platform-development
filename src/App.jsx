import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
// import components and pages
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Change the "/" path to point to Admin instead of Login */}
        {/* When the app starts, go straight to Admin is is Temporary i will switch back to login when dashboard is completed */}
        <Route path="/" element={<Navigate to="/admin" />} />

        {/* The Login Page */}
        <Route path="/login" element={<Login />} />

        {/* The Main Dashboard */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
