import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Field from "../components/Field";
import { setSchema } from "../features/apiSlice";

function BaseDetails() {
  const dispatch = useDispatch();
  const { baseId } = useParams(); // Move `useParams` here
  const apiKey = useSelector((state) => state.api.apiKey);
  const schema = useSelector((state) => state.api.schema);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("fields");

  const loadSchemaFromLocalStorage = () => {
    const storedSchema = localStorage.getItem("schema");
    if (storedSchema) {
      const parsedSchema = JSON.parse(storedSchema);
      dispatch(setSchema(parsedSchema)); // Load schema into Redux
      if (parsedSchema.tables && parsedSchema.tables.length > 0) {
        setSelectedTable(parsedSchema.tables[0]); // Default to the first table
      }
    } else {
      alert("No schema found in local storage.");
    }
  };

  const fetchSchemaFromAPI = async (baseId) => {
    if (!apiKey) {
      alert("No API key found. Please add an API key in your profile.");
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
        localStorage.setItem("schema", JSON.stringify(data)); // Save to localStorage
        dispatch(setSchema(data)); // Save schema in Redux
        setSelectedTable(data.tables[0]); // Default to the first table
      } else {
        alert("Failed to fetch schema. Please check your API key and Base ID.");
      }
    } catch (error) {
      console.error("Error fetching schema:", error);
      alert("An error occurred while fetching the schema.");
    }
  };

  const handleImportSchema = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSchema = JSON.parse(e.target.result);
          localStorage.setItem("schema", JSON.stringify(importedSchema)); // Save to localStorage
          dispatch(setSchema(importedSchema)); // Save to Redux
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

  if (!schema || !schema.tables) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">No Schema Loaded</h2>
        <p>You can load a schema in one of three ways:</p>
        <div className="mt-4 space-y-4">
          <button
            onClick={loadSchemaFromLocalStorage}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Load from Local Storage
          </button>
          <button
            onClick={() => fetchSchemaFromAPI(baseId)} // Pass `baseId` as an argument
            className="bg-green-500 text-white p-2 rounded"
          >
            Fetch from Airtable API
          </button>
          <div>
            <p>Or import a schema file:</p>
            <input
              type="file"
              accept=".json"
              onChange={handleImportSchema}
              className="mt-2 p-2 border rounded"
            />
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (!selectedTable) {
      return <p>Please select a table to view details.</p>;
    }

    switch (activeTab) {
      case "fields":
        return (
          <div>
            <h3 className="mt-4 mb-2 text-lg font-semibold">Fields</h3>
            <div>
              {selectedTable.fields.map((field) => (
                <Field key={field.id} field={field} />
              ))}
            </div>
          </div>
        );
      case "customDesign1":
        return <p>Custom Design 1 Content</p>;
      case "customDesign2":
        return <p>Custom Design 2 Content</p>;
      default:
        return <p>Unknown tab selected.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-gray-100 h-full flex-shrink-0 transition-width duration-300 border-r`}
      >
        <div className="flex justify-between items-center p-4">
          <h3
            className={`${
              isSidebarCollapsed ? "hidden" : "block"
            } text-lg font-bold`}
          >
            Tables
          </h3>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            {isSidebarCollapsed ? ">" : "<"}
          </button>
        </div>
        <ul className="list-none p-0">
          {schema.tables.map((table) => (
            <li
              key={table.id}
              className={`p-3 cursor-pointer ${
                selectedTable && selectedTable.id === table.id
                  ? "bg-gray-300"
                  : ""
              } hover:bg-gray-200`}
              onClick={() => setSelectedTable(table)}
            >
              {isSidebarCollapsed ? table.name.charAt(0) : table.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold">
          Table: {selectedTable ? selectedTable.name : "Select a Table"}
        </h2>
        <div className="mt-4">
          {/* Tabs */}
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab("fields")}
              className={`p-2 ${
                activeTab === "fields"
                  ? "border-b-2 border-blue-500 font-bold"
                  : ""
              }`}
            >
              Fields
            </button>
            <button
              onClick={() => setActiveTab("customDesign1")}
              className={`p-2 ${
                activeTab === "customDesign1"
                  ? "border-b-2 border-blue-500 font-bold"
                  : ""
              }`}
            >
              Custom Design 1
            </button>
            <button
              onClick={() => setActiveTab("customDesign2")}
              className={`p-2 ${
                activeTab === "customDesign2"
                  ? "border-b-2 border-blue-500 font-bold"
                  : ""
              }`}
            >
              Custom Design 2
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default BaseDetails;
