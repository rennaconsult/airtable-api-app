import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBase, removeBase } from "../features/apiSlice";

function Home() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.api.apiKey);
  const bases = useSelector((state) => state.api.bases);
  const [baseId, setBaseId] = useState("");
  const [baseName, setBaseName] = useState("");

  const handleAddBase = () => {
    if (!apiKey) {
      alert("Please set an API key in the Profile page first.");
      return;
    }
    if (baseId.trim() && baseName.trim()) {
      dispatch(addBase({ id: baseId, name: baseName }));
      setBaseId("");
      setBaseName("");
      alert("Base added successfully!");
    } else {
      alert("Please provide both Base ID and Name.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Bases</h2>
      <p>Use this page to add new Airtable Bases to your app.</p>

      {/* Form to Add a New Base */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Add a New Base</h3>
        <input
          type="text"
          placeholder="Enter Base ID"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          style={{ width: "300px", padding: "10px", margin: "10px 0" }}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Base Name"
          value={baseName}
          onChange={(e) => setBaseName(e.target.value)}
          style={{ width: "300px", padding: "10px", margin: "10px 0" }}
        />
        <br />
        <button onClick={handleAddBase} style={{ padding: "10px 20px" }}>
          Add Base
        </button>
      </div>

      {/* List of Added Bases */}
      <div>
        <h3>Your Bases</h3>
        <ul>
          {bases.map((base) => (
            <li key={base.id}>
              {base.name} (ID: {base.id})
              <Link
                to={`/base/${base.id}`}
                style={{ marginLeft: "10px", color: "blue" }}
              >
                View Tables
              </Link>
              <button
                onClick={() => dispatch(removeBase(base.id))}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "red",
                  border: "none",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
