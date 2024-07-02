import React from "react";
import Select from "react-select";

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
}) => {
  return (
    <>
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
        className={`${className} focus:ring focus:ring-blue-600 pb-2`}
        options={inputOptions}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        value={inputValue}
        onChange={onChange}
        placeholder={placeHolder}
      />
    </>
  );
};

export default SelectInput;
