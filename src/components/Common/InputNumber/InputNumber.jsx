import React from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const InputNumber = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  onChange,
  placeHolder = "",
  disabled = false,
  showError = false, // New prop to indicate error
  onFocus, // New onFocus handler to reset error
}) => {
  if (inputValue === null || inputValue === undefined) {
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

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    onChange({
      target: {
        name: name,
        value: value === "" ? "" : Number(value),
        id: id,
      },
    });
  };

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
        type="number"
        id={inputId}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
        onFocus={onFocus} // Call onFocus to reset the error state
        placeholder={placeHolder}
        className={`flex-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
          ${
            showError
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          focus:ring-2 focus:ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 py-1`} // Conditionally apply red or indigo focus ring
        required
        disabled={disabled}
      />
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputNumber {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
