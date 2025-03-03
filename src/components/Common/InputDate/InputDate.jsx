import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dateFormat = import.meta.env.VITE_DATE_FORMAT || "dd/MM/yyyy";

const InputDate = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  isValidation = false,
  isIndex,
  isDisabled = false,
  minSelectableDate = null,
  maxSelectableDate = null,
  showIcon = true
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

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

  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  return (
    <>
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
      <div className="relative w-full">
      <DatePicker
        selected={inputValue ? new Date(inputValue) : null}
        onChange={(date) => onChange({ 
          target: { name: inputName, value: date ? date.toISOString().split("T")[0] : "" } 
        })} // Store date as YYYY-MM-DD string
        onFocus={() => dispatch(setValidationError(validationKey))}
        className={`block h-10 w-full rounded-md border-0 py-1 ml-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${showIcon ? "" : ""} 
          ${validationError[validationKey] ? "ring-red-600 focus:ring-red-600" : "ring-gray-300 focus:ring-indigo-600"} 
          sm:text-sm sm:leading-6`}
        disabled={isDisabled}
        minDate={minSelectableDate}
        maxDate={maxSelectableDate}
        dateFormat={dateFormat}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        toggleCalendarOnIconClick
        showIcon={showIcon}
        icon={<span className="ml-1 mt-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg></span>
      }
      popperClassName="text-xs"
      />
      </div>
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
