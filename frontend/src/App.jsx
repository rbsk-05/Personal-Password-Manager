// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessPage from "./pages/AccessPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccessPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
