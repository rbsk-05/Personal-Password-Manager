import React from "react";
import { useNavigate } from "react-router-dom";

export default function AccessPage() {
  const navigate = useNavigate();

  function handleEnter() {
    // later: perform real access checks here
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-md w-full bg-gray-800/70 p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">🔐 Personal Password Manager</h1>
        <p className="text-gray-400 mb-8">Your single secure access point</p>

        <button
          onClick={handleEnter}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          Enter Securely
        </button>

        <p className="text-sm text-gray-500 mt-4">
          (Simulated access — no authentication yet)
        </p>
      </div>
    </div>
  );
}
