import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/settings.css";

const API = "http://localhost:5000/api/profile";

export default function SettingsPage() {
  const { token, user, setUser } = useAuth();
  const [theme, setTheme] = useState(user.theme || "light");
  const [allowAI, setAllowAI] = useState(user.allowAIAnalysis);

  const updateSetting = async fields => {
    await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...fields })
    });
    setUser({ ...user, ...fields });
  };

  return (
    <section className="settings-container">
      <h2>Settings</h2>
      <div className="setting-row">
        <label>
          Theme:
          <select value={theme} onChange={e => { setTheme(e.target.value); updateSetting({ theme: e.target.value }); }}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
      <div className="setting-row">
        <label>
          Allow AI to analyze my journals:
          <input type="checkbox" checked={allowAI} onChange={e => { setAllowAI(e.target.checked); updateSetting({ allowAIAnalysis: e.target.checked }); }} />
        </label>
      </div>
      <div className="privacy-note">
        <strong>Privacy note:</strong> We respect your privacy and never sell your data. You control what the AI can access!
      </div>
    </section>
  );
}
