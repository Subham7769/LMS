import { useState } from "react";
import Button from "../Button/Button";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const CloneModal = ({ isOpen, onClose, onCreateClone, initialName }) => {
  const [cloneName, setCloneName] = useState("");
  const [isValidationError, setIsValidationError] = useState(false);

  const handleChange = (e) => {
    setCloneName(e.target.value);
    setIsValidationError(false);
  };

  const handleCreateClone = () => {
    if (cloneName != "") {
      onCreateClone(cloneName);
      onClose();
    } else {
      setIsValidationError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (cloneName != "") {
      if (e.key === "Enter") {
        handleCreateClone();
      }
    } else {
      setIsValidationError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="bg-white flex flex-col p-5 rounded-lg shadow-lg w-3/4 xl:w-1/3">
        <div>
          <label
            className={`${
              isValidationError ? "text-red-600" : "text-gray-700"
            } px-1 text-sm font-medium mb-1`}
          >
            {isValidationError
              ? "Field required"
              : `Create Clone of ${initialName}`}
          </label>
          <input
            type="text"
            name="clonnedName"
            id="Name"
            value={cloneName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
          ${isValidationError ? "border-red-300" : ""} 
          `}
            placeholder={"Enter Cloned Name"}
            onFocus={() => setIsValidationError(false)}
            autoFocus
          />
        </div>
        <div className="flex gap-3 mt-5 justify-end">
          <Button
            buttonName={"Cancel"}
            onClick={() => {
              onClose();
              setCloneName("");
            }}
            buttonType="secondary"
          />
          <Button
            buttonName={"Create Clone"}
            onClick={handleCreateClone}
          />
        </div>
      </div>
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <CloneModal {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
