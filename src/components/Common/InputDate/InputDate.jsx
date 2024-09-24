import React from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const InputDate = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  showError = false,
  onFocus,
}) => {
  if (inputValue == null || inputValue === undefined) {
    throw new Error(`Invalid inputValue for ${labelName}`);
  }

  if (!inputName || typeof onChange !== "function") {
    let errorMessage = "";

    if (!inputName) {
      errorMessage += "inputName is required";
    }

    if (typeof onChange !== "function") {
      if (errorMessage) {
        errorMessage += ", "; // Add a separator if there is already an error message
      }
      errorMessage += "onChange (should be a function) is required";
    }

    throw new Error(errorMessage);
  }
  return (
    <>
      {labelName && (
        <label
          className={`block ${
            showError ? "text-red-600" : "text-gray-700"
          } px-1 text-[14px]`}
          htmlFor={inputName}
        >
          {showError ? "Field required" : labelName}
        </label>
      )}
      <input
        type="date"
        name={inputName}
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus}
        className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            showError
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          sm:text-sm sm:leading-6 `}
      />
    </>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputDate {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
