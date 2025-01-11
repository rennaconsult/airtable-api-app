import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSchema } from "../features/apiSlice";
import { addBase } from "../utils/firestore";

function RegisterBase() {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.api.apiKey); // Fetch API key from Redux
  const [baseName, setBaseName] = useState("");
  const [baseId, setBaseId] = useState("");
  const [schema, setLocalSchema] = useState(null);

  // Fetch Schema from Airtable API
  const fetchSchemaFromAPI = async () => {
    if (!apiKey) {
      alert("No API key found. Please add an API key in your profile.");
      return;
    }

    if (!baseId) {
      alert("Please enter a Base ID.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/meta/bases/${baseId}/tables`,
        {
          headers: { Authorization: `Bearer ${apiKey}` },
        }
      );

      const data = await response.json();

      if (data && data.tables) {
        setLocalSchema(data); // Update local state
        localStorage.setItem("schema", JSON.stringify(data)); // Save schema locally
        dispatch(setSchema(data)); // Save schema in Redux
        alert("Schema fetched successfully!");
      } else {
        alert("Failed to fetch schema. Please check your API key and Base ID.");
      }
    } catch (error) {
      console.error("Error fetching schema:", error);
      alert("An error occurred while fetching the schema.");
    }
  };

  // Handle importing a schema file
  const handleImportSchema = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSchema = JSON.parse(e.target.result);
          setLocalSchema(importedSchema);
          dispatch(setSchema(importedSchema)); // Save to Redux
          alert("Schema imported successfully!");
        } catch (error) {
          console.error("Error parsing schema file:", error);
          alert("Invalid schema file.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle registering a new base
  const handleRegisterBase = async () => {
    if (!baseName || !baseId || !schema) {
      alert("Please complete all fields and load a schema before saving.");
      return;
    }

    try {
      const baseData = {
        baseName,
        baseId,
        schema,
      };

      const baseRecordId = await addBase(baseData); // Save base in Firestore
      alert(`Base registered successfully with ID: ${baseRecordId}`);

      // Reset the form
      setBaseName("");
      setBaseId("");
      setLocalSchema(null);
    } catch (error) {
      console.error("Error registering base:", error);
      alert("Failed to register the base.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register a New Base</h2>
      <div className="space-y-4">
        {/* Base Name Input */}
        <div>
          <label className="block mb-2 font-semibold">Base Name:</label>
          <input
            type="text"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Base ID Input */}
        <div>
          <label className="block mb-2 font-semibold">Base ID:</label>
          <input
            type="text"
            value={baseId}
            onChange={(e) => setBaseId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Fetch Schema or Import Schema */}
        <div className="space-y-2">
          <button
            onClick={fetchSchemaFromAPI} // Trigger API fetch
            className="bg-green-500 text-white p-2 rounded"
          >
            Fetch Schema from API
          </button>
          <div>
            <p>Or import a schema file:</p>
            <input
              type="file"
              accept=".json"
              onChange={handleImportSchema} // Handle file import
              className="mt-2 p-2 border rounded"
            />
          </div>
        </div>

        {/* Register Base Button */}
        <button
          onClick={handleRegisterBase} // Trigger Base registration
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Register Base
        </button>
      </div>

      {/* Display Loaded Schema */}
      {schema && (
        <div className="mt-4">
          <h3 className="font-semibold">Schema Preview:</h3>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(schema, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default RegisterBase;
