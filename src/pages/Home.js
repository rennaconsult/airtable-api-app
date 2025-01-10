import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setApiKey } from "../features/apiSlice";

function Home() {
  const [apiKey, setLocalApiKey] = useState("");
  const dispatch = useDispatch();

  const handleSaveKey = () => {
    dispatch(setApiKey(apiKey));
    alert("API Key Saved!");
  };

  return (
    <div>
      <h1>Airtable App</h1>
      <input
        type="text"
        placeholder="Enter Airtable API Key"
        value={apiKey}
        onChange={(e) => setLocalApiKey(e.target.value)}
      />
      <button onClick={handleSaveKey}>Save API Key</button>
    </div>
  );
}

export default Home;
