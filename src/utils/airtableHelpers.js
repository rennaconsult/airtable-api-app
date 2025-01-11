// Generate an empty record object for a given table schema
export const generateEmptyRecord = (schema) => {
  const emptyRecord = {};
  schema.fields.forEach((field) => {
    switch (field.type) {
      case "singleLineText":
        emptyRecord[field.name] = "";
        break;
      case "number":
        emptyRecord[field.name] = 0;
        break;
      case "checkbox":
        emptyRecord[field.name] = false;
        break;
      case "singleSelect":
        // Pick the first available option for singleSelect
        emptyRecord[field.name] = field.options?.choices?.[0]?.name || null;
        break;
      case "multipleRecordLinks":
        emptyRecord[field.name] = [];
        break;
      default:
        emptyRecord[field.name] = null;
    }
  });
  return emptyRecord;
};

// Validate a record object against the schema
export const validateRecord = (record, schema) => {
  const errors = {};
  schema.fields.forEach((field) => {
    if (
      field.type === "singleLineText" &&
      typeof record[field.name] !== "string"
    ) {
      errors[field.name] = "Must be a string";
    }
    if (field.type === "number" && typeof record[field.name] !== "number") {
      errors[field.name] = "Must be a number";
    }
    // Add additional validation rules as needed
  });
  return errors;
};

// Simulate records for a table schema
export const simulateRecords = (schema, count = 5) => {
  const records = [];
  for (let i = 0; i < count; i++) {
    const record = generateEmptyRecord(schema);
    Object.keys(record).forEach((key) => {
      if (typeof record[key] === "string") {
        record[key] = `${key} Value ${i + 1}`;
      } else if (typeof record[key] === "number") {
        record[key] = i + 1;
      } else if (typeof record[key] === "boolean") {
        record[key] = i % 2 === 0;
      } else if (
        schema.fields.find((field) => field.name === key)?.type ===
        "singleSelect"
      ) {
        // Randomly pick an option for singleSelect fields
        const field = schema.fields.find((f) => f.name === key);
        const choices = field?.options?.choices || [];
        if (choices.length > 0) {
          const randomIndex = Math.floor(Math.random() * choices.length);
          record[key] = choices[randomIndex]?.name;
        }
      }
    });
    records.push(record);
  }
  return records;
};
