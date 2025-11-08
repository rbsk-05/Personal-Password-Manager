import React, { useState } from "react";
import "../styles/AccessPage.css";

const AccessPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", passphrase: "" });
  const [loginPass, setLoginPass] = useState("");
  const [message, setMessage] = useState("");

  const handleVaultClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setShowLogin(true);
    }, 1200); // matches animation time
  };

  // ✅ Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! ✅ You can now unlock your vault.");
        setTimeout(() => {
          setShowRegister(false);
          setMessage("");
        }, 1200);
      } else {
        setMessage(data.error || "Registration failed ❌");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
  };

  // ✅ Login with passphrase
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: loginPass }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Vault unlocked! 🔓 Redirecting...");
        // store user id for credentials dashboard
        localStorage.setItem("userId", data.user._id);
        setTimeout(() => {
          setShowLogin(false);
          window.location.href = "/dashboard"; // redirect to dashboard
        }, 1200);
      } else {
        setMessage(data.error || "Invalid passphrase ❌");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="access-container">
      {/* --- VAULT --- */}
      <div className="vault-center">
        <div
          className={`vault-wheel ${isRotating ? "rotate" : ""}`}
          onClick={handleVaultClick}
        >
          <div className="vault-center-dot"></div>
        </div>
        <div className="vault-handle-third"></div>
      </div>

      {/* --- SIDE PANEL --- */}
      <div className="access-panel">
        <h2>🔐 Secure Vault Console</h2>
        <p>Authorized personnel only</p>
        <button className="access-btn" onClick={() => setShowRegister(true)}>
          New Access Request
        </button>
      </div>

      {/* --- LOGIN MODAL --- */}
      {showLogin && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleLogin}>
            <h2>Enter Passphrase</h2>
            <input
              type="password"
              placeholder="Enter your access passphrase"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              required
            />
            <button className="confirm-btn" type="submit">
              Access Vault
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </button>
            {message && <p className="modal-msg">{message}</p>}
          </form>
        </div>
      )}

      {/* --- REGISTER MODAL --- */}
      {showRegister && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleRegister}>
            <h2>Register New Access</h2>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Create Passphrase"
              name="passphrase"
              value={form.passphrase}
              onChange={(e) => setForm({ ...form, passphrase: e.target.value })}
              required
            />
            <button className="confirm-btn" type="submit">
              Register
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowRegister(false)}
            >
              Cancel
            </button>
            {message && <p className="modal-msg">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default AccessPage;
