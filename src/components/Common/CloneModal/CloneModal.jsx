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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white flex flex-col p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold">
          Create Clone of {initialName}{" "}
        </h2>
        <div>
          <label
            className={`${
              isValidationError ? "text-red-600" : "text-gray-700"
            } px-1 text-[14px]`}
          >
            {isValidationError ? "Field required" : ""}
          </label>
          <input
            type="text"
            name="clonnedName"
            id="Name"
            value={cloneName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            isValidationError
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`}
            placeholder={"Enter Cloned Name"}
            onFocus={() => setIsValidationError(false)}
            autoFocus
          />
        </div>
        <div className="flex gap-3 mt-5 justify-center md:justify-end">
          <Button
            buttonName={"Cancel"}
            onClick={() => {
              onClose();
              setCloneName("");
            }}
            rectangle={true}
            buttonType="secondary"
          />
          <Button
            buttonName={"Create Clone"}
            onClick={handleCreateClone}
            rectangle={true}
            className={"self-end"}
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
