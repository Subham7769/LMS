import React, { useEffect } from "react";
import CreatableSelect from "react-select/creatable";
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

const InputSelectCreatable = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  inputOptions,
  setInputOptions, // Add this prop to update options dynamically
  onChange,
  placeHolder,
  disabled = false,
  hidden = false,
  isMulti = false,
  searchable = false,
  isClearable = false,
  dropdownTextSize = "small",
  isValidation = false,
  isIndex,
  isSectionId,
  isRuleId,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);
  const { updateFields } = useSelector((state) => state.notification);

  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name: inputName,
        value: selectedOption ? selectedOption.value : "",
        id: inputId,
      },
    });
  };

  // Handle creating a new option dynamically
  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setInputOptions((prev) => [...prev, newOption]); // Add new option to the list
    handleChange(newOption); // Select the newly created option
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontSize:
        dropdownTextSize === "small"
          ? "12px"
          : dropdownTextSize === "large"
          ? "16px"
          : "14px",
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
      zIndex: 9999,
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize:
        dropdownTextSize === "small"
          ? "12px"
          : dropdownTextSize === "large"
          ? "16px"
          : "14px",
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
      <CreatableSelect
        name={inputName}
        styles={customStyles}
        options={inputOptions}
        value={
          isMulti
            ? inputValue
            : inputOptions?.find((option) => option.value === inputValue) ||
              null
        }
        inputId={inputId}
        onChange={handleChange}
        onCreateOption={handleCreateOption} // Enable new option creation
        isClearable={isClearable}
        isSearchable={searchable}
        placeholder={placeHolder}
        onFocus={() => {
          dispatch(setValidationError(validationKey));
          dispatch(setUpdateMap(inputName));
        }}
        isDisabled={disabled}
        isHidden={hidden}
        isMulti={isMulti}
      />
    </div>
  );
};

const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <InputSelectCreatable {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
