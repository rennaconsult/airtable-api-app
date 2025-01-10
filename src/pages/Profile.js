import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey, removeApiKey } from "../features/apiSlice";

function Profile() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.api.apiKey);
  const apiKeys = useSelector((state) => state.api.apiKeys);
  const [showFullCurrentKey, setShowFullCurrentKey] = useState(false);
  const [showFullKey, setShowFullKey] = useState(null);
  const [newApiKey, setNewApiKey] = useState("");

  const handleSaveKey = () => {
    if (newApiKey.trim()) {
      dispatch(setApiKey(newApiKey));
      setNewApiKey("");
      alert("API Key Saved and Set as Default!");
    } else {
      alert("Please enter a valid API key.");
    }
  };

  // Utility function to mask API keys
  const maskKey = (key) => {
    if (key.length <= 6) return "*".repeat(key.length); // Mask short keys completely
    return `${key.substring(0, 3)}...${key.substring(key.length - 3)}`; // Show first 3 and last 3 chars
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Profile</h2>
      <p>Manage your Airtable API keys here.</p>

      <div style={{ marginBottom: "20px" }}>
        <h3>Current API Key:</h3>
        <code>
          {showFullCurrentKey
            ? apiKey
            : apiKey
            ? maskKey(apiKey)
            : "No API key set yet."}
        </code>
        {apiKey && (
          <button
            onClick={() => setShowFullCurrentKey(!showFullCurrentKey)}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              color: "white",
              backgroundColor: "blue",
              border: "none",
            }}
          >
            {showFullCurrentKey ? "Hide" : "Reveal"}
          </button>
        )}
      </div>

      <div>
        <h3>Add a New API Key</h3>
        <input
          type="text"
          placeholder="Enter Airtable API Key"
          value={newApiKey}
          onChange={(e) => setNewApiKey(e.target.value)}
          style={{ width: "300px", padding: "10px", margin: "10px 0" }}
        />
        <br />
        <button onClick={handleSaveKey} style={{ padding: "10px 20px" }}>
          Save API Key
        </button>
      </div>

      <div>
        <h3>All Saved API Keys</h3>
        <ul>
          {apiKeys.map((key, index) => (
            <li key={index}>
              {showFullKey === index ? key : maskKey(key)}{" "}
              {/* Toggle masked or full key */}
              <button
                onClick={() =>
                  setShowFullKey(showFullKey === index ? null : index)
                }
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  color: "white",
                  backgroundColor: "blue",
                  border: "none",
                }}
              >
                {showFullKey === index ? "Hide" : "Reveal"}
              </button>
              <button
                onClick={() => dispatch(removeApiKey(key))}
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

export default Profile;
