import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"
  const [authForm, setAuthForm] = useState({ email: "", password: "", name: "" });
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setProfile(res.data.user);
          setForm(res.data.user);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        localStorage.removeItem("token");
        console.error("Failed to fetch profile:", err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);
  // Handle login/signup form changes
  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        email: authForm.email,
        password: authForm.password
      });
      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.reload();
      } else {
        setAuthError(res.data.message || "Login failed");
      }
    } catch (err) {
      setAuthError("Login failed. Please check your credentials.");
              console.error("Failed to fetch profile:", err);

    }
    setLoading(false);
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
        name: authForm.name,
        email: authForm.email,
        password: authForm.password
      });
      if (res.data.success) {
        setAuthMode("login");
        setAuthError("Signup successful! Please login.");
      } else {
        setAuthError(res.data.message || "Signup failed");
      }
    } catch (err) {
      setAuthError("Signup failed. Please try again.");
              console.error("Failed to fetch profile:", err);

    }
    setLoading(false);
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // You may want to send this to a dedicated upload endpoint
    // For now, just set the preview
    setForm({ ...form, profilePicture: URL.createObjectURL(file) });
  };

  // Save profile
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setProfile(res.data.user);
        setEditMode(false);
      }
    } catch (err) {
      alert("Failed to update profile. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  // If not authenticated, show login/signup forms
  if (!localStorage.getItem("token") || !profile.name) {
    return (
      <div className="auth-container">
        <h2>{authMode === "login" ? "Login" : "Sign Up"}</h2>
        <form onSubmit={authMode === "login" ? handleLogin : handleSignup}>
          {authMode === "signup" && (
            <input
              name="name"
              value={authForm.name}
              onChange={handleAuthChange}
              placeholder="Name"
              required
            />
          )}
          <input
            name="email"
            type="email"
            value={authForm.email}
            onChange={handleAuthChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={authForm.password}
            onChange={handleAuthChange}
            placeholder="Password"
            required
          />
          <button type="submit">{authMode === "login" ? "Login" : "Sign Up"}</button>
        </form>
        {authError && <p style={{ color: "red" }}>{authError}</p>}
        <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}>
          {authMode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    );
  }

  // Authenticated: show profile UI
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <img
        src={form.profilePicture || "https://via.placeholder.com/150"}
        alt="Profile"
        style={{ width: 150, height: 150, borderRadius: "50%" }}
      />
      {editMode ? (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
          <input name="email" value={form.email || ""} onChange={handleChange} placeholder="Email" disabled />
          <input name="address" value={form.address || ""} onChange={handleChange} placeholder="Address" />
          <input name="phone" value={form.phone || ""} onChange={handleChange} placeholder="Phone" />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Address: {profile.address}</p>
          <p>Phone: {profile.phone}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default MyProfile;
