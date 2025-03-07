import React, { useEffect } from "react";
import Select from "react-select";
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

const InputSelect = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  inputOptions,
  onChange,
  placeHolder,
  disabled,
  hidden = false,
  isMulti = false,
  searchable = false,
  isClearable = false,
  dropdownTextSize = "small", // New prop to control dropdown text size
  isValidation = false,
  isIndex,
  isSectionId,
  isRuleId,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name: inputName,
        value: selectedOption ? selectedOption.value : "",
        id: inputId,
      },
    });
  };

  // Define custom styles based on dropdownTextSize prop
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize:
        dropdownTextSize === "small"
          ? "12px"
          : dropdownTextSize === "large"
          ? "16px"
          : "14px", // Change font size
      padding: 6,
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      height: "30px",
      padding: 0,
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #aaa",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure menu appears above other elements
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize:
        dropdownTextSize === "small"
          ? "12px"
          : dropdownTextSize === "large"
          ? "16px"
          : "14px", // Same font size as options
    }),
  };

  let validationKey = isIndex ? `${inputName}_${isIndex}` : inputName;

  if (isSectionId && isRuleId) {
    validationKey = `${inputName}_${isSectionId}_${isRuleId}`;
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

  return (
    <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
      {labelName && (
        <label
          className={`block text-sm font-semibold ${
            validationError[validationKey] ? "text-red-600" : "text-gray-700"
          } px-1`}
          htmlFor={inputName}
        >
          {validationError[validationKey] ? "Field required" : labelName}{" "}
          {isValidation && <span className="text-red-600">*</span>}
        </label>
      )}
      <Select
        name={inputName}
        styles={customStyles} // Apply custom styles
        options={inputOptions}
        value={
          isMulti
            ? inputValue
            : inputOptions?.find((option) => option.value === inputValue) ||
              null
        }
        inputId={inputId}
        onChange={handleChange}
        isClearable={isClearable}
        isSearchable={searchable}
        placeholder={placeHolder}
        onFocus={() => {
          dispatch(setValidationError(validationKey));
          dispatch(setUpdateMap(inputName));
        }} // Call onFocus to reset the error state -- hasViewOnlyAccess(roleName) ||
        isDisabled={disabled}
        isHidden={hidden}
        isMulti={isMulti}
      />
    </div>
  );
};

// Wrap the entire component with ElementErrorBoundary
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputSelect {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
