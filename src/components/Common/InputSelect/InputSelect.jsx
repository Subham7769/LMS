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

const InputSelect = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  inputOptions,
  onChange,
  placeHolder,
  disabled = false,
  hidden = false,
  isMulti = false,
  searchable = false,
  isClearable = false,
  dropdownTextSize = "medium", // New prop to control dropdown text size
  isValidation = false,
  isIndex,
  isSectionId,
  isRuleId,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);

  if (inputValue === undefined) {
    throw new Error(`Invalid inputValue for ${labelName}`);
  }

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
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
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

  useEffect(() => {
    if (!updateFields.includes(inputName)) {
      dispatch(addUpdateFields({ inputName }));
    }
  }, [inputName, dispatch]);

  return (
    <div className="flex flex-col">
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
        }} // Call onFocus to reset the error state
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
