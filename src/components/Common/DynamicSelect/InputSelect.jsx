import React from "react";
import Select from "react-select";

const inputSelect = ({
  labelName,
  inputName,
  inputValue,
  inputOptions,
  onChange,
  placeHolder,
  disabled = false,
  hidden = false,
  isMulti = false,
  searchable = true,
}) => {
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
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
        className="block w-full max-w-30 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm "
        options={inputOptions}
        value={
          isMulti
            ? inputValue
            : inputOptions.find((option) => option.value === inputValue)
        }
        onChange={handleChange}
        isSearchable={searchable}
        placeholder={placeHolder}
        isDisabled={disabled}
        isHidden={hidden}
        isMulti={isMulti}
      />
    </div>
  );
};

export default inputSelect;
