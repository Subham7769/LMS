import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";

const InputNumber = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  onChange,
  placeHolder = "",
  inputValuePercentage = false,
  disabled = false,
  isValidation = false,
  isIndex,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
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

  // console.log(validationError);
  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
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
            validationError[validationKey] ? "text-red-600" : "text-gray-700"
          } px-1 text-[14px]`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Field required" : labelName}
        </label>
      )}
      <div className="flex justify-center items-center relative">
        {/* Add the internal CSS to hide the arrows */}
        <style>
          {`
            /* Hide arrows in input of type number for Chrome */
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            /* Hide arrows in input of type number for Firefox */
            input[type="number"] {
              -moz-appearance: textfield;
            }
          `}
        </style>
        <input
          type="number"
          id={inputId}
          name={inputName}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => dispatch(setValidationError(validationKey))}
          placeholder={placeHolder}
          style={{
            appearance: "none", // General rule for most modern browsers
          }}
          className={`flex-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
            ${
              validationError[validationKey]
                ? "ring-red-600 focus:ring-red-600"
                : "ring-gray-300 focus:ring-indigo-600"
            } 
            focus:ring-2 focus:ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 py-1 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`} // Conditionally apply red or indigo focus ring
          required
          disabled={disabled}
        />
        {inputValuePercentage && (
          <span className=" block absolute right-2 text-gray-500">
            %
          </span> /* The % symbol */
        )}
      </div>
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
