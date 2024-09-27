import React from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const SelectInput = ({
  labelName,
  inputName,
  inputValue,
  inputOptions,
  onChange,
  placeHolder,
  className,
  isDisabled,
  isSearchable,
  isMulti,
  defaultValue,
  showError = false, // New prop to indicate error
  onFocus, // New onFocus handler to reset error
}) => {
  return (
    <>
      <div className="flex flex-col">
        {labelName && (
          <label
            className={`block ${
              showError ? "text-red-600" : "text-gray-700"
            } px-1 text-[14px]`}
            htmlFor={inputName}
          >
            {showError ? "Field required" : labelName}
          </label>
        )}
        <Select
          name={inputName}
          className={`${className} focus:ring focus:ring-blue-600`}
          options={inputOptions}
          value={inputValue}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeHolder}
          isSearchable={isSearchable}
          onFocus={onFocus} // Call onFocus to reset the error state
          isDisabled={isDisabled}
          isMulti={isMulti}
        />
      </div>
    </>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <SelectInput {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
