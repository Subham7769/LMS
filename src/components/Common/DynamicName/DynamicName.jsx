import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import InputText from "../InputText/InputText";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import { updateValidationError } from "../../../redux/Slices/validationSlice";

const DynamicName = ({ initialName, onSave, editable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setName(initialName);
    setIsEditing(true);
  };
  const handleSave = async () => {
    let isValidationError = false;
    if (name === "") {
      isValidationError = true;
      dispatch(updateValidationError({ name: true }));
    }
    if (!isValidationError && name != "") {
      onSave(name); // Trigger the onSave function passed as prop
      setIsEditing(false);
      dispatch(updateValidationError({ name: false }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(initialName); // Reset to the initial name on cancel
  };

  return (
    <div className="flex items-center justify-between">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <InputText
            inputValue={name}
            inputName="name"
            onChange={(e) => setName(e.target.value)}
            isValidation={true}
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
        <h2 onClick={editable && handleEdit}>
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

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <DynamicName {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
