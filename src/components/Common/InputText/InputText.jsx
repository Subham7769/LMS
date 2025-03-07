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

const InputText = ({
  labelName,
  inputName,
  inputValue,
  onChange,
  placeHolder = "",
  disabled,
  readOnly = false,
  isValidation = false,
  isIndex,
  isAutoFocus,
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
        className={`block h-10 w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
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
