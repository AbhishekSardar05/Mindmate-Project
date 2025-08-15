import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import "../styles/profile.css";

const API = "http://localhost:5000/api/profile";

export default function ProfilePage() {
  const { token, user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user.name, email: user.email, profilePicture: user.profilePicture || "" });
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProfile = async e => {
    e.preventDefault();
    const res = await fetch(API, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setUser({ ...user, ...form });
      setMsg("Profile updated!");
    }
  };

  const handlePassword = async e => {
    e.preventDefault();
    if (password.length < 6) return setMsg("Password too short");
    const res = await fetch(`${API}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ password })
    });
    if (res.ok) setMsg("Password changed!");
  };

  return (
    <section className="profile-container">
      <form className="profile-form" onSubmit={handleProfile}>
        <h2>Profile</h2>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="profilePicture" value={form.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" />
        <button className="btn-primary" type="submit">Update Profile</button>
      </form>
      <form className="profile-form" onSubmit={handlePassword}>
        <h3>Change Password</h3>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" />
        <button className="btn-secondary" type="submit">Change Password</button>
      </form>
      {msg && <div>{msg}</div>}
    </section>
  );
}
