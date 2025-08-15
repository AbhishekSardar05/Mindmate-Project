import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";

export default function LandingPage() {
  return (
    <section className="landing-container">
      <div className="intro">
        <h1>Welcome to MindMate</h1>
        <p>Your companion for emotional wellness, daily journaling, and mental support.</p>
        <ul className="features-list">
          <li>🌈 AI Chat Support</li>
          <li>📝 Secure Journaling</li>
          <li>📊 Mood Tracking & Insights</li>
          <li>🔒 Privacy-first & Customizable Themes</li>
        </ul>
        <div className="cta-buttons">
          <Link to="/login" className="btn-primary">Log In</Link>
          <Link to="/signup" className="btn-secondary">Sign Up Free</Link>
        </div>
      </div>
      <div className="benefits">
        <h2>Why MindMate?</h2>
        <ul>
          <li>Track your mood patterns and progress visually.</li>
          <li>Get motivation, breathing exercises, and mindful guidance from our AI.</li>
          <li>Manage your privacy and stay in control of your data.</li>
        </ul>
      </div>
    </section>
  );
}
