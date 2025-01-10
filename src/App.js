import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BaseDetails from "./pages/BaseDetails";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
          <Link to="/" style={{ margin: "0 10px" }}>
            Home
          </Link>
          <Link to="/profile" style={{ margin: "0 10px" }}>
            Profile
          </Link>
        </nav>

        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workspace/:baseId/:tableId" element={<Workspace />} />
          <Route path="/base/:baseId" element={<BaseDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
