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
import { hasViewOnlyAccess } from "../../../utils/roleUtils";
import Tooltip from "../Tooltip/Tooltip";

const InputText = ({
  suffixIcon: SuffixIcon,
  labelName,
  toolTipText,
  inputName,
  inputValue,
  onChange,
  placeHolder = "",
  className = "",
  disabled,
  readOnly = false,
  isValidation = false,
  isIndex,
  isAutoFocus,
  maxLength = null,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);
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

  if (disabled === undefined) {
    disabled = hasViewOnlyAccess(roleName);
  }
  useEffect(() => {
    if (!updateFields.includes(inputName)) {
      dispatch(addUpdateFields({ inputName }));
    }
  }, [inputName, dispatch]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
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
        {toolTipText && (
          <Tooltip className="ml-2" bg="dark" size="lg" position="top left">
            <div className="text-xs text-gray-200">{toolTipText}</div>
          </Tooltip>
        )}
      </div>
      <div className="relative">
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
          className={`form-input w-full ${className} dark:disabled:placeholder:text-gray-600 disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed
          ${validationError[validationKey] ? "border-red-300" : ""} 
          `}
          required
          readOnly={readOnly}
          autoFocus={isAutoFocus}
          maxLength={maxLength}
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
      <InputText {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;

// export default InputText;
