import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBases, deleteBase } from "../utils/firestore";

function BasesList() {
  const [bases, setBases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBases = async () => {
      try {
        const basesData = await getBases();
        setBases(basesData || []); // Ensure basesData is an array
      } catch (error) {
        console.error("Error fetching bases:", error);
        setBases([]); // Fallback to empty array
      }
    };

    fetchBases();
  }, []);

  const handleDeleteBase = async (id) => {
    if (window.confirm("Are you sure you want to delete this base?")) {
      try {
        await deleteBase(id);
        setBases((prevBases) => prevBases.filter((base) => base.id !== id));
      } catch (error) {
        console.error("Error deleting base:", error);
      }
    }
  };

  const handleOpenBase = (baseId) => {
    console.log("Navigating to Base:", baseId);
    navigate(`/base/${baseId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Registered Bases</h2>
      {bases.length === 0 ? (
        <p className="text-gray-500">No Bases registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {bases.map((base) => (
            <li
              key={base.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{base.baseName}</h3>
                <p className="text-sm text-gray-600">Base ID: {base.baseId}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleOpenBase(base.baseId)} // Navigate to the Base page
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Open
                </button>
                <button
                  onClick={() => handleDeleteBase(base.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BasesList;
