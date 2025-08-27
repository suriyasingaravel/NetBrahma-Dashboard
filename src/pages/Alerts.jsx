import React from "react";

const Alerts = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Alerts</h1>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 font-medium">You have 4 new alerts</p>
      </div>
    </div>
  );
};

export default Alerts;
