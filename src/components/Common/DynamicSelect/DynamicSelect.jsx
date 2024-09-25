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
}) => {
  return (
    <>
      <div className="flex flex-col">
        {labelName && (
          <label
            className="block text-gray-700 px-1 text-[14px]"
            htmlFor={inputName}
          >
            {labelName}
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

