import React from "react";
import StyledCourseList from "../components/StyledCourseList";
import { simulateRecords } from "../utils/airtableHelpers";

function CustomDesign1({ schema }) {
  const exampleRecords = simulateRecords(schema, 5); // Simulate 5 example records

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Example Course List</h2>
      <StyledCourseList records={exampleRecords} schema={schema} />
    </div>
  );
}

export default CustomDesign1;
