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
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import "./CustomDatepicker.css";
import { hasViewOnlyAccess } from "../../../utils/roleUtils";

const dateFormat = import.meta.env.VITE_DATE_FORMAT || "dd/MM/yyyy";

const InputDate = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  isValidation = false,
  isIndex,
  isDisabled,
  minSelectableDate = null,
  maxSelectableDate = null,
  showIcon = true,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputName)) {
        dispatch(addFields({ inputName }));
      }
    }, [inputName, dispatch]);
  }

  if (isDisabled === undefined) {
    isDisabled = hasViewOnlyAccess(roleName);
  }

  return (
    <>
      {labelName && (
        <label
          className={`block text-sm font-medium mb-1 ${
            validationError[validationKey] ? "text-red-600" : "text-gray-600"
          } px-1`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Field required" : labelName}{" "}
          {isValidation && <span className="text-red-600">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <DatePicker
          selected={inputValue ? new Date(inputValue) : null}
          onChange={(date) =>
            onChange({
              target: {
                name: inputName,
                value: date
                  ? new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                      .toISOString()
                      .split("T")[0]
                  : "",
              },
            })
          } // Store date as YYYY-MM-DD string
          onFocus={() => dispatch(setValidationError(validationKey))}
          className={`form-input w-full dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed 
          ${showIcon ? "" : ""} 
          ${validationError[validationKey] ? "border-red-300" : ""} 
          `}
          disabled={isDisabled}
          minDate={minSelectableDate}
          maxDate={maxSelectableDate}
          dateFormat={dateFormat}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          todayButton="Today"
          toggleCalendarOnIconClick
          showIcon={showIcon}
          icon={<CalendarDaysIcon className="h-5 w-5" aria-hidden="true" />}
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
