import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/mood.css";

function MoodChart({ data }) {
  const moodCounts = data.reduce((acc, m) => {
    acc[m.mood] = (acc[m.mood] || 0) + 1;
    return acc;
  }, {});
  const moods = ["happy", "sad", "stressed", "relaxed"];
  return (
    <div className="mood-chart">
      {moods.map(m => (
        <div key={m}>
          <strong>{m}:</strong>
          <div className="bar" style={{ width: (moodCounts[m] || 0) * 20 + "px" }}>{moodCounts[m] || 0}</div>
        </div>
      ))}
    </div>
  );
}

export default function MoodTrackerPage() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);
  const [mood, setMood] = useState("happy");

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:5000/api/mood", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setHistory(data);
  };
  useEffect(() => { fetchHistory(); }, []);

  const addMood = async e => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ mood })
    });
    fetchHistory();
  };

  return (
    <section className="mood-tracker">
      <h2>Mood Tracker</h2>
      <form onSubmit={addMood}>
        <label>
          Today's mood:
          <select value={mood} onChange={e => setMood(e.target.value)}>
            <option>happy</option>
            <option>sad</option>
            <option>stressed</option>
            <option>relaxed</option>
          </select>
        </label>
        <button className="btn-primary">Add Mood</button>
      </form>
      <MoodChart data={history} />
      <h4>Mood History:</h4>
      <ul>
        {history.map((m, i) => (
          <li key={i}>
            {new Date(m.date).toLocaleDateString()}: <span className={`mood-tag mood-${m.mood}`}>{m.mood}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
