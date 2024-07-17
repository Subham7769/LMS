import React from "react";

const InputNumber = ({
  labelName,
  inputName,
  inputValue,
  inputId,
  onChange,
  placeHolder,
  disabled = false,
}) => {
  const handleChange = (e) => {
    const { name, value, id } = e.target;
    onChange({
      target: {
        name: name,
        value: value === "" ? "" : Number(value),
        id: id,
      },
    });
  };

  return (
    <div className="w-full">
      {labelName && (
        <label
          className="block text-gray-700 px-1 text-[14px]"
          htmlFor={inputName}
        >
          {labelName}
        </label>
      )}
      <input
        type="number"
        id={inputId}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeHolder}
        className="flex-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 py-1"
        required
        disabled={disabled}
      />
    </div>
  );
};

export default InputNumber;
