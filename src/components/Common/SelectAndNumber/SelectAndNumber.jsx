import React, { useEffect } from "react";
import Select from "react-select";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import { useDispatch } from "react-redux";
import {
  addFields,
  setValidationError,
} from "../../../redux/Slices/validationSlice";
import { useSelector } from "react-redux";

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
  isValidation = false,
  isIndex,
  isValidation1 = false,
  isIndex1,

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
  isValidation2 = false,
  isIndex2,
}) => {
  const dispatch = useDispatch();
  const { fields, validationError } = useSelector((state) => state.validation);

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
  // console.log(validationError);
  const validationKey = isIndex
    ? `${inputNumberName}_${isIndex}`
    : inputNumberName;
  if (isValidation) {
    useEffect(() => {
      if (!fields.includes(inputNumberName)) {
        dispatch(addFields({ inputName: inputNumberName }));
      }
    }, [inputNumberName, dispatch]);
  }

  const validationKey1 = isIndex1
    ? `${inputSelectName}_${isIndex}`
    : inputSelectName;
  if (isValidation1) {
    useEffect(() => {
      if (!fields.includes(inputSelectName)) {
        dispatch(addFields({ inputName: inputSelectName }));
      }
    }, [inputSelectName, dispatch]);
  }

  const validationKey2 = isIndex2
    ? `${inputNumber2Name}_${isIndex}`
    : inputNumber2Name;
  if (isValidation2) {
    useEffect(() => {
      if (!fields.includes(inputNumber2Name)) {
        dispatch(addFields({ inputName: inputNumber2Name }));
      }
    }, [inputNumber2Name, dispatch]);
  }

  return (
    <div>
      {labelName && (
        <label
          className={`block ${
            validationError[validationKey] ||
            validationError[validationKey1] ||
            validationError[validationKey2]
              ? "text-red-600"
              : "text-gray-700"
          } px-1 text-sm font-semibold`}
          htmlFor={inputSelectName}
        >
          {validationError[validationKey] ||
          validationError[validationKey1] ||
          validationError[validationKey2]
            ? "Field required"
            : labelName}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <Select
          name={inputSelectName}
          defaultValue={inputSelectValue}
          options={inputSelectOptions}
          className="block w-full max-w-30 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm "
          value={
            inputSelectOptions.find(
              (option) => option.value === inputSelectValue
            ) || null
          }
          onChange={handleSelectChange}
          isDisabled={disabledSelect}
          isHidden={hiddenSelect}
          isSearchable={false}
          onFocus={() => dispatch(setValidationError(validationKey1))}
        />
        <input
          type="number"
          name={inputNumberName}
          id={inputNumberId}
          value={inputNumberValue}
          onChange={handleNumberChange}
          onFocus={() => dispatch(setValidationError(validationKey))}
          placeholder={placeHolderNumber}
          className={`block h-10 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
          ${
            validationError[validationKey]
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
              className="block w-full max-w-30 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              value={
                inputSelect2Options.find(
                  (option) => option.value === inputSelect2Value
                ) || null
              }
              onChange={handleSelect2Change}
              isDisabled={disabledSelect2}
              isHidden={hiddenSelect2}
              isSearchable={false}
            />
            <input
              type="number"
              name={inputNumber2Name}
              id={inputNumber2Id}
              value={inputNumber2Value}
              onChange={handleNumber2Change}
              onFocus={() => dispatch(setValidationError(validationKey2))}
              placeholder={placeHolderNumber2}
              className={`block h-9 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
          ${
            validationError[validationKey2]
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
