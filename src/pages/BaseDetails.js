import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Field from "../components/Field";
import { setSchema } from "../features/apiSlice";
import { getBase } from "../utils/firestore"; // Fetch a single Base from Firestore
import { fetchSchemaFromAPI } from "../utils/apiHelpers"; // Refactor API fetch logic into a helper

function BaseDetails() {
  const dispatch = useDispatch();
  const { baseId } = useParams(); // Get Base ID from the URL
  const apiKey = useSelector((state) => state.api.apiKey);
  const schema = useSelector((state) => state.api.schema); // Current schema in Redux
  const [selectedTable, setSelectedTable] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("fields");

  // Fetch or Load Schema on Component Mount
  useEffect(() => {
    const loadSchema = async () => {
      try {
        // Try fetching schema from Firestore
        const baseData = await getBase(baseId);
        if (baseData && baseData.schema) {
          dispatch(setSchema(baseData.schema)); // Save schema in Redux
          setSelectedTable(baseData.schema.tables[0]); // Set the first table as default
        } else {
          // Fallback to Airtable API if no schema in Firestore
          const fetchedSchema = await fetchSchemaFromAPI(baseId, apiKey);
          if (fetchedSchema) {
            dispatch(setSchema(fetchedSchema)); // Save schema in Redux
            setSelectedTable(fetchedSchema.tables[0]); // Set the first table as default
          } else {
            alert("No schema found for this Base.");
          }
        }
      } catch (error) {
        console.error("Error loading schema:", error);
        alert("Failed to load schema. Please try again.");
      }
    };

    loadSchema();
  }, [baseId, apiKey, dispatch]);

  // Render Content for Active Tab
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
          {schema &&
            schema.tables.map((table) => (
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
