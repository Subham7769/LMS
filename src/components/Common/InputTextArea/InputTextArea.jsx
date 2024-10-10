import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";

const InputTextArea = ({
  labelName,
  inputName,
  rowCount,
  inputValue,
  inputId,
  onChange,
  placeHolder,
  disabled = false,
  isValidation = false,
  isIndex,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

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

  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  return (
    <div className="w-full">
      {labelName && (
        <label
          className={`block ${
            validationError[validationKey] ? "text-red-600" : "text-gray-700"
          } px-1 text-[14px]`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Field required" : labelName}
        </label>
      )}
      <textarea
        name={inputName}
        rows={rowCount}
        value={inputValue}
        onChange={onChange}
        onFocus={() => dispatch(setValidationError(validationKey))} // Call onFocus to reset the error state
        placeholder={placeHolder}
        id={inputId}
        disabled={disabled}
        className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            validationError[validationKey]
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`}
      />
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputTextArea {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
