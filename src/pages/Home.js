import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Airtable App</h1>
      <div className="space-y-4">
        <Link
          to="/register-base"
          className="bg-blue-500 text-white p-2 rounded block text-center"
        >
          Register a New Base
        </Link>
        <Link
          to="/bases"
          className="bg-green-500 text-white p-2 rounded block text-center"
        >
          View Registered Bases
        </Link>
      </div>
    </div>
  );
}

export default Home;
