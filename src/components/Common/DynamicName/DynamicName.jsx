import React, { useState, useEffect, useRef } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import InputText from "../InputText/InputText";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import { updateValidationError } from "../../../redux/Slices/validationSlice";

const DynamicName = ({ initialName, onSave, editable = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dynamicSectionName, setDynamicSectionName] = useState(initialName);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null); // To detect clicks outside this component

  useEffect(() => {
    // Function to detect clicks outside the editing area
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    if (isEditing) {
      // Add event listener to detect clicks outside when editing starts
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when editing ends
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleEdit = () => {
    setDynamicSectionName(initialName);
    setIsEditing(true);
  };

  const handleSave = async () => {
    let isValidationError = false;
    if (dynamicSectionName === "") {
      isValidationError = true;
      dispatch(updateValidationError({ dynamicSectionName: true }));
    }
    if (!isValidationError && dynamicSectionName !== "") {
      onSave(dynamicSectionName); // Trigger the onSave function passed as prop
      setIsEditing(false);
      dispatch(updateValidationError({ dynamicSectionName: false }));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDynamicSectionName(initialName); // Reset to the initial name on cancel
  };

  return (
    <div ref={wrapperRef} className="flex items-center justify-between">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <InputText
            inputValue={dynamicSectionName}
            inputName="dynamicSectionName"
            onChange={(e) => setDynamicSectionName(e.target.value)}
            isValidation={true}
            isAutoFocus={true}
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
        <h2 onClick={editable ? handleEdit : undefined}>
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
