import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";

const DynamicName = ({ initialName, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleEdit = () => {
    setName(initialName);
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(name); // Trigger the onSave function passed as prop
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(initialName); // Reset to the initial name on cancel
  };

  return (
    <div className="flex items-center justify-between">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSave}
            className="text-green-600 hover:text-green-800"
          >
            <CheckCircleIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleCancel}
            className="text-red-600 hover:text-red-800"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <h2 onClick={handleEdit}>
          <b
            title="Edit Name"
            className="mb-4 text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
          >
            {initialName}
          </b>
        </h2>
      )}
    </div>
  );
};

export default DynamicName;