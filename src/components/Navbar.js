import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import "../styles/navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo"><Link to="/">MindMate</Link></div>
      <ul>
        {token ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/mood-tracker">Mood Tracker</Link></li>
            <li><Link to="/chatbot">AI Chat</Link></li>
            <li><Link to="/insights">Insights</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
