import React from "react";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-xl p-6 w-[350px] shadow-xl">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6 text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
