import React, { useEffect, useState } from "react";
import AddCredentialModal from "../components/AddCredentialModal"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [credentials, setCredentials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState(new Set());

  // ✅ Get userId after login from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch all credentials
  const fetchCredentials = async () => {
    if (!userId) return; // safety check

    try {
      const res = await fetch(`http://localhost:5000/api/credentials/${userId}`);
      const data = await res.json();
      if (res.ok) {
        setCredentials(data);
      } else {
        setToastMessage(data.error || "Failed to fetch credentials");
        setTimeout(() => setToastMessage(""), 2000);
      }
    } catch (err) {
      console.error("Error fetching credentials:", err);
      setToastMessage("Server error. Try again later.");
      setTimeout(() => setToastMessage(""), 2000);
    }
  };

  useEffect(() => {
    if (userId) fetchCredentials();
  }, [userId]);

  // Delete credential
  const handleDelete = async (id) => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/credentials/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCredentials(credentials.filter((c) => c._id !== id));
        setToastMessage("🗑️ Credential deleted successfully!");
      } else {
        const data = await res.json();
        setToastMessage(data.error || "❌ Failed to delete credential");
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Server error. Try again later.");
    } finally {
      setTimeout(() => setToastMessage(""), 2000);
    }
  };

  // Edit credential
  const handleEdit = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    const updated = new Set(visiblePasswords);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    setVisiblePasswords(updated);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>My Locker</h1>
        <button
          className="add-btn"
          onClick={() => {
            setEditData(null);
            setShowModal(true);
          }}
        >
          + Add Credential
        </button>
      </header>

      {toastMessage && <div className="toast-message">{toastMessage}</div>}

      {/* Modal for Add/Edit */}
      {showModal && userId && (
        <AddCredentialModal
          editData={editData}
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          onSaved={fetchCredentials}
          userId={userId} // pass safely
        />
      )}

      <div className="password-list">
        {credentials.length > 0 ? (
          credentials.map((item) => (
            <div className="password-card" key={item._id}>
              <div className="card-header">
                <h2>{item.title}</h2>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(item)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>🗑️</button>
                </div>
              </div>

              <div className="card-body">
                {item.type === "website" && (
                  <>
                    <p><strong>Website:</strong> {item.website}</p>
                    <p><strong>Email:</strong> {item.email}</p>
                  </>
                )}

                <p>
                  <strong>Password:</strong>{" "}
                  {visiblePasswords.has(item._id) ? item.password : "••••••••"}
                  <button className="toggle-btn" onClick={() => togglePasswordVisibility(item._id)}>
                    {visiblePasswords.has(item._id) ? "🙈" : "👁️"}
                  </button>
                </p>

                {item.notes && <p className="notes"><strong>Notes:</strong> {item.notes}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="empty-text">No credentials stored yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
