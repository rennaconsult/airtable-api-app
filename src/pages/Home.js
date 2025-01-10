import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setApiKey } from "../features/apiSlice";

function Home() {
  const [apiKey, setLocalApiKey] = useState("");
  const dispatch = useDispatch();

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      dispatch(setApiKey(apiKey));
      alert("API Key Saved!");
    } else {
      alert("Please enter a valid API key.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Enter Your Airtable API Key</h2>
      <input
        type="text"
        placeholder="Enter Airtable API Key"
        value={apiKey}
        onChange={(e) => setLocalApiKey(e.target.value)}
        style={{ width: "300px", padding: "10px", margin: "10px 0" }}
      />
      <br />
      <button onClick={handleSaveKey} style={{ padding: "10px 20px" }}>
        Save API Key
      </button>
    </div>
  );
}

export default Home;
