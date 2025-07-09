import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";

const InputPassword = ({
  suffixIcon: SuffixIcon,
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder,
  className = "",
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
          {validationError[validationKey] ? "Field required" : labelName}{" "}
          {isValidation && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="password"
          name={inputName}
          value={inputValue}
          onChange={onChange}
          placeholder={placeHolder}
          onFocus={() => dispatch(setValidationError(validationKey))} // Call onFocus to reset the error state
          disabled={disabled}
          className={`form-input w-full ${className} dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
          ${validationError[validationKey] ? "ring-red-600 " : ""} 
          `}
          required
          readOnly={readOnly}
        />
        {SuffixIcon && (
          <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
            <span className="text-sm text-gray-400 dark:text-gray-500 font-medium px-3">
              <SuffixIcon className={"h-5 w-5"} aria-hidden="true" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputPassword {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
