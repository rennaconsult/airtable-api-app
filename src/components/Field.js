import React from "react";

function Field({ field }) {
  const renderFieldDetails = () => {
    switch (field.type) {
      case "singleSelect":
        return (
          <div>
            <h4>Options:</h4>
            <ul>
              {field.options.choices.map((choice) => (
                <li key={choice.id} style={{ color: choice.color }}>
                  {choice.name}
                </li>
              ))}
            </ul>
          </div>
        );

      case "multipleAttachments":
        return (
          <div>
            <p>This field allows multiple attachments.</p>
            {field.options?.isReversed && <p>Reversed order: Yes</p>}
          </div>
        );

      case "checkbox":
        return (
          <div>
            <p>Checkbox Icon: {field.options.icon}</p>
            <p>Checkbox Color: {field.options.color}</p>
          </div>
        );

      case "rollup":
        return (
          <div>
            <p>Rollup Target Field ID: {field.options.fieldIdInLinkedTable}</p>
            <p>Result Type: {field.options.result.type}</p>
          </div>
        );

      case "multipleRecordLinks":
        return (
          <div>
            <p>Linked Table ID: {field.options.linkedTableId}</p>
            {field.options.prefersSingleRecordLink && (
              <p>Single Record Link: Yes</p>
            )}
          </div>
        );

      case "richText":
        return <p>This field supports rich text formatting.</p>;

      case "formula":
        return (
          <div>
            <p>Formula: {field.options.formula}</p>
            <p>Result Type: {field.options.result.type}</p>
          </div>
        );

      default:
        return <p>No additional details available for this field type.</p>;
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>{field.name}</h3>
      <p>
        <strong>Type:</strong> {field.type}
      </p>
      {renderFieldDetails()}
    </div>
  );
}

export default Field;
