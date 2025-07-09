import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
  setValidationErrorTrue,
} from "../../../redux/Slices/validationSlice";

const InputEmail = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder,
  disabled = false,
  readOnly = false,
  isValidation = false,
  isIndex,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleBlur = () => {
    // Check if the input value matches the email pattern
    if (inputValue) {
      if (!emailRegex.test(inputValue)) {
        dispatch(setValidationErrorTrue(validationKey));
      } else {
        dispatch(setValidationError(validationKey));
      }
    }
  };

  return (
    <div className="w-full">
      {labelName && (
        <label
          className={`block ${
            validationError[validationKey]
              ? "text-red-600"
              : "text-gray-600 dark:text-gray-400"
          } px-1 text-sm font-medium mb-1`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Invalid email format" : labelName}{" "}
          {isValidation && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        type="email"
        name={inputName}
        value={inputValue}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={() => dispatch(setValidationError(validationKey))} // Call onFocus to reset the error state
        placeholder={placeHolder}
        disabled={disabled}
        className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
          ${validationError[validationKey] ? "border-red-300" : ""} 
          `}
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
      <InputEmail {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
