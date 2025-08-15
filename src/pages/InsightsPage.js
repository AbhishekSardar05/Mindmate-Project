import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/insights.css";

export default function InsightsPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/journal', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setEntries);
    fetch('http://localhost:5000/api/mood', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setMoods);
  }, []);

  const moodFreq = moods.reduce((acc, m) => ({ ...acc, [m.mood]: (acc[m.mood] || 0) + 1 }), {});
  const journalDays = new Set(entries.map(e => new Date(e.date).toLocaleDateString())).size;

  let aiTip = "Keep writing! Regular journaling boosts your wellbeing.";
  if (moodFreq.stressed > moodFreq.happy) aiTip = "Consider some deep breathing if feeling stressed frequently.";

  return (
    <section className="insights-container">
      <h2>Insights & Analytics</h2>
      <div className="insight-report">
        <div>
          <strong>Journal days:</strong> {journalDays}
        </div>
        <div>
          <strong>Mood pattern:</strong>
          <ul>{Object.entries(moodFreq).map(([m, c]) => <li key={m}>{m}: {c}</li>)}</ul>
        </div>
        <div className="ai-tip">
          <span>🤖 AI Tip: {aiTip}</span>
        </div>
      </div>
    </section>
  );
}
