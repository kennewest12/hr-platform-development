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
        {/* When the app starts, go straight to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* The Login Page */}
        <Route path="/login" element={<Login />} />

        {/* The Main Dashboard */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
