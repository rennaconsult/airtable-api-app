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
        <nav className="bg-gray-200 p-4 flex">
          <Link to="/" className="mr-4 text-blue-600 hover:underline">
            Home
          </Link>
          <Link to="/profile" className="mr-4 text-blue-600 hover:underline">
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
