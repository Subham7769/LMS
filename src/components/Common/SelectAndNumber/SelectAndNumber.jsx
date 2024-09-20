import React from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const SelectAndNumber = ({
  labelName,
  inputSelectName,
  inputSelectValue,
  inputSelectOptions,
  onChangeSelect,
  disabledSelect = false,
  hiddenSelect = false,
  inputNumberName,
  inputNumberId,
  inputNumberValue,
  onChangeNumber,
  placeHolderNumber,
  showError = false, // New prop to indicate error
  onFocus, // New onFocus handler to reset error

  inputSelect2Name,
  inputSelect2Value,
  inputSelect2Options,
  onChangeSelect2,
  disabledSelect2 = false,
  hiddenSelect2 = false,
  inputNumber2Name,
  inputNumber2Id,
  inputNumber2Value,
  onChangeNumber2,
  placeHolderNumber2,
  showError2 = false, // New prop to indicate error
  onFocus2, // New onFocus handler to reset error
}) => {
  if (inputSelectValue === null || inputSelectValue === undefined) {
    throw new Error(`Invalid inputValue for ${labelName}`);
  }

  const handleSelectChange = (selectedOption) => {
    onChangeSelect({
      target: {
        name: inputSelectName,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleSelect2Change = (selectedOption) => {
    onChangeSelect2({
      target: {
        name: inputSelect2Name,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const handleNumberChange = (e) => {
    const { value, id } = e.target;
    onChangeNumber({
      target: {
        name: inputNumberName,
        value: value === "" ? "" : Number(value),
        id: id,
      },
    });
  };

  const handleNumber2Change = (e) => {
    const { value, id } = e.target;
    onChangeNumber2({
      target: {
        name: inputNumber2Name,
        value: value === "" ? "" : Number(value),
        id: id,
      },
    });
  };

  return (
    <div>
      {labelName && (
        <label
          className={`block ${
            showError || showError2 ? "text-red-600" : "text-gray-700"
          } px-1 text-[14px]`}
          htmlFor={inputSelectName}
        >
          {showError || showError2 ? "Field required" : labelName}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <Select
          name={inputSelectName}
          defaultValue={inputSelectValue}
          options={inputSelectOptions}
          className="block w-full max-w-30 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm "
          value={
            inputSelectOptions.find(
              (option) => option.value === inputSelectValue
            ) || null
          }
          onChange={handleSelectChange}
          isDisabled={disabledSelect}
          isHidden={hiddenSelect}
          isSearchable={false}
        />
        <input
          type="number"
          name={inputNumberName}
          id={inputNumberId}
          value={inputNumberValue}
          onChange={handleNumberChange}
          onFocus={onFocus}
          placeholder={placeHolderNumber}
          className={`block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
          ${
            showError
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          focus:ring-2 focus:ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 py-1`}
        />
        {inputSelect2Name && (
          <>
            <Select
              name={inputSelect2Name}
              defaultValue={inputSelect2Value}
              options={inputSelect2Options}
              className="block w-full max-w-30 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm "
              value={
                inputSelect2Options.find(
                  (option) => option.value === inputSelect2Value
                ) || null
              }
              onChange={handleSelect2Change}
              isDisabled={disabledSelect2}
              isHidden={hiddenSelect2}
            />
            <input
              type="number"
              name={inputNumber2Name}
              id={inputNumber2Id}
              value={inputNumber2Value}
              onChange={handleNumber2Change}
              onFocus={onFocus2}
              placeholder={placeHolderNumber2}
              className={`block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
          ${
            showError2
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          focus:ring-2 focus:ring-inset  placeholder:text-gray-400 sm:text-sm sm:leading-6 py-1`}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <SelectAndNumber {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
