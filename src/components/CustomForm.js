import React, { useState } from "react";
import { validateRecord, generateEmptyRecord } from "../utils/airtableHelpers";

function CustomForm({ schema, onSubmit }) {
  const [formData, setFormData] = useState(
    schema?.fields ? generateEmptyRecord(schema) : {}
  );
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!schema || !schema.fields) {
      alert("Schema is not properly loaded.");
      return;
    }

    const validationErrors = validateRecord(formData, schema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  const renderInputField = (field) => {
    if (!field || !field.type) {
      return <p className="text-red-500">Invalid field configuration</p>;
    }

    switch (field.type) {
      case "singleLineText":
        return (
          <input
            type="text"
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border rounded"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={formData[field.name] || 0}
            onChange={(e) =>
              handleChange(field.name, parseFloat(e.target.value) || 0)
            }
            className="w-full p-2 border rounded"
          />
        );

      case "checkbox":
        return (
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleChange(field.name, e.target.checked)}
              />
              <span>Check to toggle</span>
            </label>
          </div>
        );

      case "singleSelect":
        return (
          <select
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select an option
            </option>
            {field.options?.choices?.map((choice) => (
              <option key={choice.id} value={choice.name}>
                {choice.name}
              </option>
            )) || <option value="">No options available</option>}
          </select>
        );

      case "multipleRecordLinks":
        return (
          <select
            multiple
            value={formData[field.name] || []}
            onChange={(e) =>
              handleChange(
                field.name,
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            className="w-full p-2 border rounded"
          >
            {field.options?.choices?.map((choice) => (
              <option key={choice.id} value={choice.name}>
                {choice.name}
              </option>
            )) || <option value="">No options available</option>}
          </select>
        );

      case "richText":
        return (
          <textarea
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border rounded h-20"
          />
        );

      case "multipleAttachments":
        return (
          <input
            type="file"
            multiple
            onChange={(e) =>
              handleChange(
                field.name,
                Array.from(e.target.files).map((file) => ({
                  name: file.name,
                  url: URL.createObjectURL(file),
                }))
              )
            }
            className="w-full p-2 border rounded"
          />
        );

      default:
        return (
          <input
            type="text"
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Create New Record</h3>
      {schema?.fields?.length > 0 ? (
        schema.fields.map((field) => (
          <div key={field.id || field.name} className="mb-4">
            <label className="block font-semibold mb-1">{field.name}</label>
            {renderInputField(field)}
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name]}</p>
            )}
          </div>
        ))
      ) : (
        <p>No fields available for this schema.</p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default CustomForm;
