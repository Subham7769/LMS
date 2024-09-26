import React from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import PropTypes from "prop-types";

const InputText = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder = "",
  disabled = false,
  readOnly = false,
  showError = false, // New prop to indicate error
  onFocus, // New onFocus handler to reset error
}) => {
  if (inputValue == null || inputValue === undefined) {
    throw new Error(`Invalid inputValue for ${labelName}`);
  }

  if (!inputName || (!disabled && typeof onChange !== "function")) {
    let errorMessage = "";

    if (!inputName) {
      errorMessage += "inputName is required";
    }

    if (!disabled && typeof onChange !== "function") {
      if (errorMessage) {
        errorMessage += ", "; // Add a separator if there is already an error message
      }
      errorMessage += "onChange (should be a function) is required";
    }

    throw new Error(errorMessage);
  }

  return (
    <div className="w-full">
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
        type="text"
        name={inputName}
        value={inputValue}
        onChange={onChange}
        onFocus={onFocus} // Call onFocus to reset the error state
        placeholder={placeHolder}
        disabled={disabled}
        className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            showError
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`}
        required
        readOnly={readOnly}
      />
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputText {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;

// export default InputText;
