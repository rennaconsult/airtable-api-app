import React from "react";

function Field({ field }) {
  const renderFieldDetails = () => {
    switch (field.type) {
      case "singleSelect":
        return (
          <div>
            <h4 className="font-medium">Options:</h4>
            <ul className="list-disc ml-6">
              {field.options.choices.map((choice) => (
                <li
                  key={choice.id}
                  className="text-sm"
                  style={{ color: choice.color }}
                >
                  {choice.name}
                </li>
              ))}
            </ul>
          </div>
        );

      case "multipleAttachments":
        return (
          <div>
            <p className="text-sm">Allows multiple attachments.</p>
            {field.options?.isReversed && (
              <p className="text-sm">Reversed order: Yes</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div>
            <p className="text-sm">Checkbox Icon: {field.options.icon}</p>
            <p className="text-sm">Checkbox Color: {field.options.color}</p>
          </div>
        );

      case "rollup":
        return (
          <div>
            <p className="text-sm">
              Rollup Target Field ID: {field.options.fieldIdInLinkedTable}
            </p>
            <p className="text-sm">Result Type: {field.options.result.type}</p>
          </div>
        );

      case "multipleRecordLinks":
        return (
          <div>
            <p className="text-sm">
              Linked Table ID: {field.options.linkedTableId}
            </p>
            {field.options.prefersSingleRecordLink && (
              <p className="text-sm">Single Record Link: Yes</p>
            )}
          </div>
        );

      case "richText":
        return <p className="text-sm">Supports rich text formatting.</p>;

      case "formula":
        return (
          <div>
            <p className="text-sm">Formula: {field.options.formula}</p>
            <p className="text-sm">Result Type: {field.options.result.type}</p>
          </div>
        );

      case "duration":
        return (
          <div>
            <p className="text-sm">
              Format: {field.options.durationFormat || "Default format"}
            </p>
          </div>
        );

      case "number":
        return (
          <div>
            <p className="text-sm">
              Precision: {field.options.precision || "Not specified"}
            </p>
          </div>
        );

      case "multilineText":
        return <p className="text-sm">Supports multi-line text input.</p>;

      case "singleLineText":
        return <p className="text-sm">Supports single-line text input.</p>;

      case "url":
        return <p className="text-sm">This field accepts URLs.</p>;

      default:
        return (
          <p className="text-sm text-gray-500">
            No additional details available for this field type.
          </p>
        );
    }
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow">
      <h3 className="text-lg font-semibold">{field.name}</h3>
      <p className="text-sm text-gray-600">
        <strong>Type:</strong> {field.type}
      </p>
      {renderFieldDetails()}
    </div>
  );
}

export default Field;
