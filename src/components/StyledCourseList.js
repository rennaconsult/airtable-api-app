import React from "react";

function StyledCourseList({ records, schema }) {
  if (!records || records.length === 0) {
    return <p>No records available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.map((record, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-bold mb-2">{record["Course Name"]}</h3>

          {/* Display Hero Image */}
          {record["Course Hero Image"] &&
            record["Course Hero Image"].length > 0 && (
              <img
                src={record["Course Hero Image"][0].url} // Assuming the field is an array of attachments
                alt={record["Course Name"]}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}

          {/* Curriculum Field */}
          <div className="mb-4">
            <strong>Curriculum:</strong>{" "}
            <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-800">
              {record["Curriculum"]}
            </span>
          </div>

          {/* Course Overview */}
          {record["Course Overview"] && (
            <div className="mb-4">
              <strong>Overview:</strong>
              <p className="text-sm text-gray-600">
                {record["Course Overview"]}
              </p>
            </div>
          )}

          {/* Live Checkbox */}
          {record["Live"] && (
            <div className="mt-4">
              <span className="text-green-600 font-bold">✅ Live</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StyledCourseList;
