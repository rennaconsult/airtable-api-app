import React from "react";

function RecordViewer({ record, schema }) {
  if (!record) return <p>No record selected.</p>;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Record Details</h3>
      {schema.fields.map((field) => (
        <p key={field.id}>
          <strong>{field.name}:</strong> {record[field.name]}
        </p>
      ))}
    </div>
  );
}

export default RecordViewer;
