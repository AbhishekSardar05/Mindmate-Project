import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/journal.css";

const API = "http://localhost:5000/api/journal";
const moodOptions = ["happy", "sad", "stressed", "relaxed"];

export default function JournalPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ text: "", mood: "happy", tags: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const fetchEntries = async () => {
    const res = await fetch(API, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API}/${editingId}` : API;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) })
      });
      if (!res.ok) throw new Error((await res.json()).msg);
      setForm({ text: "", mood: "happy", tags: "" });
      setEditingId(null);
      fetchEntries();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = entry => {
    setEditingId(entry._id);
    setForm({ text: entry.text, mood: entry.mood, tags: entry.tags.join(", ") });
  };
  const handleDelete = async id => {
    await fetch(`${API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    fetchEntries();
  };

  return (
    <section className="journal-container">
      <form className="journal-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Entry" : "New Journal Entry"}</h2>
        <textarea name="text" required placeholder="Write your thoughts..." value={form.text} onChange={handleChange} rows={4} />
        <div>
          <label>Mood:
            <select name="mood" value={form.mood} onChange={handleChange}>{moodOptions.map(m => <option key={m}>{m}</option>)}</select>
          </label>
          <label>Tags:
            <input name="tags" placeholder="Tags, comma separated" value={form.tags} onChange={handleChange} />
          </label>
        </div>
        {error && <div className="error">{error}</div>}
        <button className="btn-primary" type="submit">{editingId ? "Update" : "Add"} Entry</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ text: "", mood: "happy", tags: "" }); }}>Cancel Edit</button>}
      </form>
      <div className="journal-history">
        <h3>Past Entries</h3>
        <ul>
          {entries.map(e => (
            <li key={e._id}>
              <strong>{new Date(e.date).toLocaleDateString()}</strong> <span className={`mood-tag mood-${e.mood}`}>{e.mood}</span>
              <div>{e.text}</div>
              <div className="tags">{e.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <button onClick={() => handleEdit(e)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(e._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
