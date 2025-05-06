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
          } px-1 text-sm font-semibold`}
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
        className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            validationError[validationKey]
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
      <InputEmail {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
