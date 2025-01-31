import React, { useEffect } from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";
import {
  addUpdateFields,
  setUpdateMap,
} from "../../../redux/Slices/notificationSlice";

const InputText = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder = "",
  disabled = false,
  readOnly = false,
  isValidation = false,
  isIndex,
  isAutoFocus,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);
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
  useEffect(() => {
    if (!updateFields.includes(inputName)) {
      dispatch(addUpdateFields({ inputName }));
    }
  }, [inputName, dispatch]);

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
      <input
        type="text"
        name={inputName}
        value={inputValue}
        onChange={onChange}
        onFocus={() => {
          dispatch(setValidationError(validationKey));
          dispatch(setUpdateMap(inputName));
        }}
        placeholder={placeHolder}
        disabled={disabled}
        className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            validationError[validationKey]
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`}
        required
        readOnly={readOnly}
        autoFocus={isAutoFocus}
      />
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputText {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;

// export default InputText;
