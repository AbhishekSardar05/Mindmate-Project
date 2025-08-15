import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/auth";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name || "User"}!</h2>
      <div className="dashboard-links">
        <Link to="/journal" className="dashboard-link">📝 Journal</Link>
        <Link to="/mood-tracker" className="dashboard-link">🌈 Mood Tracker</Link>
        <Link to="/chatbot" className="dashboard-link">🤖 AI Chat</Link>
        <Link to="/insights" className="dashboard-link">📈 Insights</Link>
      </div>
    </div>
  );
}
