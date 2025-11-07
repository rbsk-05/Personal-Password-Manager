import React, { useState } from "react";
import "./AddPasswordModal.css";

const AddPasswordModal = ({ onClose, onSaved, editData }) => {
  const [formData, setFormData] = useState(
    editData || { website: "", email: "", password: "", notes: "" }
  );
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!formData.website || !formData.email || !formData.password) {
      alert("Please fill all required fields");
      return;
    }

    const url = editData
      ? `http://localhost:5000/api/passwords/${editData._id}` // PUT for edit
      : "http://localhost:5000/api/passwords/add";           // POST for new

    const method = editData ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage(editData ? "✏️ Password updated!" : "✅ Account saved!");
      setTimeout(() => {
        setMessage("");
        onSaved();  // refresh dashboard
        onClose();  // close modal
      }, 1000);
    } else {
      setMessage("❌ Failed to save password");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editData ? "Edit Password" : "Add New Password"}</h2>

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        {message && <p className="message-popup">{message}</p>}

        <div className="modal-actions">
          <button onClick={handleSave}>{editData ? "Update" : "Save"}</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordModal;

