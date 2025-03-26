import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch, useSelector } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import {
  addUpdateFields,
  setUpdateMap,
} from "../../../redux/Slices/notificationSlice";
import { hasViewOnlyAccess } from "../../../utils/roleUtils";



const InputNumber = ({
  labelName,
  inputName,
  inputValue,
  inputValueMin,
  inputValueMax,
  inputId,
  onChange,
  placeHolder = "",
  inputValuePercentage = false,
  disabled,
  isValidation = false,
  isIndex,
  isSectionId,
  isRuleId,
  isRangeIndex,
  loading = false,
  maxLength = null,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  // console.log(validationError);
  let validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;

  if (isSectionId && isRuleId) {
    validationKey = `${inputName}_${isSectionId}_${isRuleId}_${isRangeIndex}`;
  }

  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  if (disabled === undefined) {
    disabled = hasViewOnlyAccess(roleName);
  }

  useEffect(() => {
    if (!updateFields.includes(inputName)) {
      dispatch(addUpdateFields({ inputName }));
    }
  }, [inputName, dispatch]);
  
  const handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
    ];
  
    const key = e.key;
    const currentValue = inputValue?.toString() || "";
  
    const isNumberKey = /^[0-9.]$/.test(key);
    const alreadyHasDot = currentValue.includes(".");
  
    // Disallow extra dot or non-numeric keys
    if (
      (!isNumberKey && !allowedKeys.includes(key)) ||
      (key === "." && alreadyHasDot)
    ) {
      e.preventDefault();
    }
  
    // Disallow input beyond maxLength (if set)
    if (
      maxLength &&
      currentValue.length >= maxLength &&
      !allowedKeys.includes(key)
    ) {
      e.preventDefault();
    }
  };
  
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
          } px-1 text-sm font-semibold`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Field required" : labelName}{" "}
          {isValidation && <span className="text-red-600">*</span>}
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
          min={inputValueMin}
          max={inputValueMax}
          onChange={handleChange}
          onFocus={() => {
            dispatch(setValidationError(validationKey));
            dispatch(setUpdateMap(inputName));
          }}
          placeholder={placeHolder}
          style={{
            appearance: "none", // General rule for most modern browsers
          }}
          className={`flex-1 h-10 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
            ${
              validationError[validationKey]
                ? "ring-red-600 focus:ring-red-600"
                : "ring-gray-300 focus:ring-indigo-600"
            } 
            focus:ring-2 focus:ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 py-1 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`} // Conditionally apply red or indigo focus ring
          required
          disabled={disabled}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
        />
        {inputValuePercentage && (
          <span className=" block absolute right-2 text-gray-500">
            %
          </span> /* The % symbol */
        )}
        {loading && (
          <div className="absolute inset-x-2 top-1/2 transform -translate-y-1/2 h-6 bg-gray-200 animate-pulse rounded-md"></div>
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
