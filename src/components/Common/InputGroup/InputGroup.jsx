import Select from "react-select";

export const InputGroup = ({
  inputLabel,
  leftInputname,
  leftInputname2,
  rightInputName,
  rightInputName2,
  leftDefaultvalue,
  leftValue,
  leftValue2,
  rightDefaultValue,
  rightValue,
  rightValue2,
  options,
  leftOnChange,
  leftOnChange2,
  rightOnChange,
  rightOnChange2,
  leftPlaceHolder,
}) => (
  <div>
    <label
      className="block text-gray-700 px-1 text-[14px]"
      htmlFor={leftInputname2}
    >
      {inputLabel}
    </label>
    <div className="flex items-center space-x-2">
      <Select
        name={leftInputname}
        defaultValue={leftDefaultvalue}
        options={options}
        className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
        value={leftValue}
        onChange={leftOnChange}
      />
      <input
        type="number"
        name={leftInputname2}
        value={leftValue2}
        onChange={leftOnChange2}
        placeholder={leftPlaceHolder || "Min"}
        className="block w-full rounded-md border-0 leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
      />
      {rightInputName && (
        <>
          <Select
            name={rightInputName}
            defaultValue={rightDefaultValue}
            className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
            options={options}
            value={rightValue}
            onChange={rightOnChange}
          />
          <input
            type="number"
            name={rightInputName2}
            value={rightValue2}
            onChange={rightOnChange2}
            placeholder="Max"
            className="block w-full rounded-md border-0 leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          />
        </>
      )}
    </div>
  </div>
);
