import { useState } from "react";
import Button from "../Button/Button";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const CloneModal = ({ isOpen, onClose, onCreateClone, initialName }) => {
  const [cloneName, setCloneName] = useState("");

  const handleChange = (e) => {
    setCloneName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed");
      onCreateClone(cloneName);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold">
          Create Clone of {initialName}{" "}
        </h2>
        <input
          type="text"
          name="clonnedName"
          id="Name"
          value={cloneName}
          // onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
          placeholder={"Enter Cloned Name"}
          autoFocus
        />
        <div className="flex gap-3 justify-center md:justify-end">
          <Button
            buttonName={"Cancel"}
            onClick={() => {
              onClose();
              setCloneName("");
            }}
            className={
              "bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600 self-end"
            }
            rectangle={true}
          />
          <Button
            buttonName={"Create Clone"}
            onClick={() => {
              onCreateClone(cloneName);
              onClose();
            }}
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
