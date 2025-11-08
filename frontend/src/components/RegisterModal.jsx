import React, { useState } from "react";

const RegisterModal = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [keyphrase, setKeyphrase] = useState("");

  const handleRegister = () => {
    alert(`Registered ${username} with keyphrase "${keyphrase}"`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Registration</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Create passphrase"
          value={keyphrase}
          onChange={(e) => setKeyphrase(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
