import React, { useState } from "react";

const VaultLoginModal = ({ onClose }) => {
  const [passphrase, setPassphrase] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = () => {
    if (passphrase.toLowerCase() === "open sesame") {
      setStatus("✅ Access Granted");
      setTimeout(() => onClose(), 1500);
    } else {
      setStatus("❌ Incorrect Passphrase");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Vault Access</h2>
        <input
          type="text"
          placeholder="Enter your passphrase..."
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />
        <button onClick={handleLogin}>Unlock</button>
        {status && <p className="status-text">{status}</p>}
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default VaultLoginModal;
