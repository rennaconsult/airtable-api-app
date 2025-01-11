import React from "react";

function CustomList({ records, schema }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Record List</h3>
      {records.map((record, index) => (
        <div key={index} className="p-4 border rounded mb-2">
          {schema.fields.map((field) => (
            <p key={field.id}>
              <strong>{field.name}:</strong> {record[field.name]}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CustomList;
