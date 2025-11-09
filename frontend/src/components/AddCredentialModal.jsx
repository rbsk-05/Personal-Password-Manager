import React, { useState } from "react";
import "./AddCredentialModal.css";

const AddCredentialModal = ({ onClose, onSaved, editData, userId }) => {
  const [formData, setFormData] = useState(
    editData || {
      title: "",
      type: "website",
      website: "",
      email: "",
      password: "",
      notes: "",
    }
  );

  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!userId) {
      setMessage("User not logged in!");
      return;
    }

    // Validate required fields
    if (!formData.title || !formData.password) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.type === "website" && (!formData.website || !formData.email)) {
      alert("Website and email are required for website type.");
      return;
    }

    const url = editData
      ? `http://localhost:5000/api/credentials/${editData._id}`
      : "http://localhost:5000/api/credentials/add";

    const method = editData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(editData ? "Credential updated!" : "Credential saved!");
        setTimeout(() => {
          setMessage("");
          onSaved();
          onClose();
        }, 1000);
      } else {
        setMessage(data.error || "Failed to save credential.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editData ? "Edit Credential" : "Add New Credential"}</h2>

        <label>Type:</label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value, website: "", email: "" })
          }
        >
          <option value="website">Website</option>
          <option value="personal">Personal</option>
        </select>

        <label>Title:</label>
        <input
          type="text"
          placeholder="Title (e.g. Netflix, My Phone)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        {formData.type === "website" && (
          <>
            <label>Website:</label>
            <input
              type="text"
              placeholder="Website (e.g. github.com)"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <label>Email Address:</label>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </>
        )}

        <label>Password / Passcode:</label>
        <input
          type="text"
          placeholder="Password / Passcode"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <label>Notes:</label>
        <textarea
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

export default AddCredentialModal;
