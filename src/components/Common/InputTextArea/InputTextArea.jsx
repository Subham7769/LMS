import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip/Tooltip";

const InputTextArea = ({
  labelName,
  toolTipText,
  inputName,
  inputValue,
  inputId,
  onChange,
  placeHolder,
  rowCount,
  disabled = false,
  readOnly = false,
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
      <div className="flex items-center justify-between">
        {labelName && (
          <label
            className={`block ${
              validationError[validationKey]
                ? "text-red-600"
                : "text-gray-700 dark:text-gray-400"
            } px-1 text-sm font-medium mb-1`}
            htmlFor={inputName}
          >
            {validationError[validationKey] ? "Field required" : labelName}{" "}
            {isValidation && <span className="text-red-600">*</span>}
          </label>
        )}
        {toolTipText && (
          <Tooltip className="ml-2" bg="dark" size="lg" position="top left">
            <div className="text-xs text-gray-200">{toolTipText}</div>
          </Tooltip>
        )}
      </div>
      <textarea
        name={inputName}
        rows={rowCount}
        value={inputValue}
        onChange={onChange}
        onFocus={() => dispatch(setValidationError(validationKey))} // Call onFocus to reset the error state
        placeholder={placeHolder}
        id={inputId}
        disabled={disabled}
        readOnly={readOnly}
        className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed
          ${validationError[validationKey] ? "border-red-300" : ""} 
          `}
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
