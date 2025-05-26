import { useState } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import Modal from "../Modal/Modal";

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
    <>
      <Modal
        primaryButtonName={"Create Clone"}
        primaryOnClick={handleCreateClone}
        secondaryOnClick={() => {
          onClose();
          setCloneName("");
        }}
        title={`Clone ${initialName}`}
      >
        <div>
          <label
            className={`${
              isValidationError
                ? "text-red-600"
                : "text-gray-600 dark:text-gray-400"
            } px-1 text-sm font-medium mb-1`}
          >
            {isValidationError
              ? "Field required"
              : `Enter name for the cloned version`}
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
            onFocus={() => setIsValidationError(false)}
            autoFocus
          />
        </div>
      </Modal>
    </>
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
