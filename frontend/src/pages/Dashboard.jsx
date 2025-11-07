import React, { useEffect, useState } from "react";
import AddPasswordModal from "../components/AddPasswordModal";
import "./Dashboard.css";

const Dashboard = () => {
  const [passwords, setPasswords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState(new Set());

  // Fetch all passwords
  const fetchPasswords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/passwords/all");
      const data = await res.json();
      setPasswords(data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  // Delete password
  const handleDelete = async (id) => {
  const res = await fetch(`http://localhost:5000/api/passwords/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    setPasswords(passwords.filter((p) => p._id !== id));
    setToastMessage("🗑️ Password deleted successfully!");

    setTimeout(() => setToastMessage(""), 2000); // auto-hide after 2s
  } else {
    setToastMessage("❌ Failed to delete password");
    setTimeout(() => setToastMessage(""), 2000);
  }
};

  // Edit password
  const handleEdit = (item) => {
    setEditData(item); // store the item to edit
    setShowModal(true); // open modal in edit mode
  };

  const togglePasswordVisibility = (id) => {
  const updated = new Set(visiblePasswords);
  if (updated.has(id)) {
    updated.delete(id);
  } else {
    updated.add(id);
  }
  setVisiblePasswords(updated);
};

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Password Manager</h1>
        <button
          className="add-btn"
          onClick={() => {
            setEditData(null); // clear edit data for new entry
            setShowModal(true);
          }}
        >
          + Add Password
        </button>
      </header>

      {toastMessage && <div className="toast-message">{toastMessage}</div>}


      {/* Modal for Add/Edit */}
      {showModal && (
        <AddPasswordModal
          editData={editData}
          onClose={() => { setShowModal(false); setEditData(null); }}
          onSaved={fetchPasswords} // refresh dashboard
        />
      )}

      <div className="password-list">
        {passwords.length > 0 ? (
          passwords.map((item) => (
            <div className="password-card" key={item._id}>
              <div className="card-header">
                <h2>{item.website}</h2>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>🗑️</button>
                </div>
              </div>
              <div className="card-body">
                <p><strong>Email:</strong> {item.email}</p>
                <p>
  <strong>Password:</strong>{" "}
  {visiblePasswords.has(item._id) ? item.password : "••••••••"}
  <button
    className="toggle-btn"
    onClick={() => togglePasswordVisibility(item._id)}
  >
    {visiblePasswords.has(item._id) ? "🙈" : "👁️"}
  </button>
</p>

                {item.notes && (
                  <p className="notes"><strong>Notes:</strong> {item.notes}</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No passwords saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
