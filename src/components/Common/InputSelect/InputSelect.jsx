import React from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

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
  showError = false,
  onFocus,
  dropdownTextSize = "medium", // New prop to control dropdown text size
}) => {
  if (inputValue === null || inputValue === undefined) {
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
      fontSize: dropdownTextSize === "small" ? "12px" : dropdownTextSize === "large" ? "16px" : "14px", // Change font size
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
      fontSize: dropdownTextSize === "small" ? "12px" : dropdownTextSize === "large" ? "16px" : "14px", // Same font size as options
    }),
  };

  return (
    <div className="flex flex-col">
      {labelName && (
        <label
          className={`block ${showError ? "text-red-600" : "text-gray-700"} px-1 text-[14px]`}
          htmlFor={inputName}
        >
          {showError ? "Field required" : labelName}
        </label>
      )}
      <Select
        name={inputName}
        styles={customStyles} // Apply custom styles
        options={inputOptions}
        value={
          isMulti
            ? inputValue
            : inputOptions.find((option) => option.value === inputValue) || null
        }
        inputId={inputId}
        onChange={handleChange}
        isSearchable={searchable}
        placeholder={placeHolder}
        onFocus={onFocus}
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
