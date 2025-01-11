import React, { useState } from "react";
import CustomForm from "./CustomForm";
import CustomList from "./CustomList";
import RecordViewer from "./RecordViewer";
import { simulateRecords } from "../utils/airtableHelpers";

function CustomComponent({ schema }) {
  const [records, setRecords] = useState(simulateRecords(schema, 5)); // Simulate initial records
  const [selectedRecord, setSelectedRecord] = useState(null); // For viewing record details

  // Add a new record to the list
  const handleFormSubmit = (newRecord) => {
    setRecords([...records, newRecord]);
    setSelectedRecord(newRecord); // Optional: View the newly added record
  };

  return (
    <div className="p-6 space-y-6">
      {/* Form for creating new records */}
      <div className="bg-white shadow p-4 rounded">
        <CustomForm schema={schema} onSubmit={handleFormSubmit} />
      </div>

      {/* List of records */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Record List</h2>
        <CustomList
          records={records}
          schema={schema}
          onSelectRecord={setSelectedRecord} // Allow selecting a record
        />
      </div>

      {/* Viewer for a single record */}
      {selectedRecord && (
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Record Details</h2>
          <RecordViewer record={selectedRecord} schema={schema} />
        </div>
      )}
    </div>
  );
}

export default CustomComponent;
