import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Field from "../components/Field";

function BaseDetails() {
  const { baseId } = useParams();
  const apiKey = useSelector((state) => state.api.apiKey); // Get API key from Redux
  const [schema, setSchema] = useState(null); // Store schema
  const [selectedTable, setSelectedTable] = useState(null);

  // Handle schema import
  const handleImportSchema = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSchema = JSON.parse(e.target.result);
          setSchema(importedSchema);
          if (importedSchema.tables && importedSchema.tables.length > 0) {
            setSelectedTable(importedSchema.tables[0]); // Default to the first table
          }
        } catch (error) {
          console.error("Error parsing schema file:", error);
          alert("Invalid schema file.");
        }
      };
      reader.readAsText(file);
    }
  };

  if (!schema) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Base Details</h2>
        <p>No schema loaded. Please import a schema file to test.</p>
        <input type="file" accept=".json" onChange={handleImportSchema} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <h3>Tables</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {schema.tables.map((table) => (
            <li
              key={table.id}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor:
                  selectedTable && selectedTable.id === table.id
                    ? "#ddd"
                    : "transparent",
              }}
              onClick={() => setSelectedTable(table)}
            >
              {table.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Table: {selectedTable ? selectedTable.name : "Select a Table"}</h2>
        {selectedTable ? (
          <div>
            <h3>Fields</h3>
            <div>
              {selectedTable.fields.map((field) => (
                <Field key={field.id} field={field} />
              ))}
            </div>
          </div>
        ) : (
          <p>Please select a table to view details.</p>
        )}
      </div>
    </div>
  );
}

export default BaseDetails;
