import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workspace/:baseId/:tableId" element={<Workspace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
