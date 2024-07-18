import React from "react";
import Select from "react-select";

const SelectInput = ({labelName,inputName,inputValue,inputOptions,onChange,placeHolder,className,isDisabled,isSearchable,
  isMulti,defaultValue
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
    </>
  );
};

export default SelectInput;
